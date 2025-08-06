// src/components/AnimatedBackground.jsx

import { useFrame, useThree } from '@react-three/fiber';
import { Color } from 'three';
import { useMemo, useEffect } from 'react'; // <-- Import useEffect

export const AnimatedBackground = ({ color }) => {
  const { scene } = useThree();
  const targetColor = useMemo(() => new Color(color), [color]);

  // --- THE FIX IS HERE ---
  // This useEffect runs when the component first mounts.
  // Its job is to make sure scene.background is not null.
  useEffect(() => {
    // If the scene has no background color, create one!
    if (!scene.background) {
      scene.background = new Color('#b6b2bf'); // Initialize with our starting color
    }
  }, [scene]); // Run this effect if the scene object ever changes

  useFrame((state, delta) => {
    // Add a safety check. Only animate if scene.background is a valid Color object.
    if (scene.background && scene.background.isColor) {
      scene.background.lerp(targetColor, delta * 2);
    }
  });

  return null;
};