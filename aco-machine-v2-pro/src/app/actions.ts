'use server'

import { db } from "@/lib/db";
import crypto from "crypto";
import { chasserArtisans, chasserFutursPartenaires, suggestNearbyHubs as suggestNearbyHubsAI } from "@/lib/ai";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";

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

export async function addManualLead(formData: FormData) {
  const nom = formData.get("nom") as string;
  const telephone = formData.get("telephone") as string;
  const emailClient = formData.get("email") as string || "Non renseigné";
  const codePostal = formData.get("code_postal") as string;
  const ville = formData.get("ville") as string;
  const villeComplete = `${codePostal} ${ville}`;
  const probleme = formData.get("probleme") as string;
  
  const newId = crypto.randomUUID();
  
  // 1. Sauvegarde BD
  await db.save({
      id: newId,
      nom: nom,
      telephone: telephone,
      email: emailClient,
      ville: villeComplete,
      probleme: probleme,
      texte_original: `Lead ajouté manuellement depuis le Dashboard.`,
      statut: 'NOUVEAU',
      date_creation: new Date().toISOString()
  });

  // 2. Chercher les partenaires inscrits
  const allPartners = await db.getPartners();
  const matchedPartners = allPartners.filter((p: any) => p.code_postal === codePostal || p.ville.toLowerCase() === ville.toLowerCase());

  // 3. Création du lien Stripe 
  let paymentUrl = "";
  try {
      const price = await stripe.prices.create({
          currency: "eur",
          unit_amount: 5000,
          product_data: { name: `Lead Exclusif : ${probleme} à ${villeComplete}` },
      });
      const paymentLink = await stripe.paymentLinks.create({
          line_items: [{ price: price.id, quantity: 1 }],
          restrictions: { completed_sessions: { limit: 1 } },
          metadata: { leadId: newId },
      });
      paymentUrl = paymentLink.url;
  } catch (e) {
      console.error("Erreur création lien Stripe:", e);
  }

  // 4. Envoi de l'ordre au Python Worker via Redis
  const { Redis } = await import('@upstash/redis');
  const redis = Redis.fromEnv();
  
  const job = {
    type: "LEAD_TRANSFER",
    leadId: newId,
    codePostal,
    ville,
    villeComplete,
    probleme,
    paymentLink: paymentUrl,
    matchedPartners, // partenaires déjà inscrits à qui on peut aussi envoyer
    timestamp: Date.now(),
    status: "PENDING"
  };
  
  await redis.rpush('python_jobs', JSON.stringify(job));
  console.log(`Job de transfert de lead posté pour le Python Worker : ${villeComplete}`);

  revalidatePath("/");
  return { success: true };
}

export async function deleteLead(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await db.delete(id);
  revalidatePath("/");
}

