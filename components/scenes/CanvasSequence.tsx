'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const FRAME_COUNT = 240;

export function CanvasSequence({ onReady }: { onReady: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const maxScrollRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const preloadFrames = useCallback(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${String(i).padStart(3, '0')}.png`;
      images[i - 1] = img;

      img.onload = () => {
        loaded++;
        setProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setReady(true);
          onReady();
        }
      };

      img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setReady(true);
          onReady();
        }
      };
    }
  }, [onReady]);

  useEffect(() => {
    preloadFrames();

    document.body.classList.add('loading');
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.classList.remove('loading');
      document.body.style.overflow = '';
    };
  }, [preloadFrames]);

  useEffect(() => {
    if (ready) {
      document.body.style.overflow = '';
      document.body.classList.remove('loading');
    }
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      maxScrollRef.current = maxScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const render = () => {
      if (imagesRef.current.length < FRAME_COUNT) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const maxScroll = maxScrollRef.current || 1;
      const scrollY = window.scrollY || window.pageYOffset;
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor((scrollY / maxScroll) * FRAME_COUNT));
      const scrollPct = (scrollY / maxScroll) * 100;

      let explosionOpacity = 0;
      if (scrollPct > 40) {
        explosionOpacity = Math.min(1, (scrollPct - 40) / 30);
      }

      if (frameIndex !== currentFrameRef.current || explosionOpacity > 0) {
        currentFrameRef.current = frameIndex;
        const img = imagesRef.current[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          const cw = canvas.width;
          const ch = canvas.height;
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;

          const canvasAspect = cw / ch;
          const imageAspect = iw / ih;

          let drawW: number, drawH: number, drawX: number, drawY: number;

          if (imageAspect > canvasAspect) {
            drawH = ch;
            drawW = ch * imageAspect;
            drawX = (cw - drawW) / 2;
            drawY = 0;
          } else {
            drawW = cw;
            drawH = cw / imageAspect;
            drawX = 0;
            drawY = (ch - drawH) / 2;
          }

          ctx.clearRect(0, 0, cw, ch);
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, cw, ch);
          ctx.drawImage(img, drawX, drawY, drawW, drawH);

          const edgeGrad = ctx.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * 0.3, cw / 2, ch / 2, Math.max(cw, ch) * 0.72);
          edgeGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          edgeGrad.addColorStop(0.25, `rgba(0, 0, 0, ${0.08 * explosionOpacity})`);
          edgeGrad.addColorStop(0.55, `rgba(166, 60, 6, ${0.35 * explosionOpacity})`);
          edgeGrad.addColorStop(0.8, `rgba(74, 21, 4, ${0.6 * explosionOpacity})`);
          edgeGrad.addColorStop(1, `rgba(0, 0, 0, ${0.85 * explosionOpacity})`);
          ctx.fillStyle = edgeGrad;
          ctx.fillRect(0, 0, cw, ch);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  if (!ready) {
    return (
      <div className="preloader" aria-label="Cargando experiencia">
        <div className="preloader-logo">Saz<span className="preloader-logo-accent">u</span>mami</div>
        <div className="preloader-track">
          <div className="preloader-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader-text">{progress}% <span className="preloader-label">Cargando experiencia...</span></div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="sequence-canvas"
      aria-hidden="true"
    />
  );
}
