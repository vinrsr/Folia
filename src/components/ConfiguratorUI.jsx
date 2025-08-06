// src/components/ConfiguratorUI.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConfiguratorUI = ({ activeFlavor, onFlavorChange, flavors, textColor }) => {
  
  const [hoveredFlavorId, setHoveredFlavorId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
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
        pointerEvents: 'none',
      }}
    >
      {/* --- Ingredients & Nutrition on the Left --- */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10vw',
        transform: 'translateY(-50%)',
        maxWidth: '25%', // Adjusted width
        color: textColor,
        fontFamily: '"Poppins", sans-serif',
        transition: 'color 0.1s ease-in-out',
        // backgroundColor: 'yellow'
      }}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeFlavor.id} // The key is crucial for triggering the animation
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              // fontFamily: '"Cormorant Garamond", serif', // Use the elegant title font
              fontSize: '3.5rem',
              fontWeight: 700,
              marginBottom: '30px',
            }}
          >
            {activeFlavor.name}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlavor.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Ingredients Section */}
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Ingredients</h2>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                {activeFlavor.ingredients.map(ing => (
                  <li key={ing.name} style={{ marginBottom: '10px' }}>
                    <b style={{ display: 'block' }}>{ing.name}</b>
                    {ing.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* --- NEW Nutrition Facts Section --- */}
            <div style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Nutrition Facts</h2>
              {/* A simple table-like structure using divs */}
              <div style={{ marginTop: '15px', borderTop: `2px solid ${textColor}`, paddingTop: '15px', transition: 'border-color 0.1s ease-in-out' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Calories</span>
                  <b>{activeFlavor.nutrition.calories}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Total Sugars</span>
                  <b>{activeFlavor.nutrition.sugar}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Carbohydrates</span>
                  <b>{activeFlavor.nutrition.carbohydrates}</b>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- REDESIGNED Flavor Selector at the Bottom --- */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        // background: 'rgba(0, 0, 0, 0.05)',
        padding: '8px',
        borderRadius: '50px',
        pointerEvents: 'all',
        gap: '10px',
      }}>
        {flavors.map(flavor => (
          <motion.div
            key={flavor.id}
            variants={itemVariants}
            onClick={() => onFlavorChange(flavor.id)}
            onMouseEnter={() => setHoveredFlavorId(flavor.id)}
            onMouseLeave={() => setHoveredFlavorId(null)}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              width: '100px', 
              height: '100px',
              // width: '90px', // 1. WIDENED the container
            }}
          >

            {/* --- 4. THE HOVER PILL --- */}
            <AnimatePresence>
              {/* This pill ONLY appears if the item is hovered AND is NOT the active one */}
              {hoveredFlavorId === flavor.id && activeFlavor.id !== flavor.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }} // Semi-transparent
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.3)', // Use the item's own color
                    borderRadius: '50%',
                  }}
                />
              )}
            </AnimatePresence>

            {activeFlavor.id === flavor.id && (
              <motion.div
                layoutId="activeFlavorPill" // This magic prop animates the element between positions
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: activeFlavor.color, 
                  borderRadius: '50%', 
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Flavor Name */}
            <span style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: '"Poppins", sans-serif',
              color: activeFlavor.id === flavor.id ? activeFlavor.textColor : '#6b7280',
              fontWeight: 600,
              transition: 'color 0.3s ease',
              textAlign: 'center', // 2. EXPLICITLY center the text
              lineHeight: '1.2em',   // 3. TIGHTEN the line height
              height: '40px',        // 4. GIVE a fixed height to prevent layout shifts
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px'
            }}>
              {flavor.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};