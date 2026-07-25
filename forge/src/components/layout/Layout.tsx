import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { CartDrawer } from './CartDrawer';
import { CustomCursor } from '../ui/CustomCursor';
import { useStore } from '../../store/useStore';

const FlyingCartItem = () => {
  const flyingCartItem = useStore(state => state.flyingCartItem);
  const setFlyingCartItem = useStore(state => state.setFlyingCartItem);
  const [activeItem, setActiveItem] = useState<{ startX: number, startY: number, color: string } | null>(null);

  useEffect(() => {
    if (flyingCartItem) {
      setActiveItem(flyingCartItem);
      setFlyingCartItem(null); // Clear immediately to allow rapid clicks
      
      // Remove element after animation completes (roughly 800ms)
      setTimeout(() => {
        setActiveItem(null);
      }, 800);
    }
  }, [flyingCartItem, setFlyingCartItem]);

  if (!activeItem) return null;

  // The cart icon in Navbar is roughly at top: 20px, right: 48px
  return (
    <motion.div
      className="fixed z-50 w-4 h-4 rounded-full pointer-events-none"
      style={{ backgroundColor: activeItem.color }}
      initial={{ 
        x: activeItem.startX, 
        y: activeItem.startY,
        scale: 1,
        opacity: 1
      }}
      animate={{ 
        x: window.innerWidth - 60, // approximate cart X
        y: 30, // approximate cart Y
        scale: 0.5,
        opacity: 0
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.34, 1.56, 0.64, 1] // Custom snappy spring-like bezier
      }}
    />
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <CartDrawer />
      <FlyingCartItem />
      <main className="w-full relative bg-background">
        {children}
      </main>
    </>
  );
};
