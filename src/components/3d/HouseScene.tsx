'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, Html, Image } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

// Un composant pour faire bouger subtilement la caméra avec la souris (Effet Parallaxe 2.5D)
function ParallaxCamera() {
  useFrame((state) => {
    // Mouvement très léger pour donner un effet de profondeur
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.mouse.x * 0.5), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * 0.5), 0.05);
    state.camera.lookAt(0, 0, -5);
  });
  return null;
}

export default function HouseScene() {
  const controlsRef = useRef<any>(null);
  const [activeZone, setActiveZone] = useState<'merule' | 'capricorne' | null>(null);
  const [sceneType, setSceneType] = useState<'merule' | 'capricorne'>('merule');
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  
  // HUD Temp pour régler les positions
  const [debugPos, setDebugPos] = useState<string>("");

  const bgMerule = "/bg-merule.jpg"; 
  const bgCapricorne = "/bg-capricorne.jpg";

  // Base de données des annotations
  const annotations = [
    // CAPRICORNE (Rapprochés du centre pour le format vertical mobile)
    { id: 'c1', position: [-0.3, 0.8, -1.5], title: 'Trous ovales (Capricorne)', description: "Le capricorne cible le bois résineux sec. Ses larves creusent de larges galeries ovales destructrices.", icon: '🔎', type: 'capricorne' },
    { id: 'c2', position: [0.4, 0.4, -1.5], title: 'Trous ronds (Vrillette)', description: "La vrillette préfère les zones légèrement humides. Ses trous sont parfaitement ronds, semblable à un impact de plomb.", icon: '🔎', type: 'capricorne' },
    { id: 'c3', position: [-0.2, -0.4, -1.5], title: 'Galerie & vermoulure', description: "Présence de sciure fine et accumulée. Indique une attaque parasitaire active et la destruction interne des fibres.", icon: '⚠️', type: 'capricorne' },
    { id: 'c4', position: [0.3, -0.8, -1.5], title: 'Affaiblissement mécanique', description: "Danger critique : la résistance structurelle de la poutre est compromise. Risque d'effondrement à court terme.", icon: '🔴', type: 'capricorne' },
    // MÉRULE (Centrés sur la zone d'intérêt principale)
    { id: 'm1', position: [-0.4, 0.5, -1.5], title: 'Pourriture cubique', description: "Le champignon détruit la cellulose. Le bois se fracture en petits cubes caractéristiques et s'effrite sous la pression.", icon: '⚠️', type: 'merule' },
    { id: 'm2', position: [0.3, 0.0, -1.5], title: 'Mycélium & filaments', description: "Ces longs filaments blancs/gris traversent la maçonnerie pour chercher l'humidité, contaminant parfois plusieurs pièces.", icon: '🔎', type: 'merule' },
    { id: 'm3', position: [0.1, -0.6, -1.5], title: 'Fructification (Syrphes)', description: "Couleur rouille au centre, bordure blanche cotonneuse. C'est l'organe reproducteur relâchant des millions de spores.", icon: '🚨', type: 'merule' },
  ];

  // === GÉNÉRATEUR DE SONS (Web Audio API) ===
  const playTechClick = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  };

  const playDroneSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(45, ctx.currentTime); // Basse fréquence inquiétante
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 4);
    } catch(e) {}
  };

  const handleZoom = (zone: 'merule' | 'capricorne') => {
    setActiveZone(zone);
    setSelectedAnnotation(null);
    playDroneSound(); // Son d'ambiance au zoom
    if (controlsRef.current) {
      controlsRef.current.setLookAt(
        0, 0, 1.8, 
        0, 0, -1,  
        true
      );
    }
  };

  const resetCamera = () => {
    setActiveZone(null);
    setSelectedAnnotation(null);
    if (controlsRef.current) {
      controlsRef.current.setLookAt(0, 0, 4, 0, 0, -5, true);
    }
  };

  useEffect(() => {
    resetCamera();
  }, [sceneType]);

  const currentAnnotation = annotations.find(a => a.id === selectedAnnotation);

  return (
    <div className="relative w-full h-full bg-[#0a0a0a]">
      
      {/* MODE REGLAGE (Masqué en prod) */}
      {/* activeZone && (
        <div className="absolute bottom-6 left-6 z-50 bg-black/80 text-green-400 p-3 rounded-lg font-mono text-xs border border-green-500/30">
          <p className="mb-1 text-white">Mode Réglage (Cliquez sur l'image) :</p>
          <p>Coordonnées : {debugPos || "Aucun clic"}</p>
        </div>
      ) */}

      {/* SÉLECTEUR DE SCÈNE (Centré en haut pour ne pas superposer le bouton Retour) */}
      <div className="absolute top-20 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-4 bg-slate-900/40 p-2 rounded-full backdrop-blur-xl border border-slate-700/50 shadow-2xl w-[90%] max-w-fit justify-center">
        <button 
          onClick={() => { setSceneType('merule'); playTechClick(); }}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${sceneType === 'merule' ? 'bg-red-500/20 border border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'text-slate-400 hover:text-white border border-transparent'}`}
        >
          Cave (Mérule)
        </button>
        <button 
          onClick={() => { setSceneType('capricorne'); playTechClick(); }}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${sceneType === 'capricorne' ? 'bg-orange-500/20 border border-orange-500/50 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'text-slate-400 hover:text-white border border-transparent'}`}
        >
          Combles (Insectes)
        </button>
      </div>

      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="w-full h-full cursor-crosshair">
        <CameraControls 
          ref={controlsRef} 
          minDistance={1} 
          maxDistance={4} 
          dollySpeed={0.5}
          touches={{ one: 0, two: 0, three: 0 }} 
          mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }} 
        />

        {!activeZone && <ParallaxCamera />}

        {/* PLAN PHOTORÉALISTE AU FOND */}
        <Image 
          url={sceneType === 'merule' ? bgMerule : bgCapricorne} 
          scale={[16, 9]} 
          position={[0, 0, -2]} 
          transparent
          opacity={activeZone ? 0.9 : 0.7}
          onPointerDown={(e) => {
            // Capte les clics sur l'image pour trouver les bonnes coordonnées 3D
            if (activeZone && e.intersections.length > 0) {
              const p = e.intersections[0].point;
              setDebugPos(`[${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
            }
          }}
        />

        <mesh position={[0, 0, -1.9]}>
          <planeGeometry args={[16, 9]} />
          <meshBasicMaterial color="#000" transparent opacity={0.4} depthWrite={false} />
        </mesh>

        {/* ANNOTATIONS TECHNIQUES 3D */}
        {activeZone && annotations.filter(a => a.type === activeZone).map((annotation) => (
          <Html 
            key={annotation.id} 
            position={new THREE.Vector3(...annotation.position)} 
            center 
            zIndexRange={[40, 0]}
          >
            <div 
              className={`group relative flex items-center cursor-pointer transition-all duration-500 ${selectedAnnotation === annotation.id ? 'scale-110 z-50' : selectedAnnotation ? 'opacity-30 pointer-events-none' : 'hover:scale-105 z-10'}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedAnnotation(annotation.id);
                playTechClick(); // Son de clic "Tech"
              }}
            >
              {/* Le point d'ancrage (Hotspot très visible) */}
              <div className="relative flex items-center justify-center">
                {/* Onde de choc (pulse coloré) */}
                <div className={`absolute w-12 h-12 rounded-full animate-ping opacity-60 ${activeZone === 'merule' ? 'bg-red-500' : 'bg-orange-500'}`} style={{ animationDuration: '2s' }} />
                {/* Cercle extérieur */}
                <div className={`w-8 h-8 rounded-full border-2 backdrop-blur-md flex items-center justify-center transition-colors shadow-[0_0_20px_rgba(0,0,0,0.8)] ${selectedAnnotation === annotation.id ? 'border-white bg-white/20' : 'border-white/60 bg-black/50 group-hover:border-white group-hover:bg-black/70'}`}>
                  {/* Point central lumineux */}
                  <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-colors ${selectedAnnotation === annotation.id ? 'bg-white' : activeZone === 'merule' ? 'bg-red-500' : 'bg-orange-400'}`} />
                </div>
              </div>

              {/* Ligne de connexion fluide */}
              <div className={`h-[2px] transition-all duration-500 ease-out origin-left ${selectedAnnotation === annotation.id ? 'w-12 bg-white/80' : 'w-6 group-hover:w-10 bg-white/40'}`} />

              {/* Étiquette texte style "Pillule" */}
              <div className={`backdrop-blur-xl border text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full shadow-2xl whitespace-nowrap transition-all duration-500 ${selectedAnnotation === annotation.id ? 'border-white/60 bg-white/10 scale-105' : 'border-white/20 bg-black/70 group-hover:bg-black/90'}`}>
                <span className="mr-2 text-sm sm:text-base align-middle">{annotation.icon}</span>
                <span className="tracking-wide uppercase">{annotation.title}</span>
              </div>
            </div>
          </Html>
        ))}

        {/* HOTSPOT PRINCIPAL */}
        <group position={[0, -0.2, 0.5]}>
          <pointLight color={sceneType === 'merule' ? "#ef4444" : "#f97316"} intensity={activeZone ? 0 : 2} distance={5} />
          
          <mesh rotation={[-Math.PI / 2, 0, 0]} visible={!activeZone}>
            <ringGeometry args={[0.3, 0.4, 32]} />
            <meshBasicMaterial color={sceneType === 'merule' ? "#ef4444" : "#f97316"} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} visible={!activeZone}>
            <ringGeometry args={[0.5, 0.55, 32]} />
            <meshBasicMaterial color={sceneType === 'merule' ? "#ef4444" : "#f97316"} transparent opacity={0.3} />
          </mesh>

          <mesh 
            visible={!activeZone}
            onClick={(e) => { e.stopPropagation(); handleZoom(sceneType); }}
            onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
          >
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color={sceneType === 'merule' ? "#ef4444" : "#f97316"} />
          </mesh>
        </group>
      </Canvas>

      {/* === UI MODAL === */}
      {activeZone && (
        <div className="absolute bottom-[100px] left-4 right-4 md:bottom-auto md:top-1/2 md:left-auto md:right-16 md:-translate-y-1/2 z-[60] pointer-events-auto flex justify-center">
          <div className="bg-[#0f111a]/95 border border-[#1f2335] p-5 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl w-full md:w-[400px] max-w-sm md:max-w-full animate-in fade-in slide-in-from-bottom-12 md:slide-in-from-right-12 duration-500 mx-auto">
            
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div>
                <div className={`text-[9px] md:text-[11px] uppercase tracking-widest font-black mb-1 md:mb-2 flex items-center gap-2 ${activeZone === 'merule' ? 'text-red-500' : 'text-orange-500'}`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${activeZone === 'merule' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                  {activeZone === 'merule' ? 'ALERTE - SOUS-SOL / CAVE' : 'ALERTE - COMBLES / CHARPENTE'}
                </div>
                <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">
                  {activeZone === 'merule' ? 'Mérule Pleureuse' : 'Insectes Xylophages'}
                </h3>
              </div>
              <button onClick={resetCamera} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors">
                ✕
              </button>
            </div>
            
            <div className="mb-6 overflow-hidden relative rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent z-0"></div>
              <div className={`relative z-10 border-l-4 p-4 rounded-r-2xl bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${selectedAnnotation ? 'border-blue-500' : 'border-slate-700'}`}>
                {selectedAnnotation ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <h4 className="text-white font-bold text-sm mb-1">{currentAnnotation?.title}</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{currentAnnotation?.description}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">👆</div>
                    <p className="text-xs font-medium">Cliquez sur une annotation 3D pour voir le détail de la pathologie.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex gap-2 md:gap-4 mb-6 md:mb-8">
              <div className="w-1/2 relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg aspect-video group">
                <div className={`absolute top-2 left-2 z-10 text-[9px] uppercase font-black text-white px-2 py-0.5 rounded-full ${activeZone === 'merule' ? 'bg-red-600' : 'bg-orange-600'}`}>
                  AVANT (DÉGÂTS)
                </div>
                <img 
                  src={activeZone === 'merule' ? bgMerule : bgCapricorne} 
                  className="h-full w-full object-cover filter contrast-125 sepia-[0.3] group-hover:scale-110 transition-transform duration-700" 
                  alt="Dégâts" 
                />
              </div>
              
              <div className="w-1/2 relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg aspect-video group">
                <div className="absolute top-2 left-2 z-10 text-[9px] uppercase font-black text-white bg-teal-500 px-2 py-0.5 rounded-full shadow-md">
                  APRÈS TRAITEMENT
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop" 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Bois sain traité" 
                />
              </div>
            </div>

            <a 
              href="/" 
              className={`flex items-center justify-center w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1 ${
                activeZone === 'merule' 
                  ? 'bg-gradient-to-r from-red-600 to-rose-500 hover:shadow-[0_10px_30px_rgba(225,29,72,0.4)]'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-[0_10px_30px_rgba(249,115,22,0.4)]'
              }`}
            >
              Demander un Diagnostic Urgent
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
