import Link from "next/link";
import styles from "./guide.module.css";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logoText}>
            <div className={styles.logoWrap}>
              <span className={styles.logoText}>DIAGNOSTIC-BOIS<span className={styles.logoDotCom}>.COM</span></span>
              <span className={styles.logoSub}>par ACO-HABITAT</span>
            </div>
          </Link>
          <Link href="/#formulaire" className={styles.ctaBtn}>
            Analyser mes photos
          </Link>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <h4>Pathologies du bois</h4>
            <Link href="/guide/merule">La merule</Link>
            <Link href="/guide/capricorne">Le capricorne</Link>
            <Link href="/guide/termites">Les termites</Link>
            <Link href="/guide/vrillettes">Les vrillettes</Link>
            <Link href="/guide/humidite">Problemes humidite</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Diagnostic par region</h4>
            <Link href="/guide/diagnostic-bois-normandie">Normandie</Link>
            <Link href="/guide/diagnostic-bois-bretagne">Bretagne</Link>
            <Link href="/guide/diagnostic-bois-ile-de-france">Ile-de-France</Link>
            <Link href="/guide/diagnostic-bois-pays-de-la-loire">Pays de la Loire</Link>
            <Link href="/guide/diagnostic-bois-nouvelle-aquitaine">Nouvelle-Aquitaine</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Informations</h4>
            <Link href="/cgv">CGV</Link>
            <Link href="/mentions-legales">Mentions legales</Link>
            <Link href="/confidentialite">Confidentialite</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, margin: 0 }}>
              ACO-HABITAT<br/>
              18 Rue Bernard Palissy<br/>
              61000 Alencon<br/>
              SIRET: 344 616 412 00062
            </p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>
            © 2026 ACO-HABITAT — DIAGNOSTIC-BOIS.COM — Tous droits reserves
          </p>
        </div>
      </footer>
    </div>
  );
}
