'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Bottle Model
function Bottle() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Bottle Body (Glass) */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 2.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#1B4965"
          transmission={0.92}
          opacity={0.35}
          transparent
          metalness={0.15}
          roughness={0.05}
          ior={1.52}
          thickness={0.6}
          envMapIntensity={1.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Powder Inside (spice blend texture) */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 1.4, 32]} />
        <MeshDistortMaterial
          color="#C1440E"
          distort={0.4}
          speed={2}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Bottle Cap (brushed metal) */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.3, 32]} />
        <meshStandardMaterial color="#D4A853" metalness={0.9} roughness={0.15} />
      </mesh>
      
      {/* Cap Ridge / grip lines */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.12, 32]} />
        <meshStandardMaterial color="#C1440E" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

// Floating Spice Particles (paprika, pepper, shrimp dust)
function Particles({ count = 150 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#C1440E'),
      new THREE.Color('#E86A33'),
      new THREE.Color('#3B2314'),
      new THREE.Color('#D4A853'),
      new THREE.Color('#FAF8F5'),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y += delta * 0.03;
    
    // Wave motion for particles
    const posAttr = mesh.current.geometry.attributes.position;
    if (posAttr) {
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        posAttr.array[iy] += Math.sin(t * 0.5 + i * 0.1) * 0.002;
        posAttr.array[ix] += Math.cos(t * 0.3 + i * 0.08) * 0.001;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Abstract Wave Rings (ocean inspiration)
function WaveRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -1.8, -2]}>
      {[0.6, 0.9, 1.3, 1.8, 2.5].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.02, 64]} />
          <meshBasicMaterial
            color="#D4A853"
            transparent
            opacity={0.08 + i * 0.02}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.5, 5], fov: 40 }}
        dpr={[1, 1.5]}
      >
        {/* Deep ocean-spice gradient background */}
        <color attach="background" args={['#0D1B2A']} />
        <fog attach="fog" args={['#0D1B2A', 6, 15]} />
        
        <ambientLight intensity={0.3} color="#1B4965" />
        <directionalLight position={[3, 5, 2]} intensity={2} color="#F5E6CA" castShadow />
        <directionalLight position={[-2, 3, -1]} intensity={0.6} color="#E86A33" />
        <pointLight position={[0, 2, 3]} intensity={1.2} color="#D4A853" />
        
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.25}>
          <Bottle />
        </Float>
        
        <Particles count={150} />
        <WaveRings />
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={3} color="#1B4965" />
        <Environment preset="city" environmentIntensity={1} />
      </Canvas>
    </div>
  );
}
