// src/components/LimitedEditionUI.jsx

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbHandGrab,
    TbArrowBigLeft,
    TbArrowBigRight,
} from 'react-icons/tb';

export const LimitedEditionUI = ({isMobile}) => {
  // Animation variants for a staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 }, // Animate from the top down
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const indicatorVariants = {
    hidden: { opacity: 0, y: 30 }, // Animate from the bottom up
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        // backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // We use justifyContent: 'space-between' to push elements to top and bottom
        justifyContent: 'space-between', 
        fontFamily: '"Poppins", sans-serif',
        pointerEvents: 'none',
        color: 'white',
        padding: isMobile ? '18% 0 10% 0' : '3% 0', 
      }}
    >
      {/* 1. TOP CLUSTER: "COMING SOON" and "LIMITED EDITION" */}
      <motion.div
        key="top-cluster"
        variants={containerVariants} // Use container for another stagger effect
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.h1
          key="title"
          variants={itemVariants}
          style={{ 
            color: '#312581', 
            // 5. Make font size responsive
            fontSize: isMobile ? '2.5rem' : '4rem', 
            fontWeight: 700, 
            textShadow: '0 4px 15px rgba(0,0,0,0.2)' 
          }}
        >
          COMING SOON
        </motion.h1>
      </motion.div>

      {/* The empty space in the middle is where your 3D can will be the hero */}
      
      {/* 2. DRAG INDICATOR (MOVED DOWN) */}
      <motion.div
        key="indicator"
        variants={indicatorVariants} // Using its own variant for a delayed entrance
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          // Removed absolute positioning. It will now sit at the bottom of the flex container.
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '10px' : '12px',
          background: 'rgba(49, 37, 129, 0.3)',
          padding: isMobile ? '8px 18px' : '10px 22px',
          borderRadius: '50px',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* <TbHandGrab size={24} /> */}
        <TbArrowBigLeft size={24} />
        <span style={{ 
          fontWeight: 500, 
          // 7. Adjust text size within the indicator
          fontSize: isMobile ? '0.8rem' : '1rem' 
        }}>
          GRAB CAN TO ROTATE
        </span>
        <TbArrowBigRight size={24} />
      </motion.div>

    </motion.div>
  );
};