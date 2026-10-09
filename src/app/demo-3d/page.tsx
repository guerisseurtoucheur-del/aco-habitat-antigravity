"use client";

import dynamic from 'next/dynamic';

// On désactive le SSR (Server-Side Rendering) car la 3D a besoin du navigateur (window) pour s'afficher.
const DemoScene = dynamic(() => import('@/components/3d/DemoScene'), { ssr: false });

export default function Demo3DPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <DemoScene />
    </main>
  );
}
