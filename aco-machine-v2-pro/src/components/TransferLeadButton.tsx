'use client'

import { useState } from "react";
import { Send, X, Loader2, Mail, MessageSquare } from "lucide-react";
import { transferLead } from "@/app/actions";

export default function TransferLeadButton({ lead, partners }: { lead: any, partners: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState<'email' | 'sms'>('email');

  async function handleSubmit(formData: FormData) {
    if (method === 'sms') return; // SMS is handled by href link directly
    setIsLoading(true);
    formData.append('leadId', lead.id);
    await transferLead(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  // Generate the SMS body for the mailto/sms link
  const smsBody = encodeURIComponent(`Nouveau chantier ACO LEADS : ${lead.probleme} à ${lead.ville}. \nContact : ${lead.nom} - Tel : ${lead.telephone} - Email : ${lead.email || 'N/A'}`);

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold p-1.5 rounded-md flex items-center justify-center transition-colors ml-2 shadow-sm"
        title="Transférer ce lead"
      >
        <Send className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
          <div className="bg-[#111] border border-white/10 p-6 rounded-3xl w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Transférer le Lead</h2>
            <p className="text-slate-400 text-sm mb-6">Comment voulez-vous envoyer les coordonnées du client à votre partenaire ?</p>
            
            <div className="flex gap-2 mb-6 p-1 bg-[#1a1a1a] rounded-xl border border-white/5">
              <button 
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${method === 'email' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Mail className="w-4 h-4" /> Automatique (E-mail)
              </button>
              <button 
                type="button"
                onClick={() => setMethod('sms')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${method === 'sms' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <MessageSquare className="w-4 h-4" /> Manuel (SMS)
              </button>
            </div>

            {method === 'email' ? (
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Choisir un partenaire enregistré</label>
                  <select name="partnerEmail" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors mb-2">
                    <option value="">-- Aucun (Saisie manuelle ci-dessous) --</option>
                    {partners.map(p => (
                      <option key={p.email} value={p.email}>{p.nom_societe} ({p.ville})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Ou saisir un e-mail manuellement</label>
                  <input name="customEmail" type="email" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="artisan@email.com" />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-emerald-500 text-black font-bold rounded-xl px-4 py-4 mt-6 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-5 h-5" /> Envoyer le Lead</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-300 text-center mb-4">Cliquez sur le bouton ci-dessous pour ouvrir l'application Messages sur votre téléphone. Le texte sera déjà pré-rempli.</p>
                <a 
                  href={`sms:?&body=${smsBody}`}
                  className="w-full bg-blue-500 text-white font-bold rounded-xl px-4 py-4 mt-2 flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                >
                  <span className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Ouvrir l'application SMS</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
