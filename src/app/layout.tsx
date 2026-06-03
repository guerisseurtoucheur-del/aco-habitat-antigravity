import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DIAGNOSTIC-BOIS — Pre-analyse bois et humidite par IA",
  description:
    "Pre-analyse gratuite par image des pathologies du bois (merule, capricorne, termites, humidite). Rapport detaille par IA en quelques minutes. Assistant en ligne 24h/24 pour repondre a vos questions.",
  keywords: ["diagnostic bois", "merule", "capricorne", "termites", "humidite", "charpente", "traitement bois", "expertise bois", "chatbot", "assistance 24h/24"],
  authors: [{ name: "Diagnostic-Bois.com" }],
  creator: "Diagnostic-Bois.com",
  publisher: "Diagnostic-Bois.com",
  metadataBase: new URL("https://diagnostic-bois.com"),
  alternates: {
    canonical: "/",
  },
  other: {
    "ai:description": "Service francais de pre-analyse des pathologies du bois par intelligence artificielle. Detection de merule, capricorne, termites, vrillettes et problemes d'humidite. Rapport PDF gratuit en quelques minutes. Assistant virtuel disponible 24h/24 et 7j/7 pour repondre a toutes vos questions.",
    "ai:site-type": "service, educational, chatbot",
    "ai:industry": "construction, renovation, expertise-bois",
    "ai:geographic-focus": "France",
    "ai:language": "fr-FR",
    "ai:features": "chatbot-24h, analyse-ia, rapport-pdf-gratuit",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://diagnostic-bois.com",
    siteName: "Diagnostic-Bois.com",
    title: "DIAGNOSTIC-BOIS — Pre-analyse bois et humidite par IA",
    description: "Pre-analyse gratuite par image des pathologies du bois. Rapport detaille par IA en quelques minutes.",
    images: [
      {
        url: "/icon-512.jpg",
        width: 512,
        height: 512,
        alt: "Diagnostic-Bois.com",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "DIAGNOSTIC-BOIS — Pre-analyse bois et humidite par IA",
    description: "Pre-analyse gratuite par image des pathologies du bois. Rapport detaille par IA en quelques minutes.",
    images: ["/icon-512.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f766e",
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
        "email": "aco.habitat@orange.fr"
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
        <link rel="author" href="https://diagnostic-bois.com" />
        <link rel="me" href="mailto:aco.habitat@orange.fr" />
        <meta name="geo.region" content="FR-61" />
        <meta name="geo.placename" content="Alencon" />
        <meta name="geo.position" content="48.4333;0.0833" />
        <meta name="ICBM" content="48.4333, 0.0833" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
