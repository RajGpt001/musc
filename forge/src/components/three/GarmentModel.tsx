import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface GarmentModelProps {
  modelUrl?: string; // Optional GLTF url
}

export const GarmentModel: React.FC<GarmentModelProps> = ({ modelUrl }) => {
  const activeProductColor = useStore((state) => state.activeProductColor);
  const targetColor = useRef(new THREE.Color(activeProductColor || '#333333'));
  
  // Create a shared material instance
  const sharedMaterial = useRef(
    new THREE.MeshStandardMaterial({
      color: activeProductColor || '#333333',
      roughness: 0.9,
      metalness: 0.1,
    })
  );

  useEffect(() => {
    if (activeProductColor) {
      targetColor.current.set(activeProductColor);
    }
  }, [activeProductColor]);

  useFrame((_, delta) => {
    sharedMaterial.current.color.lerp(targetColor.current, 10 * delta);
  });

  if (modelUrl) {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} />;
  }

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.4, 0]} material={sharedMaterial.current}>
        <boxGeometry args={[1.2, 1.8, 0.6]} />
      </mesh>
      
      <mesh position={[-0.8, 0.6, 0]} rotation={[0, 0, -0.3]} material={sharedMaterial.current}>
        <cylinderGeometry args={[0.2, 0.15, 1.2, 16]} />
      </mesh>
      
      <mesh position={[0.8, 0.6, 0]} rotation={[0, 0, 0.3]} material={sharedMaterial.current}>
        <cylinderGeometry args={[0.2, 0.15, 1.2, 16]} />
      </mesh>
      
      <mesh position={[0, 1.4, -0.1]} rotation={[Math.PI / 2, 0, 0]} material={sharedMaterial.current}>
        <torusGeometry args={[0.3, 0.15, 16, 32, Math.PI]} />
      </mesh>

      <mesh position={[0, -0.1, 0.32]} material={sharedMaterial.current}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
      </mesh>
    </group>
  );
};
