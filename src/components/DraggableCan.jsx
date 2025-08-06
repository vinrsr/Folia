// src/components/DraggableCan.jsx

import React, { useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { a, useSpring } from '@react-spring/three'; // We will use react-spring for smooth interpolation
import { Sparkles } from '@react-three/drei';
import { Model as CanOriginal } from '@/components/canOriginal';

export const DraggableCan = ({ isAnimating, section, ...props }) => {
  // A ref for the group. We don't need to manually update it anymore.
  const groupRef = useRef();

  // --- 1. USE REACT-SPRING FOR SMOOTHNESS ---
  // We use `useSpring` to create an animatable value for our rotation.
  // This will also give us a nice, smooth "settle" effect when you let go.
  const [{ rotationY }, api] = useSpring(() => ({
    rotationY: 0,
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  const bind = useDrag(({ down, offset: [ox] }) => {
    api.start({ rotationY: ox / 200 });
  }, {
    // This hook will now ONLY be active if `section` is 1 (the Product Hub).
    // For all other sections, it will ignore drag events.
    enabled: section === 4, 
  });

  // --- 2. UPDATE THE CURSOR LOGIC ---
  useEffect(() => {
    // This effect now depends on the `section`.
    // It will re-run whenever the section changes.
    
    // Only change the cursor to "grab" if we are in the interactive section.
    if (section === 4) {
      document.body.style.cursor = 'grab';

      const onPointerUp = () => document.body.style.cursor = 'grab';
      const onPointerDown = () => document.body.style.cursor = 'grabbing';
      
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointerdown', onPointerDown);

      // Return a cleanup function to remove these specific listeners
      return () => {
        document.body.style.cursor = 'auto';
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointerdown', onPointerDown);
      };
    } else {
      // For all other sections, ensure the cursor is the default.
      document.body.style.cursor = 'auto';
    }
  }, [section]); // The effect re-runs when the section changes

  return (
    // --- 3. USE THE ANIMATED COMPONENT ---
    // We use `a.group` which is an animatable version of a group.
    // We connect our `rotationY` spring directly to its rotation.y property.
    <>
        <a.group ref={groupRef} {...bind()} rotation-y={rotationY}>
            <CanOriginal {...props} />
        </a.group>
        
        {!isAnimating && (
            <>
                <Sparkles 
                    count={100}
                    scale={15}
                    size={10}
                    speed={0.4}
                    color={"#white"}
                />
                <Sparkles 
                    count={100}
                    scale={15}
                    size={10}
                    speed={0.4}
                    color={"white"}
                />
            </>
        )}
    </>
  );
};