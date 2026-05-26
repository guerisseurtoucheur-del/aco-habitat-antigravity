import Link from "next/link";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois en Normandie : merule, capricorne, humidite | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois en Normandie (Calvados, Manche, Orne, Eure, Seine-Maritime). Region a haut risque merule. Expert local depuis 2006. Pre-analyse par photo.",
  keywords: ["diagnostic bois normandie", "merule normandie", "capricorne normandie", "diagnostic charpente caen", "traitement bois rouen", "expert bois normandie"],
};

export default function NormandiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Normandie",
            "description": "Diagnostic bois et pre-analyse des pathologies en Normandie",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "18 Rue Bernard Palissy",
              "addressLocality": "Alencon",
              "postalCode": "61000",
              "addressRegion": "Normandie",
              "addressCountry": "FR"
            },
            "areaServed": ["Calvados", "Manche", "Orne", "Eure", "Seine-Maritime"],
            "priceRange": "59.90€"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Diagnostic bois Normandie
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0066ff" }}>Region</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Normandie</h1>
          <p className={styles.articleMeta}>
            Calvados · Manche · Orne · Eure · Seine-Maritime — Expert base a Alencon depuis 2006
          </p>
        </header>

        <div className={styles.articleContent}>
          <h2>La Normandie : region a haut risque</h2>
          <p>
            La Normandie est l&apos;une des <strong>regions les plus touchees par la merule</strong> en France. 
            Le climat oceanique, caracterise par une humidite elevee et des temperatures moderees, cree des 
            conditions ideales pour le developpement des champignons lignivores.
          </p>
          <p>
            Les departements du Calvados, de la Manche et de l&apos;Orne sont particulierement concernes. 
            Les maisons anciennes en pierre, souvent mal ventilees, sont les plus vulnerables.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Zone a risque merule declare</p>
            <p className={styles.alertText}>
              Plusieurs communes normandes font l&apos;objet d&apos;arretes prefectoraux declarant des zones 
              contaminees par la merule. Dans ces zones, l&apos;information de l&apos;acquereur est obligatoire 
              lors d&apos;une vente immobiliere.
            </p>
          </div>

          <h2>Pathologies frequentes en Normandie</h2>

          <h3>La merule pleureuse</h3>
          <p>
            Pathologie numero 1 en Normandie. Le champignon se developpe dans les maisons humides et mal 
            ventilees. Les caves, les pieces en rez-de-chaussee et les greniers sont les zones a surveiller.
          </p>
          <p>
            <Link href="/guide/merule" style={{ color: "#0066ff" }}>En savoir plus sur la merule →</Link>
          </p>

          <h3>Le capricorne des maisons</h3>
          <p>
            Les charpentes normandes, souvent en pin ou sapin, sont la cible privilegiee du capricorne. 
            Les infestations sont frequentes dans les maisons de plus de 30 ans.
          </p>
          <p>
            <Link href="/guide/capricorne" style={{ color: "#0066ff" }}>En savoir plus sur le capricorne →</Link>
          </p>

          <h3>Problemes d&apos;humidite</h3>
          <p>
            Les remontees capillaires et la condensation sont endemiques dans les constructions anciennes 
            normandes. L&apos;humidite est le facteur declenchant de la plupart des pathologies.
          </p>
          <p>
            <Link href="/guide/humidite" style={{ color: "#0066ff" }}>En savoir plus sur l&apos;humidite →</Link>
          </p>

          <h2>Zones d&apos;intervention</h2>
          <p>Notre service de pre-analyse couvre toute la Normandie :</p>
          <ul>
            <li><strong>Calvados (14)</strong> — Caen, Lisieux, Bayeux, Vire, Honfleur</li>
            <li><strong>Manche (50)</strong> — Cherbourg, Saint-Lo, Granville, Coutances</li>
            <li><strong>Orne (61)</strong> — Alencon, Flers, Argentan, L&apos;Aigle</li>
            <li><strong>Eure (27)</strong> — Evreux, Vernon, Louviers, Bernay</li>
            <li><strong>Seine-Maritime (76)</strong> — Rouen, Le Havre, Dieppe, Fecamp</li>
          </ul>

          <h2>Notre expertise locale</h2>
          <p>
            Bases a <strong>Alencon (Orne)</strong> depuis 2006, nous connaissons parfaitement les 
            specificites du bati normand et les pathologies les plus frequentes dans la region.
          </p>
          <p>
            Notre service de pre-analyse par photo vous permet d&apos;obtenir rapidement un premier 
            avis sur l&apos;etat de votre bois avant de faire intervenir un professionnel sur place.
          </p>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vous etes en Normandie ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez une pre-analyse adaptee aux pathologies locales. 
              Resultat en quelques minutes.
            </p>
            <Link href="/diagnostic/nouveau" className={styles.ctaBoxBtn}>
              Lancer mon analyse
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Regions voisines</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/diagnostic-bois-bretagne" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Bretagne</p>
                <p className={styles.relatedCardDesc}>Autre region a haut risque merule sur la facade Atlantique.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-ile-de-france" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Ile-de-France</p>
                <p className={styles.relatedCardDesc}>Paris et sa region, egalement touchees par la merule.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-pays-de-la-loire" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Pays de la Loire</p>
                <p className={styles.relatedCardDesc}>Region au sud de la Normandie.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
