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
            <Link href="/" className={styles.brand}>DIAGNOSTIC-BOIS<span style={{ color: '#10b981' }}>.COM</span></Link>
            <div className={styles.headerContact}>
              <a href="tel:+33233311979" className={styles.headerPhone}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                02 33 31 19 79
              </a>
              <a href="mailto:aco.habitat@orange.fr" className={styles.headerEmail}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                aco.habitat@orange.fr
              </a>
            </div>
            <Link href="/" className={styles.backLink}>
              ← Retour
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
              © 2026 ACO-HABITAT — DIAGNOSTIC-BOIS.COM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
