import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendReportToClient } from "@/lib/mailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  console.log("[Stripe Webhook] Received webhook request");
  
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  if (!signature) {
    console.error("[Stripe Webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[Stripe Webhook Error]: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Gérer l'événement checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.metadata?.sessionId;
    const paymentId = session.payment_intent as string;

    if (sessionId) {
      console.log(`[Stripe Webhook] Payment successful for session ${sessionId}`);
      
      // Mettre à jour la base de données
      const updatedSession = await prisma.diagnosticSession.update({
        where: { id: sessionId },
        data: {
          isPaid: true,
          paymentId: paymentId,
        },
      });

      // Envoyer le rapport par email au client
      if (updatedSession.clientEmail) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://diagnostic-bois.com");
        const reportUrl = `${baseUrl}/resultats/${sessionId}`;
        
        console.log(`[Stripe Webhook] Sending report to ${updatedSession.clientEmail}, URL: ${reportUrl}`);
        
        try {
          await sendReportToClient(updatedSession, reportUrl);
          console.log(`[Stripe Webhook] Report email sent to ${updatedSession.clientEmail}`);
        } catch (emailError) {
          console.error(`[Stripe Webhook] Failed to send report email:`, emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
