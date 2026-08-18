import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Pourriture cubique et champignons lignivores : identifier et traiter | DIAGNOSTIC-BOIS.COM",
  description: "Guide complet sur la pourriture cubique et les champignons lignivores du bois (coniophore des caves, lenzite, polypore). Comment les reconnaitre, les differencier de la merule, les traiter. Expert bois depuis 2006.",
  keywords: ["pourriture cubique", "champignon lignivore", "coniophore des caves", "lenzite", "polypore", "pourriture brune", "champignon charpente", "bois qui pourrit"],
  openGraph: {
    title: "Pourriture cubique et champignons lignivores : le guide",
    description: "Reconnaitre et traiter la pourriture cubique et les champignons destructeurs du bois. Guide expert.",
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

export default function PourritureCubiquePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Pourriture cubique et champignons lignivores : identifier et traiter",
            "description": "Guide complet sur la pourriture cubique et les champignons lignivores destructeurs du bois",
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
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Pourriture cubique
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#b45309" }}>Champignon</span>
          <h1 className={styles.articleTitle}>Pourriture cubique et champignons lignivores</h1>
          <p className={styles.articleMeta}>
            Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006
          </p>
        </header>

        <Image
          src="/realisations/bois-infeste-vermoulure.jpeg"
          alt="Bois de charpente detruit par la pourriture cubique - fissures en petits cubes caracteristiques"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <div className={styles.toc}>
            <p className={styles.tocTitle}>Sommaire</p>
            <ol className={styles.tocList}>
              <li><a href="#quest-ce-que">Qu&apos;est-ce que la pourriture cubique ?</a></li>
              <li><a href="#champignons">Les principaux champignons lignivores</a></li>
              <li><a href="#identifier">Comment la reconnaitre ?</a></li>
              <li><a href="#difference-merule">Difference avec la merule</a></li>
              <li><a href="#causes">Les causes d&apos;apparition</a></li>
              <li><a href="#traitement">Traitements et solutions</a></li>
              <li><a href="#prevention">Prevention</a></li>
            </ol>
          </div>

          <h2 id="quest-ce-que">Qu&apos;est-ce que la pourriture cubique ?</h2>
          <p>
            La <strong>pourriture cubique</strong> (aussi appelee pourriture brune) est une degradation du bois causee par
            des <strong>champignons lignivores</strong> qui se nourrissent de la cellulose. Le bois attaque brunit, perd sa
            resistance et se fissure en <strong>petits cubes caracteristiques</strong> qui s&apos;effritent au toucher &mdash;
            d&apos;ou son nom.
          </p>
          <p>
            Contrairement aux insectes xylophages qui creusent des galeries, les champignons decomposent la matiere du bois
            de l&apos;interieur. Une charpente ou un plancher gravement atteint peut perdre jusqu&apos;a 70% de sa resistance
            mecanique tout en gardant, au debut, une apparence presque normale en surface.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Un danger structurel sous-estime</p>
            <p className={styles.alertText}>
              La pourriture cubique attaque souvent des elements porteurs (solives, poutres, planchers). Non traitee, elle
              peut mener a l&apos;effondrement d&apos;un plancher ou d&apos;une partie de charpente. Le moindre bois qui
              s&apos;effrite ou brunit anormalement doit etre diagnostique.
            </p>
          </div>

          <h2 id="champignons">Les principaux champignons lignivores</h2>
          <p>
            Au-dela de la merule (le plus connu), plusieurs champignons provoquent la pourriture du bois :
          </p>
          <ul>
            <li><strong>Le coniophore des caves</strong> (Coniophora puteana) &mdash; Tres frequent, il provoque une pourriture cubique dans les zones tres humides (caves, vides sanitaires, planchers bas). Filaments brun-noir.</li>
            <li><strong>Le lenzite des poutres</strong> (Gloeophyllum) &mdash; Attaque surtout les bois exterieurs et les charpentes exposees aux intemperies. Provoque une pourriture cubique brune.</li>
            <li><strong>Le polypore des caves</strong> (Donkioporia expansa) &mdash; S&apos;attaque au chene et aux bois durs, souvent dans les charpentes anciennes des batiments humides.</li>
            <li><strong>La merule pleureuse</strong> (Serpula lacrymans) &mdash; Le plus redoutable, capable de traverser les murs. Voir notre guide dedie.</li>
          </ul>

          <h2 id="identifier">Comment reconnaitre la pourriture cubique ?</h2>
          <h3>Signes visuels</h3>
          <ul>
            <li><strong>Bois brun fonce</strong> &mdash; Le bois fonce anormalement, prend une teinte brune uniforme</li>
            <li><strong>Fissures en cubes</strong> &mdash; Craquellement caracteristique en petits cubes, dans le sens et perpendiculairement au fil du bois</li>
            <li><strong>Bois friable</strong> &mdash; Le bois s&apos;effrite, se reduit en poudre quand on le gratte</li>
            <li><strong>Retrait du bois</strong> &mdash; Le bois se retracte, se creuse, perd du volume</li>
            <li><strong>Filaments ou plaques</strong> &mdash; Presence de mycelium (filaments) selon le champignon</li>
          </ul>

          <h3>Signes indirects</h3>
          <ul>
            <li><strong>Odeur de moisi</strong> &mdash; Odeur de cave, de champignon, d&apos;humidite</li>
            <li><strong>Plancher qui flechit</strong> &mdash; Sensation de mollesse, affaissement en marchant</li>
            <li><strong>Zone humide persistante</strong> &mdash; Presence d&apos;une source d&apos;eau (fuite, infiltration, remontee)</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image
                src="/realisations/bois-infeste-vermoulure.jpeg"
                alt="Poutre attaquee par la pourriture cubique - bois brun et friable qui s'effrite"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Bois degrade</strong>
                Bois brun et friable, structure affaiblie. La resistance mecanique est fortement compromise.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image
                src="/realisations/merule-mur.jpeg"
                alt="Champignon lignivore developpe sur un mur - fructification orangee a bords blancs"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Fructification</strong>
                Certains champignons forment une plaque visible signe d&apos;une infestation deja avancee.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image
                src="/images/pathologies/effondrement-plafond-merule.jpg"
                alt="Effondrement d'un plafond du a une pourriture avancee du bois de structure"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Degats structurels</strong>
                Stade ultime : le bois porteur cede. Une detection precoce evite ces situations.
              </figcaption>
            </figure>
          </div>

          <h2 id="difference-merule">Pourriture cubique ou merule : comment les differencier ?</h2>
          <p>
            La merule est un champignon lignivore, mais toutes les pourritures cubiques ne sont pas de la merule. La
            distinction est importante car la merule est bien plus dangereuse et fait l&apos;objet d&apos;obligations legales.
          </p>
          <ul>
            <li><strong>La merule</strong> peut traverser la maconnerie grace a ses cordons (rhizomorphes), progresser dans l&apos;obscurite et sur de longues distances. Mycelium blanc cotonneux, fructification en galette rouille.</li>
            <li><strong>Le coniophore et les autres champignons</strong> restent en general confines a la zone humide et ne traversent pas les murs. Ils regressent si l&apos;humidite est supprimee.</li>
          </ul>
          <p>
            Seul un diagnostic professionnel permet d&apos;identifier avec certitude le champignon en cause. En cas de doute,
            envoyez-nous vos photos pour une pre-analyse.
          </p>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Ne confondez pas les deux</p>
            <p className={styles.alertText}>
              Un diagnostic errone peut couter cher : traiter une merule comme un simple coniophore laisse le champignon
              progresser. A l&apos;inverse, mobiliser un traitement lourd anti-merule pour un coniophore benin est un
              gaspillage. L&apos;identification precise est la premiere etape.
            </p>
          </div>

          <h2 id="causes">Les causes d&apos;apparition</h2>
          <p>
            Tous les champignons lignivores ont un point commun : ils ont besoin d&apos;<strong>humidite</strong>. Le bois
            sain et sec (moins de 20% d&apos;humidite) ne pourrit pas. Les causes typiques :
          </p>
          <ul>
            <li><strong>Fuite ou infiltration</strong> &mdash; Toiture, gouttiere, plomberie</li>
            <li><strong>Remontees capillaires</strong> &mdash; Humidite qui monte depuis le sol dans les murs</li>
            <li><strong>Mauvaise ventilation</strong> &mdash; Vide sanitaire ou cave non ventiles</li>
            <li><strong>Condensation</strong> &mdash; Isolation mal posee, absence de VMC</li>
            <li><strong>Contact bois-sol</strong> &mdash; Bois en contact direct avec de la maconnerie humide</li>
          </ul>

          <h2 id="traitement">Traitements et solutions</h2>
          <h3>1. Diagnostic et identification</h3>
          <p>
            Identifier le champignon, mesurer l&apos;etendue des degats et localiser la source d&apos;humidite. Etape
            indispensable avant toute intervention.
          </p>
          <h3>2. Supprimer la source d&apos;humidite</h3>
          <p>
            C&apos;est la cle : sans assechement, aucun traitement ne tient. Reparation des fuites, ventilation, drainage,
            traitement des remontees capillaires.
          </p>
          <h3>3. Depose des bois trop atteints</h3>
          <p>
            Les elements ayant perdu leur resistance mecanique sont retires avec une marge de securite au-dela de la zone
            visiblement touchee.
          </p>
          <h3>4. Traitement fongicide</h3>
          <p>
            Application ou injection de produits fongicides agrees sur les bois conserves et les maconneries concernees.
          </p>
          <h3>5. Renforcement ou remplacement</h3>
          <p>
            Les bois retires sont remplaces par des bois traites classe adaptee, ou renforces par des techniques de
            structure (moises, protheses).
          </p>

          <h2 id="prevention">Prevention</h2>
          <ul>
            <li><strong>Maitriser l&apos;humidite</strong> &mdash; Garder les bois en dessous de 18-20% d&apos;humidite</li>
            <li><strong>Ventiler</strong> &mdash; Caves, vides sanitaires, combles doivent respirer</li>
            <li><strong>Reparer vite</strong> &mdash; Toute infiltration doit etre traitee sans attendre</li>
            <li><strong>Eviter le contact bois-maconnerie humide</strong> &mdash; Isoler les bois des supports humides</li>
            <li><strong>Inspecter</strong> &mdash; Surveiller les zones sombres et humides une a deux fois par an</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Un bois qui brunit ou s&apos;effrite ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez un pre-diagnostic par IA en quelques minutes. Notre analyse vous indiquera
              s&apos;il s&apos;agit d&apos;une pourriture et si une intervention d&apos;expert est necessaire.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos maintenant
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/merule" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>La merule</p>
                <p className={styles.relatedCardDesc}>Le champignon lignivore le plus destructeur. Apprenez a le distinguer des autres pourritures.</p>
              </Link>
              <Link href="/guide/humidite" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Problemes d&apos;humidite</p>
                <p className={styles.relatedCardDesc}>L&apos;humidite est la cause premiere de toutes les pourritures du bois.</p>
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
