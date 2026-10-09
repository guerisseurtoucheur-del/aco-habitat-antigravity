"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Points, PointMaterial } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

// Composant qui génère un nuage de 3000 spores en temps réel
function SporeParticles() {
  const ref = useRef<THREE.Points>(null);
  
  // Générer des positions aléatoires pour 3000 particules
  const [positions] = useState(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;     // axe X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // axe Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // axe Z
    }
    return positions;
  });

  // Animer le nuage à chaque frame (60 fois par seconde)
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta / 10;
      ref.current.rotation.x -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff4400"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Composant qui crée une poutre fictive infectée
function PoutreEndommagee() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotation lente de la poutre elle-même
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* La géométrie de base : un rectangle (poutre) */}
      <boxGeometry args={[1.5, 5, 1.5]} />
      <meshStandardMaterial 
        color="#3d2314"
        roughness={0.9}
        metalness={0.1}
      />
      {/* Une sphère rougeoyante imbriquée simulant un gros champignon/mérule qui pulse */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8b0000" roughness={1} emissive="#ff0000" emissiveIntensity={0.2} wireframe={true} />
      </mesh>
    </mesh>
  );
}

export default function DemoScene() {
  return (
    <div className="w-full h-screen bg-[#050505]">
      {/* Le Canvas est la fenêtre WebGL où la 3D est calculée */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* Lumière rouge dramatique venant du bas */}
        <pointLight position={[-5, -5, -5]} color="#ff0000" intensity={2} />
        
        {/* Nos composants 3D codés de toutes pièces */}
        <PoutreEndommagee />
        <SporeParticles />
        
        {/* Contrôles pour permettre à la souris/au doigt de tourner autour */}
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
        {/* Environnement pour les reflets */}
        <Environment preset="city" />
      </Canvas>

      {/* Interface par-dessus la 3D */}
      <div className="absolute top-10 left-10 text-white font-sans z-10 pointer-events-none">
        <h1 className="text-3xl font-black text-red-500 tracking-tighter">DÉMO TECHNIQUE 3D</h1>
        <p className="mt-2 text-base text-gray-300 max-w-md">
          Cette scène n'utilise AUCUNE image ni aucun fichier 3D préexistant. <br/><br/>
          La poutre, le champignon et les <strong>3000 particules de spores</strong> sont générés instantanément en pur code mathématique par ma programmation.
        </p>
        <p className="mt-4 text-sm text-teal-400 font-bold animate-pulse">👉 Touchez et glissez pour tourner autour.</p>
      </div>
    </div>
  );
}
