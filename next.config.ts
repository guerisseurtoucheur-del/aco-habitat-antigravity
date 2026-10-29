import type { NextConfig } from "next";

// Anciennes URL (ancien site) encore indexees par Google a la racine :
// on les redirige en 301 vers les pages du guide pour conserver le referencement.
const guideSlugs = [
  "capricorne",
  "merule",
  "merule-obligations-legales",
  "termites",
  "vrillettes",
  "lyctus",
  "humidite",
  "pourriture-cubique",
  "faq",
  "qui-sommes-nous",
  "notre-savoir-faire",
  "traitement-du-bois",
  "reconnaitre-les-pathologies",
  "diagnostic-bois-normandie",
  "diagnostic-bois-bretagne",
  "diagnostic-bois-ile-de-france",
  "diagnostic-bois-pays-de-la-loire",
  "diagnostic-bois-nouvelle-aquitaine",
  "diagnostic-bois-grand-est",
  "diagnostic-bois-hauts-de-france",
  "diagnostic-bois-paca",
  "diagnostic-bois-calvados",
  "diagnostic-bois-sarthe",
  "diagnostic-bois-mayenne",
  "diagnostic-bois-eure",
  "diagnostic-bois-eure-et-loir",
  "diagnostic-bois-falaise",
  "diagnostic-bois-conde-en-normandie",
  "diagnostic-bois-vire",
  "diagnostic-bois-lisieux",
  "diagnostic-bois-bayeux",
];

const aliases: Record<string, string> = {
  "capricornes": "/guide/capricorne",
  "capricorne-des-maisons": "/guide/capricorne",
  "merules": "/guide/merule",
  "termite": "/guide/termites",
  "vrillette": "/guide/vrillettes",
  "humidite-bois": "/guide/humidite",
  "traitement-bois": "/guide/traitement-du-bois",
  "traitement-charpente": "/guide/traitement-du-bois",
  "pathologies": "/guide/reconnaitre-les-pathologies",
  "a-propos": "/guide/qui-sommes-nous",
  "about": "/guide/qui-sommes-nous",
  "savoir-faire": "/guide/notre-savoir-faire",
  "contact": "/#formulaire",
  "devis": "/#formulaire",
  "accueil": "/",
  "index.html": "/",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...guideSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/guide/${slug}`,
        permanent: true,
      })),
      ...Object.entries(aliases).map(([source, destination]) => ({
        source: `/${source}`,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
