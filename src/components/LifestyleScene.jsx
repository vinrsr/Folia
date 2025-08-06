// src/components/LifestyleScene.jsx

import React from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
// --- THE FIX IS HERE ---
// We import the 3D-capable motion component directly from the main library
import { motion } from 'framer-motion';

// We don't need useThree or the scene manipulation anymore.
// This component will be much cleaner.

export const LifestyleScene = ({ activeMoment, momentActive }) => {
  const isSceneActive = activeMoment !== '';
  return (
    // We wrap the Environment in a motion.group to control its visibility.
    // A <group> is a standard Three.js object for holding other objects.
    <motion.group
      initial={{ opacity: 0 }}
      animate={{ opacity: momentActive ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {activeMoment === 'garden' && (
        <>
          <Environment
            files="/hdri/symmetrical_garden_02_4k.hdr"
            // files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
            background={false}
            // blur={0}
            // ground={{ height: 5, radius: 40, scale: 20 }}
          />
          {/* <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} /> */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial transparent opacity={0.2} />
          </mesh>
        </>
      )}
    </motion.group>
  );
};