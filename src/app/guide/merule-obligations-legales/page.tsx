import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "../guide.module.css";

export const metadata: Metadata = {
  title: "Merule : obligations legales et que faire lors d'une vente | DIAGNOSTIC-BOIS.COM",
  description: "Merule et vente immobiliere : obligation d'information, zones a risque delimitees par arrete prefectoral, responsabilite du vendeur, vices caches. Que faire en cas de merule. Expert bois depuis 2006.",
  keywords: ["merule obligation vente", "merule zone a risque", "declaration merule", "merule vice cache", "arrete prefectoral merule", "responsabilite vendeur merule", "que faire merule"],
  openGraph: {
    title: "Merule : obligations legales et que faire",
    description: "Tout savoir sur les obligations legales liees a la merule lors d'une vente immobiliere. Guide expert.",
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

const faqItems = [
  {
    q: "La merule doit-elle etre declaree lors d'une vente immobiliere ?",
    a: "Oui. Lorsque le bien est situe dans une zone delimitee par un arrete prefectoral comme a risque de merule, le vendeur a l'obligation d'informer l'acheteur par une declaration annexee a l'acte de vente (article L.133-9 du Code de la construction et de l'habitation). Meme hors zone, le vendeur qui connait la presence de merule doit l'indiquer sous peine de vice cache.",
  },
  {
    q: "Comment savoir si je suis en zone a risque merule ?",
    a: "Les zones a risque sont delimitees par arrete prefectoral, departement par departement. Vous pouvez vous renseigner aupres de votre prefecture, de votre mairie ou d'un professionnel du diagnostic. De nombreux departements de l'Ouest et du Nord de la France sont concernes.",
  },
  {
    q: "Existe-t-il un diagnostic merule obligatoire comme le diagnostic termites ?",
    a: "Il n'existe pas encore de diagnostic merule obligatoire generalise equivalent a l'etat termites. En revanche, l'information sur le risque merule est obligatoire en zone delimitee. Un diagnostic ou une expertise reste fortement recommande en cas de doute ou de signes d'humidite.",
  },
  {
    q: "Que risque un vendeur qui cache une merule ?",
    a: "Le vendeur qui dissimule une infestation connue s'expose a une action pour vice cache : l'acheteur peut demander l'annulation de la vente ou une reduction du prix, ainsi que des dommages et interets. La bonne foi et la transparence sont donc essentielles.",
  },
  {
    q: "Qui paie le traitement de la merule, vendeur ou acheteur ?",
    a: "Cela depend de l'accord entre les parties. Si la merule est decouverte avant la vente, elle est generalement traitee par le vendeur ou negociee dans le prix. Si elle est decouverte apres, et qu'elle etait anterieure a la vente et cachee, la responsabilite du vendeur peut etre engagee.",
  },
];

export default function MeruleObligationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
          }),
        }}
      />

      <nav className={styles.breadcrumb}>
        <Link href="/">Accueil</Link> &gt; <Link href="/guide">Guide</Link> &gt; Merule : obligations legales
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <span className={styles.articleTag} style={{ background: "#dc2626" }}>Reglementation</span>
          <h1 className={styles.articleTitle}>Merule : obligations legales et que faire</h1>
          <p className={styles.articleMeta}>
            Guide complet par ACO-HABITAT — Expert diagnostic bois depuis 2006
          </p>
        </header>

        <Image
          src="/realisations/merule-mur.jpeg"
          alt="Merule developpee sur un mur - pathologie soumise a obligation d'information lors d'une vente"
          width={1200}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.articleContent}>
          <div className={styles.toc}>
            <p className={styles.tocTitle}>Sommaire</p>
            <ol className={styles.tocList}>
              <li><a href="#pourquoi">Pourquoi la merule est encadree par la loi</a></li>
              <li><a href="#obligation">L&apos;obligation d&apos;information du vendeur</a></li>
              <li><a href="#zones">Les zones a risque et arretes prefectoraux</a></li>
              <li><a href="#vice-cache">Merule et vice cache</a></li>
              <li><a href="#que-faire">Que faire si vous decouvrez une merule</a></li>
              <li><a href="#faq">Questions frequentes</a></li>
            </ol>
          </div>

          <h2 id="pourquoi">Pourquoi la merule est encadree par la loi</h2>
          <p>
            La <strong>merule pleureuse</strong> est le seul champignon lignivore a faire l&apos;objet d&apos;un
            encadrement legal specifique en France. La raison : sa capacite a detruire une habitation, a se propager aux
            biens voisins et le cout considerable de son traitement. Le legislateur a donc instaure une
            <strong> obligation d&apos;information</strong> pour proteger les acheteurs.
          </p>
          <p>
            Le cadre repose principalement sur la <strong>loi ALUR de 2014</strong> et sur les articles L.133-7 a L.133-9
            du Code de la construction et de l&apos;habitation.
          </p>

          <div className={styles.alertBox}>
            <p className={styles.alertTitle}>A retenir</p>
            <p className={styles.alertText}>
              Si votre bien se trouve dans une zone declaree a risque par arrete prefectoral, vous avez l&apos;obligation
              legale d&apos;informer l&apos;acheteur du risque merule au moment de la vente. Cette information est annexee
              a l&apos;acte de vente.
            </p>
          </div>

          <h2 id="obligation">L&apos;obligation d&apos;information du vendeur</h2>
          <p>
            Concretement, deux situations :
          </p>
          <ul>
            <li><strong>En zone a risque delimitee</strong> &mdash; Le vendeur doit joindre une <strong>declaration d&apos;information sur le risque merule</strong> a la promesse et a l&apos;acte de vente. C&apos;est une obligation, meme en l&apos;absence de merule constatee.</li>
            <li><strong>Hors zone, mais merule connue</strong> &mdash; Meme sans obligation formelle, le vendeur qui a connaissance d&apos;une infestation doit la declarer. Le silence peut etre qualifie de dissimulation.</li>
          </ul>
          <p>
            L&apos;occupant (proprietaire ou locataire) qui constate la presence de merule est par ailleurs invite a en
            faire la <strong>declaration en mairie</strong> dans les zones concernees.
          </p>

          <h2 id="zones">Les zones a risque et arretes prefectoraux</h2>
          <p>
            Les zones a risque sont definies <strong>departement par departement</strong>, par arrete prefectoral. Elles
            correspondent aux secteurs ou des foyers de merule ont ete identifies. Les regions les plus concernees sont
            l&apos;<strong>Ouest</strong> (Bretagne, Normandie, Pays de la Loire) et le <strong>Nord</strong>, en raison de
            leur climat humide.
          </p>
          <p>
            Pour savoir si un bien est concerne, renseignez-vous aupres de la <strong>prefecture</strong>, de la
            <strong> mairie</strong> ou d&apos;un professionnel du diagnostic. La liste des communes evolue au fil des
            arretes.
          </p>

          <div className={styles.imageGallery}>
            <figure className={styles.imageCard}>
              <Image
                src="/realisations/merule-mur.jpeg"
                alt="Champignon merule sur un mur, signe d'une infestation a declarer"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Infestation visible</strong>
                Une merule constatee doit etre signalee a l&apos;acheteur et declaree en mairie en zone concernee.
              </figcaption>
            </figure>
            <figure className={styles.imageCard}>
              <Image
                src="/images/pathologies/effondrement-plafond-merule.jpg"
                alt="Degats structurels causes par une merule non traitee sur un plafond"
                width={600}
                height={400}
              />
              <figcaption className={styles.imageCaption}>
                <strong>Enjeu financier</strong>
                Les couts de traitement expliquent l&apos;encadrement legal : proteger l&apos;acheteur d&apos;une mauvaise surprise.
              </figcaption>
            </figure>
          </div>

          <h2 id="vice-cache">Merule et vice cache</h2>
          <p>
            Si une merule anterieure a la vente et <strong>cachee par le vendeur</strong> est decouverte apres
            l&apos;achat, l&apos;acheteur peut invoquer la garantie des <strong>vices caches</strong> (articles 1641 et
            suivants du Code civil). Il peut alors demander :
          </p>
          <ul>
            <li>L&apos;<strong>annulation de la vente</strong> (action redhibitoire), avec restitution du prix ;</li>
            <li>Ou une <strong>reduction du prix</strong> (action estimatoire) ;</li>
            <li>Des <strong>dommages et interets</strong> si la mauvaise foi du vendeur est etablie.</li>
          </ul>
          <p>
            A l&apos;inverse, un vendeur transparent qui a informe et, si possible, fait traiter, se protege
            juridiquement. La <strong>transparence est la meilleure protection</strong> des deux cotes.
          </p>

          <div className={styles.alertBox + " " + styles.warning}>
            <p className={styles.alertTitle}>Conseil</p>
            <p className={styles.alertText}>
              Avant d&apos;acheter ou de vendre un bien ancien en region humide, faites verifier les zones sensibles
              (caves, vides sanitaires, planchers bas, dessous d&apos;escaliers). Un pre-diagnostic evite des litiges
              couteux apres la signature.
            </p>
          </div>

          <h2 id="que-faire">Que faire si vous decouvrez une merule</h2>
          <ol>
            <li><strong>Ne pas paniquer, mais agir vite</strong> &mdash; La merule progresse, chaque semaine compte.</li>
            <li><strong>Identifier et documenter</strong> &mdash; Photographiez les zones touchees. Un pre-diagnostic permet de confirmer qu&apos;il s&apos;agit bien de merule.</li>
            <li><strong>Rechercher la source d&apos;humidite</strong> &mdash; Fuite, infiltration, remontee capillaire : c&apos;est la cause a supprimer.</li>
            <li><strong>Faire etablir un diagnostic professionnel</strong> &mdash; Pour mesurer l&apos;etendue reelle et definir le traitement.</li>
            <li><strong>Declarer si necessaire</strong> &mdash; En mairie dans les zones concernees, et a l&apos;acheteur en cas de vente.</li>
            <li><strong>Faire traiter par un professionnel</strong> &mdash; Le traitement de la merule ne s&apos;improvise pas.</li>
          </ol>

          <h2 id="faq">Questions frequentes</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>

          <div className={styles.ctaBox}>
            <h3 className={styles.ctaBoxTitle}>Un doute avant d&apos;acheter ou de vendre ?</h3>
            <p className={styles.ctaBoxText}>
              Envoyez vos photos et recevez un pre-diagnostic par IA en quelques minutes. Une premiere reponse claire
              avant d&apos;engager une expertise ou une transaction.
            </p>
            <Link href="/#formulaire" className={styles.ctaBoxBtn}>
              Analyser mes photos maintenant
            </Link>
          </div>

          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
            Cet article est fourni a titre d&apos;information generale et ne constitue pas un conseil juridique. Pour votre
            situation precise, rapprochez-vous d&apos;un notaire ou d&apos;un professionnel du droit immobilier.
          </p>

          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Articles connexes</h3>
            <div className={styles.relatedGrid}>
              <Link href="/guide/merule" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>La merule : le guide complet</p>
                <p className={styles.relatedCardDesc}>Identifier, traiter et prevenir le champignon le plus destructeur.</p>
              </Link>
              <Link href="/guide/diagnostic-bois-normandie" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Diagnostic bois en Normandie</p>
                <p className={styles.relatedCardDesc}>Une des regions les plus concernees par le risque merule.</p>
              </Link>
              <Link href="/guide/faq" className={styles.relatedCard}>
                <p className={styles.relatedCardTitle}>Questions frequentes</p>
                <p className={styles.relatedCardDesc}>Toutes les reponses sur le diagnostic et le traitement du bois.</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
