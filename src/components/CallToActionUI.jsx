// src/components/CTA_Retail.jsx

import React from 'react';
import { motion } from 'framer-motion';
// Don't forget to run: npm install react-icons
import { FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

export const CallToActionUI = () => {
  // Animation variants from previous examples
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const socialIconStyle = {
    color: '#B0B0B0', // A neutral grey
    cursor: 'pointer',
    pointerEvents: 'all',
  };

  // IMPORTANT: You will need to find and place these logo files in your /public/logos/ folder
  const storeLogos = [
    { name: 'Indomaret', path: '/logos/supermarket/indomaret.svg' },
    { name: 'Alfamart', path: '/logos/supermarket/alfamart.svg' },
    { name: 'Circle K', path: '/logos/supermarket/circle_k.webp' },
    { name: 'Family Mart', path: '/logos/supermarket/familymart.svg' },
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        textAlign: 'center',
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <motion.h1 
        key="title" 
        variants={itemVariants} 
        style={{ fontSize: '4rem', fontWeight: 700, color: '#FFFFFF' }}
      >
        Your Moment Awaits.
      </motion.h1>

      <motion.p 
        key="subtitle" 
        variants={itemVariants} 
        style={{ fontSize: '1.2rem', color: '#B0B0B0', maxWidth: '600px', lineHeight: 1.6 }}
      >
        Find your clarity. Folia is now chilling in the fridges of your favorite convenience stores across Indonesia.
      </motion.p>
      
      {/* Container for the store logos */}
      <motion.div 
        key="logos" 
        variants={itemVariants} 
        style={{ display: 'flex', gap: '40px', alignItems: 'center', marginTop: '20px' }}
      >
        {storeLogos.map(logo => (
          <img 
            key={logo.name}
            src={logo.path}
            alt={`${logo.name} logo`}
            style={{
              height: '40px',
              // filter: 'grayscale(100%) brightness(1.5)'
            }} // Styled to look clean and uniform
          />
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div 
        key="divider" 
        variants={itemVariants} 
        style={{ width: '80px', height: '2px', background: '#444', marginTop: '40px', marginBottom: '20px' }}
      />
      
      {/* Social Media Call to Action */}
      <motion.h2 
        key="social-title" 
        variants={itemVariants} 
        style={{ fontSize: '1.5rem', fontWeight: 600, color: '#E5E4E2' }}
      >
        Join the Folia Vibe
      </motion.h2>

      <motion.div 
        key="social-icons" 
        variants={itemVariants} 
        style={{ display: 'flex', gap: '30px' }}
      >
        <motion.div whileHover={{ scale: 1.2, color: '#FFFFFF' }} style={socialIconStyle}>
          <FaInstagram size={32} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: '#FFFFFF' }} style={socialIconStyle}>
          <FaTiktok size={32} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: '#FFFFFF' }} style={socialIconStyle}>
          <FaTwitter size={32} />
        </motion.div>
      </motion.div>

      {/* --- THIS IS THE NEW FOOTER FOR CREDITS & DISCLAIMER --- */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2%', // Pinned to the bottom of the screen
          width: '100%',
          textAlign: 'center',
          fontFamily: '"Poppins", sans-serif',
          color: '#666', // A muted color so it doesn't distract
          fontSize: '0.9rem',
          pointerEvents: 'none', // Not interactive
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }} // Appears last, after a longer delay
      >
        <p>A Web Experience by <a href="https://vinrsr.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6A6A6A', fontWeight: '600', textDecoration: 'underline', pointerEvents: 'all' }}>VINRSR</a></p>
        <p style={{ marginTop: '5px' }}>Folia is a fictional brand created for portfolio purposes.</p>
      </motion.div>

    </motion.div>
  );
};