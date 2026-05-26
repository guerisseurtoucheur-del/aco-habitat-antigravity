import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Nouvelle-Aquitaine : termites, capricorne | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Nouvelle-Aquitaine (Gironde, Landes, Charente). 1ere region termites de France. Pre-analyse par photo.",
  keywords: ["diagnostic bois nouvelle aquitaine", "termites gironde", "termites bordeaux", "diagnostic bois landes", "capricorne aquitaine"],
};

export default function NouvelleAquitainePage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Nouvelle-Aquitaine
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Nouvelle-Aquitaine</h1>
          <p className={styles.articleMeta}>Gironde · Landes · Charente · Charente-Maritime · Dordogne · Lot-et-Garonne</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Nouvelle-Aquitaine : 1ere region termites</h2>
          <p>
            La Nouvelle-Aquitaine est la <strong>region la plus touchee par les termites</strong> en France. 
            La Gironde et les Landes concentrent a elles seules une part majeure des infestations nationales.
          </p>
          <p>
            Le climat doux et humide du sud-ouest favorise le developpement des colonies de termites souterrains, 
            qui peuvent atteindre plusieurs millions d&apos;individus.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Diagnostic termites obligatoire</p>
            <p className={styles.alertText}>
              Dans toute la Gironde, les Landes, la Charente-Maritime et une grande partie de la region, 
              le diagnostic termites est obligatoire pour toute vente immobiliere.
            </p>
          </div>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Termites</strong> — Risque majeur dans toute la region</li>
            <li><strong>Capricorne</strong> — Frequent dans les charpentes des maisons landaises</li>
            <li><strong>Merule</strong> — Plus rare qu&apos;en Bretagne mais presente dans les zones humides</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Gironde (33)</strong> — Bordeaux, Arcachon, Libourne, Merignac</li>
            <li><strong>Landes (40)</strong> — Mont-de-Marsan, Dax, Biscarrosse</li>
            <li><strong>Charente-Maritime (17)</strong> — La Rochelle, Rochefort, Saintes</li>
            <li><strong>Charente (16)</strong> — Angouleme, Cognac</li>
            <li><strong>Dordogne (24)</strong> — Perigueux, Bergerac</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes en Nouvelle-Aquitaine ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos pour une pre-analyse des risques termites et autres pathologies.
            </p>
            <Link href="/diagnostic/nouveau" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>En savoir plus</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/termites" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Les termites</p>
                <p className={styles.relatedCardDesc}>Guide complet sur la detection et le traitement des termites.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-pays-de-la-loire" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Pays de la Loire</p>
                <p className={styles.relatedCardDesc}>Region voisine egalement touchee par les termites.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
