import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    // Vérifier que la requête vient bien de Stripe (Sécurité)
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Écouter l'événement "Paiement réussi"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // 1. Récupérer l'email de l'artisan qui a payé
    const customerEmail = session.customer_details?.email;
    
    // 2. Récupérer l'ID du lead caché dans le lien
    // Sur une checkout.session générée par un payment_link, les metadata du payment_link ne sont pas directement sur la session.
    // Il faut récupérer le payment_link ou retrouver via le client_reference_id si utilisé.
    // Pour simplifier, on va supposer qu'on a mis l'ID dans client_reference_id ou qu'on le retrouve via l'API.
    
    // Astuce : Quand on crée le lien plus tôt, on peut passer le leadId dans les metadata.
    // Mais pour la session complétée, on va récupérer la session complète avec les line_items
    const paymentLinkId = session.payment_link;
    if (paymentLinkId && customerEmail) {
       const link = await stripe.paymentLinks.retrieve(paymentLinkId as string);
       const leadId = link.metadata.leadId;
       
       if (leadId) {
          const lead = await db.getById(leadId);
          if (lead && lead.statut !== 'VENDU') {
             // 3. Mettre à jour la base de données
             lead.statut = 'VENDU';
             lead.acheteur_email = customerEmail;
             await db.save(lead);
             
             console.log(`✅ Lead ${leadId} vendu à ${customerEmail}`);
             
             // 4. Récupérer la facture si Stripe l'a générée
             let invoicePdfUrl = "";
             if (session.invoice) {
                try {
                   const invoice = await stripe.invoices.retrieve(session.invoice as string);
                   if (invoice.invoice_pdf) {
                       invoicePdfUrl = invoice.invoice_pdf;
                   }
                } catch (e) {
                   console.error("Erreur récupération facture Stripe:", e);
                }
             }

             // 5. Envoyer l'email de livraison automatique à l'artisan !
             await sendDeliveryEmail(customerEmail, lead, invoicePdfUrl);
             
             // 6. Alerte Admin "Ka-ching" !
             await sendAdminAlert(lead, customerEmail);
          }
       }
    }
  }

  return NextResponse.json({ received: true });
}

// Fonction pour livrer le prospect
async function sendDeliveryEmail(toEmail: string, lead: any, invoicePdfUrl: string = "") {
    // Note: Mettre les vrais identifiants dans .env plus tard
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const html = `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6;">
        <h2 style="color: #34a853;">✅ Paiement Confirmé - Voici votre Chantier Exclusif</h2>
        <p>Bonjour,</p>
        <p>Merci pour votre achat. Comme convenu, voici les coordonnées exclusives de votre nouveau client pour le problème de <strong>${lead.probleme}</strong> à <strong>${lead.ville}</strong> :</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #34a853; margin: 20px 0;">
            <p><strong>Nom du client :</strong> ${lead.nom}</p>
            <p><strong>Téléphone :</strong> ${lead.telephone}</p>
            <p><strong>Email :</strong> ${lead.email}</p>
            <p><strong>Message original du client :</strong><br>
            <span style="font-style: italic; color: #555;">"${lead.texte_original}"</span></p>
        </div>
        
        ${invoicePdfUrl ? `
        <div style="margin: 30px 0; text-align: center;">
            <a href="${invoicePdfUrl}" style="background-color: #1e293b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">
                📄 Télécharger votre Facture (PDF)
            </a>
        </div>
        ` : ""}

        <p>Bon chantier !<br><br>
        Cordialement,<br><strong>ACO Leads</strong></p>
    </div>
    `;

    await transporter.sendMail({
        from: '"ACO Leads" <contact@aco-habitat.fr>', // Faux pour l'instant
        to: toEmail,
        subject: `[CONFIDENTIEL] Coordonnées du Chantier Exclusif - ${lead.ville}`,
        html: html
    });
}

// Fonction d'alerte admin (Gratuit, remplace le SMS)
async function sendAdminAlert(lead: any, acheteurEmail: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; padding: 20px; border: 2px solid #16a34a; border-radius: 8px; text-align: center;">
        <h1 style="color: #16a34a; margin-top: 0;">💰 KA-CHING ! 💰</h1>
        <h2>Vous venez d'encaisser 50€ !</h2>
        <p>L'entreprise <strong>${acheteurEmail}</strong> vient d'acheter le lead exclusif de <strong>${lead.ville}</strong>.</p>
        <p style="color: #555;">La facture a été générée et envoyée automatiquement au partenaire par Stripe.</p>
        
        <div style="margin-top: 20px;">
            <a href="https://aco-machine-v2.vercel.app" style="background-color: #1e293b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">
                Aller sur le Tableau de Bord
            </a>
        </div>
    </div>
    `;

    await transporter.sendMail({
        from: '"ACO Machine Alert" <contact@aco-habitat.fr>',
        to: process.env.EMAIL_USER, // L'adresse Gmail principale de la machine
        subject: `💰 KA-CHING ! Lead vendu à ${lead.ville} (50€)`,
        html: html
    });
}
