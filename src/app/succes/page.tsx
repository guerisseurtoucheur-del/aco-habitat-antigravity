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
