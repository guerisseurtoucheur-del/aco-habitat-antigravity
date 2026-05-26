'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function SuccesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <div className={styles.logoWrap}>
              <span className={styles.logoText}>DIAGNOSTIC-BOIS<span className={styles.logoDotCom}>.COM</span></span>
              <span className={styles.logoSub}>par ACO-HABITAT</span>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h1 className={styles.title}>Analyse terminée</h1>
            <p className={styles.subtitle}>
              Merci pour votre confiance. Votre rapport de pré-analyse est prêt à être
              consulté ou partagé.
            </p>

            <div className={styles.docBox}>
              <div className={styles.docIcon}>📄</div>
              <div className={styles.docInfo}>
                <div className={styles.docName}>Rapport_DIAGNOSTIC-BOIS.pdf</div>
                <div className={styles.docMeta}>Document horodaté et signé cryptographiquement</div>
              </div>
            </div>

            <button className="btn btn-green" onClick={() => window.print()} style={{ marginBottom: '16px' }}>
              Télécharger le rapport PDF
            </button>

            <div className={styles.nextSteps}>
              <h3 className={styles.nextTitle}>Prochaines étapes conseillées :</h3>
              <ul className={styles.nextList}>
                <li>1. Envoyez ce PDF à votre assureur pour ouvrir un dossier.</li>
                <li>2. Contactez un professionnel certifié pour un devis de traitement.</li>
                <li>3. Surveillez l&apos;évolution des zones annotées dans le rapport.</li>
              </ul>
            </div>

            <Link href="/" className="btn btn-outline">
              Retour à l&apos;accueil
            </Link>
          </div>

          <div className={styles.supportBox}>
            <p>Un problème avec votre téléchargement ?</p>
            <Link href="mailto:aco.habitat@orange.fr" className={styles.supportLink}>
              Contactez notre assistance technique
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <nav className={styles.legalNav} aria-label="Liens légaux">
            <Link href="/mentions-legales" className={styles.legalLink}>Mentions légales</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/cgv" className={styles.legalLink}>CGV</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/confidentialite" className={styles.legalLink}>Confidentialité</Link>
            <span className={styles.legalSep} aria-hidden="true">·</span>
            <Link href="/cookies" className={styles.legalLink}>Cookies</Link>
          </nav>
          <p>© 2026 DIAGNOSTIC-BOIS — Inspection par image</p>
        </div>
      </footer>
    </div>
  );
}
