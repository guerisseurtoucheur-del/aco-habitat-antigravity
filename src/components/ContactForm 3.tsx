'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulation d'un appel API (à brancher plus tard avec une vraie API Next.js ou un service)
    setTimeout(() => {
      setStatus('success');
      // e.currentTarget.reset();
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center shadow-sm">
        <div className="text-3xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
        <p className="text-green-700">
          Notre équipe vous recontactera très rapidement pour faire le point sur votre situation.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-md">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Besoin d'un spécialiste certifié ?</h3>
        <p className="text-slate-600 text-sm">
          Laissez-nous vos coordonnées, un expert de votre région vous rappellera gratuitement pour évaluer la situation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-1">Nom complet *</label>
            <input 
              required 
              type="text" 
              id="nom" 
              name="nom" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800"
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-slate-700 mb-1">Téléphone *</label>
            <input 
              required 
              type="tel" 
              id="telephone" 
              name="telephone" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
          <input 
            required 
            type="email" 
            id="email" 
            name="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800"
            placeholder="jean.dupont@email.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ville" className="block text-sm font-medium text-slate-700 mb-1">Ville d'intervention *</label>
            <input 
              required 
              type="text" 
              id="ville" 
              name="ville" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800"
              placeholder="Ex: Rouen"
            />
          </div>
          <div>
            <label htmlFor="departement" className="block text-sm font-medium text-slate-700 mb-1">Département *</label>
            <input 
              required 
              type="text" 
              id="departement" 
              name="departement" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800"
              placeholder="Ex: 76 ou Seine-Maritime"
            />
          </div>
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-slate-700 mb-1">Explications / Nature du problème</label>
          <textarea 
            id="note" 
            name="note" 
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800"
            placeholder="J'ai repéré des insectes / des traces d'humidité dans mes combles..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            'Être rappelé par un expert'
          )}
        </button>
        <p className="text-xs text-slate-500 text-center mt-3">
          Vos données restent confidentielles et ne servent qu'à vous recontacter.
        </p>
      </form>
    </div>
  );
}
