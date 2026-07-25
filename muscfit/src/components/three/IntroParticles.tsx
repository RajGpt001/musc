import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { generateScatterPoints } from '../../data/silhouettePoints';

interface IntroParticlesProps {
  phase: 'scatter' | 'assemble' | 'pulse' | 'explode' | 'scatter_away';
}

const PARTICLE_COUNT = 2000; // Increased to 2000 for better image resolution

// Helper to extract colored points from a texture
const getPixelsFromTexture = (texture: THREE.Texture, count: number) => {
  const img = texture.image;
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  if (ctx) {
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
    const validPixels = [];
    
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const idx = (y * img.width + x) * 4;
        // Check alpha channel to see if it's solid (or brightness if no alpha)
        const alpha = imgData[idx + 3];
        const brightness = (imgData[idx] + imgData[idx+1] + imgData[idx+2]) / 3;
        
        // We will sample pixels that are reasonably visible
        if (brightness > 30) {
          validPixels.push({ 
            x, y, 
            r: imgData[idx] / 255, 
            g: imgData[idx+1] / 255, 
            b: imgData[idx+2] / 255 
          });
        }
      }
    }

    for (let i = 0; i < count; i++) {
      if (validPixels.length > 0) {
        // Randomly pick a valid pixel
        const p = validPixels[Math.floor(Math.random() * validPixels.length)];
        
        // Map pixel coordinates to 3D space (-1 to 1)
        const nx = (p.x / img.width) * 2 - 1;
        const ny = -((p.y / img.height) * 2 - 1);
        
        positions[i * 3] = nx * 3.5;
        positions[i * 3 + 1] = ny * 3.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        
        colors[i * 3] = p.r;
        colors[i * 3 + 1] = p.g;
        colors[i * 3 + 2] = p.b;
      }
    }
  }
  return { positions, colors };
};

export const IntroParticles: React.FC<IntroParticlesProps> = ({ phase }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Load texture
  const colorMap = useLoader(THREE.TextureLoader, '/deadlift.png');
  
  // Data
  const { positions: targetPoints, colors: targetColors } = useMemo(() => getPixelsFromTexture(colorMap, PARTICLE_COUNT), [colorMap]);
  const scatterPoints = useMemo(() => generateScatterPoints(PARTICLE_COUNT), []);
  
  // Instance tracking
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);
  const currentPositions = useMemo(() => new Float32Array(scatterPoints), [scatterPoints]);
  
  // Staggering factors for organic assembly
  const staggers = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) arr[i] = Math.random() * 0.5;
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      let tx = currentPositions[idx];
      let ty = currentPositions[idx + 1];
      let tz = currentPositions[idx + 2];
      
      // Determine targets based on phase
      let destX = tx;
      let destY = ty;
      let destZ = tz;
      
      if (phase === 'assemble' || phase === 'pulse') {
        destX = targetPoints[idx];
        destY = targetPoints[idx + 1];
        destZ = targetPoints[idx + 2];
        
        if (phase === 'pulse') {
          const pulseOffset = Math.sin(time * 3 + ty) * 0.05;
          destX += pulseOffset * (destX > 0 ? 1 : -1);
          destZ += pulseOffset;
        }
      } else if (phase === 'scatter_away') {
        // Return to scattered bounds
        destX = scatterPoints[idx];
        destY = scatterPoints[idx + 1];
        destZ = scatterPoints[idx + 2];
      }
      
      // Lerp logic
      const speed = phase === 'scatter_away' ? 3.0 : 1.5;
      const t = Math.min(1.0, (delta * speed) / (0.1 + staggers[i]));
      
      currentPositions[idx] += (destX - currentPositions[idx]) * t;
      currentPositions[idx + 1] += (destY - currentPositions[idx + 1]) * t;
      currentPositions[idx + 2] += (destZ - currentPositions[idx + 2]) * t;
      
      dummy.position.set(currentPositions[idx], currentPositions[idx + 1], currentPositions[idx + 2]);
      
      // Pulse scale
      if (phase === 'pulse') {
        const scale = 1 + Math.sin(time * 4 + i) * 0.2;
        dummy.scale.setScalar(scale);
      } else {
        dummy.scale.setScalar(1);
      }
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Update color for this instance
      colorObj.setRGB(targetColors[idx], targetColors[idx + 1], targetColors[idx + 2]);
      meshRef.current.setColorAt(i, colorObj);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <boxGeometry args={[0.04, 0.04, 0.04]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};
