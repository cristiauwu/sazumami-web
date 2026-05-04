'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowDown, Flame, Leaf, Droplets, Sparkles, Waves, Shield } from 'lucide-react';

const STAGES = [
  { start: 0, end: 12 },
  { start: 12, end: 28 },
  { start: 28, end: 48 },
  { start: 48, end: 65 },
  { start: 65, end: 78 },
  { start: 78, end: 90 },
  { start: 90, end: 100 },
];

function useScrollProgress() {
  const [stageValues, setStageValues] = useState<number[]>([1, 0, 0, 0, 0, 0, 0]);

  const onScroll = useCallback(() => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = (window.scrollY / maxScroll) * 100;

    const newValues = STAGES.map((stage) => {
      if (progress < stage.start) return 0;
      if (progress >= stage.end) return 0;

      const range = stage.end - stage.start;
      const fadeInEnd = stage.start + range * 0.15;
      const fadeOutStart = stage.end - range * 0.15;

      if (progress < fadeInEnd) {
        return (progress - stage.start) / (fadeInEnd - stage.start);
      }
      if (progress > fadeOutStart) {
        return 1 - (progress - fadeOutStart) / (stage.end - fadeOutStart);
      }
      return 1;
    });

    setStageValues(newValues);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return { stageValues };
}

const sectionStyle = (opacity: number, transform: string): React.CSSProperties => ({
  opacity,
  transform,
  transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
  willChange: 'opacity, transform',
});

export function HeroSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 40;
  return (
    <div className="stage stage-hero" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center text-center">
        <div className="hero-wave-icon" style={{ opacity }}>
          <Waves className="w-10 h-10 text-oro/60" />
        </div>

        <h1 className="display-title">
          Saz<span className="text-oro">u</span>mami
        </h1>

        <div className="gold-line" />

        <p className="hero-subtitle">Sazón de mar.</p>

        <div className="scroll-indicator" style={{ opacity: Math.max(0, opacity * 0.8) }}>
          <ArrowDown className="w-6 h-6 text-oro/50" />
          <span className="text-xs text-oro/40 tracking-widest uppercase mt-2">Desliza para explorar</span>
        </div>
      </div>
    </div>
  );
}

export function OriginSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 60;
  return (
    <div className="stage stage-origin" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center px-6 md:px-20">
        <div className="stage-panel max-w-xl text-center">
          <Waves className="w-8 h-8 text-oro/50 mx-auto mb-3" />
          <h2 className="section-title">
            El <span className="text-oro">Origen</span>
          </h2>
          <div className="gold-line mx-auto" />
          <p className="body-text mt-6">
            Una mezcla artesanal nacida de la necesidad de llevar el auténtico y profundo sabor del mar directamente a tu mesa.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CompositionSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 60;
  return (
    <div className="stage stage-composition" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center px-6 md:px-20">
        <div className="stage-panel max-w-lg">
          <h2 className="section-title text-3xl md:text-4xl mb-2">
            Nuestra <span className="text-oro">Receta</span>
          </h2>
          <div className="gold-line" />

          <p className="body-text mt-4 text-sm">
            El perfil umami marino se define por nuestro ingrediente dominante:
          </p>

          <div className="mt-4 mb-6">
            <span className="stat-highlight">Camarón seco molido (53.42%)</span>
          </div>

          <p className="body-text text-xs">
            Sal de mesa (32.05%), Ajo en polvo, Cebolla en polvo, Paprika, Pimienta negra, Chile y Hierbas finas secas.
          </p>
        </div>
      </div>
    </div>
  );
}

