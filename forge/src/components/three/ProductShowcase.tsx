import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GarmentModel } from './GarmentModel';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const CameraController = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const isInspecting = useStore((state) => state.isInspecting);
  
  // Timeout for auto-rotate
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isInspecting) {
      // Zoom in
      gsap.to(camera.position, {
        x: 0,
        y: 0.5,
        z: 2.5,
        duration: 1.2,
        ease: 'power3.inOut'
      });
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 0.5,
          z: 0.3, // focal point slightly forward
          duration: 1.2,
          ease: 'power3.inOut'
        });
        controlsRef.current.autoRotate = false;
      }
    } else {
      // Return to full view
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
        // Auto-rotate logic will be handled by interaction events
      }
    }
  }, [isInspecting, camera]);

  const handleStart = () => {
    if (controlsRef.current && !isInspecting) {
      controlsRef.current.autoRotate = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  const handleEnd = () => {
    if (!isInspecting) {
      timeoutRef.current = window.setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.autoRotate = true;
        }
      }, 3000);
    }
  };

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 4} // Restrict flip
      maxPolarAngle={Math.PI / 1.8}
      enableDamping={true}
      dampingFactor={0.05}
      autoRotate={!isInspecting}
      autoRotateSpeed={0.5}
      onStart={handleStart}
      onEnd={handleEnd}
    />
  );
};

const AnimatedScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!groupRef.current) return;
      
      gsap.from(groupRef.current.rotation, {
        y: -Math.PI / 4,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#product-panel-section",
          start: "top 70%",
        }
      });
      
      gsap.from(groupRef.current.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#product-panel-section",
          start: "top 70%",
        }
      });
    });

    return () => mm.revert();
  });

  return (
    <group ref={groupRef}>
      <GarmentModel />
    </group>
  );
};

export const ProductShowcase: React.FC = () => {
  const deviceTier = useStore(state => state.deviceTier);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      {deviceTier === 'static' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <div className="w-64 h-64 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-text-primary to-transparent" />
        </div>
      ) : (
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 45 }}
          dpr={deviceTier === 'reduced' ? 1 : Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: deviceTier !== 'reduced', powerPreference: "high-performance" }}
        >
        <ambientLight intensity={0.4} />
        
        {/* Key Light */}
        <spotLight position={[5, 5, 5]} intensity={2.5} angle={0.5} penumbra={1} color="#ffffff" />
        
        {/* Fill Light */}
        <spotLight position={[-5, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#8A8A93" />
        
        {/* Rim Light */}
        <spotLight position={[0, 8, -5]} intensity={4} angle={0.5} penumbra={1} color="#C6FF3A" />
        
        <AnimatedScene />
        
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={4}
          color="#000000"
        />
        
        <CameraController />
      </Canvas>
      )}
    </div>
  );
};
