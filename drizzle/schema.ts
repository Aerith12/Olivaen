import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Stripe customer ID — links user to Stripe customer object */
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Orders table — tracks pre-order reservations for Founding Harvest bottles.
 * Stores only essential Stripe identifiers; all other data lives in Stripe.
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  /** Stripe payment intent ID */
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).notNull().unique(),
  /** Stripe customer ID */
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }).notNull(),
  /** Stripe checkout session ID */
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }).notNull().unique(),
  /** User ID reference */
  userId: int("userId").notNull(),
  /** Customer email at time of purchase */
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  /** Customer name at time of purchase */
  customerName: text("customerName"),
  /** Quantity of bottles ordered */
  quantity: int("quantity").default(1).notNull(),
  /** Bottle number assigned (nullable until fulfillment) */
  bottleNumber: int("bottleNumber"),
  /** Order status: pending | completed | failed | refunded */
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  /** Stripe product price ID for reference */
  priceId: varchar("priceId", { length: 255 }).notNull(),
  /** Created at */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Updated at */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
