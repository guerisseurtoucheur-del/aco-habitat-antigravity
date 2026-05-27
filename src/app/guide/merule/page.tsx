import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "La Merule : identification, traitement et prevention | DIAGNOSTIC-BOIS.COM",
  description: "Guide complet sur la merule pleureuse (Serpula lacrymans). Comment identifier ce champignon destructeur, les signes d'infestation, les traitements et la prevention. Expert bois depuis 2006.",
  keywords: ["merule", "merule pleureuse", "champignon bois", "serpula lacrymans", "traitement merule", "diagnostic merule", "champignon maison"],
  openGraph: {
    title: "La Merule : le guide complet",
    description: "Tout savoir sur la merule pleureuse : identification, traitement, prevention. Guide expert.",
    type: "article",
  },
};

export default function MerulePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "La Merule : identification, traitement et prevention",
            "description": "Guide complet sur la merule pleureuse, le champignon le plus devastateur pour les habitations",
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
            "datePublished": "2024-01-15",
            "dateModified": "2026-05-26"
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Merule
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#ef4444" }}>Champignon</span>
          <h1 className={styles.articleTitle}>La Merule : le champignon qui devore les maisons</h1>
          <p className={styles.articleMeta}>
            Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006
          </p>
        </header>

        <Image 
          src="/images/pathologies/merule-mycelium-actif.jpg" 
          alt="Mycelium actif de merule pleureuse - filaments blancs caracteristiques sur mur de cave" 
          width={1200} 
          height={400} 
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <div className={styles.toc}>
            <p className={styles.tocTitle}>Sommaire</p>
            <ol className={styles.tocList}>
              <li><a href="#quest-ce-que">Qu&apos;est-ce que la merule ?</a></li>
              <li><a href="#identifier">Comment identifier la merule ?</a></li>
              <li><a href="#causes">Les causes d&apos;apparition</a></li>
              <li><a href="#dangers">Les dangers pour votre habitation</a></li>
              <li><a href="#traitement">Traitements et solutions</a></li>
              <li><a href="#prevention">Prevention</a></li>
              <li><a href="#cout">Cout d&apos;un traitement</a></li>
            </ol>
          </div>

          <h2 id="quest-ce-que">Qu&apos;est-ce que la merule ?</h2>
          <p>
            La <strong>merule pleureuse</strong> (Serpula lacrymans) est un champignon lignivore considere comme le plus 
            destructeur pour les habitations en Europe. Surnommee &quot;la lepre des maisons&quot;, elle se nourrit de la 
            cellulose du bois et peut progresser de plusieurs centimetres par semaine dans des conditions optimales.
          </p>
          <p>
            Ce champignon est particulierement redoute car il peut traverser les murs, se developper dans l&apos;obscurite 
            et rester invisible pendant des mois avant que les degats ne deviennent apparents. Quand les signes sont 
            visibles, la structure est souvent deja gravement compromise.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>Urgence : la merule est un probleme grave</p>
            <p className={styles.alertText}>
              Une infestation de merule non traitee peut rendre une maison inhabitable en quelques annees. 
              En France, c&apos;est l&apos;une des rares pathologies du bois qui fait l&apos;objet d&apos;une obligation de 
              declaration lors de la vente d&apos;un bien immobilier dans les zones a risque.
            </p>
          </div>

          <h2 id="identifier">Comment identifier la merule ?</h2>
          <p>
            La detection precoce est essentielle. Voici les signes caracteristiques d&apos;une infestation de merule :
          </p>

          <h3>Signes visuels</h3>
          <ul>
            <li><strong>Filaments blancs (mycelium)</strong> — Des fils blancs cotonneux qui ressemblent a de la toile d&apos;araignee sur les murs ou le bois</li>
            <li><strong>Carpophore</strong> — Un corps fructifere en forme de crepe ou de galette, de couleur rouille/orange au centre et blanc sur les bords</li>
            <li><strong>Bois cubique</strong> — Le bois infeste se fissure en petits cubes caracteristiques (pourriture cubique)</li>
            <li><strong>Poudre rousse</strong> — Des spores de couleur rouille qui se deposent sur les surfaces</li>
          </ul>

          <h3>Signes indirects</h3>
          <ul>
            <li><strong>Odeur de champignon</strong> — Une odeur caracteristique de moisi, de cave humide</li>
            <li><strong>Gondolement des surfaces</strong> — Planchers qui s&apos;affaissent, plinthes qui se deforment</li>
            <li><strong>Peinture qui cloque</strong> — Des cloques ou decollements de peinture sans cause apparente</li>
            <li><strong>Bois qui s&apos;effrite</strong> — Le bois devient friable et s&apos;effrite au toucher</li>
          </ul>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/merule-mur-cave-1.jpg" 
                alt="Taches oranges de merule sur mur en pierre de cave - stade initial d'infestation" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Stade initial</strong>
                Taches jaunes-oranges caracteristiques sur mur en pierre. Intervention urgente recommandee.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/merule-mur-cave-2.jpg" 
                alt="Merule en developpement sur mur de cave avec traces d'humidite et efflorescences" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Stade avance</strong>
                Merule en expansion avec mycelium blanc visible et taches orangees etendues.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image 
                src="/images/pathologies/effondrement-plafond-merule.jpg" 
                alt="Effondrement de plafond cause par une attaque severe de merule - degats structurels" 
                width={600} 
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Degats structurels</strong>
                Effondrement de plafond du a une attaque non traitee. Le bois a perdu toute resistance.
              </figcaption>
            </figure>
          </div>

          <h2 id="causes">Les causes d&apos;apparition de la merule</h2>
          <p>
            La merule a besoin de conditions specifiques pour se developper :
          </p>
          <ul>
            <li><strong>Humidite elevee</strong> — Taux d&apos;humidite du bois superieur a 20-22%</li>
            <li><strong>Temperature moderee</strong> — Entre 20°C et 26°C (temperature ideale)</li>
            <li><strong>Obscurite</strong> — La merule fuit la lumiere</li>
            <li><strong>Manque de ventilation</strong> — L&apos;air confine favorise son developpement</li>
            <li><strong>Presence de bois</strong> — Cellulose comme source de nourriture</li>
          </ul>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Les situations a risque</p>
            <p className={styles.alertText}>
              Fuite d&apos;eau non reparee, remontees capillaires, mauvaise ventilation du vide sanitaire, 
              condensation excessive, travaux d&apos;isolation sans VMC... Ces situations creent un environnement 
              propice au developpement de la merule.
            </p>
          </div>

          <h2 id="dangers">Les dangers pour votre habitation</h2>
          <p>
            La merule est capable de :
          </p>
          <ul>
            <li>Detruire completement les structures porteuses (charpente, planchers, escaliers)</li>
            <li>Traverser les murs de maconnerie grace a ses cordons (rhizomorphes)</li>
            <li>Se propager aux habitations voisines</li>
            <li>Rendre une maison inhabitable et invendable</li>
          </ul>
          <p>
            Sur le plan sanitaire, les spores de merule peuvent provoquer des <strong>reactions allergiques</strong> et 
            des problemes respiratoires chez les personnes sensibles.
          </p>

          <h2 id="traitement">Traitements et solutions</h2>
          <p>
            Le traitement de la merule est une operation complexe qui doit etre realisee par des professionnels 
            certifies. Il comprend generalement :
          </p>

          <h3>1. Diagnostic complet</h3>
          <p>
            Un expert doit evaluer l&apos;etendue de l&apos;infestation, identifier toutes les zones touchees et 
            determiner la source d&apos;humidite. C&apos;est une etape cruciale.
          </p>

          <h3>2. Traitement de la source d&apos;humidite</h3>
          <p>
            Sans eliminer la cause de l&apos;humidite, tout traitement sera inefficace. Reparation des fuites, 
            installation d&apos;une ventilation, drainage, etc.
          </p>

          <h3>3. Elimination mecanique</h3>
          <p>
            Retrait de tous les bois infestes avec une marge de securite d&apos;au moins 1 metre au-dela des 
            parties visiblement touchees. Brossage des murs, evacuation des gravats contamines.
          </p>

          <h3>4. Traitement chimique</h3>
          <p>
            Application de fongicides agrees sur les maconneries et les bois restants. Injection dans les 
            murs si necessaire.
          </p>

          <h3>5. Reconstruction</h3>
          <p>
            Remplacement des elements detruits par des bois traites classe 4 ou des materiaux imputrescibles.
          </p>

          <h2 id="prevention">Prevention : eviter l&apos;apparition de la merule</h2>
          <ul>
            <li><strong>Ventiler</strong> — Assurer une bonne circulation d&apos;air dans toutes les pieces, notamment les caves et vides sanitaires</li>
            <li><strong>Controler l&apos;humidite</strong> — Maintenir un taux d&apos;humidite interieur inferieur a 60%</li>
            <li><strong>Reparer rapidement les fuites</strong> — Ne jamais laisser une infiltration d&apos;eau non traitee</li>
            <li><strong>Inspecter regulierement</strong> — Verifier les zones sombres et humides (caves, greniers, dessous d&apos;escaliers)</li>
            <li><strong>Traiter les bois</strong> — Utiliser des bois traites pour les constructions neuves ou les renovations</li>
          </ul>

          <h2 id="cout">Cout d&apos;un traitement anti-merule</h2>
          <p>
            Le cout d&apos;un traitement varie considerablement selon l&apos;etendue de l&apos;infestation :
          </p>
          <ul>
            <li><strong>Diagnostic</strong> : 200 a 500 euros</li>
            <li><strong>Traitement localise</strong> : 3 000 a 8 000 euros</li>
            <li><strong>Traitement etendu</strong> : 15 000 a 50 000 euros</li>
            <li><strong>Cas severe avec reconstruction</strong> : 50 000 a 150 000 euros ou plus</li>
          </ul>
          <p>
            D&apos;ou l&apos;importance d&apos;une <strong>detection precoce</strong>. Plus vous agissez tot, moins le 
            traitement sera couteux.
          </p>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Un doute sur la presence de merule ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez un pre-diagnostic par IA en quelques minutes. 
              Notre analyse vous indiquera si une intervention d&apos;expert est necessaire.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos maintenant
            </Link>
          </div>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/humidite" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Problemes d&apos;humidite</p>
                <p className={styles.relatedCardDesc}>L&apos;humidite est la cause principale d&apos;apparition de la merule. Apprenez a la controler.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-bretagne" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Diagnostic bois en Bretagne</p>
                <p className={styles.relatedCardDesc}>Region a haut risque merule en raison du climat oceanique humide.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-normandie" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Diagnostic bois en Normandie</p>
                <p className={styles.relatedCardDesc}>La Normandie est l&apos;une des regions les plus touchees par la merule en France.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
