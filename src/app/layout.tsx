import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DIAGNOSTIC-BOIS — Pre-analyse bois et humidite par IA",
  description:
    "Pre-analyse gratuite par image des pathologies du bois (merule, capricorne, termites, humidite). Rapport detaille par IA en quelques minutes. Service de qualification avant intervention professionnelle.",
  keywords: ["diagnostic bois", "merule", "capricorne", "termites", "humidite", "charpente", "traitement bois", "expertise bois"],
  authors: [{ name: "Diagnostic-Bois.com" }],
  creator: "Diagnostic-Bois.com",
  publisher: "Diagnostic-Bois.com",
  metadataBase: new URL("https://diagnostic-bois.com"),
  alternates: {
    canonical: "/",
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
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "French"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
