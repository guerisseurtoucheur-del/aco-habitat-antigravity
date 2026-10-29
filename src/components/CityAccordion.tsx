"use client";

import { useState } from "react";
import Link from "next/link";
import { seoCities } from "@/data/seo-content";

export function CityAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  // Regrouper les villes par région
  const groupedCities = seoCities.reduce<Record<string, typeof seoCities>>((acc, city) => {
    const region = city.region || "Autres Régions";
    if (!acc[region]) acc[region] = [];
    acc[region].push(city);
    return acc;
  }, {});

  return (
    <section className="bg-white border-t border-slate-200 py-6">
      <div className="container mx-auto px-4">
        {/* Bouton de l'accordéon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm md:text-base transition-colors"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <span className="text-teal-600 text-lg">📍</span>
            <span>Diagnostics bois & interventions par ville ({seoCities.length} villes couvertes)</span>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 bg-white rounded-full border border-slate-200 shadow-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            {isOpen ? "Fermer ▲" : "Afficher ▼"}
          </span>
        </button>

        {/* Contenu déroulant */}
        {isOpen && (
          <div className="mt-6 space-y-6 pt-2 animate-fadeIn">
            {Object.entries(groupedCities).map(([region, cities]) => (
              <div key={region} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  {region}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/diagnostic-bois-${city.slug}`}
                      className="text-xs text-slate-700 hover:text-teal-600 bg-white hover:bg-teal-50/50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-teal-300 transition-all font-medium shadow-2xs"
                    >
                      Diagnostic bois à {city.name} ({city.zipPattern})
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
