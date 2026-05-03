'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, Droplets, Flame, Leaf, Shield, Waves, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(titleRef.current, { y: 80, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.3 });
    tl.from(lineRef.current, { scaleX: 0, duration: 1, ease: 'power2.out' }, '-=0.6');
    tl.from(subtitleRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10">
      {/* Decorative wave icon */}
      <div className="mb-6 opacity-0 animate-[fadeIn_1.5s_ease-in_forwards]">
        <Waves className="w-10 h-10 text-oro/60" />
      </div>

      <h1 ref={titleRef} className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-blanco tracking-tight">
        Saz<span className="text-oro">u</span>mami
      </h1>

      <div ref={lineRef} className="w-0 h-[2px] bg-gradient-to-r from-transparent via-paprika to-transparent my-4" />

      <p ref={subtitleRef} className="text-lg md:text-2xl text-blanco/60 font-sans tracking-widest uppercase">
        Sazón de mar para todo uso
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 scroll-pulse">
        <ArrowDown className="w-6 h-6 text-oro/50" />
      </div>
    </section>
  );
}

export function OriginSection() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from('.origin-content', {
      scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'top 40%', scrub: 1 },
      y: 100, opacity: 0, duration: 1,
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 md:px-20 z-10 relative">
      <div className="origin-content max-w-3xl mx-auto text-center">
        {/* Wave accent */}
        <div className="flex justify-center mb-6">
          <Waves className="w-8 h-8 text-mar/40" />
        </div>
        <h2 className="section-title mb-4">
          Nacido del <span className="text-oro">mar</span> y las especias
        </h2>
        <div className="gold-line" />
        <p className="body-text mt-8">
          Sazumami fusiona el <strong className="text-blanco">umami natural del camarón</strong> deshidratado con la intensidad de especias selectas. Un polvo que concentra la tradición costera mexicana en cada gramo.
        </p>
        <p className="body-text mt-4">
          Formulamos cada nota para resaltar, no opacar. El polvo anaranjado-rojizo que ves en el frasco es la mezcla exacta de ocho ingredientes sin rellenos ni aditivos.
        </p>

        {/* Stats badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="glass-card px-6 py-3 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-camaron" />
            <span className="text-sm text-blanco/80">117 g contenido neto</span>
          </div>
          <div className="glass-card px-6 py-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-oro" />
            <span className="text-sm text-blanco/80">8 ingredientes puros</span>
          </div>
          <div className="glass-card px-6 py-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-paprika" />
            <span className="text-sm text-blanco/80">Hecho en México</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IngredientsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const items = [
    { name: 'Harina de camarón', desc: 'Umami puro y 51.7g de proteína por cada 100g', icon: '🦐' },
    { name: 'Sal de mesa', desc: 'Conservador natural y potenciador de sabor', icon: '🧂' },
    { name: 'Ajo en polvo', desc: 'Notas terrosas y aromáticas profundas', icon: '🧄' },
    { name: 'Cebolla en polvo', desc: 'Dulzura y cuerpo en cada preparación', icon: '🧅' },
    { name: 'Paprika', desc: 'Color vibrante y toque ahumado sutil', icon: '🌶️' },
    { name: 'Pimienta negra', desc: 'Pungencia y calidez equilibrada', icon: '⚫' },
    { name: 'Chile en polvo', desc: 'Fuego controlado y carácter mexicano', icon: '🔥' },
    { name: 'Hierbas finas', desc: 'Frescura herbácea y complejidad aromática', icon: '🌿' },
  ];

  useGSAP(() => {
    gsap.from('.ingredient-item', {
      scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom center', scrub: 1 },
      y: 60, opacity: 0, stagger: 0.12, duration: 0.8,
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="min-h-screen py-24 px-6 md:px-20 z-10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">
            La Alquimia de <span className="text-oro">8</span> Ingredientes
          </h2>
          <div className="gold-line" />
          <p className="body-text mt-4 max-w-xl mx-auto">
            Cada ingrediente aporta su carácter. Juntos crean un perfil de sabor que no existe en ningún otro sazonador.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div key={i} className="ingredient-item glass-card p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-serif text-xl font-bold text-oro mb-2">{item.name}</h3>
              <p className="text-sm text-blanco/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UsesSection() {
  const uses = [
    { name: 'Carnes', icon: Flame },
    { name: 'Mariscos', icon: Waves },
    { name: 'Verduras', icon: Leaf },
    { name: 'Sopas', icon: Droplets },
    { name: 'Botanas', icon: Sparkles },
    { name: 'Fruta', icon: Leaf },
  ];

  return (
    <section className="min-h-screen py-24 px-6 md:px-20 z-10 relative flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Modo de <span className="text-paprika">Empleo</span>
          </h2>
          <div className="gold-line" />
          <p className="body-text mt-4 max-w-xl mx-auto">
            Esparcir al gusto. La intensidad se libera con el calor y la humedad. No necesita reposo.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {uses.map(({ name, icon: Icon }) => (
            <div key={name} className="tag-pill flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NutritionalSection() {
  return (
    <section className="min-h-screen py-24 px-6 md:px-20 z-10 relative flex items-center justify-center">
      <div className="max-w-3xl mx-auto w-full text-center">
        <div className="flex justify-center mb-6">
          <Shield className="w-8 h-8 text-oro/60" />
        </div>
        <h2 className="section-title mb-4">
          Lo que <span className="text-blanco">lleva</span>
        </h2>
        <div className="gold-line" />
        
        <div className="glass-card mt-10 p-8 md:p-12 text-left">
          <h3 className="text-center font-serif text-xl text-oro mb-8 uppercase tracking-widest">Tabla Nutrimental por 100g</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Energía', value: '180 kcal', bold: true },
              { label: 'Proteínas', value: '30 g', bold: true },
              { label: 'Grasas totales', value: '3 g' },
              { label: 'Grasas saturadas', value: '0.4 g', bold: true },
              { label: 'Grasas trans', value: '0 mg', bold: true },
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
          
          <div className="mt-8 pt-6 border-t border-paprika/30 text-center">
            <p className="text-xs text-paprika uppercase tracking-widest mb-2">
              ⬥ Exceso Sodio ⬥
            </p>
            <p className="text-xs text-blanco/40">
              Sello de advertencia conforme a NOM-051 Fase 3
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BottleSection() {
  return (
    <section className="min-h-screen py-24 px-6 md:px-20 z-10 relative flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center glass-card p-10 md:p-16">
        <div className="flex justify-center mb-6">
          <Shield className="w-8 h-8 text-oro/60" />
        </div>
        <h2 className="section-title mb-4">
          Vidrio y <span className="text-oro">Pureza</span>
        </h2>
        <div className="gold-line" />
        <p className="body-text mb-8 mt-6">
          Envasado en vidrio transparente de alta resistencia. El vidrio protege el polvo de especias de la oxidación y permite ver la calidad del contenido: su color anaranjado-rojizo con motas oscuras de paprika y pimienta.
        </p>
        <div className="inline-block glass-card px-8 py-4">
          <p className="text-sm text-blanco/70 uppercase tracking-widest">
            Consérvese en lugar fresco y seco<br />
            Una vez abierto, mantener bien cerrado
          </p>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="py-16 px-6 text-center z-10 relative" style={{ background: 'linear-gradient(to top, #0A1520, transparent)' }}>
      <h3 className="font-serif text-3xl font-bold text-blanco mb-2">
        Saz<span className="text-oro">u</span>mami
      </h3>
      <p className="text-blanco/40 mb-6">Hecho en México · Contenido neto: 117 g</p>
      
      <div className="flex justify-center gap-6 text-xs text-blanco/30 uppercase tracking-widest mb-8">
        <span className="border border-paprika/30 px-3 py-1 text-paprika/60">Contiene camarón</span>
        <span className="border border-paprika/30 px-3 py-1 text-paprika/60">Exceso sodio</span>
      </div>
      
      <div className="gold-line mx-auto mb-6" />
      
      <p className="text-xs text-blanco/20">
        © {new Date().getFullYear()} Sazumami. Todos los derechos reservados.
      </p>
    </footer>
  );
}
