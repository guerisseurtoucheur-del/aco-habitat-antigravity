import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Diagnostic bois dans le Calvados (14) : merule, capricorne, traitement | DIAGNOSTIC-BOIS.COM",
  description: "Diagnostic bois dans le Calvados : Caen, Falaise, Vire, Conde-en-Normandie, Lisieux, Bayeux. Expert normand base a Alencon depuis 2006. Pre-analyse par photo sous 24h. Devis gratuit.",
  keywords: ["diagnostic bois calvados", "merule calvados", "capricorne calvados", "traitement charpente caen", "diagnostic bois falaise", "expert bois vire", "merule 14", "traitement bois lisieux", "diagnostic bois bayeux"],
};

const villes = [
  { nom: "Caen", cp: "14000", href: "/guide/diagnostic-bois-caen", desc: "Prefecture du Calvados. Centre historique reconstruit et faubourgs anciens : zones a surveiller pour la merule et l'humidite." },
  { nom: "Falaise", cp: "14700", href: "/guide/diagnostic-bois-falaise", desc: "Cite medievale proche d'Alencon. Maisons anciennes en pierre et charpentes de caractere exposees aux xylophages." },
  { nom: "Conde-en-Normandie", cp: "14110", href: "/guide/diagnostic-bois-conde-en-normandie", desc: "Ex Conde-sur-Noireau, secteur bocager humide du Bocage virois, terrain propice a la merule." },
  { nom: "Vire Normandie", cp: "14500", href: "/guide/diagnostic-bois-vire", desc: "Coeur du Bocage, climat humide. Maisons en granit et charpentes anciennes a controler regulierement." },
  { nom: "Lisieux", cp: "14100", href: "/guide/diagnostic-bois-lisieux", desc: "Capitale du Pays d'Auge. Nombreuses maisons a colombages tres sensibles aux insectes et champignons." },
  { nom: "Bayeux", cp: "14400", href: "/guide/diagnostic-bois-bayeux", desc: "Ville d'art et d'histoire au bati ancien preserve. Charpentes et boiseries anciennes a proteger." },
];

