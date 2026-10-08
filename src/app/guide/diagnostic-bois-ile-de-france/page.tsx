import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois en Ile-de-France : Paris, 92, 93, 94 | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Ile-de-France et Paris. Merule en expansion, termites detectes. Pre-analyse par photo pour appartements et maisons.",
  keywords: ["diagnostic bois paris", "diagnostic bois ile de france", "merule paris", "termites paris", "diagnostic charpente 92 93 94"],
};

export default function IleDeFrancePage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Ile-de-France
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Ile-de-France</h1>
          <p className={styles.articleMeta}>Paris · Hauts-de-Seine · Seine-Saint-Denis · Val-de-Marne · Grande couronne</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Situation en Ile-de-France</h2>
          <p>
            L&apos;Ile-de-France n&apos;est pas epargnee par les pathologies du bois. La <strong>merule</strong> est 
            en expansion dans les immeubles anciens parisiens, notamment dans les caves et parties communes humides.
          </p>
          <p>
            Les <strong>termites</strong> sont egalement presents, avec des zones declarees dans plusieurs 
            arrondissements de Paris et communes de petite couronne.
          </p>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Paris : double risque</p>
            <p className={styles.alertText}>
              Paris fait partie des zones termites ET connait une progression de la merule dans les immeubles 
              haussmanniens. Un diagnostic est vivement recommande avant tout achat.
            </p>
          </div>

          <h2>Pathologies frequentes</h2>
          <ul>
            <li><strong>Merule</strong> — En progression dans le bati ancien humide</li>
            <li><strong>Termites</strong> — Zones declarees dans Paris et petite couronne</li>
            <li><strong>Capricorne</strong> — Dans les pavillons de banlieue</li>
            <li><strong>Vrillettes</strong> — Parquets et boiseries des immeubles anciens</li>
          </ul>

          <h2>Zones couvertes</h2>
          <ul>
            <li><strong>Paris (75)</strong> — Tous arrondissements</li>
            <li><strong>Hauts-de-Seine (92)</strong> — Boulogne, Neuilly, Nanterre, Courbevoie</li>
            <li><strong>Seine-Saint-Denis (93)</strong> — Montreuil, Saint-Denis, Bobigny</li>
            <li><strong>Val-de-Marne (94)</strong> — Creteil, Vincennes, Champigny</li>
            <li><strong>Grande couronne</strong> — Yvelines, Essonne, Val-d&apos;Oise, Seine-et-Marne</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes en Ile-de-France ?</h3>
            <p className={styles.ctaBoxText}>
              Pre-analyse par photo : ideale pour les appartements parisiens ou le passage d&apos;un expert peut etre complexe.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>En savoir plus</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/termites" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Les termites</p>
                <p className={styles.relatedCardDesc}>Guide complet sur les termites et les zones a risque.</p>
              </Link>
              <Link href="/guide/merule" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>La merule</p>
                <p className={styles.relatedCardDesc}>Le champignon qui se developpe dans les caves parisiennes.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