export async function addPartner(formData: FormData) {
  const partner = {
    nom_societe: formData.get("nom_societe"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    code_postal: formData.get("code_postal"),
    ville: formData.get("ville"),
    specialites: formData.get("specialites"),
    date_inscription: new Date().toISOString()
  };
  await db.savePartner(partner);

  if (partner.email && partner.email.toString().includes("@")) {
    const welcomeHtml = `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://aco-machine-v2.vercel.app/apple-icon.jpg" alt="ACO Habitat" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    </div>
    <p>Bonjour <strong>${partner.nom_societe}</strong>,</p>
    
    <p>Votre inscription au réseau des partenaires exclusifs d'<strong>ACO Habitat</strong> est bien validée ! 🎉</p>
    
    <p>Je suis <strong>Monsieur Ousmani</strong>, dirigeant fondateur. J'ai bien noté votre secteur d'intervention (${partner.ville}). Dès que nous aurons des demandes de clients sérieux dans votre zone, vous serez les premiers prévenus par e-mail et SMS.</p>
    
    <p>💡 <strong>Un conseil très important :</strong></p>
    <p>Enregistrez tout de suite ma ligne directe dans votre répertoire : <strong style="color: #16a34a; font-size: 18px;">06 89 31 81 51</strong></p>
    <p>Cela vous permettra de me contacter rapidement pour récupérer un dossier prioritaire !</p>
    
    <p>À très bientôt pour vos premiers chantiers,</p>
    <br>
<table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; font-family: Arial, sans-serif; color: #333;">
  <tr>
    <td style="padding-right: 15px; vertical-align: top;">
      <img src="https://aco-machine-v2.vercel.app/monsieur-ousmani.jpg" alt="Monsieur Ousmani" width="80" height="80" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; display: block;">
    </td>
    <td style="vertical-align: top; border-left: 2px solid #16a34a; padding-left: 15px;">
      <strong style="color: #1e1e1e; font-size: 16px;">Monsieur Ousmani</strong><br>
      <span style="color: #666; font-size: 14px;">Dirigeant fondateur - ACO Habitat</span><br>
      <span style="color: #2563eb; font-size: 14px; font-weight: bold;">06 89 31 81 51</span>
    </td>
  </tr>
</table>
</div>`;

    try {
      await transporter.sendMail({
        from: '"ACO Habitat - Partenaires" <contact@aco-habitat.fr>',
        to: partner.email.toString(),
        subject: "Bienvenue dans le réseau partenaire ACO Habitat !",
        html: welcomeHtml,
      });
      
      // ALERTE ADMIN : Nouveau Partenaire Inscrit
      const adminAlertHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #3b82f6; border-radius: 8px;">
          <h2 style="color: #3b82f6;">🚨 NOUVEAU PARTENAIRE INSCRIT !</h2>
          <p>L'entreprise <strong>${partner.nom_societe}</strong> vient de s'inscrire sur la plateforme.</p>
          <ul>
              <li><strong>Ville :</strong> ${partner.code_postal} ${partner.ville}</li>
              <li><strong>Téléphone :</strong> ${partner.telephone}</li>
              <li><strong>Email :</strong> ${partner.email}</li>
              <li><strong>Spécialités :</strong> ${partner.specialites || "Non précisé"}</li>
          </ul>
          <p><em>Conseil : Appelez-les rapidement pour faire connaissance et valider leur sérieux !</em></p>
      </div>`;
      
      await transporter.sendMail({
        from: '"ACO Machine Alert" <contact@aco-habitat.fr>',
        to: process.env.EMAIL_USER,
        subject: `🚨 NOUVEAU PARTENAIRE : ${partner.nom_societe} (${partner.ville})`,
        html: adminAlertHtml,
      });

    } catch (e) {
      console.error("Erreur envoi email bienvenue ou alerte admin", e);
    }
  }

  revalidatePath("/");
}

export async function launchRecruitment(formData: FormData) {
  const codePostal = formData.get("code_postal") as string;
  const ville = formData.get("ville") as string;
  const probleme = formData.get("probleme") as string || "Traitement des bois";
  const leadId = formData.get("leadId") as string || "manuel";
  
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  
  // Appel asynchrone à la nouvelle route unifiée de recrutement
  fetch(`${baseUrl}/api/recrutement`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ leadId, ville, codePostal, probleme })
  }).catch(err => console.error("Erreur lancement recrutement asynchrone:", err));
  
  console.log(`🚀 Recrutement unifié lancé en arrière-plan pour : ${ville}`);
  
  revalidatePath("/");
}

export async function transferLead(formData: FormData) {
  const leadId = formData.get("leadId") as string;
  const partnerEmail = formData.get("partnerEmail") as string;
  const customEmail = formData.get("customEmail") as string;
  const targetEmail = customEmail || partnerEmail;
  
  if (!leadId || !targetEmail) return { error: "Paramètres manquants" };

  const allLeads = await db.getAll();
  const lead = allLeads.find((l: any) => l.id === leadId);
  if (!lead) return { error: "Lead introuvable" };

  try {
    const mailHtml = `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
<p>Bonjour,</p>
<p>Je suis <strong>Monsieur Ousmani</strong>, dirigeant de la société <a href="https://aco-habitat.fr" style="color: #2563eb; text-decoration: none;"><strong>ACO Habitat</strong></a>.</p>
<p>Suite à votre inscription ou à notre échange, je vous transfère les coordonnées complètes et exclusives d'un client pour un chantier de <strong>${lead.probleme}</strong> à <strong>${lead.ville}</strong>.</p>
<div style="background-color: #f3f4f6; padding: 20px; border-left: 4px solid #d4af37; border-radius: 4px; margin: 20px 0;">
  <h3 style="margin-top: 0; color: #1e1e1e;">Fiche Client</h3>
  <p><strong>Nom :</strong> ${lead.nom}</p>
  <p><strong>Téléphone :</strong> <a href="tel:${lead.telephone}" style="color: #2563eb; font-weight: bold;">${lead.telephone}</a></p>
  <p><strong>Email :</strong> ${lead.email || 'Non renseigné'}</p>
  <p><strong>Adresse :</strong> ${lead.adresse !== 'Inconnue' ? lead.adresse + ', ' : ''}${lead.ville}</p>
  <p><strong>Problème détecté :</strong> ${lead.probleme}</p>
</div>
<p>Ce client attend d'être contacté rapidement pour un diagnostic ou un devis. Merci de le prendre en charge dans les plus brefs délais.</p>
<br>
<p>Cordialement,</p>
<table style="margin-top: 15px;">
  <tr>
    <td style="padding-right: 15px;">
      <img src="https://aco-machine-v2.vercel.app/monsieur-ousmani.jpg" alt="Monsieur Ousmani" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
    </td>
    <td>
      <strong style="color: #1e1e1e; font-size: 16px;">Monsieur Ousmani</strong><br>
      <span style="color: #666; font-size: 14px;">Dirigeant fondateur - ACO Habitat</span><br>
      <span style="color: #2563eb; font-size: 14px; font-weight: bold;">02 33 31 19 79</span>
      <div style="margin-top: 15px;">
        <a href="https://aco-machine-v2.vercel.app/partenaires" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-size: 13px; font-weight: bold;">
          🤝 Devenir partenaire (Gratuit)
        </a>
      </div>
    </td>
  </tr>
</table>
</div>`;

    await transporter.sendMail({
        from: `"ACO LEADS" <${process.env.EMAIL_USER}>`,
        to: targetEmail,
        subject: `🚨 NOUVEAU CHANTIER : ${lead.probleme} à ${lead.ville} (ACO LEADS)`,
        html: mailHtml
    });

    // Mettre à jour le statut du lead
    lead.statut = 'VENDU';
    // Remove the old lead and save the updated one
    await db.delete(leadId);
    await db.save(lead);
    
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Erreur transfert lead:", err);
    return { error: "Erreur d'envoi de l'email" };
  }
}

export async function suggestNearbyHubsAction(ville: string) {
    return await suggestNearbyHubsAI(ville);
}
