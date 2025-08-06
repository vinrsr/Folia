// src/components/SectionNav.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Don't forget: npm install react-icons
import { TbChevronUp, TbChevronDown } from 'react-icons/tb';

export const SectionNav = ({ total, current, onChange }) => {
  // A reusable bouncing animation for the chevrons
  const bounceAnimation = {
    y: [-4, 4, -4],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <motion.div
      // This positions the entire component on the right side
      style={{
        position: 'absolute',
        top: '50%',
        right: '2vw',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px', // Space between arrows and dots
        pointerEvents: 'none', // The container itself isn't clickable
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* 1. THE UP ARROW */}
      <motion.div
        style={{ height: '24px', pointerEvents: 'all' }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(current - 1)}
      >
        <AnimatePresence>
          {/* Only show the up arrow if not on the first section */}
          {current > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, ...bounceAnimation }}
              exit={{ opacity: 0, y: 10 }}
            >
              <TbChevronUp size={24} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* The dots for each section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            onClick={() => onChange(i)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              position: 'relative',
              cursor: 'pointer',
              pointerEvents: 'all',
            }}
            whileHover={{ scale: 1.5 }}
          >
            {i === current && (
              <motion.div
                layoutId="activeSectionPill" // This animates the active state
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* 2. THE DOWN ARROW */}
      <motion.div
        style={{ height: '24px', pointerEvents: 'all' }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(current + 1)}
      >
        <AnimatePresence>
          {/* Only show the down arrow if not on the last section */}
          {current < total - 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, ...bounceAnimation }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TbChevronDown size={24} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};