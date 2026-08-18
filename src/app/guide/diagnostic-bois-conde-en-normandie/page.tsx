import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois a Conde-en-Normandie (14110) : merule, capricorne | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic et traitement du bois a Conde-en-Normandie (ex Conde-sur-Noireau, Calvados) : merule, capricorne, humidite. Expert base a Alencon, a 65 km. Pre-analyse gratuite sous 24h.",
  keywords: ["diagnostic bois conde-sur-noireau", "merule conde-en-normandie", "capricorne conde", "traitement charpente 14110", "expert bois bocage virois", "humidite conde-sur-noireau"],
};

export default function CondePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Conde-en-Normandie",
            "description": "Diagnostic bois et traitement des pathologies a Conde-en-Normandie (14110)",
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
            "areaServed": ["Conde-en-Normandie", "Conde-sur-Noireau", "Pont-d'Ouilly", "Vassy", "Saint-Germain-du-Crioult"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; <Link href="/guide/diagnostic-bois-calvados">Calvados</Link> &gt; Conde-en-Normandie
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#0ea5e9" }}>Ville</span>
          <h1 className={styles.articleTitle}>Diagnostic bois a Conde-en-Normandie (14110)</h1>
          <p className={styles.articleMeta}>
            Ex Conde-sur-Noireau · Bocage virois · a 65 km d&apos;Alencon — Expert local depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/combles-humidite.jpg"
          alt="Combles humides dans une maison de Conde-en-Normandie"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Conde-en-Normandie : un secteur humide propice a la merule</h2>
          <p>
            <strong>Conde-en-Normandie</strong> (anciennement Conde-sur-Noireau) se situe au coeur du Bocage virois,
            dans la vallee du Noireau. Ce secteur bocager, arrose et souvent brumeux, cree des conditions
            d&apos;humidite ideales pour le developpement de la <strong>merule</strong> et des champignons lignivores,
            notamment dans les maisons anciennes en pierre et en granit.
          </p>
          <p>
            La ville, largement reconstruite apres les bombardements de 1944, melange immeubles d&apos;apres-guerre
            et fermes anciennes des alentours. A <strong>65 km d&apos;Alencon</strong>, elle fait partie de notre zone
            d&apos;intervention rapide dans le sud du Calvados.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Zone a risque merule elevee</p>
            <p className={styles.alertText}>
              L&apos;humidite de la vallee du Noireau favorise les champignons du bois. Au moindre doute
              (odeur de moisi, boiserie qui s&apos;effrite), envoyez vos photos pour une pre-analyse gratuite.
            </p>
          </div>

          <h2>Pathologies frequentes a Conde-en-Normandie</h2>
          <ul>
            <li><strong>La merule pleureuse</strong>, favorisee par l&apos;humidite du Bocage et les caves mal ventilees</li>
            <li><strong>Les champignons de pourriture cubique</strong> sur les bois humidifies</li>
            <li><strong>Le capricorne</strong> et <strong>les vrillettes</strong> dans les charpentes et boiseries</li>
            <li><strong>Les remontees d&apos;humidite</strong> dans les murs en pierre et granit</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/merule-mycelium-actif.jpg" alt="Mycelium de merule actif a Conde-en-Normandie" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Mycelium de merule</strong>
                Filaments blancs cotonneux en developpement actif
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image src="/images/pathologies/degats-humidite-infiltration.jpg" alt="Degats d'humidite par infiltration a Conde-en-Normandie" width={600} height={400} />
              <figcaption className={styles.imageCaption}>
                <strong>Degats d&apos;humidite</strong>
                Infiltrations favorisant les champignons du bois
              </figcaption>
            </figure>
          </div>

          <h2>Notre intervention a Conde et dans le Bocage</h2>
          <p>
            Nous intervenons a Conde-en-Normandie et dans les communes voisines : Pont-d&apos;Ouilly, Vassy,
            Saint-Germain-du-Crioult et l&apos;ensemble du Bocage virois. Identification precise de la pathologie
            et preconisations de traitement durable.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour Conde-en-Normandie</h3>
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
            <li><Link href="/guide/pourriture-cubique" style={{ color: "#059669" }}>Pourriture cubique et champignons lignivores &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-vire" style={{ color: "#059669" }}>Diagnostic bois a Vire Normandie &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
