import { db } from "@/lib/db";
import { ArrowUpRight, BarChart3, CheckCircle2, ChevronRight, Clock, Download, Plus, Radar, ShieldCheck, Wallet, Trash2, Users, ExternalLink } from "lucide-react";
import ManualLeadButton from "@/components/ManualLeadButton";
import RecruitForLeadButton from "@/components/RecruitForLeadButton";
import RecruitButton from "@/components/RecruitButton";
import CheckEmailsButton from "@/components/CheckEmailsButton";
import TransferLeadButton from "@/components/TransferLeadButton";
import { deleteLead } from "@/app/actions";

export default async function Home() {
  const leads = await db.getAll();
  const partners = await db.getPartners();
  
  leads.sort((a: any, b: any) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime());
  const soldLeads = leads.filter((lead: any) => lead.statut === 'VENDU').length;
  const revenus = soldLeads * 50;
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-[1px]">
            <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
              <span className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-yellow-600 text-xl">
                A
              </span>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide">ACO LEADS</h1>
            <p className="text-xs text-amber-500/80 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Système Actif
            </p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/apple-icon.jpg" alt="Profile" className="w-full h-full object-cover opacity-80" />
        </div>
      </header>

      <main className="p-4 space-y-6 max-w-lg mx-auto">
        {/* STATS OVERVIEW */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 p-4 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Wallet className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-medium">Revenus (Mois)</h2>
            </div>
            <p className="text-3xl font-bold tracking-tight">{revenus} €</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +15% vs mois dernier
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 p-4 rounded-2xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Radar className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-medium">Leads Vendus</h2>
            </div>
            <p className="text-3xl font-bold tracking-tight">{soldLeads}</p>
            <p className="text-xs text-slate-500 mt-1">Exclusivité garantie</p>
          </div>
        </section>

        {/* ACTIVITY FEED */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              Activité Récente
            </h2>
            <div className="flex items-center gap-2">
              <a href="/api/export" className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-white/5">
                <Download className="w-3.5 h-3.5" />
                Exporter
              </a>
              <button className="text-sm text-slate-400 hover:text-white transition-colors">Voir tout</button>
            </div>
          </div>

          <div className="space-y-3">
            {leads.length === 0 && (
              <p className="text-slate-500 text-center py-8">En attente de nouveaux leads...</p>
            )}
            
            {leads.map((lead: any) => (
              <div key={lead.id} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-900 transition-colors cursor-pointer relative overflow-hidden">
                {lead.statut === 'VENDU' ? <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div> : 
                 lead.statut === 'ENVOYÉ AUX ARTISANS' ? <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div> :
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>}
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center shrink-0">
                    {lead.statut === 'VENDU' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : 
                     lead.statut === 'ENVOYÉ AUX ARTISANS' ? <Radar className="w-6 h-6 text-amber-500 animate-pulse" /> :
                     <Radar className="w-6 h-6 text-red-500 animate-spin-slow" />}
                  </div>
                  <div className="flex-1 min-w-0 pr-24">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-100 truncate">Client : {lead.nom}</h3>
                    </div>
                    <p className="text-sm text-slate-400 mt-1 whitespace-pre-wrap">
                      {lead.probleme?.toLowerCase().includes('insect') || lead.probleme?.toLowerCase().includes('vrillette') || lead.probleme?.toLowerCase().includes('capricorne') ? (
                        <span className="inline-flex items-center gap-1 bg-amber-900/30 text-amber-500 px-2 py-0.5 rounded text-xs font-medium mb-1">🐛 {lead.probleme}</span>
                      ) : lead.probleme?.toLowerCase().includes('pourriture') || lead.probleme?.toLowerCase().includes('mérule') || lead.probleme?.toLowerCase().includes('humidité') ? (
                        <span className="inline-flex items-center gap-1 bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs font-medium mb-1">💧 {lead.probleme}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs font-medium mb-1">⚠️ {lead.probleme || 'Non précisé'}</span>
                      )} <br/>
                      📍 {lead.adresse && lead.adresse !== 'Inconnue' ? `${lead.adresse}, ` : ''}{lead.ville} <br/>
                      {lead.telephone && lead.telephone !== 'Inconnu' && lead.telephone !== 'Non trouvé' && <span>📞 <a href={`tel:${lead.telephone}`} className="text-slate-100 hover:text-amber-500 hover:underline">{lead.telephone}</a><br/></span>}
                      {lead.email && lead.email !== 'Inconnu' && lead.email !== 'Non trouvé' && <span>✉️ <a href={`mailto:${lead.email}`} className="text-slate-400 hover:text-white hover:underline">{lead.email}</a></span>}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        lead.statut === 'VENDU' ? 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20' : 
                        lead.statut === 'ENVOYÉ AUX ARTISANS' ? 'bg-amber-400/10 text-amber-400 ring-amber-400/20' : 
                        'bg-red-400/10 text-red-400 ring-red-400/20'
                      }`}>
                        {lead.statut}
                      </span>
                      {lead.statut === 'NOUVEAU' && <TransferLeadButton lead={lead} partners={partners} />}
                      <RecruitForLeadButton lead={lead} />
                    </div>
                  </div>
                </div>

                {/* Date et Heure en haut à droite */}
                {(lead.date_creation || lead.createdAt) && (
                  <div className="absolute top-3 right-14 text-right">
                    <div className="text-xs font-bold text-slate-300">
                      {new Date(lead.date_creation || lead.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {new Date(lead.date_creation || lead.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                )}

                {/* Bouton Poubelle déplacé en bas à droite pour la sécurité */}
                <form action={deleteLead} className="absolute bottom-3 right-3 z-10">
                  <input type="hidden" name="id" value={lead.id} />
                  <button type="submit" className="p-1.5 text-slate-600 hover:text-red-500 transition-colors rounded-full hover:bg-red-500/10" title="Supprimer ce lead">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* PARTNERS NETWORK */}
        <section className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              Réseau Partenaires VIP
            </h2>
            <span className="text-sm font-medium bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">{partners.length} inscrits</span>
          </div>

          <div className="space-y-3">
            {partners.length === 0 && (
              <p className="text-slate-500 text-center py-4 text-sm bg-slate-900/50 rounded-2xl border border-white/5">Aucun partenaire inscrit pour le moment.</p>
            )}
            
            {partners.map((partner: any) => (
              <div key={partner.email} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-900 transition-colors relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{partner.nom_societe}</h3>
                    <p className="text-xs text-slate-400">{partner.email} • {partner.code_postal} {partner.ville}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <RecruitButton />
            <a href="/partenaires" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 transition-colors py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium mt-2">
              <ExternalLink className="w-4 h-4" />
              Ouvrir la page d'inscription manuelle
            </a>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-50">
        <CheckEmailsButton />
        <ManualLeadButton />
      </div>

      {/* BOTTOM NAV BAR (Optional, mimicking native app) */}
      <nav className="fixed bottom-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-around z-40 text-slate-500">
         <div className="flex flex-col items-center gap-1 text-amber-500">
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] font-medium">Dashboard</span>
         </div>
         <div className="flex flex-col items-center gap-1 hover:text-slate-300 transition-colors">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-medium">Historique</span>
         </div>
         <div className="flex flex-col items-center gap-1 hover:text-slate-300 transition-colors">
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] font-medium">Paiements</span>
         </div>
      </nav>
    </div>
  );
}
