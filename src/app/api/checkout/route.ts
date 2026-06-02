import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getAnalysisSession } from "@/lib/analysis-store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Construit l'URL de base du site de maniere fiable (env var > headers > fallback)
function getBaseUrl(requestHeaders: Headers): string {
  // 1. Variable d'environnement explicite (prioritaire)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // 2. Header x-forwarded-host (Vercel injecte ca)
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const forwardedProto = requestHeaders.get("x-forwarded-proto") || "https";
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }
  // 3. Header host standard
  const host = requestHeaders.get("host");
  if (host) {
    const proto = host.includes("localhost") ? "http" : "https";
    return `${proto}://${host}`;
  }
  // 4. Fallback local
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const requestHeaders = await headers();
    const baseUrl = getBaseUrl(requestHeaders);

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
              name: `Rapport d'expertise DIAGNOSTIC-BOIS`,
              description: `Audit complet et rapport PDF pour le dossier ${sessionId.slice(0, 8).toUpperCase()}`,
            },
            unit_amount: 1900, // 19.00 € en centimes
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