export function UsesSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 40;
  const uses = [
    { name: 'Carnes', icon: Flame },
    { name: 'Mariscos', icon: Waves },
    { name: 'Verduras', icon: Leaf },
    { name: 'Sopas', icon: Droplets },
    { name: 'Botanas', icon: Sparkles },
    { name: 'Fruta fresca', icon: Leaf },
  ];

  return (
    <div className="stage stage-uses" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center px-6">
        <div className="stage-panel text-center max-w-xl">
          <h2 className="section-title text-3xl md:text-4xl">
            Versatilidad <span className="text-paprika">Absoluta</span>
          </h2>
          <div className="gold-line mx-auto" />

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
            {uses.map(({ name, icon: Icon }) => (
              <span key={name} className="tag-pill inline-flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IngredientsSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 60;
  const ingredients = [
    { name: 'Harina de camarón', pct: 53.42, desc: 'Ingrediente dominante. Umami puro, 51.7g proteína/100g.', accent: true },
    { name: 'Sal de mesa', pct: 32.05, desc: 'Conservador natural y potenciador de sabor.' },
    { name: 'Ajo en polvo', pct: 4.27, desc: 'Notas terrosas y aromáticas profundas.' },
    { name: 'Cebolla en polvo', pct: 4.27, desc: 'Dulzura y cuerpo en cada preparación.' },
    { name: 'Paprika', pct: 2.56, desc: 'Color vibrante y toque ahumado sutil.' },
    { name: 'Pimienta negra', pct: 1.28, desc: 'Pungencia y calidez equilibrada.' },
    { name: 'Chile en polvo', pct: 1.28, desc: 'Fuego controlado y carácter mexicano.' },
    { name: 'Hierbas finas', pct: 0.85, desc: 'Frescura herbácea y complejidad aromática.' },
  ];

  return (
    <div className="stage stage-ingredients" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center px-6 md:px-20">
        <div className="stage-panel max-w-lg">
          <h2 className="section-title text-center text-3xl md:text-4xl">
            Ingredientes <span className="text-oro">y Composición</span>
          </h2>
          <div className="gold-line mx-auto" />

          <div className="space-y-2.5 mt-6">
            {ingredients.map((ing, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 px-4 rounded-lg ${ing.accent ? 'bg-camaron/10 border border-camaron/20' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold tabular-nums ${ing.accent ? 'text-camaron' : 'text-oro/70'}`}>
                    {ing.pct}%
                  </span>
                  <span className={ing.accent ? 'text-blanco font-semibold' : 'text-blanco/85'}>
                    {ing.name}
                  </span>
                </div>
                <span className="hidden sm:block text-xs text-blanco/40 max-w-[200px] text-right">
                  {ing.desc}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <span className="text-xs text-blanco/35">Contenido neto: 117 g · 8 ingredientes puros sin aditivos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NutritionSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 60;
  return (
    <div className="stage stage-nutrition" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center px-6 md:px-20">
        <div className="stage-panel max-w-lg">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <Shield className="w-6 h-6 text-oro/60" />
            <h2 className="section-title text-3xl md:text-4xl">
              Información <span className="text-blanco">Nutrimental</span>
            </h2>
          </div>
          <div className="gold-line mx-auto" />

          <div className="space-y-3 text-sm mt-6">
            {[
              { label: 'Contenido Neto', value: '117 g', bold: true },
              { label: 'Energía por 100g', value: '180 kcal', bold: true },
              { label: 'Proteínas', value: '30 g' },
              { label: 'Grasas totales', value: '3 g' },
              { label: 'Grasas saturadas', value: '0.4 g' },
              { label: 'Carbohidratos', value: '9.9 g' },
              { label: 'Azúcares', value: '0.8 g' },
              { label: 'Fibra dietética', value: '3 g' },
              { label: 'Sodio', value: '13,800 mg', bold: true },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-blanco/5">
                <span className={row.bold ? 'text-blanco font-semibold' : 'text-blanco/60'}>{row.label}</span>
                <span className={row.bold ? 'text-oro font-bold' : 'text-blanco/80'}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="nom-seal">
              <span className="nom-seal-text">EXCESO SODIO</span>
              <span className="nom-seal-sub">SECRETARÍA DE SALUD</span>
            </div>
          </div>

          <p className="text-oro text-sm font-semibold mt-6 text-center tracking-wider">
            CONTIENE CAMARÓN/MARISCOS
          </p>
        </div>
      </div>
    </div>
  );
}

export function FooterSection({ opacity }: { opacity: number }) {
  const translateY = Math.max(0, 1 - opacity) * 30;
  return (
    <div className="stage stage-footer" style={sectionStyle(opacity, `translateY(${translateY}px)`)}>
      <div className="stage-inner items-center justify-center text-center px-6 pb-16">
        <div className="stage-panel max-w-md">
          <p className="body-text text-lg mb-6">Consérvese en lugar fresco y seco.</p>

          <button className="cta-button mx-auto" aria-label="Hazlo tuyo - Contactar para adquirir Sazumami">
            Hazlo tuyo
          </button>

          <div className="gold-line mx-auto mt-8 mb-4" />

          <p className="text-xs text-blanco/30 tracking-widest uppercase">
            Hecho en México. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ScrollSpacers() {
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      document.body.style.height = `${7 * vh}px`;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const heights = [12, 16, 20, 17, 13, 12, 10];

  return (
    <>
      {heights.map((pct, i) => (
        <div key={i} style={{ height: `${pct}vh` }} />
      ))}
    </>
  );
}

export function StagesContainer() {
  const { stageValues } = useScrollProgress();

  return (
    <div className="stages-layer">
      <HeroSection opacity={stageValues[0]} />
      <OriginSection opacity={stageValues[1]} />
      <CompositionSection opacity={stageValues[2]} />
      <IngredientsSection opacity={stageValues[3]} />
      <UsesSection opacity={stageValues[4]} />
      <NutritionSection opacity={stageValues[5]} />
      <FooterSection opacity={stageValues[6]} />
    </div>
  );
}
