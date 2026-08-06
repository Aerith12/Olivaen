/**
 * OLIVAEN — Stripe Webhook Handler
 * Handles Stripe webhook events for payment confirmation and order status updates.
 */
import express from "express";
import Stripe from "stripe";
import type { Request, Response } from "express";
import { updateOrderStatus } from "../db";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe;
if (STRIPE_SECRET_KEY) {
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2026-07-29.dahlia",
  });
}

export function registerStripeWebhook(app: express.Express) {
  if (!STRIPE_SECRET_KEY) {
    console.warn("[Stripe] STRIPE_SECRET_KEY not configured, webhook disabled");
    return;
  }

  // Register raw body parser BEFORE express.json() so signature verification works
  app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

  app.post("/api/stripe/webhook", async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret || "");
    } catch (err: any) {
      console.error("[Webhook] Signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Test events must return verified
    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] checkout.session.completed: ${session.id}`);

        if (session.payment_intent) {
          await updateOrderStatus(
            session.payment_intent as string,
            "completed"
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] payment_intent.payment_failed: ${paymentIntent.id}`);
        await updateOrderStatus(paymentIntent.id, "failed");
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`[Webhook] charge.refunded: ${charge.payment_intent}`);
        if (charge.payment_intent) {
          await updateOrderStatus(charge.payment_intent as string, "refunded");
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  });
}
