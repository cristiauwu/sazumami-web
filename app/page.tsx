import dynamic from 'next/dynamic';
import { HeroSection, OriginSection, IngredientsSection, UsesSection, NutritionalSection, BottleSection, FooterSection } from '@/components/sections/Sections';

const Scene3D = dynamic(() => import('@/components/scenes/Scene3D'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0D1B2A] text-blanco overflow-x-hidden">
      {/* 3D Canvas fixed in background */}
      <Scene3D />
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        <HeroSection />
        <OriginSection />
        <IngredientsSection />
        <UsesSection />
        <NutritionalSection />
        <BottleSection />
        <FooterSection />
      </div>
    </main>
  );
}
