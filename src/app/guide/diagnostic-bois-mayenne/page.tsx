import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Mayenne (53) - Merule, capricorne, termites | Laval, Chateau-Gontier",
  description: "Expert diagnostic bois en Mayenne (53). Detection merule, capricorne, vrillettes a Laval, Chateau-Gontier, Mayenne, Evron. Pre-analyse gratuite par photo.",
  keywords: ["diagnostic bois Mayenne", "merule Laval", "capricorne 53", "traitement charpente Mayenne", "expert bois Chateau-Gontier"],
  openGraph: {
    title: "Diagnostic bois Mayenne (53) - Expert merule et insectes xylophages",
    description: "Pre-analyse gratuite des pathologies du bois en Mayenne. Merule, capricorne, vrillettes. Intervention rapide Laval et environs.",
    type: "article",
  },
};

export default function DiagnosticBoisMayennePage() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DIAGNOSTIC-BOIS.COM - Mayenne",
    "description": "Expert diagnostic bois en Mayenne (53)",
    "url": "https://diagnostic-bois.com/guide/diagnostic-bois-mayenne",
    "telephone": "+33-2-33-31-19-79",
    "email": "aco.habitat@orange.fr",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Mayenne"
    },
    "serviceArea": ["Laval", "Chateau-Gontier", "Mayenne", "Evron", "Craon", "Ernee"]
  };

  return (
    <div className={styles.guidePage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Mayenne (53)
      </nav>

      <article className={styles.articleContent}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#059669" }}>Departement 53</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Mayenne (53)</h1>
          <p className={styles.articleMeta}>Expert merule, capricorne et insectes xylophages - Laval et environs</p>
        </header>

        <Image 
          src="/images/pathologies/charpente-ancienne-combles.jpg" 
          alt="Charpente ancienne en Mayenne necessitant un diagnostic bois" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <section className={styles.articleSection}>
          <h2>Pathologies du bois en Mayenne</h2>
          <p>
            La Mayenne, departement des Pays de la Loire limitrophe de la Normandie et de la Bretagne, 
            presente un climat oceanique favorable au developpement des champignons lignivores. 
            Le patrimoine bati ancien, notamment les maisons en pierre et les fermes traditionnelles, 
            necessite une surveillance reguliere.
          </p>
          
          <h3>Risques specifiques en Mayenne</h3>
          <ul>
            <li><strong>Merule pleureuse</strong> — Presente dans les caves et sous-sols humides, particulierement dans le bocage mayennais</li>
            <li><strong>Capricorne des maisons</strong> — Attaque les charpentes en resineux, frequent dans les constructions d&apos;apres-guerre</li>
            <li><strong>Vrillettes</strong> — Presentes dans le mobilier ancien et les boiseries des maisons de caractere</li>
            <li><strong>Humidite</strong> — Remontees capillaires frequentes dans les constructions en pierre</li>
          </ul>
        </section>

        <div className={styles.imageGallery}>
          <figure className={styles.imageCard}>
            <Image 
              src="/images/pathologies/merule-carpophore-fructification.jpg" 
              alt="Carpophore de merule - fructification du champignon" 
              width={400} 
              height={250}
            />
            <figcaption className={styles.imageCaption}>
              <strong>Merule avancee</strong>
              Carpophores (fructifications) du champignon
            </figcaption>
          </figure>
          <figure className={styles.imageCard}>
            <Image 
              src="/images/pathologies/traitement-poutres-pinceau.jpg" 
              alt="Traitement preventif des poutres en Mayenne" 
              width={400} 
              height={250}
            />
            <figcaption className={styles.imageCaption}>
              <strong>Traitement curatif</strong>
              Application de produit insecticide sur poutres
            </figcaption>
          </figure>
        </div>

        <section className={styles.articleSection}>
          <h2>Zones d&apos;intervention en Mayenne</h2>
          
          <h3>Laval et agglomeration</h3>
          <p>
            Prefecture de la Mayenne, Laval compte de nombreuses maisons anciennes dans le centre historique. 
            Les quartiers anciens autour de la cathedrale et du chateau necessitent une attention particuliere 
            pour les problemes d&apos;humidite et de champignons.
          </p>

          <h3>Chateau-Gontier-sur-Mayenne</h3>
          <p>
            Sous-prefecture situee au sud du departement, Chateau-Gontier possede un riche patrimoine 
            architectural avec des maisons a pans de bois vulnerables aux insectes xylophages.
          </p>

          <h3>Mayenne</h3>
          <p>
            La ville de Mayenne, au nord du departement, presente des caracteristiques similaires 
            avec un centre ancien ou les diagnostics bois sont regulierement necessaires.
          </p>

          <h3>Autres communes</h3>
          <ul>
            <li>Evron — Patrimoine religieux et maisons anciennes</li>
            <li>Craon — Chateau et habitat rural traditionnel</li>
            <li>Ernee — Proximite de la Bretagne, climat humide</li>
            <li>Gorron — Bocage mayennais, fermes anciennes</li>
            <li>Villaines-la-Juhel — Limite avec l&apos;Orne</li>
          </ul>
        </section>

        <section className={styles.articleSection}>
          <h2>Notre expertise en Mayenne</h2>
          <p>
            Bases dans l&apos;Orne voisin, nous intervenons regulierement en Mayenne pour des diagnostics 
            et traitements de charpentes. Notre proximite geographique nous permet une intervention rapide 
            sur l&apos;ensemble du departement.
          </p>
          
          <div className={styles.ctaBox}>
            <h3>Pre-analyse gratuite pour la Mayenne</h3>
            <p>Envoyez-nous vos photos pour une premiere evaluation sans engagement.</p>
            <Link href="/" className={styles.ctaButton}>Demander une pre-analyse</Link>
          </div>
        </section>

        <section className={styles.articleSection}>
          <h2>Departements voisins</h2>
          <ul>
            <li><Link href="/guide/diagnostic-bois-orne">Orne (61)</Link> — Notre departement d&apos;origine</li>
            <li><Link href="/guide/diagnostic-bois-sarthe">Sarthe (72)</Link> — Le Mans et environs</li>
            <li><Link href="/guide/diagnostic-bois-bretagne">Ille-et-Vilaine (35)</Link> — Bretagne</li>
          </ul>
        </section>
      </article>

      <footer className={styles.guideFooter}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopy}>DIAGNOSTIC-BOIS.COM par ACO-HABITAT - Expert bois depuis 2006</p>
        </div>
      </footer>
    </div>
  );
}
