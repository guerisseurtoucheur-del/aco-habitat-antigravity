import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { diagnosticReportSchema } from "@/types/diagnostic";
import { generateDiagnosticPdfBuffer } from "@/lib/pdf/diagnostic-report-template";
import { sendReportToClient } from "@/lib/mailer";

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 });
  }

  const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || "").trim();
  if (!webhookSecret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET manquant" }, { status: 503 });
  }

  const stripe = getStripe();
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
      
      // Mettre à jour la base de données et récupérer la session complète avec images
      const updatedSession = await prisma.diagnosticSession.update({
        where: { id: sessionId },
        data: {
          isPaid: true,
          paymentId: paymentId,
        },
        include: { images: true },
      });

      // Envoyer le rapport par email au client avec le PDF en pièce jointe
      if (updatedSession.clientEmail) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://diagnostic-bois.com");
        const reportUrl = `${baseUrl}/resultats/${sessionId}`;
        
        console.log(`[Stripe Webhook] Sending report to ${updatedSession.clientEmail}, URL: ${reportUrl}`);
        
        // Générer le PDF pour l'attacher à l'email
        let pdfBuffer: Buffer | undefined;
        try {
          const result = updatedSession.result as any;
          if (result) {
            const parsed = diagnosticReportSchema.safeParse(result);
            if (parsed.success) {
              pdfBuffer = await generateDiagnosticPdfBuffer(updatedSession, parsed.data);
              console.log(`[Stripe Webhook] PDF generated, size: ${pdfBuffer.length} bytes`);
            }
          }
        } catch (pdfError) {
          console.error(`[Stripe Webhook] PDF generation failed:`, pdfError);
        }
        
        try {
          await sendReportToClient(updatedSession, reportUrl, pdfBuffer);
          console.log(`[Stripe Webhook] Report email sent to ${updatedSession.clientEmail}`);
        } catch (emailError) {
          console.error(`[Stripe Webhook] Failed to send report email:`, emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
