import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { HoodieModel } from './HoodieModel';

interface ProductShowcaseProps {
  colorHex: string;
  isInspectMode: boolean;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ colorHex, isInspectMode }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  const [isInteracting, setIsInteracting] = useState(false);
  const interactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle Inspect Mode camera dolly with GSAP
  useEffect(() => {
    if (isInspectMode) {
      // Dolly in
      gsap.to(camera.position, {
        x: 1,
        y: 1.5,
        z: 3,
        duration: 1.2,
        ease: 'power3.inOut'
      });
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 1,
          z: 0,
          duration: 1.2,
          ease: 'power3.inOut'
        });
      }
    } else {
      // Reset view
      gsap.to(camera.position, {
        x: 0,
        y: 0.5,
        z: 6,
        duration: 1.2,
        ease: 'power3.inOut'
      });
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: 'power3.inOut'
        });
      }
    }
  }, [isInspectMode, camera]);

  const handlePointerDown = () => {
    setIsInteracting(true);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
  };

  const handlePointerUp = () => {
    // Resume auto-rotate after a delay
    interactTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  return (
    <>
      {/* 3-Point Lighting Setup */}
      <ambientLight intensity={0.8} />
      
      {/* Key Light: warm, angled 45 degrees upper-front */}
      <spotLight position={[5, 8, 5]} intensity={3.5} color="#fff4e6" penumbra={1} castShadow />
      
      {/* Fill Light: cool, opposite side, lower intensity */}
      <pointLight position={[-5, 2, 2]} intensity={1.5} color="#e6f2ff" />
      
      {/* Rim/Accent Light: Volt-green accent color behind/above to catch edges */}
      <spotLight position={[0, 8, -6]} intensity={4.0} color="#B8FF3C" penumbra={0.5} castShadow />

      {/* Main Hoodie Model */}
      <group 
        ref={meshRef} 
        onPointerDown={handlePointerDown} 
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <HoodieModel colorHex={colorHex} />
      </group>

      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#000000"
      />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={!isInteracting && !isInspectMode}
        autoRotateSpeed={2.0}
        minPolarAngle={Math.PI / 4} // constrain vertical
        maxPolarAngle={Math.PI / 2 + 0.2}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};
