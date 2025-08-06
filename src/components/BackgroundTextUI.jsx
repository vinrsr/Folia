// src/components/BackgroundTextUI.jsx

import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundTextUI = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1, // Stay at the back
      }}
    >
      <h1 style={{
        // fontFamily: '"Cormorant Garamond", serif',
        fontWeight: 600,
        fontSize: 'clamp(10rem, 25vw, 20rem)', // Huge, responsive font size
        color: '#272d56',
        opacity: 1, // Make it subtle so it doesn't overpower the can
        lineHeight: '1em',
      }}>
        FOLIA
      </h1>
    </motion.div>
  );
};