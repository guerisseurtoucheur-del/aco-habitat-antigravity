'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-teal-950/90 text-teal-100 p-8 rounded-3xl border border-teal-800/80 text-center shadow-2xl backdrop-blur-xl h-full flex flex-col justify-center items-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-extrabold text-white mb-2">Demande envoyée avec succès !</h3>
        <p className="text-teal-200 text-sm max-w-sm leading-relaxed">
          Notre équipe technique vous recontactera gratuitement sous très court délai pour évaluer la situation de votre bien.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-md text-sm"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl relative text-left h-full flex flex-col justify-between group hover:border-teal-500/30 transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
          <span className="text-teal-400">📞</span> Besoin d&apos;un spécialiste certifié ?
        </h3>
        <p className="text-slate-400 text-sm">
          Laissez-nous vos coordonnées, un expert de votre région vous rappellera gratuitement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Nom complet — 100% Pleine largeur */}
        <div>
          <label htmlFor="nom" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Nom complet *
          </label>
          <input 
            required 
            type="text" 
            id="nom" 
            name="nom" 
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
            placeholder="Ex: Jean Dupont"
          />
        </div>

        {/* Téléphone & Email — 100% Pleine largeur */}
        <div>
          <label htmlFor="telephone" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Téléphone *
          </label>
          <input 
            required 
            type="tel" 
            id="telephone" 
            name="telephone" 
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
            placeholder="Ex: 06 12 34 56 78"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Adresse e-mail *
          </label>
          <input 
            required 
            type="email" 
            id="email" 
            name="email" 
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
            placeholder="Ex: jean.dupont@email.com"
          />
        </div>

        {/* CHAMP RAJOUTÉ : Adresse du bien (Rue et numéro) */}
        <div>
          <label htmlFor="adresse" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Adresse du bien (Rue et N°) *
          </label>
          <input 
            required 
            type="text" 
            id="adresse" 
            name="adresse" 
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
            placeholder="Ex: 18 rue Bernard Palissy"
          />
        </div>

        {/* Ville & Département — 100% Pleine largeur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ville" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Ville *
            </label>
            <input 
              required 
              type="text" 
              id="ville" 
              name="ville" 
              className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
              placeholder="Ex: Rouen"
            />
          </div>
          <div>
            <label htmlFor="departement" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Département *
            </label>
            <input 
              required 
              type="text" 
              id="departement" 
              name="departement" 
              className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
              placeholder="Ex: 76 ou 61"
            />
          </div>
        </div>

        <div>
          <label htmlFor="note" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Explications / Nature du problème
          </label>
          <textarea 
            id="note" 
            name="note" 
            rows={3}
            className="w-full px-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-400 outline-none transition-all text-white placeholder-slate-500 text-sm"
            placeholder="J'ai repéré des insectes / des traces d'humidité dans mes combles..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className={`w-full ${status === 'error' ? 'bg-red-600 hover:bg-red-500 shadow-red-900/30' : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 shadow-teal-900/30'} text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : status === 'error' ? (
            'Erreur - Réessayer ➔'
          ) : (
            'Être rappelé par un expert ➔'
          )}
        </button>
        <p className="text-[11px] text-slate-500 text-center mt-3">
          Vos données restent confidentielles et ne servent qu&apos;à vous recontacter.
        </p>
      </form>
    </div>
  );
}
