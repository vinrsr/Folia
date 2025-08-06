// src/components/FloatingOrbs.jsx

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// A single, reusable Orb component
const Orb = ({ random }) => {
  const ref = useRef();
  // We use useMemo to create the random data once, so it's stable
  const { factor, speed, x, y, z } = useMemo(() => {
    return {
      factor: 0.5 + Math.random() * 2,
      speed: 0.005 + Math.random() / 500,
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10,
      z: Math.random() * 10 - 5,
    };
  }, []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * factor;
    ref.current.position.set(
      x + Math.cos(t) * 2,
      y + Math.sin(t) * 2,
      z + Math.sin(t) * 2,
    );
  });

  return (
    <Instance ref={ref} />
  );
};


export const FloatingOrbs = () => {
  const orbs = useMemo(() => Array.from({ length: 20 }, () => 0), []);

  return (
    // The <Instances> component is the key. It sets up the instanced rendering.
    <Instances
      limit={20} // The max number of instances
      frustumCulled={false} // Ensures they don't disappear at the edge of the screen
    >
      {/* 
        This is our base geometry and material.
        Every <Instance> will share this, which is why it's so fast.
      */}
      <circleGeometry args={[1, 64]} />
      <meshBasicMaterial  
        color="#272d56" 
        // emissive="#ffffff"
        // emissiveIntensity={0.4}
        roughness={0}
        metalness={0}
        transparent={true}
        opacity={0.15}
        // blending={THREE.AdditiveBlending} 
      />
      
      {/* We map over our array to create 20 individual instances */}
      {orbs.map((_, i) => (
        <Orb key={i} />
      ))}
    </Instances>
  );
};