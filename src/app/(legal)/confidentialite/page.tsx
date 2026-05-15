import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ACO-HABITAT",
  description:
    "Politique de confidentialité ACO-HABITAT : données collectées, finalités, durées de conservation, sous-traitants, transferts hors UE, droits RGPD.",
};

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.placeholder}>{children}</span>
);

export default function ConfidentialitePage() {
  return (
    <article>
      <div className={styles.titleBlock}>
        <span className={styles.kicker}>RGPD</span>
        <h1 className={styles.title}>Politique de confidentialité</h1>
        <p className={styles.lastUpdate}>Dernière mise à jour : 5 mai 2026</p>
      </div>

      <p className={styles.lead}>
        ACO-HABITAT attache une importance fondamentale à la protection des données
        personnelles. La présente politique décrit, en application du Règlement (UE)
        2016/679 du 27 avril 2016 (RGPD) et de la loi n° 78-17 du 6 janvier 1978
        modifiée «&nbsp;Informatique et Libertés&nbsp;», les conditions de collecte,
        de traitement, de conservation et de protection des données personnelles des
        utilisateurs.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Responsable de traitement</h2>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <td>Identité</td>
              <td>
                ACO-HABITAT (service de Traitement-bois.fr) —{" "}
                <Placeholder>forme juridique À COMPLÉTER</Placeholder>
              </td>
            </tr>
            <tr>
              <td>SIRET</td>
              <td>344 616 412 00062</td>
            </tr>
            <tr>
              <td>Adresse</td>
              <td>18 rue Bernard Palissy, 61000 Alençon, France</td>
            </tr>
            <tr>
              <td>Téléphone</td>
              <td>
                <a href="tel:+33233311979">02 33 31 19 79</a>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>
              </td>
            </tr>
            <tr>
              <td>Délégué à la protection des données (DPO)</td>
              <td>
                <Placeholder>Nom et email du DPO si désigné</Placeholder>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.callout}>
          <span className={styles.calloutTitle}>Désignation d&apos;un DPO</span>
          La désignation d&apos;un délégué à la protection des données n&apos;est
          obligatoire que dans certains cas (article 37 RGPD). Pour un service
          comme le vôtre, elle n&apos;est pas obligatoire mais reste recommandée
          si le volume de données traitées augmente.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Données personnelles collectées</h2>
        <p>
          Dans le cadre de l&apos;utilisation du service, ACO-HABITAT collecte les
          catégories de données suivantes&nbsp;:
        </p>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Données précises</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identité du Client</td>
              <td>Nom, prénom</td>
            </tr>
            <tr>
              <td>Coordonnées</td>
              <td>
                Adresse email, numéro de téléphone, adresse postale du bien analysé.
                Ces données peuvent être utilisées pour vous recontacter au sujet d&apos;une
                prestation complémentaire ou d&apos;un devis, conformément aux CGV et sous
                réserve de vos droits (opposition, désinscription).
              </td>
            </tr>
            <tr>
              <td>Newsletters (facultatif)</td>
              <td>
                Adresse email uniquement si vous vous inscrivez explicitement à une liste
                d&apos;envoi ou cochez une case dédiée — aucune newsletter implicite à la
                seule soumission d&apos;une pré-analyse.
              </td>
            </tr>
            <tr>
              <td>Données de paiement</td>
              <td>
                Dans la phase actuelle du service <strong>gratuit</strong>, aucune donnée de carte bancaire n&apos;est collectée.
                Si une offre payante est introduite ultérieurement, les paiements pourront être traités via{" "}
                <strong>Stripe Payments Europe Limited</strong> — voir alors la notice mise à jour et les documents publiés sur{" "}
                <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer">stripe.com/fr/privacy</a>.
              </td>
            </tr>
            <tr>
              <td>Photographies fournies</td>
              <td>
                Images de bois, charpente, cave ou pièces du logement,
                potentiellement assorties de métadonnées EXIF (date, géolocalisation,
                modèle d&apos;appareil)
              </td>
            </tr>
            <tr>
              <td>Données techniques</td>
              <td>
                Adresse IP, agent utilisateur (user-agent), horodatages de session,
                identifiants de session
              </td>
            </tr>
            <tr>
              <td>Rapport généré</td>
              <td>
                Texte du rapport, empreinte SHA-256, jeu d&apos;annotations IA,
                score de confiance
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Finalités et bases légales</h2>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Base légale (article 6 RGPD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exécution du service de pré-analyse par image</td>
              <td>Exécution du contrat (art. 6.1.b)</td>
            </tr>
            <tr>
              <td>Gestion de la facturation et de la comptabilité</td>
              <td>Obligation légale (art. 6.1.c)</td>
            </tr>
            <tr>
              <td>Service client et réponse aux demandes</td>
              <td>Exécution du contrat (art. 6.1.b)</td>
            </tr>
            <tr>
              <td>Sécurité du service et lutte contre la fraude</td>
              <td>Intérêt légitime (art. 6.1.f)</td>
            </tr>
            <tr>
              <td>
                Amélioration anonymisée du service et des modèles internes
                (statistiques)
              </td>
              <td>Intérêt légitime (art. 6.1.f), avec données anonymisées</td>
            </tr>
            <tr>
              <td>Qualification commerciale et relance</td>
              <td>
                Intérêt légitime du Prestataire (art. 6.1.f) pour répondre aux demandes de contact ou proposer une prestation terrain liée à votre dossier — vous pouvez vous opposer à tout moment à{" "}
                <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>.
              </td>
            </tr>
            <tr>
              <td>Envoi de newsletters ou d&apos;informations commerciales par email</td>
              <td>
                Consentement (art. 6.1.a) — désinscription possible à tout moment via le lien
                figurant dans chaque message ou à{" "}
                <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          4. Sous-traitants et destinataires
        </h2>
        <p>
          Vos données peuvent être transmises aux sous-traitants suivants, dans la
          stricte mesure nécessaire à la fourniture du service&nbsp;:
        </p>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Sous-traitant</th>
              <th>Rôle / Pays</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Anthropic, PBC</strong>
              </td>
              <td>
                Fournisseur du modèle d&apos;IA Claude utilisé pour l&apos;analyse
                des photographies. Les images sont transmises à Anthropic pour
                inférence puis non conservées par Anthropic au-delà de la durée
                d&apos;exécution. <strong>Pays : États-Unis (transfert hors UE)</strong>.
              </td>
            </tr>
            <tr>
              <td>
                <Placeholder>Hébergeur (Vercel, OVH, etc.)</Placeholder>
              </td>
              <td>
                <Placeholder>
                  Hébergement infrastructure et base de données. Pays À COMPLÉTER
                </Placeholder>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Stripe Payments Europe Limited</strong>
              </td>
              <td>
                <strong>Uniquement si</strong> une offre payante est activée&nbsp;: prestataire de paiement par carte.
                Siège social&nbsp;: The One Building, 1 Grand Canal Street Lower,
                Grand Canal Dock, Dublin 2, Irlande.
                <strong>Pays&nbsp;: Union européenne (Irlande).</strong> Hors offre payante, sous-traitant sans objet pour ce traitement.
              </td>
            </tr>
            <tr>
              <td>
                <Placeholder>Service email transactionnel (Postmark, Resend, etc.)</Placeholder>
              </td>
              <td>
                <Placeholder>Envoi des rapports par email. Pays À COMPLÉTER</Placeholder>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.warning}>
          <strong>Transferts hors Union européenne.</strong> L&apos;analyse IA
          repose sur les services d&apos;Anthropic, PBC, dont les serveurs sont
          situés aux États-Unis. Ces transferts sont encadrés par les{" "}
          <a
            href="https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en"
            target="_blank"
            rel="noopener noreferrer"
          >
            clauses contractuelles types
          </a>{" "}
          adoptées par la Commission européenne et, le cas échéant, par la décision
          d&apos;adéquation EU-US Data Privacy Framework du 10 juillet 2023. En
          utilisant le service, vous reconnaissez et acceptez ce transfert.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Durées de conservation</h2>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Durée de conservation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Photographies fournies</td>
              <td>
                <strong>30 jours</strong> à compter de la génération du rapport,
                puis suppression définitive
              </td>
            </tr>
            <tr>
              <td>Rapports générés (PDF)</td>
              <td>
                <strong>3 ans</strong> à compter de la génération, pour permettre au
                Client d&apos;y accéder a posteriori
              </td>
            </tr>
            <tr>
              <td>Coordonnées du Client (compte)</td>
              <td>
                Pendant toute la durée d&apos;utilisation du compte, puis{" "}
                <strong>3 ans</strong> en archivage intermédiaire
              </td>
            </tr>
            <tr>
              <td>Données de facturation</td>
              <td>
                <strong>10 ans</strong> conformément à l&apos;article L.123-22 du
                Code de commerce
              </td>
            </tr>
            <tr>
              <td>Adresses IP / journaux de connexion</td>
              <td>
                <strong>1 an</strong> conformément à la LCEN, à des fins de sécurité
                et de lutte contre la fraude
              </td>
            </tr>
            <tr>
              <td>Données de prospection commerciale</td>
              <td>
                <strong>3 ans</strong> à compter du dernier contact, ou jusqu&apos;au
                retrait du consentement
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          6. Vos droits sur vos données
        </h2>
        <p>
          Conformément aux articles 15 à 22 du RGPD, vous disposez à tout moment des
          droits suivants sur vos données personnelles&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Droit d&apos;accès</strong> — obtenir confirmation que des
            données vous concernant sont traitées et en obtenir une copie&nbsp;;
          </li>
          <li>
            <strong>Droit de rectification</strong> — corriger des données inexactes
            ou incomplètes&nbsp;;
          </li>
          <li>
            <strong>Droit à l&apos;effacement (droit à l&apos;oubli)</strong> —
            demander la suppression de vos données dans les conditions prévues par
            l&apos;article 17 RGPD&nbsp;;
          </li>
          <li>
            <strong>Droit à la limitation du traitement</strong>&nbsp;;
          </li>
          <li>
            <strong>Droit d&apos;opposition</strong> — vous opposer, pour des motifs
            légitimes, au traitement de vos données&nbsp;;
          </li>
          <li>
            <strong>Droit à la portabilité</strong> — recevoir vos données dans un
            format structuré, couramment utilisé et lisible par machine&nbsp;;
          </li>
          <li>
            <strong>Droit de retirer votre consentement</strong> à tout moment,
            lorsqu&apos;il est la base du traitement&nbsp;;
          </li>
          <li>
            <strong>
              Droit de définir des directives sur le sort de vos données après votre
              décès
            </strong>{" "}
            (article 85 de la loi Informatique et Libertés).
          </li>
        </ul>
        <div className={styles.callout}>
          <span className={styles.calloutTitle}>Comment exercer vos droits&nbsp;?</span>
          Toute demande peut être adressée par email à{" "}
          <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a> ou par
          courrier à ACO-HABITAT — 18 rue Bernard Palissy, 61000 Alençon, France.
          Une réponse vous sera apportée dans un délai d&apos;un mois maximum à
          compter de la réception de la demande. Une copie de votre pièce d&apos;identité
          pourra vous être demandée en cas de doute raisonnable sur votre identité.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          7. Réclamation auprès de la CNIL
        </h2>
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits Informatique
          et Libertés ne sont pas respectés, vous pouvez adresser une réclamation à
          la Commission Nationale de l&apos;Informatique et des Libertés (CNIL)&nbsp;:
        </p>
        <table className={styles.dataTable}>
          <tbody>
            <tr>
              <td>Adresse</td>
              <td>3 place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07</td>
            </tr>
            <tr>
              <td>Téléphone</td>
              <td>01 53 73 22 22</td>
            </tr>
            <tr>
              <td>Site web</td>
              <td>
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.cnil.fr
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Sécurité des données</h2>
        <p>
          ACO-HABITAT met en œuvre les mesures techniques et organisationnelles
          appropriées pour assurer un niveau de sécurité adapté au risque&nbsp;:
        </p>
        <ul>
          <li>chiffrement des communications par TLS 1.2 ou supérieur&nbsp;;</li>
          <li>
            stockage des données dans des bases protégées par contrôle d&apos;accès
            et journalisation&nbsp;;
          </li>
          <li>compression et redimensionnement des images côté client&nbsp;;</li>
          <li>
            traçabilité cryptographique des rapports (empreinte SHA-256
            horodatée)&nbsp;;
          </li>
          <li>
            principe de minimisation : seules les données strictement nécessaires
            sont collectées et traitées.
          </li>
        </ul>
        <p>
          En cas de violation de données susceptible d&apos;engendrer un risque pour
          vos droits et libertés, ACO-HABITAT vous notifiera dans un délai
          raisonnable conformément à l&apos;article 34 RGPD.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          9. Décision automatisée et profilage
        </h2>
        <p>
          Le service comporte un traitement automatisé : l&apos;analyse des
          photographies par un modèle d&apos;intelligence artificielle. Ce
          traitement automatisé n&apos;a pas pour objet de produire des effets
          juridiques à l&apos;égard de l&apos;utilisateur ni de l&apos;affecter de
          manière significative au sens de l&apos;article 22 RGPD. Le rapport généré
          a une valeur strictement informative et ne se substitue pas à
          l&apos;intervention d&apos;un spécialiste certifié.
        </p>
        <p>
          Le Client peut à tout moment demander un réexamen humain de son rapport en
          écrivant à <a href="mailto:aco.habitat@orange.fr">aco.habitat@orange.fr</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>10. Cookies</h2>
        <p>
          Les conditions d&apos;utilisation des cookies et traceurs sont décrites
          dans la <a href="/cookies">politique cookies</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          11. Modification de la présente politique
        </h2>
        <p>
          La présente politique est susceptible d&apos;être modifiée pour refléter
          les évolutions du service ou de la réglementation. La version applicable
          est la dernière publiée sur cette page. La date de dernière mise à jour
          est indiquée en haut du document.
        </p>
      </section>
    </article>
  );
}
