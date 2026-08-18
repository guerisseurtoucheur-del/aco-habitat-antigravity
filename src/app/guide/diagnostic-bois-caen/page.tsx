import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois a Caen (14000) : merule, capricorne, traitement | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic et traitement du bois a Caen (Calvados) : merule, capricorne, vrillettes, humidite. Expert normand base a Alencon. Pre-analyse gratuite par photo sous 24h. Devis gratuit.",
  keywords: ["diagnostic bois caen", "merule caen", "capricorne caen", "traitement charpente caen", "traitement bois 14000", "expert bois caen", "humidite caen"],
};

export default function CaenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Caen",
            "description": "Diagnostic bois et traitement des pathologies a Caen (14000)",
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
            "areaServed": ["Caen", "Herouville-Saint-Clair", "Ifs", "Mondeville", "Ouistreham", "Douvres-la-Delivrande"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; <Link href="/guide/diagnostic-bois-calvados">Calvados</Link> &gt; Caen
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0ea5e9" }}>Ville</span>
          <h1 className={styles.articleTitle}>Diagnostic bois a Caen (14000)</h1>
          <p className={styles.articleMeta}>
            Prefecture du Calvados · agglomeration de 200 000 habitants — Expert normand depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/traitement-charpente-echelle.jpg"
          alt="Traitement de charpente en hauteur dans une maison de Caen"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Caen : entre pierre de Caen et Reconstruction</h2>
          <p>
            Prefecture du Calvados, <strong>Caen</strong> presente un bati tres varie : hotels particuliers en
            celebre pierre de Caen, immeubles de la Reconstruction d&apos;apres 1944, faubourgs anciens (Vaugueux,
            Saint-Pierre) et pavillons de peripherie. Cette diversite, associee a la proximite de la mer et de
            l&apos;Orne, expose de nombreux logements a la <strong>merule</strong>, au capricorne et a l&apos;humidite.
          </p>
          <p>
            Les caves et sous-sols du centre ancien, ainsi que les charpentes des immeubles anciens, sont des zones
            a surveiller de pres. Nous intervenons sur toute l&apos;agglomeration caennaise apres votre pre-analyse
            par photo.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Centre ancien de Caen : vigilance merule</p>
            <p className={styles.alertText}>
              Les immeubles anciens et caves du centre-ville sont propices a la merule. Un diagnostic precoce
              evite des travaux lourds. Envoyez vos photos pour une pre-analyse gratuite sous 24h.
            </p>
          </div>

          <h2>Pathologies frequentes a Caen</h2>
          <ul>
            <li><strong>La merule</strong> dans les caves, cages d&apos;escalier et appartements anciens mal ventiles</li>
            <li><strong>Le capricorne</strong> dans les charpentes des maisons et immeubles</li>
            <li><strong>Les vrillettes</strong> dans les parquets, boiseries et escaliers en bois</li>
            <li><strong>L&apos;humidite</strong> par infiltration ou remontees capillaires</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/merule-carpophore-fructification.jpg" alt="Carpophore de merule en fructification a Caen" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Fructification de merule</strong>
                Carpophore orange caracteristique du champignon
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/capricorne-galeries-poutre.jpg" alt="Galeries de capricorne dans une poutre a Caen" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Galeries de capricorne</strong>
                Charpente fragilisee par les larves
              </figcaption>
            </figure>
          </div>

          <h2>Notre intervention sur l&apos;agglomeration de Caen</h2>
          <p>
            Nous couvrons Caen et sa peripherie : Herouville-Saint-Clair, Ifs, Mondeville, Ouistreham,
            Douvres-la-Delivrande et la cote de Nacre. Diagnostic complet, identification de la pathologie et
            preconisations de traitement adaptees a votre logement.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour Caen</h3>
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
            <li><Link href="/guide/merule-obligations-legales" style={{ color: "#059669" }}>Merule : obligations legales a la vente &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-lisieux" style={{ color: "#059669" }}>Diagnostic bois a Lisieux &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
