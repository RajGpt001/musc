import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth lagging coordinates for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable entirely on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if we are hovering something with a data-cursor attribute
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      {/* Global CSS to hide default cursor when our custom one is active */}
      <style>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* Outer lagged ring / label container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 64 : 32,
          height: cursorText ? 64 : 32,
          opacity: isVisible ? 1 : 0,
          border: cursorText ? '1px solid #F7F7F5' : '1px solid rgba(247, 247, 245, 0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cursorText && (
          <span className="font-display text-[10px] tracking-widest uppercase text-text-primary">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner instant dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-text-primary rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: (isVisible && !cursorText) ? 1 : 0,
          scale: cursorText ? 0 : 1
        }}
      />
    </>
  );
};
