/**
 * OLIVAEN — Stripe Service
 * Handles Stripe initialization, checkout session creation, and order management.
 */
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe && STRIPE_SECRET_KEY) {
    _stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2026-07-29.dahlia",
    });
  }
  return _stripe!;
}

/**
 * Create a Stripe Checkout Session for a Founding Harvest bottle pre-order.
 */
export async function createCheckoutSession(params: {
  userId: number;
  email: string;
  name?: string;
  quantity: number;
  priceId: string;
  origin: string;
}) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: params.priceId,
        quantity: params.quantity,
      },
    ],
    customer_email: params.email,
    client_reference_id: params.userId.toString(),
    metadata: {
      user_id: params.userId.toString(),
      customer_email: params.email,
      customer_name: params.name || "",
      quantity: params.quantity.toString(),
    },
    allow_promotion_codes: true,
    success_url: `${params.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/checkout/cancel`,
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["FR", "DE", "IT", "ES", "BE", "NL", "AT", "PT", "CH", "LU"],
    },
  });

  return session;
}

/**
 * Get or create a Stripe customer for a user.
 */
export async function getOrCreateCustomer(email: string, name?: string) {
  const stripe = getStripe();
  const existing = await stripe.customers.list({ email, limit: 1 });
  if (existing.data.length > 0) {
    return existing.data[0];
  }
  return stripe.customers.create({ email, name });
}

/**
 * Create a Stripe product and price for the Founding Harvest.
 */
export async function createFoundingHarvestProduct() {
  const stripe = getStripe();
  const product = await stripe.products.create({
    name: "OLIVAEN — Founding Harvest No.1",
    description: "Single-varietal Chemlali extra virgin olive oil. First press, October 2026. Individually numbered bottle from the Founding Harvest of 500.",
    metadata: {
      productType: "founding_harvest",
      varietal: "Chemlali",
      origin: "Sfax, Tunisia",
      harvestDate: "October 2026",
      edition: "1 of 500",
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 2900, // €29.00 in cents
    currency: "eur",
  });

  return price.id;
}

/**
 * Fetch a Stripe session by ID for verification.
 */
export async function getSession(sessionId: string) {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId);
}
