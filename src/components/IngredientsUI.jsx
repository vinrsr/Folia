import React from 'react';
import { motion } from 'framer-motion';

export const IngredientsUI = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.4, // Can adjust delay
        staggerChildren: 0.15 // Adjust stagger
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
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
          display: 'flex',
          justifyContent: 'flex-end', // Align content to the right
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div 
          className="ingredients-container"
          style={{
            color: '#272d56',
            fontFamily: '"Poppins", sans-serif',
            maxWidth: '30%',
            paddingRight: '10vw', // Give it space from the right edge
          }}
        >
            {/* --- 4. MAKE EACH CHILD A motion COMPONENT --- */}
            <motion.h2 variants={itemVariants} style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '25px' }}>
            Pure & Simple
            </motion.h2>
            <motion.ul variants={itemVariants} style={{ listStyle: 'none', padding: 0 }}>
            {/* You could even make each <li> a motion item for more granular animation! */}
                <li style={{ marginBottom: '10px' }}><b>Sparkling Water:</b> The crisp foundation.</li>
                <li style={{ marginBottom: '10px' }}><b>Natural Fruit Juice:</b> For an authentic taste.</li>
                <li style={{ marginBottom: '10px' }}><b>Organic Cane Sugar:</b> Just a touch of sweetness.</li>
                <li style={{ marginBottom: '10px' }}><b>A Hint of Magic:</b> Crafted with passion.</li>
            </motion.ul>
        </div>
      </motion.div>
    </>
  );
};