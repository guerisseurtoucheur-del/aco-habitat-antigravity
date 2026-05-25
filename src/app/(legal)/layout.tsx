import Link from "next/link";
import type { Metadata } from "next";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Informations légales — DIAGNOSTIC-BOIS",
  description:
    "Mentions légales, conditions générales de vente, politique de confidentialité et cookies du service de pré-analyse par image DIAGNOSTIC-BOIS.",
  robots: { index: true, follow: true },
};

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cookies", label: "Cookies" },
] as const;

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.headerInner}>
            <span className={styles.brand}>DIAGNOSTIC-BOIS</span>
            <Link href="/" className={styles.backLink}>
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.wrapper}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <div className={styles.footerInner}>
            <nav className={styles.footerLinks} aria-label="Navigation légale">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
              <Link href="/" className={styles.footerLink}>
                Accueil
              </Link>
            </nav>
            <p className={styles.footerCopy}>
              © 2026 DIAGNOSTIC-BOIS — Service de pré-analyse par image
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
