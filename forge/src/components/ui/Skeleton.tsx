import React from 'react';
import { motion } from 'framer-motion';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div
      className={`bg-surface-elevated rounded-sm overflow-hidden ${className}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

export const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="w-full aspect-[4/5]" />
          <div className="space-y-2">
            <Skeleton className="w-1/4 h-3" />
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/3 h-5 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
};
