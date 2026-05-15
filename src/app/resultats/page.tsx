import Link from "next/link";
import styles from "./page.module.css";

type ResultatsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResultatsPage({ searchParams }: ResultatsPageProps) {
  const params = await searchParams;
  const rawSessionId = params.sessionId;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <span className={styles.logoText}>ACO-HABITAT</span>
            <span className={styles.statusBadge}>ANALYSE TERMINÉE</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.alertCard}>
            <div className={styles.alertContent}>
              <h2 className={styles.alertTitle}>SYNTHÈSE DE L&apos;ANALYSE</h2>
              <p className={styles.alertText}>
                Le tunnel mock est terminé. Les données sont simulées pour valider le
                flux applicatif de bout en bout.
              </p>
            </div>
          </div>

          <div className={styles.resultsCard}>
            <h1 className={styles.title}>RAPPORT D&apos;INSPECTION PAR IMAGE</h1>
            <p className={styles.subtitle}>
              ID SESSION : {sessionId ?? "session indisponible"}
            </p>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>STATUT PIPELINE</span>
                <span className={styles.summaryValue}>TERMINÉ</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>MODE</span>
                <span className={`${styles.summaryValue} ${styles.riskHigh}`}>MOCK</span>
              </div>
            </div>

            <div className={styles.features}>
              <h4 className={styles.featuresTitle}>ÉTAT DU VERTICAL SLICE :</h4>
              <ul className={styles.featuresList}>
                <li>Upload de 4 photos validé avec Zod</li>
                <li>Création de session via API Route</li>
                <li>Polling de statut jusqu&apos;à completion</li>
                <li>Transition automatique vers la page de résultats</li>
              </ul>
            </div>

            <div className={styles.paymentBox}>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>PROCHAINE ÉTAPE :</span>
                <span className={styles.priceValue}>IA RÉELLE</span>
              </div>

              <Link href="/diagnostic" className="btn btn-primary" style={{ marginBottom: "16px" }}>
                Relancer une analyse
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
