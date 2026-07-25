import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay">
      <svg className="absolute inset-0 w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
