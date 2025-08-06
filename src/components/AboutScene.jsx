// src/components/AboutScene.jsx

import React, { useState } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';

export const AboutScene = ({ onDiscoverClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8, staggerChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0.5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.group
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* "What is" Text */}
      <Text
        font="/fonts/CormorantGaramond-SemiBold.ttf"
        fontSize={0.25}
        color="#272d56"
        position={[-4.5, 1.5, 0]} // Positioned to the left of where "Folia" will be
        anchorX="left"
        material-toneMapped={false}
      >
        What is
      </Text>

      {/* Description Paragraph */}
      <motion.group variants={itemVariants}>
        <Text
          font="/fonts/Inter-Regular.ttf" // Use the readable UI font
          fontSize={0.15}
          color="#272d56"
          position={[-4.5, 0.5, 0]}
          anchorX="left"
          maxWidth={3.5} // This will wrap the text
          lineHeight={1.5}
          material-toneMapped={false}
        >
          Folia is a new wave of sparkling botanical refreshment. We believe in the power of pure, simple ingredients to restore balance and awaken the senses.
        </Text>
      </motion.group>

      {/* 3D Button */}
      <motion.group
        variants={itemVariants}
        position={[-4.5, -0.5, 0]}
        onClick={onDiscoverClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <Text
          font="/fonts/Poppins-SemiBold.ttf"
          fontSize={0.1}
          color={isHovered ? "#FFFFFF" : "#272d56"}
          position={[0, 0, 0.01]} // Slightly in front of the box
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          Discover the Collection
        </Text>
        <RoundedBox args={[1.8, 0.4, 0.1]}>
          <motion.meshStandardMaterial 
            color="#FFFFFF"
            animate={{ color: isHovered ? "#272d56" : "#FFFFFF" }}
          />
        </RoundedBox>
      </motion.group>
    </motion.group>
  );
};