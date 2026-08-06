/**
 * OLIVAEN — Stripe Product Definitions
 * Centralized product/price config for the Founding Harvest pre-order.
 */

export const PRODUCTS = {
  foundingHarvest: {
    name: "OLIVAEN — Founding Harvest No.1",
    description: "Single-varietal Chemlali extra virgin olive oil. First press, October 2026. Individually numbered bottle from the Founding Harvest of 500.",
    price: {
      amount: 2900, // €29.00 in cents
      currency: "eur",
      stripePriceId: "", // Will be set after creating in Stripe
    },
    metadata: {
      productType: "founding_harvest",
      varietal: "Chemlali",
      origin: "Sfax, Tunisia",
      harvestDate: "October 2026",
      edition: "1 of 500",
    },
  },
} as const;
