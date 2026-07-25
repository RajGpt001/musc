import React, { useState, useRef } from 'react';
import type { Product } from '../../data/types';
import { Badge } from '../ui/Badge';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const MiniGarmentScene = ({ color, isHovered }: { color: string; isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current && isHovered) {
      groupRef.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, -0.4, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 1.8, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[-0.8, 0.6, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.2, 0.15, 1.2, 16]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[0.8, 0.6, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.2, 0.15, 1.2, 16]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[0, 1.4, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
      </mesh>

      <mesh position={[0, -0.1, 0.32]}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
};

import { useInView } from 'react-intersection-observer';

// ... (MiniGarmentScene remains same)

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [activeColor, setActiveColor] = useState(product.colorways[0].hex);
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorState, deviceTier } = useStore();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0 });

  return (
    <div 
      className="group flex flex-col bg-surface cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-transparent hover:border-border focus-within:border-accent-primary outline-none"
      onMouseEnter={() => { setIsHovered(true); setCursorState('view'); }}
      onMouseLeave={() => { setIsHovered(false); setCursorState('default'); }}
      tabIndex={0}
    >
      <div ref={ref} className="relative w-full aspect-[4/5] bg-surface-elevated overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.tags.includes('new') && <Badge type="new" />}
          {product.tags.includes('limited') && <Badge type="limited" />}
          {product.tags.includes('sold-out') && <Badge type="sold-out" />}
        </div>

        {/* 3D Canvas / Fallback */}
        <div className="absolute inset-0 z-0">
          {deviceTier === 'static' ? (
            <div className="w-full h-full flex items-center justify-center opacity-30 transition-colors duration-500" style={{ backgroundColor: activeColor }} />
          ) : (
            inView && (
              <Canvas
                frameloop={isHovered ? 'always' : 'demand'}
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={deviceTier === 'reduced' ? 1 : Math.min(window.devicePixelRatio, 1.5)}
                gl={{ antialias: deviceTier !== 'reduced', powerPreference: "high-performance" }}
              >
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 5, 5]} intensity={2.5} angle={0.5} penumbra={1} color="#ffffff" />
                <spotLight position={[-5, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#8A8A93" />
                
                <MiniGarmentScene color={activeColor} isHovered={isHovered} />
              </Canvas>
            )
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="text-xs font-body text-text-muted uppercase tracking-wider mb-1">
              {product.category}
            </div>
            <h3 className="font-display text-lg uppercase tracking-tight text-text-primary group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </div>
          <div className="font-body font-medium text-lg text-text-primary">
            ${product.price}
          </div>
        </div>

        {/* Swatches */}
        <div className="flex gap-2 mt-2">
          {product.colorways.map((color) => (
            <button
              key={color.name}
              onClick={(e) => {
                e.stopPropagation();
                setActiveColor(color.hex);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 ${
                activeColor === color.hex ? 'border-text-primary scale-110' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Preview ${color.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
