import Link from "next/link";
import { DiagnosticUpload } from "@/components/DiagnosticUpload";
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
          <Link href="#formulaire" className={styles.ctaBtn}>
            Analyser mes photos
          </Link>
        </div>
      </header>

      {children}

      <section id="formulaire" className={styles.leadSection}>
        <div className={styles.leadInner}>
          <span className={styles.leadBadge}>Pré-analyse gratuite par IA</span>
          <h2 className={styles.leadTitle}>Un doute sur votre bois ? Obtenez une première analyse</h2>
          <p className={styles.leadSubtitle}>
            Chargez vos photos et renseignez vos coordonnées : notre système vous transmet une pré-analyse
            informative, puis un expert ACO-HABITAT vous recontacte pour un diagnostic approfondi.
          </p>
          <DiagnosticUpload />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <h4>Pathologies du bois</h4>
            <Link href="/guide/merule">La merule</Link>
            <Link href="/guide/capricorne">Le capricorne</Link>
            <Link href="/guide/termites">Les termites</Link>
            <Link href="/guide/vrillettes">Les vrillettes</Link>
            <Link href="/guide/lyctus">Le lyctus</Link>
            <Link href="/guide/pourriture-cubique">Pourriture cubique</Link>
            <Link href="/guide/humidite">Problemes humidite</Link>
            <Link href="/guide/reconnaitre-les-pathologies">Reconnaitre les signes</Link>
            <Link href="/guide/merule-obligations-legales">Merule : obligations legales</Link>
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
            <h4>Calvados (14)</h4>
            <Link href="/guide/diagnostic-bois-calvados">Diagnostic bois Calvados</Link>
            <Link href="/guide/diagnostic-bois-caen">Caen</Link>
            <Link href="/guide/diagnostic-bois-falaise">Falaise</Link>
            <Link href="/guide/diagnostic-bois-conde-en-normandie">Conde-en-Normandie</Link>
            <Link href="/guide/diagnostic-bois-vire">Vire Normandie</Link>
            <Link href="/guide/diagnostic-bois-lisieux">Lisieux</Link>
            <Link href="/guide/diagnostic-bois-bayeux">Bayeux</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Informations</h4>
            <Link href="/guide/qui-sommes-nous">Qui sommes-nous</Link>
            <Link href="/guide/notre-savoir-faire">Notre savoir-faire</Link>
            <Link href="/guide/traitement-du-bois">Le traitement du bois</Link>
            <Link href="/guide/faq">FAQ</Link>
            <Link href="/cgv">CGV</Link>
            <Link href="/mentions-legales">Mentions legales</Link>
            <Link href="/confidentialite">Confidentialite</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <a href="tel:+33233311979" className={styles.footerLink}>
              02 33 31 19 79
            </a>
            <a href="mailto:aco.habitat@orange.fr" className={styles.footerLink}>
              aco.habitat@orange.fr
            </a>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, margin: "8px 0 0 0" }}>
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
