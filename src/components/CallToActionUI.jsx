// src/components/CallToActionUI.jsx

import React from 'react';
import { motion } from 'framer-motion';

// A simple SVG icon for social media links. You can replace these with your own!
// Using SVGs directly in the component like this is clean and efficient.
const SocialIcon = ({ children, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    style={{
      color: 'white',
      width: 40,
      height: 40,
    }}
  >
    {children}
  </motion.a>
);

export const CallToActionUI = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.4,
        staggerChildren: 0.2 // This will now stagger the title and the social icons container
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        pointerEvents: 'all',
      }}
    >
      <motion.h2 
        variants={itemVariants}
        style={{ 
          fontFamily: '"Poppins", sans-serif', 
          fontSize: '3rem', 
          fontWeight: 800, 
          color: 'white', 
          textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          marginBottom: '40px' // Increased margin
        }}
      >
        Join the Wave
      </motion.h2>

      {/* --- REPLACED THE BUTTON WITH THIS SOCIAL LINKS CONTAINER --- */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          gap: '30px', // Space between icons
        }}
      >
        <SocialIcon href="https://twitter.com">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.8 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.08 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.98-2.08z"></path></svg>
        </SocialIcon>
        <SocialIcon href="https://instagram.com">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
        </SocialIcon>
        <SocialIcon href="https://facebook.com">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.52 4.5 10.02 10 10.02s10-4.5 10-10.02C22 6.53 17.5 2.04 12 2.04zM16.5 8.25h-2.25c-.2 0-.45.1-.45.5v1.5h2.7l-.45 2.25h-2.25v6.75h-3V12.5h-2.25V10.25h2.25V8.5c0-1.65 1.35-3 3-3h2.25v2.75z"></path></svg>
        </SocialIcon>
      </motion.div>
    </motion.div>
  );
};