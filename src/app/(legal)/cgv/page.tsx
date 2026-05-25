import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Conditions générales de vente — DIAGNOSTIC-BOIS",
  description:
    "Conditions générales du service de pré-analyse par image DIAGNOSTIC-BOIS : phase gratuite, qualification commerciale, livraison du rapport PDF, médiation.",
};

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.placeholder}>{children}</span>
);

export default function CgvPage() {
  return (
    <article>
      <div className={styles.titleBlock}>
        <span className={styles.kicker}>Conditions générales de vente</span>
        <h1 className={styles.title}>Conditions générales de vente</h1>
        <p className={styles.lastUpdate}>Version 1.1 — En vigueur au 6 mai 2026</p>
      </div>

      <p className={styles.lead}>
        Les présentes conditions générales de vente (ci-après «&nbsp;CGV&nbsp;»)
        régissent les relations contractuelles entre <strong>DIAGNOSTIC-BOIS</strong>
        {" "}(ci-après «&nbsp;le Prestataire&nbsp;») et toute personne physique majeure,
        consommateur au sens du Code de la consommation, utilisant le service gratuit de
        pré-analyse par image (ci-après «&nbsp;le Client&nbsp;»).
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 1 — Objet</h2>
        <p>
          Les présentes CGV ont pour objet de définir les modalités de souscription,
          de réalisation et de livraison du service de pré-analyse par
          image proposé par DIAGNOSTIC-BOIS dans sa version actuelle gratuite.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 2 — Description du service
        </h2>
        <p>
          Le service consiste en l&apos;analyse automatisée par intelligence
          artificielle de photographies fournies par le Client, portant sur les
          pathologies du bois (insectes xylophages, champignons lignivores) et les
          désordres liés à l&apos;humidité (infiltrations, remontées capillaires,
          condensation).
        </p>
        <p>
          À l&apos;issue de l&apos;analyse, le Client reçoit un{" "}
          <strong>rapport au format PDF</strong> consolidant les constats observés,
          des recommandations de vérification et un avertissement réglementaire.
        </p>
        <div className={styles.warning}>
          <strong>Avertissement essentiel.</strong> Le rapport délivré est un
          <strong> document d&apos;aide à la pré-analyse à valeur informative</strong>.
          Il <strong>ne constitue pas</strong> un diagnostic immobilier réglementé au
          sens du Code de la construction et de l&apos;habitation, ni un état
          parasitaire conforme à la norme NF P 03-200, ni une expertise au sens
          juridique. Il ne se substitue en aucun cas à l&apos;intervention sur place
          d&apos;un spécialiste certifié COFRAC. Le Client reconnaît avoir pris
          connaissance de cette limitation avant utilisation du service.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 3 — Acceptation des CGV
        </h2>
        <p>
          La validation du dossier d&apos;analyse implique l&apos;acceptation pleine et entière
          par le Client des présentes CGV, qu&apos;il déclare avoir lues et acceptées
          sans réserve. Le Client coche une case attestant qu&apos;il a pris connaissance des CGV et de la politique de
          confidentialité avant le lancement de l&apos;analyse IA.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 4 — Tarif</h2>
        <p>
          Le service de pré-analyse par image tel que proposé sur la Plateforme est{" "}
          <strong>gratuit</strong> au titre de la phase actuelle d&apos;ouverture : aucune
          contrepartie pécuniaire n&apos;est due pour la génération du rapport PDF
          accessible après analyse IA.
        </p>
        <p>
          Cette gratuité permet au Prestataire de{" "}
          <strong>qualifier les besoins</strong> du Client et, avec son consentement, de
          lui proposer des prestations complémentaires (intervention terrain, devis,
          rendez-vous téléphonique) dans un cadre commercial séparé, conformément au RGPD.
        </p>
        <p>
          Le Prestataire se réserve le droit d&apos;instaurer à tout moment une tarification
          ou une offre freemium : tout utilisateur en sera informé avant tout paiement
          éventuel, avec mise à jour des présentes CGV et réinformation préalable.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 5 — Modalités de commande</h2>
        <p>Le processus comprend les étapes suivantes :</p>
        <ul>
          <li>chargement par le Client d&apos;une à quatre photographies&nbsp;;</li>
          <li>renseignement des coordonnées du Client&nbsp;;</li>
          <li>acceptation expresse des présentes CGV et de la politique de confidentialité&nbsp;;</li>
          <li>
            confirmation du consentement au transfert des données vers le sous-traitant IA{" "}
            (Anthropic) tel que décrit dans la politique de confidentialité&nbsp;;
          </li>
          <li>déclenchement automatique de l&apos;analyse IA&nbsp;;</li>
          <li>mise à disposition du rapport PDF dans l&apos;espace du Client.</li>
        </ul>
        <p>
          La validation du dossier d&apos;analyse emporte formation du contrat entre le Client
          et DIAGNOSTIC-BOIS.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 6 — Paiement</h2>
        <p>
          Dans la phase actuelle du service, <strong>aucun paiement n&apos;est requis</strong>.
          Aucune donnée de carte bancaire n&apos;est collectée ni traitée par DIAGNOSTIC-BOIS pour la seule pré-analyse gratuite.
        </p>
        <p>
          À titre prévisionnel, si une ou plusieurs prestations payantes sont ultérieurement proposées sur la Plateforme,
          les paiements pourront être traités via un prestataire agréé tel que{" "}
          <strong>Stripe Payments Europe Limited</strong>, sous réserve d&apos;acceptation anticipée par le Client et de la publication de CGV mises à jour.
          Les modalités seront alors précisées avant tout encaissement.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 7 — Livraison du rapport</h2>
        <p>
          Le rapport PDF est généré automatiquement à l&apos;issue de l&apos;analyse
          IA, dans un délai indicatif de <strong>plusieurs minutes</strong> à compter de la validation du dossier.
          Le Client peut le télécharger depuis son espace ou le recevoir par email lorsque cette fonctionnalité est activée.
        </p>
        <p>
          En cas de dysfonctionnement prolongé imputable au Prestataire, le Client peut contacter le service client à{" "}
          <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>.
          En l&apos;absence de prix payé pour la phase gratuite, aucune indemnité pécuniaire de remboursement n&apos;est due ;
          le Prestataire s&apos;efforcera néanmoins de rétablir le service ou de régénérer le rapport dans un délai raisonnable.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 8 — Droit de rétractation et données personnelles
        </h2>
        <p>
          La présente prestation étant fournie <strong>à titre gratuit</strong>, les mécanismes de rétractation liés à un
          paiement en ligne ne s&apos;appliquent pas dans les mêmes termes qu&apos;à une vente à titre onéreux.
          Le Client conserve toutefois ses droits sur ses données personnelles conformément au RGPD et à la{" "}
          <a href="/confidentialite">politique de confidentialité</a> (accès, rectification, effacement, opposition, etc.).
        </p>
        <div className={styles.warning}>
          <strong>Contenu numérique à exécution immédiate.</strong>{" "}
          Si la réglementation applicable impose une information sur le droit de rétractation pour une prestation numérique,
          le Client reconnaît que la fourniture du rapport peut intervenir immédiatement après validation du dossier.
          Tant que le rapport n&apos;a pas été généré, le Client peut abandonner la procédure sans aucune obligation financière.
        </div>
        <p>
          Pour l&apos;effacement des données ou toute réclamation, écrire à{" "}
          <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 9 — Garanties légales
        </h2>
        <p>
          Le Client bénéficie de plein droit et sans frais supplémentaire,
          indépendamment de toute garantie commerciale, des garanties légales prévues
          par les articles L.217-3 et suivants du Code de la consommation (garantie
          de conformité) et les articles 1641 à 1649 du Code civil (garantie des
          vices cachés).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 10 — Limitation de responsabilité
        </h2>
        <p>
          Le rapport délivré est généré par un système d&apos;intelligence
          artificielle à partir des seules photographies fournies par le Client. Sa
          fiabilité dépend directement de la qualité, de la cadrage et de la
          représentativité des photographies envoyées. DIAGNOSTIC-BOIS ne peut garantir
          l&apos;exactitude absolue ni l&apos;exhaustivité des constats du rapport.
        </p>
        <p>
          Le rapport <strong>n&apos;a pas valeur de diagnostic réglementé</strong> et{" "}
          <strong>n&apos;est pas opposable à un tiers</strong> (assureur, notaire,
          juge, expert judiciaire, autorité administrative) sans validation
          ultérieure par un spécialiste certifié intervenant sur place.
        </p>
        <p>
          DIAGNOSTIC-BOIS ne peut être tenu pour responsable :
        </p>
        <ul>
          <li>
            des décisions techniques, financières, juridiques ou contractuelles que
            le Client prendrait sur la seule base du rapport&nbsp;;
          </li>
          <li>
            des conséquences d&apos;une utilisation du rapport dans le cadre
            d&apos;une transaction immobilière, d&apos;une déclaration de sinistre ou
            d&apos;une procédure contentieuse&nbsp;;
          </li>
          <li>
            des dommages indirects, immatériels ou consécutifs (perte
            d&apos;exploitation, perte de chance, préjudice commercial)&nbsp;;
          </li>
          <li>
            des défaillances temporaires liées à la disponibilité des fournisseurs
            d&apos;intelligence artificielle utilisés (notamment Anthropic, PBC).
          </li>
        </ul>
        <p>
          À titre gratuit, la responsabilité globale d&apos;DIAGNOSTIC-BOIS au titre des présentes est,
          sauf faute lourde ou dol, limitée à{" "}
          <strong>cent euros (100&nbsp;€)</strong> par dossier pour les seuls préjudices directs prouvés,
          dans les conditions du droit français.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 11 — Service client</h2>
        <p>
          Toute demande peut être adressée au service client&nbsp;:
        </p>
        <ul>
          <li>
            par email&nbsp;:{" "}
            <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>
          </li>
          <li>
            par téléphone&nbsp;:{" "}
            <a href="tel:+33233311979">02 33 31 19 79</a>
          </li>
          <li>
            par courrier&nbsp;: DIAGNOSTIC-BOIS — 18 rue Bernard Palissy, 61000
            Alençon, France
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 12 — Médiation de la consommation
        </h2>
        <p>
          Conformément aux articles L.611-1 et suivants du Code de la consommation,
          le Client a le droit, en cas de litige n&apos;ayant pu être résolu de manière
          amiable directement avec DIAGNOSTIC-BOIS, de recourir gratuitement à un
          médiateur de la consommation.
        </p>
        <p>
          Le médiateur de la consommation désigné par DIAGNOSTIC-BOIS est&nbsp;:
        </p>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <td>Médiateur</td>
              <td>
                <Placeholder>Nom du médiateur À COMPLÉTER</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Adresse</td>
              <td>
                <Placeholder>Adresse postale À COMPLÉTER</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Site web</td>
              <td>
                <Placeholder>URL À COMPLÉTER</Placeholder>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.callout}>
          <span className={styles.calloutTitle}>
            Plateforme de Règlement en Ligne des Litiges
          </span>
          La Commission européenne met à disposition une plateforme de résolution
          des litiges en ligne accessible à l&apos;adresse{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Article 13 — Force majeure</h2>
        <p>
          DIAGNOSTIC-BOIS ne pourra être tenu pour responsable de l&apos;inexécution ou
          de la mauvaise exécution de l&apos;une de ses obligations résultant des
          présentes CGV en cas de force majeure au sens de l&apos;article 1218 du
          Code civil, et notamment en cas de catastrophe naturelle, conflit armé,
          décision étatique, défaillance d&apos;un fournisseur essentiel
          (notamment d&apos;intelligence artificielle ou d&apos;hébergement) ou
          interruption majeure des réseaux de télécommunications.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 14 — Données personnelles
        </h2>
        <p>
          Le traitement des données personnelles dans le cadre du service est décrit
          dans la <a href="/confidentialite">politique de confidentialité</a>, qui
          fait partie intégrante des présentes CGV.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 15 — Modification des CGV
        </h2>
        <p>
          DIAGNOSTIC-BOIS se réserve le droit de modifier les présentes CGV à tout moment.
          Les CGV applicables à une demande de pré-analyse sont celles en vigueur au jour de cette demande.
          Les nouvelles CGV s&apos;appliquent aux demandes postérieures à leur publication sur le site.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Article 16 — Loi applicable et juridiction
        </h2>
        <p>
          Les présentes CGV sont soumises au droit français. Tout litige relatif à
          leur interprétation, leur exécution ou leur résiliation, qui n&apos;aurait
          pu être résolu à l&apos;amiable ou par recours à la médiation, sera
          soumis aux juridictions compétentes selon les règles applicables au
          consommateur.
        </p>
      </section>
    </article>
  );
}
