import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createCheckoutSession, getOrCreateCustomer, createFoundingHarvestProduct } from "./stripe/stripe";
import { PRODUCTS } from "./stripe/products";
import {
  createOrder,
  getOrdersByUserId,
  getOrderBySessionId,
  updateOrderStatus,
} from "./db";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import type { InsertOrder } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  /**
   * Create a Stripe Checkout session for Founding Harvest pre-order.
   */
  checkout: protectedProcedure
    .input(
      z.object({
        quantity: z.number().min(1).max(5).default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      if (!user) {
        throw new Error("User must be logged in to reserve a bottle");
      }

      const origin = ctx.req.headers.origin || "http://localhost:3000";

      // Get or create Stripe customer
      const customer = await getOrCreateCustomer(user.email || "", user.name || undefined);

      // Update user's stripeCustomerId
      const db = await getDb();
      if (db) {
        await db
          .update(users)
          .set({ stripeCustomerId: customer.id as string })
          .where(eq(users.id, user.id));
      }

      // We need a price ID — check if one exists in the product config
      let priceId: string = PRODUCTS.foundingHarvest.price.stripePriceId;

      if (!priceId) {
        // Create the product and price in Stripe on first call
        priceId = await createFoundingHarvestProduct();
      }

      // Create checkout session
      const session = await createCheckoutSession({
        userId: user.id,
        email: user.email || "",
        name: user.name || undefined,
        quantity: input.quantity,
        priceId,
        origin,
      });

      // Create a pending order in the database
      await createOrder({
        stripePaymentIntentId: session.payment_intent as string || session.id,
        stripeCustomerId: customer.id,
        stripeCheckoutSessionId: session.id,
        userId: user.id,
        customerEmail: user.email || "",
        customerName: user.name || undefined,
        quantity: input.quantity,
        priceId,
        status: "pending",
      });

      return { url: session.url };
    }),

  /**
   * Verify a checkout session and get order status.
   */
  checkoutStatus: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const order = await getOrderBySessionId(input.sessionId);
      if (!order) {
        return { found: false, order: null };
      }
      return { found: true, order };
    }),

  /**
   * Get user's order history.
   */
  orders: protectedProcedure.query(async ({ ctx }) => {
    const userOrders = await getOrdersByUserId(ctx.user.id);
    return userOrders;
  }),
});



export type AppRouter = typeof appRouter;
