import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Reconnaître les pathologies du bois : les signes qui alertent | DIAGNOSTIC-BOIS.COM",
  description:
    "Trous, sciure, galeries, bois qui s'effrite, champignon brun, odeur de moisi : apprenez à reconnaître les signes d'une attaque d'insectes xylophages ou de champignons lignivores sur vos bois.",
  keywords: [
    "reconnaître attaque bois",
    "signes mérule",
    "trous dans le bois",
    "sciure bois charpente",
    "galeries insectes bois",
    "bois qui s'effrite",
    "champignon bois",
    "diagnostic pathologie bois",
  ],
};

const signes = [
  {
    src: "/realisations/merule-mur.jpeg",
    alt: "Mérule (Serpula lacrymans) : champignon lignivore brun-orangé à bordure blanche cotonneuse sur un mur",
    title: "Un champignon brun-orangé",
    desc: "Masse cotonneuse à bordure blanche, souvent en cave ou derrière un meuble : signe possible de mérule.",
  },
  {
    src: "/realisations/bois-galeries-insectes.jpeg",
    alt: "Bois criblé de galeries et de trous de sortie d'insectes xylophages",
    title: "Des trous et des galeries",
    desc: "Petits trous ronds et galeries dans le bois : trace du passage de capricornes ou de vrillettes.",
  },
  {
    src: "/realisations/poutre-degradee-insectes.jpeg",
    alt: "Poutre en bois dont la surface s'effrite sous l'effet d'une attaque d'insectes",
    title: "Du bois qui s'effrite",
    desc: "La surface part en poussière ou en écailles au toucher : l'attaque est déjà avancée.",
  },
  {
    src: "/realisations/bois-infeste-vermoulure.jpeg",
    alt: "Bois d'œuvre gravement infesté avec vermoulure et trous de sortie près d'un mur en brique",
    title: "De la vermoulure",
    desc: "Une fine sciure (vermoulure) au pied des bois trahit une infestation active.",
  },
];

export default function ReconnaitrePathologiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Reconnaître les pathologies du bois : les signes qui alertent",
            description:
              "Guide illustré pour identifier une attaque d'insectes xylophages ou de champignons lignivores : trous, sciure, galeries, bois qui s'effrite, champignon brun, humidité.",
            author: { "@type": "Organization", name: "ACO-HABITAT" },
            publisher: { "@type": "Organization", name: "ACO-HABITAT" },
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Reconnaître les pathologies
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag}>Prévention</span>
          <h1 className={styles.articleTitle}>Reconnaître les pathologies du bois : les signes qui alertent</h1>
          <p className={styles.articleMeta}>
            ACO-HABITAT · Expert en diagnostic et traitement du bois depuis 2006 · Alençon (61)
          </p>
        </header>

        <Image
          src="/realisations/bois-galeries-insectes.jpeg"
          alt="Gros plan d'un bois de charpente criblé de galeries d'insectes xylophages"
          width={1200}
          height={500}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <h2>Pourquoi agir vite&nbsp;?</h2>
          <p>
            Les <strong>insectes xylophages</strong> (capricorne, vrillette, lyctus) et les{" "}
            <strong>champignons lignivores</strong> (mérule, coniophore) s&apos;attaquent au bois en silence. Quand les
            dégâts deviennent visibles, la structure est souvent déjà fragilisée. Savoir repérer les premiers signes
            permet d&apos;intervenir avant que la charpente ou les planchers ne soient menacés.
          </p>

          <h2>Les signes qui doivent vous alerter</h2>
          <p>Voici, en images, les indices que nous rencontrons le plus souvent sur nos chantiers&nbsp;:</p>

          <div className={styles.imageGallery}>
            {signes.map((s) => (
              <figure key={s.src} className={styles.imageCard}>
                <Image src={s.src} alt={s.alt} width={600} height={400} />
                <figcaption className={styles.imageCaption}>
                  <strong>{s.title}</strong>
                  {s.desc}
                </figcaption>
              </figure>
            ))}
          </div>

          <h2>Insectes ou champignons&nbsp;?</h2>
          <p>Les symptômes diffèrent selon l&apos;origine de l&apos;attaque&nbsp;:</p>
          <ul>
            <li>
              <strong>Insectes xylophages</strong> — trous de sortie ronds ou ovales, galeries à l&apos;intérieur du
              bois, petits tas de sciure (vermoulure), bruit de grignotement parfois audible la nuit.
            </li>
            <li>
              <strong>Champignons lignivores</strong> — bois qui brunit et se fend en petits cubes (pourriture cubique),
              filaments blancs ou masse cotonneuse, odeur de moisi, taches d&apos;humidité persistantes.
            </li>
          </ul>

          <div className={`${styles.alertBox}`}>
            <p className={styles.alertTitle}>La mérule, à ne pas négliger</p>
            <p className={styles.alertText}>
              La mérule est le champignon le plus destructeur pour l&apos;habitat. Elle se développe dans les zones
              humides et peu ventilées et peut traverser murs et maçonneries. Au moindre doute, faites vérifier vos
              bois sans attendre.
            </p>
          </div>

          <h2>Où regarder en priorité&nbsp;?</h2>
          <ul>
            <li>Charpente et combles, en particulier près des entrées d&apos;eau (cheminée, faîtage).</li>
            <li>Planchers et solives, surtout au contact des murs.</li>
            <li>Caves, sous-sols et pièces mal ventilées.</li>
            <li>Encadrements de fenêtres, plinthes et bois enterrés ou en contact avec la maçonnerie.</li>
          </ul>

          <h2>Un doute&nbsp;? Commencez par une pré-analyse gratuite</h2>
          <p>
            Notre <strong>pré-analyse en ligne par intelligence artificielle</strong> vous aide à savoir en quelques
            minutes si vos bois présentent une pathologie. Vous envoyez vos photos, l&apos;IA les compare aux cas que
            nous traitons au quotidien depuis 2006, et vous obtenez une première évaluation.
          </p>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Vos bois présentent-ils ces signes&nbsp;?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez une pré-analyse par IA, appuyée sur 20 ans d&apos;expertise terrain.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos
            </Link>
          </div>

          <h2>Liens utiles</h2>
          <ul>
            <li>
              <Link href="/guide/merule" style={{ color: "#059669" }}>
                Guide complet sur la mérule →
              </Link>
            </li>
            <li>
              <Link href="/guide/capricorne" style={{ color: "#059669" }}>
                Guide sur le capricorne des maisons →
              </Link>
            </li>
            <li>
              <Link href="/guide/traitement-du-bois" style={{ color: "#059669" }}>
                Comment se déroule un traitement du bois →
              </Link>
            </li>
          </ul>

          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
            ACO-HABITAT · Marque déposée à l&apos;INPI n° 5266768 · Méthode et format de rapport protégés (dépôt
            e-Soleau INPI).
          </p>
        </div>
      </article>
    </>
  );
}
