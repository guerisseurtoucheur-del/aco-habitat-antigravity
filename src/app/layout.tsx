import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ACO-HABITAT — Diagnostic Bois, Mérule & Humidité par IA (Pré-analyse Gratuite)",
  description:
    "Spécialiste de la détection de la mérule, des termites, capricornes et insectes xylophages. Pré-analyse gratuite en 3 minutes par IA sur photo. Intervention Orne 61, Calvados 14, Mayenne 53, Eure 27, Eure-et-Loir 28, Sarthe 72.",
  keywords: [
    "diagnostic bois gratuit",
    "mérule pleureuse",
    "traitement charpente",
    "capricorne des maisons",
    "vrillette bois",
    "termites",
    "humidite charpente",
    "ACO-HABITAT",
    "diagnostic bois Normandie",
    "Alençon",
  ],
  authors: [{ name: "ACO-HABITAT" }],
  openGraph: {
    title: "ACO-HABITAT — Diagnostic Bois, Mérule & Humidité par IA",
    description: "Envoyez vos photos pour détecter la mérule, les capricornes ou l'humidité en 3 minutes. Rapport d'expert assisté par IA.",
    url: "https://diagnostic-bois.com",
    siteName: "ACO-HABITAT",
    images: [
      {
        url: "https://diagnostic-bois.com/logo.png",
        width: 800,
        height: 600,
        alt: "ACO-HABITAT Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://diagnostic-bois.com/#organization",
        "name": "DIAGNOSTIC-BOIS.COM",
        "alternateName": "ACO-HABITAT",
        "url": "https://diagnostic-bois.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://diagnostic-bois.com/logo.png"
        },
        "image": "https://diagnostic-bois.com/og-image.png",
        "sameAs": [],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "18 Rue Bernard Palissy",
          "addressLocality": "Alencon",
          "postalCode": "61000",
          "addressCountry": "FR"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+33-2-33-31-19-79",
            "email": "aco.habitat@orange.fr",
            "contactType": "customer service",
            "availableLanguage": "French",
            "areaServed": "FR"
          },
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "availableLanguage": "French",
            "areaServed": "FR",
            "contactOption": "TollFree",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "description": "Assistant virtuel disponible 24h/24 et 7j/7 pour repondre a vos questions sur les pathologies du bois"
          }
        ],
        "telephone": "+33-2-33-31-19-79",
        "email": "aco.habitat@orange.fr",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://diagnostic-bois.com/#website",
        "url": "https://diagnostic-bois.com",
        "name": "DIAGNOSTIC-BOIS.COM",
        "publisher": { "@id": "https://diagnostic-bois.com/#organization" },
        "inLanguage": "fr-FR"
      },
      {
        "@type": "Service",
        "@id": "https://diagnostic-bois.com/#service",
        "name": "Pre-analyse bois et humidite par IA",
        "description": "Analyse de photos pour detecter les pathologies du bois : merule, capricorne, termites, vrillettes, humidite. Rapport detaille en quelques minutes.",
        "provider": { "@id": "https://diagnostic-bois.com/#organization" },
        "serviceType": "Diagnostic bois",
        "image": "https://diagnostic-bois.com/og-image.png",
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Pre-analyse gratuite"
        }
      }
    ]
  };

  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
