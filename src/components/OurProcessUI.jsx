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

export const OurProcessUI = () => {
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
        color: '#E5E4E2', // A nice, soft white for text
        textAlign: 'center',
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <motion.h1 key="title" variants={itemVariants} style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '80px' }}>
        Pure & Simple
      </motion.h1>

      <motion.div
        key="steps-container"
        variants={containerVariants} // Use container variants again for nested stagger
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '80px', // Space between the columns
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {processSteps.map((step) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            style={{
              flex: 1, // Each column takes up equal space
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {step.icon}
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>{step.title}</h2>
            <p style={{ maxWidth: '300px', lineHeight: 1.6 }}>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};