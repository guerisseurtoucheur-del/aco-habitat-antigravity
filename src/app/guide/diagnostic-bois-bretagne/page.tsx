import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois en Bretagne : merule, capricorne | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Bretagne (Finistere, Cotes-d'Armor, Morbihan, Ille-et-Vilaine). 1ere region touchee par la merule en France. Pre-analyse par photo.",
  keywords: ["diagnostic bois bretagne", "merule bretagne", "merule finistere", "diagnostic charpente rennes", "traitement bois brest"],
};

export default function BretagnePage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Bretagne
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Bretagne</h1>
          <p className={styles.articleMeta}>Finistere · Cotes-d&apos;Armor · Morbihan · Ille-et-Vilaine</p>
        </header>

        <div className={styles.articleContent}>
          <h2>La Bretagne : capitale francaise de la merule</h2>
          <p>
            La Bretagne detient le triste record de <strong>region la plus touchee par la merule</strong> en France. 
            Le Finistere a lui seul concentre une part importante des cas recenses nationalement.
          </p>
          <p>
            Le climat oceanique tres humide, combine a un parc immobilier ancien souvent construit en granit 
            (pierre froide favorisant la condensation), cree un environnement propice au champignon.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Zones a risque declarees</p>
            <p className={styles.alertText}>
              De nombreuses communes bretonnes font l&apos;objet d&apos;arretes prefectoraux. A Brest, Quimper, 
              Morlaix, Lorient, et dans de nombreuses villes, l&apos;information merule est obligatoire lors 
              d&apos;une vente.
            </p>
          </div>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Merule</strong> — Pathologie numero 1, presente dans toute la region</li>
            <li><strong>Coniophore</strong> — Autre champignon lignivore frequent</li>
            <li><strong>Capricorne</strong> — Dans les charpentes resineux</li>
            <li><strong>Humidite</strong> — Probleme endemique lie au climat</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Finistere (29)</strong> — Brest, Quimper, Morlaix, Landerneau, Concarneau</li>
            <li><strong>Cotes-d&apos;Armor (22)</strong> — Saint-Brieuc, Lannion, Guingamp, Dinan</li>
            <li><strong>Morbihan (56)</strong> — Lorient, Vannes, Pontivy, Auray</li>
            <li><strong>Ille-et-Vilaine (35)</strong> — Rennes, Saint-Malo, Fougeres, Vitre</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes en Bretagne ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos pour une pre-analyse adaptee aux pathologies locales.
            </p>
            <Link href="/diagnostic/nouveau" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>En savoir plus</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/merule" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>La merule</p>
                <p className={styles.relatedCardDesc}>Guide complet sur le champignon le plus destructeur.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-normandie" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Normandie</p>
                <p className={styles.relatedCardDesc}>Region voisine egalement touchee.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
