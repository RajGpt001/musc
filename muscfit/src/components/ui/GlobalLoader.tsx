import React from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export const GlobalLoader: React.FC = () => {
  const { active, progress } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-[0.2em] text-text-primary mb-6">
              MUSCFIT
            </h1>
            
            <div className="w-48 h-[2px] bg-surface-elevated relative overflow-hidden rounded-full mb-4">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-accent-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>
            
            <p className="font-body text-text-muted text-sm tracking-widest uppercase">
              {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
