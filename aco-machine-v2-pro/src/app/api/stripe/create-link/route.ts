import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia" as any,
});

export async function POST(req: Request) {
  try {
    const { leadId, description } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: "leadId est requis" }, { status: 400 });
    }

    // 1. Créer un "Prix" à usage unique de 50€ avec le nom du produit
    const price = await stripe.prices.create({
      currency: "eur",
      unit_amount: 5000, // 50.00 EUR (en centimes)
      product_data: {
        name: `Lead Exclusif : ${description || "Client en attente"}`,
      },
    });

    // 2. Créer le Lien de Paiement (Payment Link) avec la limite d'1 seul achat
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      restrictions: {
        completed_sessions: {
          limit: 1, // LE VERROU MAGIQUE : Le lien se bloque après 1 paiement
        },
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Mise en relation pour chantier exclusif - ACO Habitat`,
        }
      },
      metadata: {
        leadId: leadId, // On cache l'ID du prospect dans le lien pour le retrouver au paiement
      },
      // Optionnel: On pourrait rediriger vers une page "Succès" de notre app
      // after_completion: { type: "redirect", redirect: { url: "https://..." } }
    });

    return NextResponse.json({ 
      success: true, 
      paymentUrl: paymentLink.url,
      paymentLinkId: paymentLink.id
    });

  } catch (error: any) {
    console.error("Erreur Stripe:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
