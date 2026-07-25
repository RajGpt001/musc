import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const INSTANCE_COUNT = 300;

export const HeroScene: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute random grid positions
  const instances = useMemo(() => {
    const arr = [];
    for (let i = 0; i < INSTANCE_COUNT; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5 - 2,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        speed: 0.1 + Math.random() * 0.3
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Convert normalized mouse to world space roughly
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const inst = instances[i];
      
      // Idle animation (drift & rotate)
      const yOffset = Math.sin(time * inst.speed + i) * 0.5;
      inst.rx += 0.005;
      inst.ry += 0.005;

      // Mouse Parallax / Repulsion
      const dx = inst.x - targetX;
      const dy = (inst.y + yOffset) - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let pushX = 0;
      let pushY = 0;
      let pushZ = 0;
      
      if (dist < 3) {
        const force = (3 - dist) / 3;
        pushX = (dx / dist) * force * 0.5;
        pushY = (dy / dist) * force * 0.5;
        pushZ = force * 1.0; // Push toward camera slightly
      }

      dummy.position.set(inst.x + pushX, inst.y + yOffset + pushY, inst.z + pushZ);
      dummy.rotation.set(inst.rx, inst.ry, inst.rz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Volt-green accent light sweeping */}
      <pointLight position={[5, 0, 2]} color="#B8FF3C" intensity={2} distance={10} />
      <pointLight position={[-5, 5, -2]} color="#ffffff" intensity={1} distance={10} />
      
      <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
        <capsuleGeometry args={[0.02, 0.4, 4, 8]} />
        <meshStandardMaterial 
          color="#151518" 
          roughness={0.2} 
          metalness={0.8}
        />
      </instancedMesh>
    </>
  );
};
