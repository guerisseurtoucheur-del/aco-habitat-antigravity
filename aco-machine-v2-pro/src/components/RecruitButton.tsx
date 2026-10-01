'use client'

import { useState } from "react";
import { Users, X, Loader2, MapPin } from "lucide-react";
import { launchRecruitment, suggestNearbyHubsAction } from "@/app/actions";

export default function RecruitButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  
  const [suggestions, setSuggestions] = useState<string[] | null>(null);

  async function handleAnalyze(e: React.MouseEvent) {
    e.preventDefault();
    if (!ville) return;
    
    setIsAnalyzing(true);
    const hubs = await suggestNearbyHubsAction(ville);
    setSuggestions(hubs);
    setIsAnalyzing(false);
  }

  async function handleDirectHunt(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("code_postal", cp);
    formData.append("ville", ville);
    await launchRecruitment(formData);
    setIsLoading(false);
    setIsOpen(false);
    setSuggestions(null);
    setCp("");
    setVille("");
  }

  async function handleSuggestedHunt(suggestedCity: string) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("code_postal", "");
    formData.append("ville", suggestedCity);
    await launchRecruitment(formData);
    setIsLoading(false);
    setIsOpen(false);
    setSuggestions(null);
    setCp("");
    setVille("");
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors py-2 px-4 rounded-xl flex items-center justify-center gap-2 font-medium mt-4"
      >
        <Users className="w-4 h-4" />
        Lancer un Recrutement IA
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111] border border-blue-500/30 p-6 rounded-3xl w-full max-w-md relative shadow-2xl shadow-blue-500/10">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Recruter des Partenaires</h2>
            <p className="text-slate-400 text-sm mb-6">L'IA va chercher des artisans ultra-spécialisés dans cette ville et les inviter à s'inscrire sur votre réseau VIP.</p>
            
            <form onSubmit={handleDirectHunt} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Code Postal</label>
                  <input required value={cp} onChange={(e) => setCp(e.target.value)} name="code_postal" type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Ex: 33000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Ville</label>
                  <input required value={ville} onChange={(e) => setVille(e.target.value)} name="ville" type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Ex: Bordeaux" />
                </div>
              </div>

              {suggestions === null ? (
                <button 
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !ville}
                  className="w-full bg-blue-600 text-white font-bold rounded-xl px-4 py-4 mt-6 flex items-center justify-center hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Analyse IA de la zone...</span>
                  ) : (
                    <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Analyser la Zone 📍</span>
                  )}
                </button>
              ) : (
                <div className="mt-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                  {suggestions.length > 0 ? (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-sm text-blue-300 mb-3">
                        <strong>📍 Conseil Stratégique :</strong> La ville semble petite. Voici les plus grands bassins économiques à proximité :
                      </p>
                      <div className="flex flex-col gap-2">
                        {suggestions.map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => handleSuggestedHunt(sug)}
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors flex justify-between items-center"
                          >
                            <span>Lancer sur {sug}</span>
                            <span>🎯</span>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-blue-500/20">
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="w-full text-slate-400 hover:text-white text-sm transition-colors"
                        >
                          Ignorer et chasser sur {ville} quand même
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 text-center">
                      <p className="text-sm text-green-400 font-medium mb-4">✅ C'est une grande ville, le potentiel est excellent !</p>
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lancer la Chasse IA 🎯"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}
