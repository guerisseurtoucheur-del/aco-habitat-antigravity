import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois Eure-et-Loir (28) - Merule, capricorne | Chartres, Dreux, Nogent-le-Rotrou",
  description: "Expert diagnostic bois en Eure-et-Loir (28). Detection merule, capricorne, vrillettes a Chartres, Dreux, Nogent-le-Rotrou. Pre-analyse gratuite par photo.",
  keywords: ["diagnostic bois Eure-et-Loir", "merule Chartres", "capricorne 28", "traitement charpente Dreux", "expert bois Nogent-le-Rotrou"],
  openGraph: {
    title: "Diagnostic bois Eure-et-Loir (28) - Expert merule et insectes xylophages",
    description: "Pre-analyse gratuite des pathologies du bois en Eure-et-Loir. Merule, capricorne, vrillettes. Intervention Chartres et Perche.",
    type: "article",
  },
};

export default function DiagnosticBoisEureEtLoirPage() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DIAGNOSTIC-BOIS.COM - Eure-et-Loir",
    "description": "Expert diagnostic bois en Eure-et-Loir (28)",
    "url": "https://diagnostic-bois.com/guide/diagnostic-bois-eure-et-loir",
    "telephone": "+33-2-33-31-19-79",
    "email": "aco.habitat@orange.fr",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Eure-et-Loir"
    },
    "serviceArea": ["Chartres", "Dreux", "Nogent-le-Rotrou", "Chateaudun", "Luce", "Mainvilliers"]
  };

  return (
    <div className={styles.guidePage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      
      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Eure-et-Loir (28)
      </nav>

      <article className={styles.articleContent}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#7c3aed" }}>Departement 28</span>
          <h1 className={styles.articleTitle}>Diagnostic bois en Eure-et-Loir (28)</h1>
          <p className={styles.articleMeta}>Expert merule, capricorne et insectes xylophages - Chartres, Perche et Beauce</p>
        </header>

        <Image 
          src="/images/pathologies/traitement-eglise-perche.jpg" 
          alt="Traitement de charpente en Eure-et-Loir" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <section className={styles.articleSection}>
          <h2>Pathologies du bois en Eure-et-Loir</h2>
          <p>
            L&apos;Eure-et-Loir presente deux visages distincts : la Beauce cerealiere au sud et le Perche 
            au nord-ouest. Le Perche, region de bocage limitrophe de l&apos;Orne, partage les memes 
            problematiques de champignons et insectes xylophages que la Normandie.
          </p>
          
          <h3>Risques specifiques en Eure-et-Loir</h3>
          <ul>
            <li><strong>Merule pleureuse</strong> — Presente surtout dans le Perche et les vallees humides</li>
            <li><strong>Capricorne des maisons</strong> — Tres frequent en Beauce dans les fermes et pavillons</li>
            <li><strong>Vrillettes</strong> — Nombreuses dans les maisons percheronnes traditionnelles</li>
            <li><strong>Termites</strong> — Zone de surveillance dans le sud du departement (Beauce)</li>
          </ul>
        </section>

        <div className={styles.imageGallery}>
          <figure className={styles.imageCard}>
            <Image 
              src="/images/pathologies/capricorne-galeries-poutre.jpg" 
              alt="Galeries de capricorne dans une poutre en Eure-et-Loir" 
              width={400} 
              height={250}
            />
            <figcaption className={styles.imageCaption}>
              <strong>Attaque de capricorne</strong>
              Galeries caracteristiques dans le bois
            </figcaption>
          </figure>
          <figure className={styles.imageCard}>
            <Image 
              src="/images/pathologies/charpente-traditionnelle-saine.jpg" 
              alt="Charpente traditionnelle percheronne" 
              width={400} 
              height={250}
            />
            <figcaption className={styles.imageCaption}>
              <strong>Charpente saine</strong>
              Exemple de charpente traditionnelle en bon etat
            </figcaption>
          </figure>
        </div>

        <section className={styles.articleSection}>
          <h2>Zones d&apos;intervention en Eure-et-Loir</h2>
          
          <h3>Chartres et agglomeration</h3>
          <p>
            Prefecture du departement, Chartres possede un centre historique exceptionnel autour 
            de sa cathedrale. Les maisons anciennes de la vieille ville necessitent une surveillance 
            reguliere pour les problemes de champignons.
          </p>

          <h3>Dreux</h3>
          <p>
            Situee au nord du departement, Dreux presente un patrimoine architectural diversifie. 
            La proximite de l&apos;Eure et de l&apos;Ile-de-France en fait une zone d&apos;intervention frequente.
          </p>

          <h3>Nogent-le-Rotrou et le Perche</h3>
          <p>
            <strong>Zone prioritaire d&apos;intervention.</strong> Le Perche eurélien, limitrophe de l&apos;Orne, 
            presente les memes caracteristiques que notre departement d&apos;origine : maisons anciennes, 
            climat humide, risque eleve de merule et d&apos;insectes xylophages.
          </p>

          <h3>Autres communes</h3>
          <ul>
            <li>Chateaudun — Chateau et maisons anciennes</li>
            <li>Mainvilliers — Agglomeration chartraine</li>
            <li>Luce — Zone pavillonnaire, vigilance capricorne</li>
            <li>Bonneval — Patrimoine medieval, problematiques humidite</li>
            <li>Illiers-Combray — Perche, maisons traditionnelles</li>
            <li>La Loupe — Limite Orne/Perche, intervention frequente</li>
          </ul>
        </section>

        <section className={styles.articleSection}>
          <h2>Notre expertise en Eure-et-Loir</h2>
          <p>
            Le Perche eurelien est une extension naturelle de notre zone d&apos;intervention depuis l&apos;Orne. 
            Nous connaissons parfaitement le bati traditionnel percheron et les pathologies specifiques 
            a cette region de bocage.
          </p>
          
          <div className={styles.ctaBox}>
            <h3>Pre-analyse gratuite pour l&apos;Eure-et-Loir</h3>
            <p>Envoyez-nous vos photos pour une premiere evaluation sans engagement.</p>
            <Link href="/" className={styles.ctaButton}>Demander une pre-analyse</Link>
          </div>
        </section>

        <section className={styles.articleSection}>
          <h2>Departements voisins</h2>
          <ul>
            <li><Link href="/guide/diagnostic-bois-orne">Orne (61)</Link> — Notre departement d&apos;origine (Perche ornais)</li>
            <li><Link href="/guide/diagnostic-bois-sarthe">Sarthe (72)</Link> — Le Mans et environs</li>
            <li><Link href="/guide/diagnostic-bois-eure">Eure (27)</Link> — Normandie orientale</li>
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