export default function CalvadosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DIAGNOSTIC-BOIS.COM - Calvados",
            "description": "Diagnostic bois et traitement des pathologies dans le Calvados (14)",
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
            "areaServed": ["Caen", "Falaise", "Conde-en-Normandie", "Vire Normandie", "Lisieux", "Bayeux", "Honfleur"],
            "priceRange": "Gratuit - Pre-analyse offerte"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; <Link href="/guide/diagnostic-bois-normandie">Normandie</Link> &gt; Calvados (14)
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#059669" }}>Departement</span>
          <h1 className={styles.articleTitle}>Diagnostic bois dans le Calvados (14)</h1>
          <p className={styles.articleMeta}>
            Caen · Falaise · Vire · Conde-en-Normandie · Lisieux · Bayeux — Expert normand base a Alencon depuis 2006
          </p>
        </header>

        <Image
          src="/images/pathologies/traitement-charpente-pulverisation.jpg"
          alt="Traitement de charpente par pulverisation dans le Calvados - technicien ACO-HABITAT en intervention"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Le Calvados : un departement a haut risque merule</h2>
          <p>
            Le <strong>Calvados</strong> est l&apos;un des departements francais les plus exposes aux pathologies du bois.
            Son climat oceanique tres humide, la proximite de la mer et l&apos;abondance de maisons anciennes en pierre,
            en granit ou a colombages en font un terrain ideal pour la <strong>merule</strong>, le capricorne et les vrillettes.
          </p>
          <p>
            Bases a <strong>Alencon depuis 2006</strong>, dans l&apos;Orne voisine, nous intervenons regulierement dans tout
            le Calvados. Notre proximite geographique nous permet d&apos;etre reactifs, en particulier sur le sud du departement
            (Falaise, Conde-en-Normandie, Vire), a quelques kilometres seulement de notre base.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Sud Calvados : intervention rapide depuis Alencon</p>
            <p className={styles.alertText}>
              Falaise, Conde-en-Normandie et Vire sont proches de notre base d&apos;Alencon. Envoyez vos photos
              pour une pre-analyse gratuite sous 24h et un rendez-vous rapide sur place.
            </p>
          </div>

          <h2>Pathologies frequentes dans le Calvados</h2>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image
                src="/images/pathologies/merule-mur-cave-2.jpg"
                alt="Merule sur mur de cave dans une maison du Calvados"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Merule pleureuse</strong>
                Champignon lignivore favorise par l&apos;humidite normande
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image
                src="/images/pathologies/charpente-capricorne-severe.jpg"
                alt="Charpente attaquee par le capricorne dans le Calvados"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Attaque de capricorne</strong>
                Charpente resineuse severement endommagee
              </figcaption>
            </figure>
          </div>

          <h3>La merule pleureuse</h3>
          <p>
            Le Calvados est un departement ou la merule est endemique. Les maisons anciennes de Caen, Lisieux ou
            Bayeux, souvent mal ventilees, avec des caves et des vides sanitaires humides, sont particulierement
            exposees. Le champignon se developpe dans l&apos;obscurite, derriere les doublages et sous les planchers.
          </p>

          <h3>Le capricorne des maisons</h3>
          <p>
            Les charpentes du Calvados sont frequemment attaquees par le capricorne, qui s&apos;attaque aux resineux
            (pin, sapin, epicea). Les larves creusent des galeries pendant plusieurs annees avant que l&apos;infestation
            ne devienne visible.
          </p>

          <h3>Les colombages du Pays d&apos;Auge</h3>
          <p>
            Autour de Lisieux, les nombreuses maisons a pans de bois sont particulierement sensibles : le bois
            apparent, expose aux intemperies et a l&apos;humidite, est une cible privilegiee pour les insectes
            xylophages et les champignons.
          </p>

          <h2>Nos villes d&apos;intervention dans le Calvados</h2>
          <p>Cliquez sur votre ville pour decouvrir notre page dediee :</p>

          <div className={styles.regionGrid}>
            {villes.map((v) => (
              <Link key={v.href} href={v.href} className={styles.regionCard} style={{ textDecoration: "none", display: "block" }}>
                <h4 style={{ color: "#059669" }}>{v.nom} ({v.cp}) &rarr;</h4>
                <p>{v.desc}</p>
              </Link>
            ))}
          </div>

          <h2>Notre expertise locale</h2>
          <p>
            En tant qu&apos;expert normand base a Alencon, nous connaissons parfaitement les specificites du bati
            calvadosien :
          </p>
          <ul>
            <li>Maisons en pierre de Caen et immeubles de la Reconstruction</li>
            <li>Maisons a colombages du Pays d&apos;Auge (Lisieux, Honfleur)</li>
            <li>Constructions en granit du Bocage virois</li>
            <li>Fermes et longeres anciennes de la campagne calvadosienne</li>
          </ul>

          <Image
            src="/images/pathologies/charpente-traditionnelle-saine.jpg"
            alt="Charpente traditionnelle en bon etat dans le Calvados - exemple de bois sain"
            width={1200}
            height={400}
            className={styles.heroImage}
            style={{ marginTop: 24 }}
          />

          <h2>Vous suspectez une infestation ?</h2>
          <p>
            Envoyez-nous vos photos pour une <strong>pre-analyse gratuite sous 24h</strong>. Nous vous indiquerons
            s&apos;il y a lieu de s&apos;inquieter et quelles demarches entreprendre.
          </p>

          <div className={styles.ctaBox}>
            <div className={styles.ctaBoxContent}>
              <h3>Pre-analyse gratuite pour le Calvados</h3>
              <p>Envoyez vos photos et recevez un avis d&apos;expert sous 24h</p>
            </div>
            <Link href="#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li><Link href="/guide/merule" style={{ color: "#059669" }}>Guide complet sur la merule &rarr;</Link></li>
            <li><Link href="/guide/capricorne" style={{ color: "#059669" }}>Guide sur le capricorne des maisons &rarr;</Link></li>
            <li><Link href="/guide/merule-obligations-legales" style={{ color: "#059669" }}>Merule : obligations legales a la vente &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-normandie" style={{ color: "#059669" }}>Diagnostic bois en Normandie &rarr;</Link></li>
            <li><Link href="/guide/diagnostic-bois-orne" style={{ color: "#059669" }}>Diagnostic bois dans l&apos;Orne (61) &rarr;</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
