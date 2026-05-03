Perfecto, aquí tienes el `SKILL.md` actualizado usando **Sazumami** como producto de referencia. Solo incluyo los datos relevantes para el showcase, sin volcar toda la ficha regulatoria:

---

````markdown
# SKILL.md — Showcase Web: Sazumami (Envase de Vidrio · GSAP + Three.js)

## 1. Concepto del Producto

- **Nombre:** Sazumami
- **Tagline:** Sazón de mar para todo uso.
- **Contenido neto:** 117 g
- **Ingredientes destacados:** Harina de camarón, sal de mesa, ajo en polvo, cebolla en polvo, paprika, pimienta negra, chile en polvo, hierbas finas.
- **Modo de empleo:** Esparcir al gusto sobre carnes, mariscos, verduras, sopas, botanas o fruta fresca.
- **Origen:** Hecho en México.

> El sitio NO es e-commerce. Es una experiencia visual inmersiva que presenta el producto, su identidad y sus usos.

---

## 2. Envase de Referencia

- **Tipo:** Frasco de vidrio transparente con tapa metálica de rosca (estilo spice jar).
- **Altura aproximada:** 10–12 cm.
- **Diámetro:** 5–6 cm.
- **Vidrio:** Transparente, ligeramente verdoso en los bordes gruesos; refracción visible en las aristas inferiores.
- **Tapa:** Metal dorado o negro mate, con grip estriado en el borde.
- **Etiqueta:** Envolvente, colores cálidos (rojos, naranjas, dorados) que evocan el mar y las especias. Tipografía bold para "Sazumami", subtítulo en tipo condensado.
- **Contenido visible:** Polvo fino de tono anaranjado-rojizo con motas oscuras (paprika + pimienta + chile). A través del vidrio se percibe la textura granulada.
- **Detalles de modelado 3D:**
  - Reflejos especulares en el hombro del frasco.
  - Caustics sutiles donde la luz atraviesa el vidrio y el polvo interior.
  - El polvo interior NO es un sólido plano; usar noise displacement para simular superficie granulada irregular.
  - La tapa debe tener reflejo metálico anisotrópico (brushed metal).

---

## 3. Stack Técnico

| Capa              | Tecnología                          |
|--------------------|-------------------------------------|
| Framework          | Astro / Next.js (SSG preferido)     |
| 3D                 | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Animación          | GSAP + ScrollTrigger + SplitText    |
| Shaders            | GLSL personalizado (vidrio, cáusticas) |
| Modelo 3D          | `.glb` optimizado con Draco (< 1.5 MB) |
| Estilos            | Tailwind CSS / CSS Modules          |
| Tipografía         | Variable fonts (ej. "Plus Jakarta Sans", "Playfair Display") |

---

## 4. Estructura de Secciones del Sitio

```text
[Hero]
  → Frasco 3D centrado, rotación lenta, partículas de especias flotando.
  → Título "Sazumami" animado con SplitText, subtítulo "Sazón de mar para todo uso".
  → Scroll indicator animado.

[Origen / Historia]
  → Parallax de imágenes (mar, camarones, especias).
  → Texto narrativo sobre la inspiración del producto.
  → El frasco 3D se desplaza lateralmente y se reduce en escala al hacer scroll.

[Ingredientes]
  → El frasco rota y la etiqueta se hace semitransparente, revelando el contenido.
  → Cada ingrediente aparece como partícula flotante con label:
      Harina de camarón · Sal de mesa · Ajo · Cebolla · Paprika · Pimienta negra · Chile · Hierbas finas.
  → Timeline GSAP que destaca cada ingrediente en secuencia.

[Usos / Recetas]
  → Cards horizontales con scroll snap: Carnes, Mariscos, Verduras, Sopas, Botanas, Fruta.
  → Al hover/click, el frasco 3D simula esparcir polvo (sistema de partículas).
  → Fotografías de platillos con efecto de profundidad (parallax por capas).

[El Envase]
  → Sección dedicada a la calidad del vidrio y la conservación.
  → El frasco se abre (animación de tapa desenroscándose).
  → Copy: "Consérvese en lugar fresco y seco. Una vez abierto, mantener bien cerrado."

[Footer / Contacto]
  → Redes sociales, datos de marca.
  → El frasco reposa sobre una superficie con sombra de contacto suave.
```

---

## 5. Paleta de Color

```css
:root {
  /* Inspirada en especias + mar */
  --sazumami-rojo-paprika:   #C1440E;
  --sazumami-naranja-camaron: #E86A33;
  --sazumami-dorado-sal:     #D4A853;
  --sazumami-arena:          #F5E6CA;
  --sazumami-negro-pimienta: #1A1A1A;
  --sazumami-azul-mar:       #1B4965;
  --sazumami-blanco-sal:     #FAF8F5;
  --sazumami-verde-vidrio:   #A8C5B8; /* tinte del vidrio en bordes */
}
```

---

## 6. Configuración Three.js — Escena del Frasco

```jsx
// HeroScene.jsx
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import { BottleModel } from './BottleModel'
import { SpiceParticles } from './SpiceParticles'

export default function HeroScene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.5, 4], fov: 35 }}
      dpr={[1, 1.5]}
    >
      <Environment preset="studio" environmentIntensity={0.6} />

      <directionalLight
        position={[3, 5, 2]}
        intensity={1.8}
        color="#F5E6CA"
        castShadow
      />
      <directionalLight
        position={[-2, 3, -1]}
        intensity={0.4}
        color="#1B4965"
      />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <BottleModel />
      </Float>

      <SpiceParticles count={120} />

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.35}
        scale={6}
        blur={2.5}
      />
    </Canvas>
  )
}
```

