// src/components/SectionNav.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This component receives the total sections, the current section, and a function to change sections
export const SectionNav = ({ total, current, onChange }) => {
  return (
    <div
      style={{
        position: 'fixed', // Use fixed to ensure it stays in place
        top: '50%',
        right: '2%', // Position on the right side
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        pointerEvents: 'all',
      }}
    >
      {/* Create an array from 0 to total-1 and map over it */}
      {[...Array(total).keys()].map(index => (
        <div
          key={index}
          onClick={() => onChange(index)} // Allow clicking to change section
          style={{
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
          }}
        >
          {/* We use a motion.div for the dot to animate its size and color */}
          <motion.div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'white',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
            // Animate properties based on whether this dot's index matches the current section
            animate={{
              scale: current === index ? 1.5 : 1,
              opacity: current === index ? 1 : 0.4,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>
      ))}
    </div>
  );
};