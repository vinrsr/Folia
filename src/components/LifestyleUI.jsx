// src/components/LifestyleUI.jsx

import React from 'react';
import { motion } from 'framer-motion';

export const LifestyleUI = ({ activeMoment, onMomentChange }) => {
  // A simple fade-in animation for this section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2, // A small delay after the 3D can starts moving
        staggerChildren: 0.2 // This makes the title, p, and button animate in one by one
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeIn" 
      }
    }
  };
  
  // Script for the individual text elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Let's define our moments in a data structure for scalability
  const moments = [
    { id: '', name: 'Studio' }, // The default state
    { id: 'garden', name: 'Symmetrical Garden' },
    { id: 'rooftop', name: 'Rooftop Party' },
  ];

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start', // Align content to the left
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div 
          className="lifestyle-container"
          style={{
            color: '#272d56',
            fontFamily: '"Poppins", sans-serif',
            maxWidth: '30%',
            paddingLeft: '10vw', // Give it space from the left edge
            pointerEvents: 'all',
          }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '25px', color: 'white' }}>
            I DON'T KNOW WHAT IS THIS SECTION ABOUT
          </h2>
        </div>
    </motion.div>
  );
};