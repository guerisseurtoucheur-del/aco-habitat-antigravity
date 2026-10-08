export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://diagnostic-bois.com/#organization",
    "name": "ACO-HABITAT",
    "url": "https://diagnostic-bois.com",
    "logo": "https://diagnostic-bois.com/logo.png",
    "image": "https://diagnostic-bois.com/logo.png",
    "description": "Spécialiste de la pré-analyse et du traitement des pathologies du bois (mérule pleureuse, insectes xylophages, capricornes, vrillettes, termites, humidité).",
    "telephone": "+33233000000",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "18 rue Bernard Palissy",
      "addressLocality": "Alençon",
      "postalCode": "61000",
      "addressRegion": "Normandie",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.432,
      "longitude": 0.091
    },
    "taxID": "FR65344616412",
    "vatID": "FR65344616412",
    "iso6523Code": "34461641200062",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Orne (61)" },
      { "@type": "AdministrativeArea", "name": "Calvados (14)" },
      { "@type": "AdministrativeArea", "name": "Mayenne (53)" },
      { "@type": "AdministrativeArea", "name": "Eure (27)" },
      { "@type": "AdministrativeArea", "name": "Eure-et-Loir (28)" },
      { "@type": "AdministrativeArea", "name": "Sarthe (72)" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "142",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pré-analyse Bois et Traitement Mérule IA",
    "serviceType": "Diagnostic Charpente, Mérule et Insectes Xylophages",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ACO-HABITAT"
    },
    "areaServed": "FR",
    "description": "Pré-analyse gratuite par intelligence artificielle multimodale pour identifier les traces de mérule, capricornes, vrillettes et fuites d'humidité sur vos bois de charpente.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://diagnostic-bois.com/#diagnostic-upload"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment détecter la présence de mérule dans une maison ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La mérule pleureuse (Serpula lacrymans) se reconnaît à son développement cotonneux blanc ou gris, ses filaments (syrrotes) cassants, la dégradation cubique du bois et une forte odeur de sous-bois. Notre outil de pré-analyse par IA examine vos photos gratuitement en 3 minutes pour vous alerter immédiatement."
        }
      },
      {
        "@type": "Question",
        "name": "La pré-analyse bois en ligne est-elle gratuite ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! Le dépôt de vos photos et le premier diagnostic assisté par IA sont 100% gratuits. Le déblocage du dossier complet PDF certifié est proposé au tarif unique de 19€."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la zone d'intervention d'ACO-HABITAT ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ACO-HABITAT intervient directement dans les départements de l'Orne (61), du Calvados (14), de la Mayenne (53), de l'Eure (27), de l'Eure-et-Loir (28) et de la Sarthe (72). Les demandes hors secteur sont orientées automatiquement vers nos partenaires certifiés."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les insectes xylophages les plus dangereux pour la charpente ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le capricorne des maisons (Hylotrupes bajulus), la petite vrillette, la grosse vrillette et les termites causent d'importants dégâts structurels dans les bois d'œuvre s'ils ne sont pas traités à temps avec des injections de fongicide et d'insecticide."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Diagnostic IA Bois & Humidité ACO-HABITAT",
    "url": "https://diagnostic-bois.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "EUR"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
