'use client';

import { addPartner } from "@/app/actions";
import { CheckCircle2, ShieldCheck, Zap, Sparkles, MapPin } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/50"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function PartenairesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 3D Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-2xl w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Le Réseau N°1 en France</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6 tracking-tight leading-tight">
            Recevez des Chantiers<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-orange-600">Ultra-Qualifiés.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Nous détectons les prospects sérieux (mérule, insectes, humidité) sur votre secteur. Rejoignez le réseau VIP gratuitement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <TiltCard>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <form action={addPartner} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Nom de votre société <span className="text-amber-500">*</span></label>
                <input required name="nom_societe" type="text" className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" placeholder="Ex: Dubois Traitement" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Ligne directe <span className="text-amber-500">*</span></label>
                  <input required name="telephone" type="tel" className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" placeholder="06 12 34 56 78" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email Pro <span className="text-amber-500">*</span></label>
                  <input required name="email" type="email" className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" placeholder="contact@dubois.fr" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500"/> Code Postal <span className="text-amber-500">*</span></label>
                  <input required name="code_postal" type="text" className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" placeholder="Ex: 33000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Ville d'intervention <span className="text-amber-500">*</span></label>
                  <input required name="ville" type="text" className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" placeholder="Ex: Bordeaux" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Vos spécialités</label>
                <input name="specialites" type="text" className="w-full bg-[#0a0a0a]/80 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" placeholder="Mérule, Capricornes, Remontées capillaires..." />
              </div>

              <div className="pt-6">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold rounded-2xl px-4 py-5 flex items-center justify-center transition-all shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_-15px_rgba(245,158,11,0.7)]"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 fill-black" />
                    Valider mon Inscription Gratuite
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.button>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2 bg-[#050505]/50 px-4 py-2 rounded-full border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">100% Gratuit & Sans engagement</span>
                </div>
                <div className="flex items-center gap-2 bg-[#050505]/50 px-4 py-2 rounded-full border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">Exclusivité garantie</span>
                </div>
              </div>
            </form>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}

