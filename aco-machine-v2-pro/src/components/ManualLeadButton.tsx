'use client'

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addManualLead } from "@/app/actions";

export default function ManualLeadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await addManualLead(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full shadow-lg shadow-amber-500/20 flex items-center justify-center text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus className="w-7 h-7" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 p-6 rounded-3xl w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Nouveau Lead</h2>
            <p className="text-slate-400 text-sm mb-6">La machine cherchera des artisans automatiquement pour ce client.</p>
            
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nom du client</label>
                <input required name="nom" type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Ex: Jean Dupont" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Code Postal</label>
                  <input required name="code_postal" type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="33000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Ville</label>
                  <input required name="ville" type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Bordeaux" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Problème</label>
                <input required name="probleme" type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="Mérule, Vrillettes..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Téléphone <span className="text-amber-500">*</span></label>
                <input required name="telephone" type="tel" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="06 12 34 56 78" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email (Optionnel)</label>
                <input name="email" type="email" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="jean.dupont@email.com" />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold rounded-xl px-4 py-4 mt-6 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Vente en cours (IA active)...</span>
                ) : (
                  "Lancer la Vente 🚀"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
