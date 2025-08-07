// src/components/OurProcessUI.jsx

import React from 'react';
import { motion } from 'framer-motion';
// To get icons easily, let's use a popular library.
// Run this in your terminal: npm install react-icons
import { TbMountain, TbLeaf, TbBottle } from 'react-icons/tb';

// 1. Define your content in an array. This makes the code clean.
const processSteps = [
  {
    icon: <TbMountain size={48} />,
    title: 'Pristine Sourcing',
    description: 'We start with pure, crisp water sourced from protected alpine springs.',
  },
  {
    icon: <TbLeaf size={48} />,
    title: 'Natural Infusion',
    description: 'Real fruit purees and botanicals are gently infused, never from concentrate or artificial flavors.',
  },
  {
    icon: <TbBottle size={48} />,
    title: 'Canned for Freshness',
    description: 'We capture that clarity in every can, perfectly carbonated and ready to enjoy.',
  },
];

export const OurProcessUI = ({ isMobile }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, delay: 0.5, staggerChildren: 0.2 } 
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, y: -30 },
  };

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E5E4E2',
        textAlign: 'center',
        fontFamily: '"Poppins", sans-serif',
        padding: isMobile ? '0 15%' : '0',
        // backgroundColor: 'yellow'
      }}
    >
      <motion.h1 
        key="title" 
        variants={itemVariants} 
        style={{ 
          fontSize: isMobile ? '2.5rem' : '3.5rem', // Smaller font on mobile
          fontWeight: 700, 
          marginBottom: isMobile ? '40px' : '80px' 
        }}
      >
        Pure & Simple
      </motion.h1>

      <motion.div
        key="steps-container"
        variants={containerVariants}
        style={{
          display: 'flex',
          // 1. THIS IS THE KEY FIX: On mobile it's a column (stacking rows), on desktop it's a row (side-by-side columns).
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          gap: isMobile ? '40px' : '80px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {processSteps.map((step) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            style={{
              display: 'flex',
              // On desktop, the items in the column are centered vertically.
              // On mobile, the items in the row have the icon on the left.
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: isMobile ? 'center' : 'center', // Center vertically in both layouts
              textAlign: isMobile ? 'left' : 'center',
              gap: '20px',
              // On desktop, each column takes equal space.
              flex: isMobile ? 'none' : 1, 
            }}
          >
            {/* Using a wrapper for the icon to control its size and prevent shrinking */}
            <div style={{ flexShrink: 0 }}>
              {React.cloneElement(step.icon, { size: isMobile ? 50 : 48 })}
            </div>
            
            <div style={{
              // display: 'flex',
              flexDirection: 'column',
              // gap: '5px',
              // backgroundColor: 'blue'
            }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.2rem' : '1.8rem', // Made mobile font even smaller
                fontWeight: 600, 
                // backgroundColor: 'red'
              }}>
                {step.title}
              </h2>
              <p style={{ 
                maxWidth: '300px', 
                // backgroundColor: 'yellow',
                lineHeight: 1.6, 
                opacity: 0.8,
                fontSize: isMobile ? '0.9rem' : '1rem' // Added responsive font size for description
              }}>
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};