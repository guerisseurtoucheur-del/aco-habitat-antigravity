import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import ChatBot from "@/components/ChatBot";
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
