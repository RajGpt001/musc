import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`bg-surface-elevated overflow-hidden relative ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-surface to-transparent animate-[shimmer_2s_infinite]" />
    </motion.div>
  );
};
