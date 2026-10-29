export const maxDuration = 60; // Autorise Vercel à tourner pendant 60 secondes (Nécessite Vercel Pro, sinon 10s sur Hobby)

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chasserArtisans, suggestNearbyHubs } from "@/lib/ai";
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

export async function POST(req: Request) {
  try {
    const { leadId, ville, codePostal, probleme } = await req.json();

    if (!ville) {
      return NextResponse.json({ error: "Ville manquante" }, { status: 400 });
    }

    console.log(`🚀 Début du recrutement automatique pour le lead à ${ville}...`);

    // 1. Stratégie "Anti-Village" : Trouver les grandes villes proches
    console.log("🧠 Analyse du secteur (Anti-Village)...");
    const hubs = await suggestNearbyHubs(ville);
    const zonesDeRecherche = hubs && hubs.length > 0 ? hubs : [ville];
    
    console.log(`📍 Zones de chasse déterminées : ${zonesDeRecherche.join(", ")}`);

    // 2. Chasse IA dans les zones sélectionnées
    let artisansTrouves: any[] = [];
    for (const zone of zonesDeRecherche) {
      console.log(`🔍 Chasse aux artisans sur : ${zone}`);
      const artisans = await chasserArtisans(zone, probleme || "Traitement des bois");
      artisansTrouves = [...artisansTrouves, ...artisans];
    }

    // 3. Déduplication des artisans trouvés (par email ou téléphone)
    const artisansUniques = Array.from(
      new Map(artisansTrouves.map(a => [a.email, a])).values()
    );

    // 4. Ajout des partenaires existants en base de données
    const allPartners = await db.getPartners();
    const matchedPartners = allPartners.filter((p: any) => 
      zonesDeRecherche.some(z => p.ville.toLowerCase().includes(z.toLowerCase())) ||
      p.ville.toLowerCase().includes(ville.toLowerCase())
    );

    const artisansFinaux = [...matchedPartners];
    for (let a of artisansUniques) {
       if (!artisansFinaux.find(p => p.email === a.email)) {
          artisansFinaux.push(a);
       }
    }

    console.log(`✅ ${artisansFinaux.length} artisans identifiés pour ce lead.`);

    // 5. Création des liens Stripe & Envoi des Emails
    let emailsEnvoyes = 0;

    for (let artisan of artisansFinaux) {
      if (!artisan.email || !artisan.email.includes("@")) continue;

      try {
        // Création du lien Stripe dynamique
        const price = await stripe.prices.create({
            currency: "eur",
            unit_amount: 5000,
            product_data: { name: `Lead Exclusif : ${probleme} (Secteur ${ville})` },
        });
        
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [{ price: price.id, quantity: 1 }],
            restrictions: { completed_sessions: { limit: 1 } },
            metadata: { leadId: leadId || "manuel" },
        });

        // Email ultra-pro orienté "Vente / Offre de Lead"
        const mailHtml = `
<div style="font-family: 'Inter', Arial, sans-serif; font-size: 15px; color: #1e293b; line-height: 1.6; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);">
    
    <div style="background-color: #0f172a; padding: 25px; text-align: center; border-bottom: 4px solid #f59e0b;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">⚠️ Nouveau Chantier Disponible</h2>
        <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px;">Secteur : ${ville} et alentours</p>
    </div>

    <div style="padding: 30px;">
        <p>Bonjour <strong>${artisan.nom_societe}</strong>,</p>

        <p>Je suis Monsieur Ousmani, dirigeant du réseau d'expertise <strong>ACO Habitat</strong>. Nous avons identifié votre entreprise comme l'une des plus spécialisées de la région.</p>

        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #92400e;"><strong>🔥 Détails du Prospect :</strong></p>
            <p style="margin: 5px 0 0 0; color: #b45309;">Type d'intervention : <strong>${probleme}</strong></p>
            <p style="margin: 5px 0 0 0; color: #b45309;">Localisation : <strong>Secteur ${ville}</strong></p>
            <p style="margin: 5px 0 0 0; color: #b45309;">Statut : <strong>Client en attente de contact immédiat</strong></p>
        </div>

        <p>Nous ne transmettons ce dossier qu'à <strong>un seul artisan local</strong>. Le premier qui valide le transfert récupère l'exclusivité totale du client et ses coordonnées complètes.</p>

        <div style="text-align: center; margin: 35px 0;">
            <a href="${paymentLink.url}" style="background-color: #f59e0b; color: #000000; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.4);">
                Débloquer les coordonnées (50€)
            </a>
            <p style="margin-top: 10px; font-size: 12px; color: #64748b;">(Paiement sécurisé par Stripe - Facture générée automatiquement)</p>
        </div>

        <p>Si vous avez la moindre question, vous pouvez m'appeler directement sur ma ligne personnelle au <strong>06 89 31 81 51</strong>.</p>
        
        <p>À très vite sur le réseau,<br>
        <strong>Monsieur Ousmani</strong><br>
        <span style="color: #64748b; font-size: 13px;">Fondateur d'ACO Habitat</span></p>
    </div>
</div>`;

        await transporter.sendMail({
          from: '"M. Ousmani - ACO Habitat" <contact@aco-habitat.fr>',
          to: artisan.email,
          subject: `🔥 Nouveau chantier (${probleme}) sur le secteur de ${ville}`,
          html: mailHtml,
        });

        emailsEnvoyes++;
        console.log(`📧 Email envoyé avec succès à ${artisan.nom_societe} (${artisan.email})`);
      } catch (e) {
        console.error(`❌ Erreur lors de l'envoi à ${artisan.nom_societe}:`, e);
      }
    }

    // Mise à jour du statut du lead dans la base de données
    if (leadId && leadId !== "manuel" && emailsEnvoyes > 0) {
      const lead = await db.getById(leadId);
      if (lead) {
        lead.statut = 'ENVOYÉ AUX ARTISANS';
        await db.save(lead);
        console.log(`✅ Statut du lead ${leadId} mis à jour : ENVOYÉ AUX ARTISANS`);
      }
    }

    return NextResponse.json({ success: true, emailsEnvoyes, totalTrouves: artisansFinaux.length });

  } catch (error: any) {
    console.error("❌ Erreur Route Recrutement:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
