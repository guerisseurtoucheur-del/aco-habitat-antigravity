---
description: Design standard et professionnel à utiliser pour tous les emails envoyés par l'application ACO Machine.
---

# Règle de Design des E-mails

Tous les emails envoyés par l'application (aux artisans, partenaires, etc.) doivent IMPÉRATIVEMENT utiliser le design HTML suivant, ou s'en inspirer très fortement pour garder une cohérence visuelle.

## Structure Obligatoire
- Police lisible et professionnelle (Arial, sans-serif, 15px).
- Introduction systématique par : "Je suis Monsieur Ousmani, dirigeant de la société ACO Habitat..." pour asseoir l'autorité.
- Les appels à l'action doivent TOUJOURS être sous forme de **gros boutons HTML colorés et cliquables**, centrés, occupant environ 80% de la largeur sur mobile.

## Modèle de Base HTML

```html
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
    <p>Bonjour <strong>[Nom]</strong>,</p>
    
    <p>Je suis <strong>Monsieur Ousmani</strong>, dirigeant de la société <a href="https://aco-habitat.fr" style="color: #2563eb; text-decoration: none;"><strong>ACO Habitat</strong></a>. Nous sommes des experts historiques du traitement des bois et de la mérule sur le Grand Ouest (depuis 2006).</p>
    
    <p>[Texte du message, clair, avec les informations importantes en <strong>gras</strong> (et en <strong style="color: #dc2626;">rouge</strong> pour l'urgence si nécessaire)].</p>
    
    <br>
    
    <div style="text-align: center; margin: 30px 0;">
        <!-- Bouton d'Action Principal (Bleu) -->
        <a href="[LIEN]" style="background-color: #2563eb; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; margin-bottom: 10px; width: 80%;">
            🔍 [Texte Bouton Action]
        </a><br>
        
        <!-- Bouton Secondaire (Vert) -->
        <a href="https://aco-habitat.fr" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block; width: 80%;">
            🏢 Visiter notre site institutionnel
        </a>
    </div>

    <br>
    <p>Cordialement,</p>
    <p><strong>Monsieur Ousmani - Dirigeant ACO Habitat</strong><br>
    02 33 31 19 79</p>
</div>
```

**Ne jamais envoyer d'emails en texte brut ou avec de simples liens hypertextes. Toujours utiliser ce format de boutons.**
