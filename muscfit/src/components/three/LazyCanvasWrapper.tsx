import React, { useEffect, useState, useRef } from 'react';
import { getDeviceTier } from '../../utils/performance';
import type { DeviceTier } from '../../utils/performance';

interface LazyCanvasWrapperProps {
  children: React.ReactNode;
  fallbackGradient?: string; // Tailwind gradient class
  minHeight?: string;
  forceRender?: boolean; // bypass intersection observer (e.g. for hero)
}

export const LazyCanvasWrapper: React.FC<LazyCanvasWrapperProps> = ({ 
  children, 
  fallbackGradient = 'bg-gradient-to-tr from-surface to-surface-elevated',
  minHeight = '100%',
  forceRender = false
}) => {
  const [shouldMount, setShouldMount] = useState(forceRender);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Store the device tier statically so it doesn't recalculate
  const tierRef = useRef<DeviceTier>(getDeviceTier());
  const isFallback = tierRef.current === 'fallback';

  useEffect(() => {
    if (forceRender || isFallback) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            observer.disconnect(); // Only need to mount once
          }
        });
      },
      { rootMargin: '200px' } // Load slightly before it scrolls into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [forceRender, isFallback]);

  if (isFallback) {
    return (
      <div 
        className={`w-full ${fallbackGradient} flex items-center justify-center`}
        style={{ minHeight }}
      >
        <span className="font-display uppercase tracking-widest text-text-muted/50 select-none">
          MuscFit 3D 
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ minHeight }}>
      {shouldMount ? children : (
        <div className="absolute inset-0 bg-surface-elevated animate-pulse" />
      )}
    </div>
  );
};
