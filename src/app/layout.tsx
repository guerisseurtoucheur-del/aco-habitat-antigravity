import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ACO-HABITAT — Pré-analyse bois et humidité par image",
  description:
    "Pré-analyse gratuite par image sur les pathologies du bois (mérule, insectes xylophages, humidité). Rapport PDF par IA en quelques minutes. Pour qualification et orientation vers une intervention professionnelle. Document non opposable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
