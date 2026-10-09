"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three";

// Les particules (spores) s'activent et se multiplient selon le niveau de dégâts
function SporeParticles({ damageLevel }: { damageLevel: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Les particules tournent plus vite si le dégât est élevé
      ref.current.rotation.y -= delta * (0.1 + damageLevel * 0.5);
      ref.current.rotation.x -= delta * (0.1 + damageLevel * 0.2);
    }
  });

  // On n'affiche les particules que si le dégât commence (opacity progressive)
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false} visible={damageLevel > 0.1}>
      <PointMaterial
        transparent
        color="#ff4400"
        size={0.05 + (damageLevel * 0.05)}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={damageLevel * 0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function WoodBeam({ damageLevel }: { damageLevel: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const fungusRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (meshRef.current && fungusRef.current && materialRef.current) {
      // La poutre tourne doucement
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Le bois noircit et devient rugueux avec le temps
      const targetColor = new THREE.Color().lerpColors(
        new THREE.Color("#5c3a21"), // Bois sain
        new THREE.Color("#1a1008"), // Bois pourri
        damageLevel
      );
      materialRef.current.color.lerp(targetColor, 0.1);

      // Le champignon grossit et palpite
      const fungusScale = damageLevel * 1.5;
      fungusRef.current.scale.set(fungusScale, fungusScale, fungusScale);
      
      // Pulsation du champignon
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1 * damageLevel;
      fungusRef.current.scale.multiplyScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 5, 1.5]} />
      <meshStandardMaterial 
        ref={materialRef}
        roughness={0.9}
        metalness={0.1}
      />
      
      {/* Le champignon (Mérule) qui pousse à l'intérieur */}
      <mesh ref={fungusRef} position={[0, 0, 0]} visible={damageLevel > 0}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#ff3300" 
          roughness={0.4} 
          emissive="#ff0000" 
          emissiveIntensity={damageLevel * 2} 
          wireframe={true} 
        />
      </mesh>
    </mesh>
  );
}

export function DestructionSimulator() {
  const [damage, setDamage] = useState(0);

  const getStatusText = () => {
    if (damage < 20) return "Bois sain. Légère humidité détectée.";
    if (damage < 50) return "Développement du mycélium. Attaque en cours.";
    if (damage < 80) return "Apparition de fructifications. Les spores se répandent.";
    return "DANGER CRITIQUE : Pourriture cubique avancée. Risque d'effondrement.";
  };

  const getStatusColor = () => {
    if (damage < 20) return "text-green-400";
    if (damage < 50) return "text-orange-400";
    return "text-red-500";
  };

  return (
    <div className="w-full h-[600px] md:h-[700px] bg-gradient-to-b from-slate-900 to-black relative border-y border-slate-800 shadow-2xl flex flex-col md:flex-row overflow-hidden">
      
      {/* Panneau de contrôle 2D */}
      <div className="w-full md:w-1/3 p-8 z-10 flex flex-col justify-center bg-black/50 backdrop-blur-md border-r border-slate-800/50">
        <div className="inline-block border border-teal-500/30 rounded-full px-3 py-1 mb-6 bg-teal-950/30 w-max">
          <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Simulateur 3D Temps Réel</span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
          L'évolution de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Mérule</span>
        </h2>
        
        <p className="text-slate-400 text-sm mb-10">
          Observez comment un simple dégât des eaux se transforme en désastre structurel si rien n'est fait. Utilisez le curseur temporel.
        </p>

        {/* Le Slider (Curseur temporel) */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">
            <span>Sain</span>
            <span>6 Mois</span>
            <span>12+ Mois</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={damage} 
            onChange={(e) => setDamage(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>

        {/* Affichage du diagnostic dynamique */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 shadow-xl">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Diagnostic virtuel</div>
          <div className={`font-bold text-lg leading-tight transition-colors duration-300 ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

      </div>

      {/* Rendu 3D */}
      <div className="w-full md:w-2/3 h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} color="#ff0000" intensity={damage / 50} />
          
          <WoodBeam damageLevel={damage / 100} />
          <SporeParticles damageLevel={damage / 100} />
          
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="city" />
        </Canvas>
        
        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-600 uppercase tracking-widest pointer-events-none">
          Vue interactive à 360°
        </div>
      </div>
      
    </div>
  );
}
