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
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <header className="w-full bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-center">
            <img src="/logo.png" alt="ACO-HABITAT Logo" className="h-12 w-auto object-contain" />
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
