import { db } from "./src/lib/db";
import crypto from "crypto";
import { chasserArtisans, extraireInfosLead, redigerMailDeVente } from "./src/lib/ai";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia" as any,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function run() {
    console.log("🚀 Démarrage de l'injection manuelle du lead de Danielle Arribe...");
    const text = `
Nom: arribe danielle
Téléphone: +33678562179
Email: arribe.d@wanadoo.fr
Type de problème: Insectes xylophages (capricorne, vrillette, lyctus)

Message
Adresse: 3 chemin de la côte de bétance, 31600 MURET
notre escalier en bois est attaqué par les vrillettes
`;

    const infos = await extraireInfosLead(text);
    console.log("🧠 Extraction IA réussie :", infos);
    const newId = crypto.randomUUID();
    
    await db.save({
        id: newId,
        nom: infos.nom,
        telephone: infos.telephone,
        email: "arribe.d@wanadoo.fr",
        ville: infos.ville,
        probleme: infos.probleme,
        texte_original: text,
        statut: 'NOUVEAU',
        date_creation: new Date().toISOString()
    });
    console.log("✅ Lead sauvegardé dans la BD !");

    if (infos.ville !== "Inconnue") {
        const artisans = await chasserArtisans(infos.ville, infos.probleme);
        
        for (let artisan of artisans) {
            try {
                const price = await stripe.prices.create({
                    currency: "eur",
                    unit_amount: 5000,
                    product_data: { name: `Lead Exclusif : ${infos.probleme} à ${infos.ville}` },
                });
                const paymentLink = await stripe.paymentLinks.create({
                    line_items: [{ price: price.id, quantity: 1 }],
                    restrictions: { completed_sessions: { limit: 1 } },
                    metadata: { leadId: newId },
                });

                const mailCorps = await redigerMailDeVente(artisan.nom_societe, infos.ville, infos.probleme);
                
                await transporter.sendMail({
                    from: `"ACO Leads" <${process.env.EMAIL_USER}>`,
                    to: artisan.email,
                    subject: `Nouveau Chantier (Lead) : ${infos.probleme} à ${infos.ville}`,
                    text: `${mailCorps}\n\nPour accepter ce chantier en exclusivité (50€) et recevoir les coordonnées du client, cliquez sur ce lien de paiement sécurisé : ${paymentLink.url}\n\nAttention : le premier qui clique et valide récupère le chantier, le lien se bloquera ensuite pour les autres.\n\nCordialement,\nACO Leads`
                });
                console.log(`✉️ Email envoyé à ${artisan.nom_societe} (${artisan.email}) avec le lien : ${paymentLink.url}`);
            } catch (err) {
                console.error(`Erreur envoi artisan ${artisan.nom_societe}:`, err);
            }
        }
    }
    console.log("🎉 Terminé ! L'IA a fini son travail.");
}
run();
