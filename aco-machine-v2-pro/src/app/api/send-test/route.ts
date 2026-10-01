import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const artisan = { nom_societe: "Entreprise Dupont Bois" };
  const infos = { probleme: "Traitement des bois", ville: "Nantes" };
  const paymentLink = { url: "https://buy.stripe.com/test_12345" }; // Faux lien
  
  const mailHtml = `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://aco-machine-v2.vercel.app/apple-icon.jpg" alt="Monsieur Ousmani - ACO Habitat" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    </div>
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

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Monsieur Ousmani - ACO Habitat" <${process.env.EMAIL_USER}>`,
      to: "kemal.ousmani@wanadoo.fr",
      subject: `🤝 Transfert de chantier : ${infos.probleme} sur ${infos.ville} (Client qualifié)`,
      html: mailHtml
    });

    return NextResponse.json({ success: true, message: "Email envoyé à kemal.ousmani@wanadoo.fr" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