---

## 7. Shader de Vidrio (GLSL simplificado)

```glsl
// glassFragment.glsl
uniform float uOpacity;
uniform float uIOR;
uniform float uFresnelPower;
uniform vec3  uTintColor; // vec3(0.66, 0.77, 0.72) → verde-vidrio

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uFresnelPower);

  vec3 baseColor = mix(vec3(1.0), uTintColor, 0.12);
  vec3 rimColor  = uTintColor * 1.4;
  vec3 finalColor = mix(baseColor, rimColor, fresnel);

  float alpha = mix(uOpacity, 0.95, fresnel);

  gl_FragColor = vec4(finalColor, alpha);
}
```

---

## 8. Animaciones GSAP — Timelines por Sección

```js
// heroAnimations.js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function initHeroAnimations() {
  // Título "Sazumami" — aparición por caracteres
  const titleSplit = new SplitText('.hero__title', { type: 'chars' })

  gsap.from(titleSplit.chars, {
    yPercent: 110,
    rotateX: -45,
    opacity: 0,
    stagger: 0.035,
    duration: 0.9,
    ease: 'expo.out',
    delay: 0.4
  })

  // Subtítulo
  gsap.from('.hero__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.0
  })

  // Frasco → se encoge y desplaza al hacer scroll hacia sección Origen
  gsap.to('.hero-canvas', {
    scale: 0.55,
    x: '-35vw',
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-origen',
      start: 'top bottom',
      end: 'top center',
      scrub: 1
    }
  })
}
```

```js
// ingredientsAnimations.js
export function initIngredientsTimeline() {
  const ingredients = [
    'Harina de camarón', 'Sal de mesa', 'Ajo en polvo',
    'Cebolla en polvo', 'Paprika', 'Pimienta negra',
    'Chile en polvo', 'Hierbas finas'
  ]

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-ingredientes',
      start: 'top center',
      end: 'bottom center',
      scrub: 0.8
    }
  })

  ingredients.forEach((_, i) => {
    tl.from(`.ingredient-particle[data-index="${i}"]`, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(2)'
    }, i * 0.12)

    tl.from(`.ingredient-label[data-index="${i}"]`, {
      x: -20,
      opacity: 0,
      duration: 0.3
    }, i * 0.12 + 0.15)
  })

  // Etiqueta se vuelve semitransparente
  tl.to('.bottle-label-mesh', {
    'material-opacity': 0.15,
    duration: 0.6
  }, 0)
}
```

---

## 9. Partículas de Especias

```jsx
// SpiceParticles.jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpiceParticles({ count = 120 }) {
  const meshRef = useRef()

  const particles = useMemo(() => {
    const temp = []
    // Colores: paprika rojo, pimienta oscura, ajo crema
    const colors = [
      new THREE.Color('#C1440E'),
      new THREE.Color('#E86A33'),
      new THREE.Color('#3B2314'),
      new THREE.Color('#D4A853')
    ]

    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3
        ],
        scale: Math.random() * 0.015 + 0.005,
        speed: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    return temp
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    meshRef.current.children.forEach((child, i) => {
      const p = particles[i]
      child.position.y += Math.sin(t * p.speed + i) * 0.0008
      child.position.x += Math.cos(t * p.speed * 0.5 + i) * 0.0004
    })
  })

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.scale, 6, 6]} />
          <meshStandardMaterial
            color={p.color}
            roughness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}
```

---

## 10. Animación de Apertura de Tapa

```js
// bottleOpenAnimation.js
export function initBottleOpen(bottleGroup) {
  // bottleGroup.children: [body, label, cap, content]
  const cap = bottleGroup.getObjectByName('cap')

  gsap.timeline({
    scrollTrigger: {
      trigger: '.section-envase',
      start: 'top center',
      end: 'center center',
      scrub: 1
    }
  })
  .to(cap.rotation, {
    y: Math.PI * 3,   // 1.5 vueltas de desenrosque
    duration: 1
  })
  .to(cap.position, {
    y: '+=0.8',        // se eleva
    duration: 0.6
  }, 0.4)
}
```

---

## 11. Performance

| Regla | Detalle |
|-------|---------|
| Modelo GLB | < 1.5 MB con Draco compression |
| Texturas | WebP, max 1024×1024 para etiqueta; 512×512 para tapa |
| Partículas | Máximo 150; reducir a 60 en móvil |
| DPR | `[1, 1.5]` — no exceder 1.5 en Canvas |
| Scroll | `will-change: transform` solo en elementos animados activos |
| Lazy load | La sección 3D del hero carga inmediatamente; el resto de canvas con `IntersectionObserver` |
| Fallback móvil | Si `navigator.hardwareConcurrency < 4`, reemplazar escena 3D con imagen estática del frasco con parallax CSS |

---

## 12. Tipografía

```css
/* Display / títulos */
font-family: 'Playfair Display', serif;

/* Body / UI */
font-family: 'Plus Jakarta Sans', sans-serif;

/* Sizes (clamp) */
--fs-hero-title: clamp(3rem, 8vw, 7rem);
--fs-section-title: clamp(1.8rem, 4vw, 3.2rem);
--fs-body: clamp(1rem, 1.2vw, 1.125rem);
```

---

## 13. Responsive

| Breakpoint | Comportamiento |
|------------|---------------|
| ≥ 1024px   | Frasco a un lado, texto al otro. Parallax completo. |
| 768–1023px | Frasco centrado encima del texto. Reducir partículas a 80. |
| < 768px    | Frasco como imagen estática o canvas simplificado. Scroll snap en cards de recetas. Tipografía ajustada via clamp. |

