import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Les Vrillettes du bois : identification et traitement | DIAGNOSTIC-BOIS.COM",
  description: "Guide sur les vrillettes (petite et grosse vrillette). Identifier les degats, comprendre le cycle de vie et les solutions de traitement pour proteger vos meubles et structures.",
  keywords: ["vrillette", "petite vrillette", "grosse vrillette", "anobium punctatum", "xestobium rufovillosum", "ver du bois", "traitement vrillette"],
};

export default function VrillettesPage() {
  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Vrillettes
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#f59e0b" }}>Insecte xylophage</span>
          <h1 className={styles.articleTitle}>Les Vrillettes : petits insectes, grands degats</h1>
          <p className={styles.articleMeta}>Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006</p>
        </header>

        <div className={styles.articleContent}>
          <h2>Les deux types de vrillettes</h2>
          
          <h3>La petite vrillette (Anobium punctatum)</h3>
          <p>
            Insecte de 3 a 5 mm, brun fonce. C&apos;est la plus repandue en France. Elle s&apos;attaque aux 
            <strong>bois feuillus et resineux</strong>, notamment les meubles anciens, parquets, et boiseries.
          </p>
          <ul>
            <li>Trous de sortie : 1 a 3 mm de diametre</li>
            <li>Vermoulure : fine poudre granuleuse</li>
            <li>Cycle : 2 a 4 ans</li>
            <li>Prefere les bois humides (18-22% d&apos;humidite)</li>
          </ul>

          <h3>La grosse vrillette (Xestobium rufovillosum)</h3>
          <p>
            Insecte de 5 a 8 mm, brun avec des taches de poils jaunes. Plus rare mais plus destructrice.
            Elle s&apos;attaque aux <strong>bois feuillus deja degrades</strong> par un champignon.
          </p>
          <ul>
            <li>Trous de sortie : 3 a 4 mm de diametre</li>
            <li>Vermoulure : petites lentilles ovales</li>
            <li>Cycle : 3 a 10 ans</li>
            <li>Souvent associee a une attaque de champignon prealable</li>
          </ul>

          <div className={styles.alertBox + " " + styles.info}>
            <p className={styles.alertTitle}>Le bruit caracteristique</p>
            <p className={styles.alertText}>
              La grosse vrillette est aussi appelee &quot;horloge de la mort&quot; a cause du bruit de cognement 
              qu&apos;elle produit en frappant sa tete contre le bois pour attirer les partenaires.
            </p>
          </div>

          <h2>Reconnaitre une attaque de vrillettes</h2>
          <ul>
            <li><strong>Petits trous ronds</strong> — Orifices de 1 a 4 mm, bords nets</li>
            <li><strong>Vermoulure</strong> — Petits tas de sciure fine sous les trous</li>
            <li><strong>Adultes</strong> — Presence d&apos;insectes morts pres des fenetres (mai a septembre)</li>
            <li><strong>Galeries</strong> — Reseau de galeries si le bois est sectionne</li>
          </ul>

          <h2>Bois cibles par les vrillettes</h2>
          <p>Les vrillettes s&apos;attaquent a :</p>
          <ul>
            <li>Meubles anciens et antiquites</li>
            <li>Parquets</li>
            <li>Plinthes et boiseries</li>
            <li>Charpentes (grosse vrillette surtout)</li>
            <li>Cadres de portes et fenetres</li>
            <li>Livres et archives (pour la colle)</li>
          </ul>

          <h2>Traitements contre les vrillettes</h2>

          <h3>Traitement par pulverisation/badigeonnage</h3>
          <p>
            Pour les meubles et boiseries accessibles. Application d&apos;un produit insecticide sur toutes 
            les surfaces. Penetration limitee mais efficace pour les attaques superficielles.
          </p>

          <h3>Traitement par injection</h3>
          <p>
            Pour les pieces plus importantes (charpentes, poutres). Injection de produit dans les trous 
            existants et creation de nouveaux points d&apos;injection.
          </p>

          <h3>Traitement par anoxie</h3>
          <p>
            Pour les meubles precieux et antiquites. Le meuble est place dans une bulle hermetique 
            remplie d&apos;azote pendant plusieurs semaines. Aucun produit chimique.
          </p>

          <h3>Traitement thermique</h3>
          <p>
            Elevation de la temperature a 56°C pendant plusieurs heures. Tue tous les stades de l&apos;insecte.
          </p>

          <h2>Prevention</h2>
          <ul>
            <li><strong>Controler l&apos;humidite</strong> — Maintenir le bois en dessous de 15% d&apos;humidite</li>
            <li><strong>Ventiler</strong> — Bonne circulation d&apos;air autour des meubles</li>
            <li><strong>Inspecter</strong> — Verifier regulierement les meubles anciens et boiseries</li>
            <li><strong>Traiter preventivement</strong> — Appliquer un produit preventif sur les bois neufs</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Petits trous dans votre bois ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez des photos et notre IA determine s&apos;il s&apos;agit de vrillettes ou d&apos;un autre insecte xylophage.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/capricorne" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Le capricorne</p>
                <p className={styles.relatedCardDesc}>Trous plus gros et ovales? Il s&apos;agit peut-etre du capricorne.</p>
              </Link>
              <Link href="/guide/humidite" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Problemes humidite</p>
                <p className={styles.relatedCardDesc}>L&apos;humidite favorise le developpement des vrillettes.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
