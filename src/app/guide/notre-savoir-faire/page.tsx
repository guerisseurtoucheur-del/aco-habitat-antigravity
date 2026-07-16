import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Notre savoir-faire : traitement du bois & diagnostic IA depuis 2006 | DIAGNOSTIC-BOIS.COM",
  description:
    "20 ans d'expertise terrain dans le traitement des charpentes, poutres et bois anciens, au service d'une pre-analyse par intelligence artificielle. Decouvrez nos realisations ACO-HABITAT.",
  keywords: [
    "traitement charpente",
    "traitement poutre bois",
    "restauration charpente ancienne",
    "expert bois normandie",
    "savoir-faire traitement bois",
    "diagnostic bois IA",
  ],
};

const realisations = [
  {
    src: "/realisations/traitement-maitresse-poutre.png",
    alt: "Technicien ACO-HABITAT traitant une maitresse-poutre en chene au pinceau en combinaison de protection",
    title: "Traitement d'une maitresse-poutre",
    desc: "Application curative sur poutre en chene ancien, en equipement de protection complet.",
  },
  {
    src: "/realisations/traitement-plafond-solives.jpeg",
    alt: "Traitement d'un plafond a solives anciennes dans une piece en cours de renovation",
    title: "Plafond a solives",
    desc: "Traitement preventif et curatif d'un plancher bois ancien sur mur en pierre.",
  },
  {
    src: "/realisations/traitement-poutre-chene.jpeg",
    alt: "Traitement au pinceau d'une poutre en chene sous un plafond partiellement restaure",
    title: "Restauration de poutre",
    desc: "Nettoyage et traitement d'une poutre porteuse avant remise en valeur.",
  },
  {
    src: "/realisations/plafond-solives-restaure.jpeg",
    alt: "Plafond a poutres et solives en chene restaurees avec chevilles bois apparentes",
    title: "Solives restaurees",
    desc: "Charpente de plancher assainie, conservant le caractere du bois d'origine.",
  },
  {
    src: "/realisations/comble-charpente-ancienne.jpeg",
    alt: "Grand comble avec charpente traditionnelle ancienne en cours de restauration, mur en brique",
    title: "Charpente de comble",
    desc: "Diagnostic et consolidation d'une charpente traditionnelle de grande portee.",
  },
  {
    src: "/realisations/plafond-chene-clair.jpeg",
    alt: "Plafond a solives en chene clair au-dessus de murs enduits",
    title: "Plancher chene",
    desc: "Bois sain mis en valeur apres traitement et controle de l'humidite.",
  },
  {
    src: "/realisations/poutres-restaurees.jpeg",
    alt: "Charpente ancienne restauree vue de dessous, poutres et solives claires",
    title: "Ensemble restaure",
    desc: "Structure bois ancienne entierement traitee et securisee.",
  },
  {
    src: "/realisations/comble-charpente-renfort.jpeg",
    alt: "Grand comble en charpente traditionnelle avec poteaux metalliques de renfort et fenetre cintree",
    title: "Renfort de structure",
    desc: "Renforcement de charpente et traitement des bois de comble.",
  },
  {
    src: "/realisations/colombage-restaure.jpeg",
    alt: "Mur a colombages restaure avec remplissage enduit et poutres apparentes",
    title: "Colombage restaure",
    desc: "Restauration d'un pan de bois traditionnel dans une batisse ancienne.",
  },
];

