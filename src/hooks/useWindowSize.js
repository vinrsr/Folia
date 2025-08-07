// src/hooks/useWindowSize.js

import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to get initial size
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}