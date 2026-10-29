import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean((process.env.STRIPE_SECRET_KEY || "").trim());
}

export function getStripe(): Stripe {
  const key = (process.env.STRIPE_SECRET_KEY || "").trim();
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante. Ajoutez votre clé secrète de test (sk_test_...) dans .env.local puis redémarrez le serveur.",
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}
