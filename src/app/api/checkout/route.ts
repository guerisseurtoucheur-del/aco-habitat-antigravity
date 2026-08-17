import { NextResponse } from "next/server";
import { getAnalysisSession } from "@/lib/analysis-store";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

export async function POST(req: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          error:
            "Paiement Stripe non configuré. Ajoutez STRIPE_SECRET_KEY (sk_test_...) dans .env.local puis redémarrez npm run dev.",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID requis" }, { status: 400 });
    }

    const sessionData = await getAnalysisSession(sessionId);
    if (!sessionData) {
      return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
    }

    const baseUrl = getBaseUrl();

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Rapport d'expertise ACO-HABITAT`,
              description: `Audit complet et rapport PDF pour le dossier ${sessionId.slice(0, 8).toUpperCase()}`,
            },
            unit_amount: 4900, // 49.00 € en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/resultats/${sessionId}?success=true`,
      cancel_url: `${baseUrl}/resultats/${sessionId}?canceled=true`,
      metadata: {
        sessionId: sessionId,
      },
      customer_email: sessionData.clientEmail || undefined,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("[Stripe Checkout Error]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
