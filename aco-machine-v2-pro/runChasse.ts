import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function chasserFutursPartenaires(ville: string) {
  console.log(`\n🔍 [RECRUTEMENT IA] Recherche de spécialistes à : ${ville}...`);
  const promptRecherche = `
    Trouve 5 à 10 sociétés EXPERTES ET ULTRA-SPÉCIALISÉES en traitement des bois, charpente, mérule, et insectes xylophages à ${ville}.
    ATTENTION DIRECTIVE CRITIQUE : INTERDICTION ABSOLUE de ramener des couvreurs, des charpentiers classiques, des maçons ou des plombiers. S'ils font de la couverture ou de la charpente générale, TU LES IGNORES. Uniquement les spécialistes en traitement (insectes, champignons).
    Format strict JSON : [{"nom_societe": "...", "email": "...", "telephone": "...", "ville": "..."}]
    Si tu ne trouves pas l'email exact, déduis-le logiquement. Ne laisse jamais le champ email vide.
    Ne renvoie QUE le JSON, sans aucun autre texte.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptRecherche,
      config: { tools: [{ googleSearch: {} }], temperature: 0.2 }
    });
    let texteReponse = response.text || "[]";
    texteReponse = texteReponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(texteReponse);
  } catch (error) {
    console.error("❌ Erreur pendant le recrutement IA :", error);
    return [];
  }
}

async function run() {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });

    for (const ville of ["44000 Nantes", "33000 Bordeaux"]) {
        const artisans = await chasserFutursPartenaires(ville);
        console.log(`✅ ${artisans.length} entreprises ultra-spécialisées trouvées sur ${ville}.`);
        
        for (let artisan of artisans) {
            console.log(`📩 Envoi de l'invitation à : ${artisan.nom_societe} (${artisan.email})`);
            const mailHtml = `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
<p>Bonjour <strong>${artisan.nom_societe}</strong>,</p>
<p>Je suis <strong>Monsieur Ousmani</strong>, dirigeant de la société <a href="https://aco-habitat.fr" style="color: #2563eb; text-decoration: none;"><strong>ACO Habitat</strong></a> (experts du traitement des bois et de la mérule depuis 2006).</p>
<p>Nous recevons régulièrement des demandes de clients qualifiés sur <strong>${ville}</strong> et ses environs. Actuellement, nous n'avons pas de partenaire de confiance sur votre secteur pour sous-traiter ces chantiers.</p>
<p>Votre profil nous intéresse. <strong>L'inscription à notre réseau de partenaires exclusifs est 100% gratuite.</strong></p>
<p>Une fois inscrit, vous recevrez en priorité (avant les autres entreprises) des alertes dès qu'un nouveau chantier est disponible dans votre ville.</p>
<br>
<div style="text-align: center; margin: 30px 0;">
  <a href="https://aco-machine-v2.vercel.app/partenaires" style="background-color: #2563eb; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
      🤝 S'inscrire au réseau VIP (Gratuit)
  </a>
</div>
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
      <span style="color: #2563eb; font-size: 14px; font-weight: bold;">06 89 31 81 51</span>
      <div style="margin-top: 15px;">
        <a href="https://aco-machine-v2.vercel.app/partenaires" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-size: 13px; font-weight: bold;">
          🤝 Devenir partenaire (Gratuit)
        </a>
      </div>
    </td>
  </tr>
</table>
</div>`;
            try {
                await transporter.sendMail({
                    from: '"Monsieur Ousmani - ACO Habitat" <contact@aco-habitat.fr>',
                    to: artisan.email,
                    subject: `🤝 Invitation Réseau Partenaires : Recevez nos chantiers sur ${ville}`,
                    html: mailHtml
                });
            } catch(e) { console.error(`❌ Échec pour ${artisan.email}`); }
        }
    }
    console.log("\\n🎉 MISSION TERMINEE !");
}

run();
