import type { MetadataRoute } from "next"

const BASE_URL = "https://diagnostic-bois.com"

/**
 * Sitemap dynamique généré automatiquement par Next.js.
 * Ajouter une nouvelle URL publique = ajouter une ligne dans le tableau ci-dessous.
 * Les pages privées/techniques (diagnostic, resultats, succes) sont volontairement
 * exclues : elles ne doivent pas être indexées par Google.
 */

type Entry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
  lastModified: string
}

const entries: Entry[] = [
  // Page principale
  { path: "", changeFrequency: "weekly", priority: 1.0, lastModified: "2026-05-26" },

  // Guide - Index
  { path: "/guide", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-05-26" },

  // Notre savoir-faire
  { path: "/guide/notre-savoir-faire", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-07-16" },

  // Guide - Pathologies
  { path: "/guide/merule", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-05-26" },
  { path: "/guide/capricorne", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-05-26" },
  { path: "/guide/termites", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-05-26" },
  { path: "/guide/vrillettes", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/guide/humidite", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-05-26" },

  // Guide - Régions
  { path: "/guide/diagnostic-bois-normandie", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-bretagne", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-ile-de-france", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-pays-de-la-loire", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-nouvelle-aquitaine", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-hauts-de-france", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-grand-est", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-05-26" },
  { path: "/guide/diagnostic-bois-paca", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-05-26" },

  // Guide - Départements
  { path: "/guide/diagnostic-bois-orne", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-05-31" },
  { path: "/guide/diagnostic-bois-sarthe", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-31" },
  { path: "/guide/diagnostic-bois-mayenne", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-31" },
  { path: "/guide/diagnostic-bois-eure", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-31" },
  { path: "/guide/diagnostic-bois-eure-et-loir", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-31" },

  // Pages légales
  { path: "/cgv", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-05-26" },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-05-26" },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-05-26" },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-05-26" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: `${BASE_URL}${entry.path}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
