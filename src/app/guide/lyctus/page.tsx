import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Le Lyctus : l'insecte qui devore le chene et les bois feuillus | DIAGNOSTIC-BOIS.COM",
  description: "Guide complet sur le lyctus (Lyctus brunneus), l'insecte xylophage qui attaque le chene, le frene et les bois feuillus. Comment le reconnaitre, le differencier du capricorne et de la vrillette, le traiter. Expert bois depuis 2006.",
  keywords: ["lyctus", "lyctus brunneus", "insecte xylophage", "vrillette du chene", "parquet troue", "insecte bois feuillu", "traitement lyctus", "trous parquet chene"],
  openGraph: {
    title: "Le Lyctus : l'insecte des bois feuillus",
    description: "Reconnaitre et traiter le lyctus, l'insecte xylophage qui s'attaque au chene et aux bois feuillus. Guide expert.",
    type: "article",
    images: [
      {
        url: "https://diagnostic-bois.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Expert en traitement du bois - DIAGNOSTIC-BOIS.COM",
      },
    ],
  },
};

export default function LyctusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Le Lyctus : l'insecte qui devore le chene et les bois feuillus",
            "description": "Guide complet sur le lyctus, insecte xylophage des bois feuillus riches en amidon",
            "author": {
              "@type": "Organization",
              "name": "ACO-HABITAT",
              "url": "https://diagnostic-bois.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "DIAGNOSTIC-BOIS.COM",
              "logo": {
                "@type": "ImageObject",
                "url": "https://diagnostic-bois.com/logo.png"
              }
            },
            "datePublished": "2026-08-18",
            "dateModified": "2026-08-18"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Lyctus
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#a16207" }}>Insecte xylophage</span>
          <h1 className={styles.articleTitle}>Le Lyctus : l&apos;insecte qui devore le chene</h1>
          <p className={styles.articleMeta}>
            Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006
          </p>
        </header>

        <Image
          src="/realisations/bois-galeries-insectes.jpeg"
          alt="Bois feuillu crible de trous et de galeries causees par le lyctus"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <div className={styles.toc}>
            <p className={styles.tocTitle}>Sommaire</p>
            <ol className={styles.tocList}>
              <li><a href="#quest-ce-que">Qu&apos;est-ce que le lyctus ?</a></li>
              <li><a href="#identifier">Comment le reconnaitre ?</a></li>
              <li><a href="#difference">Lyctus, capricorne ou vrillette ?</a></li>
              <li><a href="#bois-cibles">Les bois cibles</a></li>
              <li><a href="#dangers">Les dangers</a></li>
              <li><a href="#traitement">Traitements et solutions</a></li>
              <li><a href="#prevention">Prevention</a></li>
            </ol>
          </div>

          <h2 id="quest-ce-que">Qu&apos;est-ce que le lyctus ?</h2>
          <p>
            Le <strong>lyctus</strong> (Lyctus brunneus principalement) est un petit insecte xylophage, appele aussi
            &quot;vrillette du chene&quot;, dont la larve se nourrit de l&apos;<strong>amidon</strong> contenu dans
            l&apos;aubier des <strong>bois feuillus</strong> : chene, frene, chataignier, noyer, acajou. L&apos;adulte
            mesure 3 a 7 mm et est de couleur brun-rougeatre allonge.
          </p>
          <p>
            Contrairement au capricorne (qui s&apos;attaque aux resineux de charpente), le lyctus vise les bois durs riches
            en amidon : parquets, meubles, lambris, escaliers, boiseries, et bois recemment mis en oeuvre. Une infestation
            peut demarrer sur du bois neuf mal seche ou stocke.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Un insecte qui aime le bois neuf</p>
            <p className={styles.alertText}>
              Particularite du lyctus : il attaque souvent des bois recents (parquets, meubles, boiseries de moins de 10-15
              ans) alors que le capricorne prefere les charpentes. Des petits tas de sciure fine sous un parquet en chene
              neuf sont un signal typique.
            </p>
          </div>

          <h2 id="identifier">Comment reconnaitre une attaque de lyctus ?</h2>
          <h3>Signes visuels</h3>
          <ul>
            <li><strong>Petits trous ronds</strong> &mdash; Trous de sortie de 1 a 2 mm de diametre, parfaitement circulaires</li>
            <li><strong>Sciure tres fine</strong> &mdash; Une poudre fine comme du talc (farine de bois), plus fine que celle des autres insectes</li>
            <li><strong>Galeries dans l&apos;aubier</strong> &mdash; Le lyctus creuse surtout l&apos;aubier (partie claire), en respectant le coeur du bois</li>
            <li><strong>Bois qui sonne creux</strong> &mdash; Sous la surface intacte, le bois peut etre entierement vermoulu</li>
          </ul>

          <h3>Signes indirects</h3>
          <ul>
            <li><strong>Tas de sciure</strong> &mdash; Petits amas de poudre fine qui reapparaissent apres nettoyage (signe d&apos;activite)</li>
            <li><strong>Bruit de grignotage</strong> &mdash; Rarement audible, contrairement au capricorne</li>
            <li><strong>Presence d&apos;adultes</strong> &mdash; Petits insectes bruns au printemps/ete (periode d&apos;envol)</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image
                src="/realisations/bois-galeries-insectes.jpeg"
                alt="Galeries et trous de sortie dans un bois feuillu attaque par le lyctus"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Galeries d&apos;insectes</strong>
                Le bois est creuse de l&apos;interieur, l&apos;aubier est reduit en farine.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image
                src="/realisations/poutre-degradee-insectes.jpeg"
                alt="Poutre en bois feuillu fortement degradee par une attaque d'insectes xylophages"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Bois fragilise</strong>
                Sous une surface d&apos;apparence saine, le bois est vide de sa substance.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image
                src="/images/pathologies/vrillettes-trous-poutre.jpg"
                alt="Multiples trous de sortie caracteristiques d'insectes xylophages sur une poutre"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Trous de sortie</strong>
                Les trous ronds signalent l&apos;envol des adultes : l&apos;infestation est deja installee.
              </figcaption>
            </figure>
          </div>

          <h2 id="difference">Lyctus, capricorne ou vrillette : comment les differencier ?</h2>
          <p>
            Ces trois insectes xylophages laissent des degats voisins mais s&apos;attaquent a des bois differents :
          </p>
          <ul>
            <li><strong>Le lyctus</strong> &mdash; Bois feuillus riches en amidon (chene, frene). Trous ronds 1-2 mm, sciure tres fine comme de la farine. Cible parquets, meubles, boiseries.</li>
            <li><strong>Le capricorne</strong> &mdash; Bois resineux de charpente (sapin, epicea). Trous ovales 6-10 mm, gros degats. Voir notre guide capricorne.</li>
            <li><strong>La vrillette</strong> &mdash; Feuillus et resineux, souvent bois anciens et humides. Trous ronds 1-3 mm, petits tas de sciure. Voir notre guide vrillettes.</li>
          </ul>
          <p>
            La distinction est importante car le traitement et l&apos;urgence different. Un doute ? Nos experts identifient
            l&apos;insecte a partir de vos photos.
          </p>

          <h2 id="bois-cibles">Les bois cibles par le lyctus</h2>
          <ul>
            <li><strong>Parquets en chene</strong> &mdash; La cible la plus frequente, surtout l&apos;aubier</li>
            <li><strong>Meubles et boiseries</strong> &mdash; Frene, chataignier, acajou</li>
            <li><strong>Escaliers et rampes</strong> en bois feuillu</li>
            <li><strong>Lambris et plinthes</strong></li>
            <li><strong>Bois d&apos;oeuvre neuf</strong> mal seche ou stocke en conditions humides</li>
          </ul>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Le lyctus n&apos;attaque que l&apos;aubier</p>
            <p className={styles.alertText}>
              Bonne nouvelle relative : le lyctus se limite a l&apos;aubier (partie tendre et claire riche en amidon) et
              n&apos;attaque pas le coeur du bois (duramen). Mais sur un parquet ou un meuble compose surtout d&apos;aubier,
              les degats peuvent etre considerables.
            </p>
          </div>

          <h2 id="dangers">Les dangers</h2>
          <ul>
            <li>Destruction progressive des parquets, escaliers et boiseries</li>
            <li>Affaiblissement d&apos;elements decoratifs ou de menuiserie de valeur</li>
            <li>Propagation aux bois feuillus voisins non traites</li>
            <li>Devaluation d&apos;un bien (parquets et boiseries anciennes abimes)</li>
          </ul>

          <h2 id="traitement">Traitements et solutions</h2>
          <h3>1. Diagnostic</h3>
          <p>
            Confirmer qu&apos;il s&apos;agit bien du lyctus, evaluer l&apos;etendue et verifier si l&apos;infestation est
            active (sciure fraiche).
          </p>
          <h3>2. Depoussierage et preparation</h3>
          <p>
            Nettoyage des surfaces, ponçage leger si necessaire pour ouvrir les galeries superficielles et faciliter la
            penetration du produit.
          </p>
          <h3>3. Traitement curatif</h3>
          <p>
            Application par pulverisation, badigeon ou injection d&apos;un insecticide xylophage agree, selon
            l&apos;accessibilite et la valeur des bois (les parquets et meubles anciens demandent des precautions
            particulieres).
          </p>
          <h3>4. Traitement preventif</h3>
          <p>
            Protection des bois sains environnants pour eviter une nouvelle colonisation.
          </p>

          <h2 id="prevention">Prevention</h2>
          <ul>
            <li><strong>Choisir des bois traites</strong> &mdash; Pour les parquets et boiseries neufs en feuillus</li>
            <li><strong>Controler le sechage</strong> &mdash; Un bois bien seche est moins attractif</li>
            <li><strong>Vitrifier ou vernir</strong> &mdash; Une finition fermee limite la ponte des adultes</li>
            <li><strong>Surveiller la sciure</strong> &mdash; Nettoyer et verifier si elle reapparait (signe d&apos;activite)</li>
            <li><strong>Traiter tot</strong> &mdash; Une infestation jeune est bien plus simple a eradiquer</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Des petits trous dans votre parquet en chene ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez un pre-diagnostic par IA en quelques minutes. Notre analyse identifiera
              l&apos;insecte et vous dira si une intervention est necessaire.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos maintenant
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/capricorne" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Le capricorne des maisons</p>
                <p className={styles.relatedCardDesc}>L&apos;insecte des charpentes en resineux, aux degats spectaculaires.</p>
              </Link>
              <Link href="/guide/vrillettes" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Les vrillettes</p>
                <p className={styles.relatedCardDesc}>Petit et grande vrillette : reconnaitre leurs trous et leur sciure.</p>
              </Link>
              <Link href="/guide/reconnaitre-les-pathologies" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Reconnaitre les pathologies</p>
                <p className={styles.relatedCardDesc}>Tous les signes qui doivent vous alerter, en images.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
