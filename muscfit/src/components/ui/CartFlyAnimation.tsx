import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface CartFlyEventDetail {
  x: number;
  y: number;
  colorHex: string;
}

interface FlyItem {
  id: string;
  x: number;
  y: number;
  colorHex: string;
}

export const CartFlyAnimation: React.FC = () => {
  const [items, setItems] = useState<FlyItem[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleCartFly = (e: CustomEvent<CartFlyEventDetail>) => {
      if (prefersReducedMotion) return;

      const newItem: FlyItem = {
        id: Math.random().toString(36).substr(2, 9),
        x: e.detail.x,
        y: e.detail.y,
        colorHex: e.detail.colorHex
      };

      setItems(prev => [...prev, newItem]);

      // Remove item after animation completes
      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
      }, 1000);
    };

    window.addEventListener('cart-fly' as any, handleCartFly);
    return () => window.removeEventListener('cart-fly' as any, handleCartFly);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9000] overflow-hidden">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ x: item.x, y: item.y, scale: 1, opacity: 1 }}
            animate={{ 
              x: window.innerWidth - 60, // approximate navbar cart icon X
              y: 20, // approximate navbar cart icon Y
              scale: 0.1,
              opacity: 0
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1] // Apple-like smooth bezier
            }}
            className="absolute w-12 h-12 rounded-full border-2 border-background shadow-lg"
            style={{ backgroundColor: item.colorHex }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
