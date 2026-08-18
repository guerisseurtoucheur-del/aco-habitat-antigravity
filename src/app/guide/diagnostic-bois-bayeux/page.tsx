import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois a Bayeux (14400) : merule, capricorne, traitement | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic et traitement du bois a Bayeux (Calvados) : merule, capricorne, vrillettes, humidite. Expert normand base a Alencon. Pre-analyse gratuite par photo sous 24h. Devis gratuit.",
  keywords: ["diagnostic bois bayeux", "merule bayeux", "capricorne bayeux", "traitement charpente 14400", "expert bois bayeux", "humidite bayeux", "bati ancien bayeux"],
};

export default function BayeuxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Bayeux",
            "description": "Diagnostic bois et traitement des pathologies a Bayeux (14400)",
            "telephone": "+33-2-33-31-19-79",
            "email": "aco.habitat@orange.fr",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "18 Rue Bernard Palissy",
              "addressLocality": "Alencon",
              "postalCode": "61000",
              "addressRegion": "Orne",
              "addressCountry": "FR"
            },
            "areaServed": ["Bayeux", "Port-en-Bessin", "Trevieres", "Ryes", "Tour-en-Bessin"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; <Link href="/guide/diagnostic-bois-calvados">Calvados</Link> &gt; Bayeux
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0ea5e9" }}>Ville</span>
          <h1 className={styles.articleTitle}>Diagnostic bois a Bayeux (14400)</h1>
          <p className={styles.articleMeta}>
            Ville d&apos;art et d&apos;histoire du Bessin — Expert normand depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/charpente-ancienne-combles.jpg"
          alt="Charpente ancienne dans une maison du centre historique de Bayeux"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Bayeux : un centre historique preserve a proteger</h2>
          <p>
            Epargnee par les destructions de 1944, <strong>Bayeux</strong> conserve un centre historique
            exceptionnellement preserve : maisons anciennes en pierre, hotels particuliers, maisons a pans de bois
            et charpentes medievales. Ce patrimoine ancien, dans le climat humide du Bessin proche de la mer,
            necessite une surveillance attentive contre la <strong>merule</strong> et les insectes xylophages.
          </p>
          <p>
            Les charpentes et planchers anciens du centre-ville, ainsi que les caves des maisons de caractere,
            sont des zones sensibles. Nous intervenons a Bayeux et dans tout le Bessin apres votre pre-analyse
            par photo.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Bati ancien de Bayeux : diagnostic recommande</p>
            <p className={styles.alertText}>
              Les maisons anciennes du centre historique meritent un controle regulier du bois. Envoyez vos
              photos pour une pre-analyse gratuite sous 24h avant tout achat ou travaux.
            </p>
          </div>

          <h2>Pathologies frequentes a Bayeux et dans le Bessin</h2>
          <ul>
            <li><strong>La merule</strong> dans les caves et parties basses des maisons anciennes</li>
            <li><strong>Le capricorne</strong> dans les charpentes en resineux</li>
            <li><strong>Les vrillettes</strong> dans les boiseries, poutres et parquets anciens</li>
            <li><strong>L&apos;humidite</strong> liee a la proximite de la mer et aux murs epais</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/merule-carpophore-gros-plan.jpg" alt="Carpophore de merule en gros plan a Bayeux" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Merule (gros plan)</strong>
                Fructification du champignon lignivore
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/poutre-galeries-xylophages.jpg" alt="Galeries de xylophages dans une poutre a Bayeux" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Galeries de xylophages</strong>
                Poutre ancienne fragilisee par les insectes
              </figcaption>
            </figure>
          </div>

          <h2>Notre intervention a Bayeux et dans le Bessin</h2>
          <p>
            Nous couvrons Bayeux et les communes du Bessin : Port-en-Bessin, Trevieres, Ryes, Tour-en-Bessin et
            la cote. Diagnostic complet du bati ancien, identification de la pathologie et preconisations de
            traitement respectueuses du patrimoine.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour Bayeux</h3>
              <p>Envoyez vos photos et recevez un avis d&apos;expert sous 24h</p>
            </div>
            <Link href="#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li><Link href="/guide/diagnostic-bois-calvados" style={{ color: "#059669" }}>Diagnostic bois dans le Calvados (14) &rarr;</Link></li>
            <li><Link href="/guide/merule" style={{ color: "#059669" }}>Guide complet sur la merule &rarr;</Link></li>
            <li><Link href="/guide/reconnaitre-les-pathologies" style={{ color: "#059669" }}>Reconnaitre les pathologies du bois &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-caen" style={{ color: "#059669" }}>Diagnostic bois a Caen &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
