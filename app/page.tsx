'use client';

import { useState, useCallback } from 'react';
import { CanvasSequence } from '@/components/scenes/CanvasSequence';
import { StagesContainer, ScrollSpacers } from '@/components/sections/Sections';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleReady = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <main className={`app-root ${loaded ? 'loaded' : ''}`}>
      <CanvasSequence onReady={handleReady} />

      {loaded && (
        <>
          <StagesContainer />
          <ScrollSpacers />
        </>
      )}
    </main>
  );
}
