const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aco.habitat.contact@gmail.com',
        pass: 'qczwydyrhaypzydt'
    }
});

const mailOptions = {
    from: '"Site Web ACO Habitat" <aco.habitat.contact@gmail.com>',
    to: 'aco.habitat.contact@gmail.com',
    subject: 'Nouveau message de contact - lead a revendre',
    text: `Nouveau message de contact
mardi 29 septembre 2026 a 20:30
DEMANDE HORS ZONE - lead a revendre (dept. 07)

Nom: Nathalie Dang
Email: nathaliekimlandang@gmail.com
Telephone: 0781197815
Adresse: 240 impasse de Serrettes
Ville: 07190 Saint Etienne de Serre
Departement: 07
Service: Charpente

MESSAGE:
RAPPORT D'ANALYSE IA. Probleme: Vrillette. Gravite: 55/100 (eleve). 3 photo(s) analysee(s). Paiement rapport complet pas encore finalise.`,
    html: `
    <div style="font-family: sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a1a1a; color: #00e5ff; padding: 15px; text-align: center;">
            <h2 style="margin: 0;">Nouveau message de contact</h2>
            <p style="color: #888; font-size: 12px; margin-top: 5px;">mardi 29 septembre 2026 a 20:30</p>
        </div>
        <div style="background-color: #c0392b; color: white; padding: 10px; text-align: center; font-weight: bold; font-size: 14px;">
            DEMANDE HORS ZONE - lead a revendre (dept. 07)
        </div>
        <div style="padding: 20px;">
            <p><strong>Nom</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nathalie Dang</p>
            <p><strong>Email</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="mailto:nathaliekimlandang@gmail.com">nathaliekimlandang@gmail.com</a></p>
            <p><strong>Telephone</strong> &nbsp;&nbsp; <a href="tel:0781197815">0781197815</a></p>
            <p><strong>Adresse</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#">240 impasse de Serrettes</a></p>
            <p><strong>Ville</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 07190 Saint Etienne de Serre</p>
            <p><strong>Departement</strong> <span style="color: #00e5ff;">07</span></p>
            <p><strong>Service</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Charpente</p>
            
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-top: 20px; background-color: #f9f9f9;">
                <p style="color: #888; font-size: 10px; margin: 0 0 10px 0; text-transform: uppercase;">Message</p>
                <p style="margin: 0; font-size: 14px;">RAPPORT D'ANALYSE IA. Probleme: Vrillette. Gravite: 55/100 (eleve). 3 photo(s) analysee(s). Paiement rapport complet pas encore finalise.</p>
            </div>
        </div>
    </div>
    `
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Faux prospect envoyé avec succès !');
    }
});
