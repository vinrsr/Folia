import React from 'react';
import { motion } from 'framer-motion';

export const LandingUI = ({ onDiscoverClick }) => {
  const buttonHoverStyle = `
    .cta-button:hover { 
      background-color: #000 !important; /* Use !important to override inline style if needed */
      transform: translateY(-2px); 
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); 
      margin-bottom: 10px;
    }
  `;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2,
        staggerChildren: 0.2
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <style>{buttonHoverStyle}</style>
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
          // --- 1. JUSTIFY CONTENT TO CENTER ---
          // This will center the inner div horizontally.
          justifyContent: 'center', 
          alignItems: 'center', 
          pointerEvents: 'none' 
        }}
      >
        {/* --- The Inner Container --- */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          maxWidth: '40%',
        }}>
          <motion.p 
            variants={itemVariants} 
            style={{ 
              marginTop: '200px', 
              fontFamily: '"Poppins", sans-serif', 
              fontWeight: 1000, 
              fontSize: 'clamp(2rem, 2vw, 1.15rem)', 
              color: '#272D56', 
              lineHeight: 1.6,
              textAlign: 'center', 
            }}
          >
            Folia is a new wave of sparkling botanical water. We believe in the power of pure, simple ingredients to restore balance and awaken the senses. Each can is a moment of clarity—crisp, clean, and endlessly refreshing.
          </motion.p>

          <motion.button 
            onClick={onDiscoverClick}
            variants={itemVariants} 
            className="cta-button" 
            style={{ 
              fontFamily: '"Poppins", sans-serif', 
              fontWeight: 600, 
              fontSize: '1rem', 
              color: '#ffffff', 
              backgroundColor: '#272D56', 
              padding: '14px 28px', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              marginTop: '30px', 
              pointerEvents: 'all', 
              transition: 'all 0.3s ease' 
            }}
          >
            DISCOVER THE FLAVOR
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};