import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAnalysisSession } from "@/lib/analysis-store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID requis" }, { status: 400 });
    }

    const sessionData = await getAnalysisSession(sessionId);
    if (!sessionData) {
      return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
    }

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/resultats/${sessionId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/resultats/${sessionId}?canceled=true`,
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
