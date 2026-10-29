'use client';
import dynamic from 'next/dynamic';

const DynamicScene = dynamic(() => import('@/components/3d/HouseScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#020617] text-white">
      <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin mb-4"></div>
      <p className="font-extrabold text-xl tracking-widest text-teal-300 animate-pulse uppercase">
        Chargement de l'Expérience 3D...
      </p>
    </div>
  )
});

export default function Visite3DPage() {
  return (
    <main className="h-screen w-full bg-[#020617] overflow-hidden relative font-sans selection:bg-teal-500 selection:text-white">
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <a href="/" className="px-5 py-2.5 bg-slate-900/60 hover:bg-slate-800 text-white rounded-2xl backdrop-blur-xl border border-slate-700/50 font-bold shadow-2xl transition-all flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour au site
        </a>
        <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/40 border border-teal-900/50 px-4 py-2.5 rounded-2xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          Mode Démonstration Interactive
        </div>
      </div>
      
      {/* 3D Canvas Container */}
      <DynamicScene />
      
    </main>
  );
}
