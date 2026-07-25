import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const CustomCursor: React.FC = () => {
  const cursorState = useStore(state => state.cursorState);
  const [isTouch, setIsTouch] = useState(false);

  // Use motion values to completely bypass React renders for mouse tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lag effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  // Visual variants based on cursorState
  const variants = {
    default: {
      width: 12,
      height: 12,
      x: "-50%",
      y: "-50%",
      border: "0px solid transparent",
      backgroundColor: "#F5F5F0",
      opacity: 1,
    },
    drag: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      border: "1px solid #F5F5F0",
      backgroundColor: "transparent",
      opacity: 1,
    },
    view: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      border: "1px solid #C6FF3A", // Lime green for product view
      backgroundColor: "transparent",
      opacity: 1,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      variants={variants}
      animate={cursorState}
      initial="default"
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    >
      <motion.span
        className="font-display text-[10px] uppercase tracking-widest text-text-primary absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: cursorState !== 'default' ? 1 : 0 }}
      >
        {cursorState === 'drag' ? 'Drag' : cursorState === 'view' ? 'View' : ''}
      </motion.span>
    </motion.div>
  );
};
