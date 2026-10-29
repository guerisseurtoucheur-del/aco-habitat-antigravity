import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { db } from "@/lib/db";
import crypto from "crypto";
import { chasserArtisans, extraireInfosLead, redigerMailDeVente } from "@/lib/ai";
import Stripe from "stripe";
import nodemailer from "nodemailer";

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

export async function GET() {
    const text = `
Nom: arribe danielle
Téléphone: +33678562179
Email: arribe.d@wanadoo.fr
Type de problème: Insectes xylophages (capricorne, vrillette, lyctus)

Message
Adresse: 3 chemin de la côte de bétance, 31600 MURET
notre escalier en bois est attaqué par les vrillettes
`;

    const infos = {
        nom: "Danielle Arribe",
        ville: "Muret",
        probleme: "Vrillettes",
        telephone: "+33678562179"
    };
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

    let count = 0;
    if (infos.nom === "Client Inconnu") {
        if (infos.probleme && infos.probleme.startsWith("ERREUR IA:")) {
            // Keep the exact error message
        } else {
            infos.probleme = "TEXTE REÇU:\n" + text.substring(0, 1000);
        }
    }
    if (infos.ville !== "Inconnue") {
        const artisans = [
            { nom_societe: "Spécialiste Traitement Muret", email: "aco.habitat.contact@gmail.com", telephone: "0600000000", ville: "Muret" },
            { nom_societe: "Expert Xylophages 31", email: "aco.habitat.contact@gmail.com", telephone: "0600000000", ville: "Muret" }
        ];
        
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

                const mailHtml = `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
    <p>Bonjour <strong>${artisan.nom_societe}</strong>,</p>
    
    <p>Je suis <strong>Monsieur Ousmani</strong>, dirigeant de la société <a href="https://aco-habitat.fr" style="color: #2563eb; text-decoration: none;"><strong>ACO Habitat</strong></a>. Nous sommes des experts historiques du traitement des bois et de la mérule sur le Grand Ouest (depuis 2006).</p>
    
    <p>Suite à une demande sur notre plateforme, j'ai actuellement <strong style="color: #dc2626;">un prospect extrêmement sérieux</strong> pour un chantier de <strong>${infos.probleme}</strong> directement sur votre secteur à <strong>${infos.ville}</strong>.</p>
    
    <p>Le client attend d'être contacté rapidement sur place pour reprendre ce chantier.</p>
    
    <p><strong>Seriez-vous intéressé pour récupérer ce dossier ?</strong><br>
    Si oui, cliquez sur le bouton ci-dessous pour régler les frais de transfert (50€) et accéder instantanément aux coordonnées du client (Téléphone, Email).</p>
    
    <p style="font-size: 13px; color: #666;"><em>(Attention : le premier confrère qui valide récupère le chantier en exclusivité, le lien se bloquera ensuite pour les autres).</em></p>
    
    <br>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="${paymentLink.url}" style="background-color: #2563eb; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; margin-bottom: 10px; width: 80%;">
            🔓 Débloquer le Chantier (50€)
        </a><br>
        <a href="https://aco-habitat.fr" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block; width: 80%;">
            🏢 Visiter notre site institutionnel
        </a>
    </div>

    <br>
    <p>Cordialement,</p>
    <p><strong>Monsieur Ousmani - Dirigeant ACO Habitat</strong><br>
    02 33 31 19 79</p>
</div>`;
                
                await transporter.sendMail({
                    from: `"Monsieur Ousmani - ACO Habitat" <${process.env.EMAIL_USER}>`,
                    to: artisan.email,
                    subject: `🤝 Transfert de chantier : ${infos.probleme} sur ${infos.ville} (Client qualifié)`,
                    html: mailHtml
                });
                count++;
            } catch (err) {
                console.error(`Erreur envoi artisan ${artisan.nom_societe}:`, err);
            }
        }
        if (artisans.length > 0) {
            const updatedLead = await db.getById(newId);
            if (updatedLead) {
                updatedLead.statut = 'ENVOYÉ AUX ARTISANS';
                await db.save(updatedLead);
            }
        }
        
        return NextResponse.json({ success: true, lead: infos, artisans_trouves: artisans.length });
    }
    return NextResponse.json({ success: true, count, infos });
}
