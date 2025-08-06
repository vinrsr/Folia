// src/components/ContinueButton.jsx

import React from 'react';
import { motion } from 'framer-motion';

export const ContinueButton = ({ onClick }) => {
  // Animation for the container to fade in
  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, delay: 1.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  // A subtle bouncing animation for the chevron to draw attention
  const chevronVariants = {
    bounce: {
      y: [0, 8, 0], // Bounces up and down by 8px
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      onClick={onClick}
      variants={iconContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'absolute',
        bottom: '5%', // Adjusted position
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        pointerEvents: 'all',
      }}
    >
      <motion.svg
        variants={chevronVariants}
        animate="bounce"
        width="40" // Increased size for better visibility
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M19.5 9L12 16.5L4.5 9" 
          stroke="#272D56" // Using your brand's dark blue color
          strokeWidth="2.5" // Thicker line
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </motion.svg>
    </motion.div>
  );
};