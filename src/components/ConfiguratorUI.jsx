// src/components/ConfiguratorUI.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbListDetails } from 'react-icons/tb';

export const ConfiguratorUI = ({ isMobile, activeFlavor, onFlavorChange, flavors, textColor }) => {
  
  const [hoveredFlavorId, setHoveredFlavorId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // A new component for the pop-up modal
  const DetailsModal = ({ flavor, textColor, onClose }) => {
    // This prevents clicks inside the modal content from closing it
    const stopPropagation = (e) => e.stopPropagation();

    return (
      // The semi-transparent backdrop
      <motion.div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'flex-end', // Aligns the modal to the bottom
          justifyContent: 'center',
          zIndex: 50, // Ensures it's on top of everything
          pointerEvents: 'all',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* The main content panel that slides up */}
        <motion.div
          onClick={stopPropagation}
          style={{
            width: '100%',
            maxWidth: '500px', // Prevents it from being too wide on tablets
            // background: '#272d56', // A dark, modern background
            // background: 'rgba(39, 45, 86, 0.9)', // A dark, modern background
            background: activeFlavor.color, // A dark, modern background
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            padding: '40px 20px',
            color: textColor, // A nice, soft white for readability
            fontFamily: '"Poppins", sans-serif',
          }}
          initial={{ y: '100%' }} // Starts off-screen at the bottom
          animate={{ y: '0%' }}   // Animates to its final position
          exit={{ y: '100%' }}  // Slides back down on exit
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* We reuse the details layout from the desktop view, styled for mobile */}
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>
            {flavor.name}
          </h1>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Ingredients</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px', opacity: 0.8 }}>
              {flavor.ingredients.map(ing => (
                <li key={ing.name} style={{ marginBottom: '10px' }}>
                  <b style={{ display: 'block' }}>{ing.name}</b>
                  {ing.description}
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Nutrition Facts</h2>
            <div style={{ marginTop: '15px', borderTop: `2px solid #444`, paddingTop: '15px', opacity: 0.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Calories</span><b>{flavor.nutrition.calories}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Total Sugars</span><b>{flavor.nutrition.sugar}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Carbohydrates</span><b>{flavor.nutrition.carbohydrates}</b>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
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
        {!isMobile && (
          <>
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
          </>
        )}

        {/* 2. THE NEW "DETAILS" BUTTON (MOBILE ONLY) */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '17%',
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
            <motion.button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '50px',
                // border: `2px solid ${textColor}`,
                background: activeFlavor.color,
                color: textColor,
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'none'
              }}
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
            >
              <TbListDetails size={20} />
              Details
            </motion.button>
          </div>
        )}

        {/* --- REDESIGNED Flavor Selector at the Bottom --- */}
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.05)',
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
                width: isMobile ? '80px' : '110px', 
                height: isMobile ? '80px' : '110px',
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
                textAlign: 'center',
                lineHeight: '1.2em',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                fontSize: isMobile ? '0.7em' : '1em',
              }}>
                {flavor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <DetailsModal 
            flavor={activeFlavor} 
            textColor={textColor} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};