export default function NotreSavoirFairePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Notre savoir-faire — ACO-HABITAT / DIAGNOSTIC-BOIS.COM",
            description:
              "20 ans d'expertise terrain dans le traitement du bois, au service d'une pre-analyse par intelligence artificielle.",
            publisher: {
              "@type": "LocalBusiness",
              name: "ACO-HABITAT",
              telephone: "+33-2-33-31-19-79",
              email: "aco.habitat@orange.fr",
              address: {
                "@type": "PostalAddress",
                streetAddress: "18 Rue Bernard Palissy",
                addressLocality: "Alencon",
                postalCode: "61000",
                addressCountry: "FR",
              },
            },
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Notre savoir-faire
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag}>Notre expertise</span>
          <h1 className={styles.articleTitle}>
            Un vrai savoir-faire terrain, au service de l&apos;intelligence artificielle
          </h1>
          <p className={styles.articleMeta}>
            ACO-HABITAT · Traitement et restauration du bois depuis 2006 · Alencon (61)
          </p>
        </header>

        <Image
          src="/realisations/traitement-maitresse-poutre.png"
          alt="Technicien ACO-HABITAT traitant une maitresse-poutre en chene au pinceau, en combinaison de protection"
          width={1200}
          height={500}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>20 ans sur le terrain, avant l&apos;IA</h2>
          <p>
            Notre pre-analyse par intelligence artificielle ne sort pas de nulle part. Elle repose sur{" "}
            <strong>l&apos;experience concrete d&apos;ACO-HABITAT, specialiste du traitement du bois depuis 2006</strong>.
            Charpentes attaquees, poutres rongees par le capricorne, planchers gagnes par la merule, combles humides :
            nous avons traite sur le terrain les pathologies que notre IA apprend aujourd&apos;hui a reconnaitre.
          </p>
          <p>
            C&apos;est cette connaissance reelle du bois — comment il vieillit, comment il se degrade, comment on le
            sauve — qui rend notre pre-analyse fiable et pertinente. Derriere chaque rapport, il y a{" "}
            <strong>des annees d&apos;interventions reelles</strong>, pas seulement un algorithme.
          </p>

          <div className={`${styles.alertBox} ${styles.success}`}>
            <p className={styles.alertTitle}>De la truelle a l&apos;algorithme</p>
            <p className={styles.alertText}>
              Nous avons entraine notre outil sur des cas concrets rencontres au fil de nos chantiers. La technologie
              accelere le premier diagnostic ; l&apos;expertise humaine garantit sa justesse.
            </p>
          </div>

          <h2>Nos realisations</h2>
          <p>
            Quelques exemples de nos interventions de traitement et de restauration du bois sur des batisses anciennes :
            charpentes, maitresses-poutres, solives, combles et colombages.
          </p>

          <div className={styles.imageGallery}>
            {realisations.map((r) => (
              <figure key={r.src} className={styles.imageCard}>
                <Image src={r.src} alt={r.alt} width={600} height={400} />
                <figcaption className={styles.imageCaption}>
                  <strong>{r.title}</strong>
                  {r.desc}
                </figcaption>
              </figure>
            ))}
          </div>

          <h2>Notre methode de traitement</h2>
          <ul>
            <li>
              <strong>Diagnostic precis</strong> — identification de la pathologie (xylophage, lignivore, humidite) et
              de son niveau de gravite.
            </li>
            <li>
              <strong>Preparation du bois</strong> — brossage, buchage des parties alterees, mise a nu du bois sain.
            </li>
            <li>
              <strong>Traitement curatif et preventif</strong> — application de produits adaptes par pulverisation,
              injection ou badigeon, en equipement de protection.
            </li>
            <li>
              <strong>Renforcement si necessaire</strong> — consolidation ou remplacement des elements de structure
              trop atteints.
            </li>
            <li>
              <strong>Mise en valeur</strong> — finition qui redonne au bois ancien tout son caractere.
            </li>
          </ul>

          <h2>Pourquoi commencer par la pre-analyse IA ?</h2>
          <p>
            Avant toute intervention, notre pre-analyse en ligne vous permet de savoir{" "}
            <strong>en quelques minutes</strong> si votre probleme necessite l&apos;attention d&apos;un expert. Vous
            evitez le stress inutile, ou au contraire vous agissez a temps, avant que les degats ne s&apos;aggravent.
          </p>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Un doute sur votre charpente ou vos poutres ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez une pre-analyse par IA, appuyee sur 20 ans d&apos;expertise terrain.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li>
              <Link href="/guide/merule" style={{ color: "#059669" }}>
                Guide complet sur la merule →
              </Link>
            </li>
            <li>
              <Link href="/guide/capricorne" style={{ color: "#059669" }}>
                Guide sur le capricorne des maisons →
              </Link>
            </li>
            <li>
              <Link href="/guide/diagnostic-bois-orne" style={{ color: "#059669" }}>
                Diagnostic bois dans l&apos;Orne →
              </Link>
            </li>
          </ul>

          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
            ACO-HABITAT · Marque deposee a l&apos;INPI n° 5266768 · Methode et format de rapport proteges (depot
            e-Soleau INPI).
          </p>
        </div>
      </article>
    </>
  );
}
