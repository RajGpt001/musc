import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Generate a seamless noise texture for fabric normal map
const createFabricNormalMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  // Base normal color
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, 256, 256);
  
  const imageData = ctx.getImageData(0, 0, 256, 256);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noiseX = (Math.random() - 0.5) * 60;
    const noiseY = (Math.random() - 0.5) * 60;
    data[i] = Math.min(255, Math.max(0, 128 + noiseX));     // r
    data[i + 1] = Math.min(255, Math.max(0, 128 + noiseY)); // g
    data[i + 2] = 255;                                     // b
    data[i + 3] = 255;                                     // alpha
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8); // Tile it heavily for micro-detail
  return texture;
};

// Generate a ribbed normal map for cuffs/hem
const createRibbedNormalMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, 256, 256);
  
  const imageData = ctx.getImageData(0, 0, 256, 256);
  const data = imageData.data;
  
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const i = (y * 256 + x) * 4;
      const noiseX = (Math.random() - 0.5) * 15;
      const noiseY = (Math.random() - 0.5) * 15;
      
      // Vertical ribs: sine wave along the X axis
      const rib = Math.sin((x / 256) * Math.PI * 60) * 80;
      
      data[i] = Math.min(255, Math.max(0, 128 + rib + noiseX));
      data[i + 1] = Math.min(255, Math.max(0, 128 + noiseY));
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
};

export const HoodieModel: React.FC<{ colorHex?: string }> = ({ colorHex = '#111111' }) => {
  const materials = useRef<{ main: THREE.MeshStandardMaterial; dark: THREE.MeshStandardMaterial } | null>(null);
  
  // Create textures and materials once
  useMemo(() => {
    const fabricMap = createFabricNormalMap();
    const ribbedMap = createRibbedNormalMap();
    
    materials.current = {
      main: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness: 0.85,
        metalness: 0.05,
        normalMap: fabricMap,
      }),
      dark: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex).multiplyScalar(0.85), // slightly darker for ribs/drawstrings
        roughness: 0.9,
        metalness: 0.05,
        normalMap: ribbedMap,
      })
    };
  }, []);

  // Update color smoothly
  useFrame(() => {
    if (materials.current) {
      const targetColor = new THREE.Color(colorHex);
      materials.current.main.color.lerp(targetColor, 0.1);
      
      const darkColor = targetColor.clone().multiplyScalar(0.85);
      materials.current.dark.color.lerp(darkColor, 0.1);
    }
  });

  // Geometry: Torso
  const torsoShape = useMemo(() => {
    const s = new THREE.Shape();
    // Start at bottom left, counter-clockwise
    s.moveTo(-0.65, -0.8);
    s.lineTo(0.65, -0.8);
    s.lineTo(0.75, 0.5); // Taper slightly outward to chest
    
    // Right shoulder
    s.quadraticCurveTo(0.75, 0.8, 0.5, 0.85);
    // Right neck
    s.lineTo(0.2, 0.85);
    // Neck center
    s.quadraticCurveTo(0, 0.75, -0.2, 0.85);
    // Left shoulder
    s.lineTo(-0.5, 0.85);
    s.quadraticCurveTo(-0.75, 0.8, -0.75, 0.5);
    // Left side back to bottom
    s.lineTo(-0.65, -0.8);
    
    return s;
  }, []);

  const torsoExtrudeSettings = {
    steps: 2,
    depth: 0.25, // Extrudes from 0 to 0.25 on Z axis
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.18,
    bevelOffset: 0,
    bevelSegments: 8
  };

  // Geometry: Pocket
  const pocketShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.4, -0.65);
    s.lineTo(0.4, -0.65);
    s.lineTo(0.35, -0.15);
    s.lineTo(0.2, 0.1);
    s.lineTo(-0.2, 0.1);
    s.lineTo(-0.35, -0.15);
    s.lineTo(-0.4, -0.65);
    return s;
  }, []);
  
  const pocketExtrudeSettings = { 
    steps: 1, 
    depth: 0.05, 
    bevelEnabled: true, 
    bevelThickness: 0.03, 
    bevelSize: 0.03, 
    bevelSegments: 4 
  };

  // Geometry: Hood (Lathe geometry - open half)
  const hoodPoints = useMemo(() => {
    const pts = [];
    // inner curve
    pts.push(new THREE.Vector2(0.25, 0.0));
    pts.push(new THREE.Vector2(0.3, 0.3));
    pts.push(new THREE.Vector2(0.3, 0.6));
    pts.push(new THREE.Vector2(0.2, 0.8));
    pts.push(new THREE.Vector2(0.05, 0.9));
    
    // outer curve (thickness)
    pts.push(new THREE.Vector2(0.05, 1.0));
    pts.push(new THREE.Vector2(0.25, 0.95));
    pts.push(new THREE.Vector2(0.4, 0.7));
    pts.push(new THREE.Vector2(0.45, 0.3));
    pts.push(new THREE.Vector2(0.4, 0.0));
    pts.push(new THREE.Vector2(0.25, 0.0));
    
    return pts;
  }, []);

  // Geometry: Drawstrings
  const stringCurveL = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 0.7, 0.45),
    new THREE.Vector3(-0.18, 0.45, 0.5),
    new THREE.Vector3(-0.15, 0.2, 0.55)
  ]), []);
  const stringCurveR = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.15, 0.7, 0.45),
    new THREE.Vector3(0.18, 0.45, 0.5),
    new THREE.Vector3(0.15, 0.2, 0.55)
  ]), []);

  if (!materials.current) return null;

  return (
    <group position={[0, -0.1, 0]}>
      {/* Torso */}
      {/* Extrude geometry goes from Z=0 to Z=depth. Center it roughly on Z by translating half depth */}
      <mesh position={[0, 0, -0.125]} material={materials.current.main} castShadow receiveShadow>
        <extrudeGeometry args={[torsoShape, torsoExtrudeSettings]} />
      </mesh>
      
      {/* Front Pocket */}
      <mesh position={[0, 0, 0.35]} material={materials.current.main} castShadow receiveShadow>
        <extrudeGeometry args={[pocketShape, pocketExtrudeSettings]} />
      </mesh>

      {/* Hem (Ribbed) */}
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.current.dark} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 0.45, 32]} />
      </mesh>

      {/* Left Sleeve */}
      <group position={[-0.9, 0.65, 0]} rotation={[0, 0, Math.PI / 6]}>
        <mesh position={[0, -0.7, 0]} material={materials.current.main} castShadow receiveShadow>
          {/* Tapered cylinder: wider at shoulder (0.35), narrower at wrist (0.2) */}
          <cylinderGeometry args={[0.35, 0.2, 1.4, 24]} />
        </mesh>
        {/* Left Cuff */}
        <mesh position={[0, -1.45, 0]} material={materials.current.dark} castShadow receiveShadow>
          <cylinderGeometry args={[0.19, 0.19, 0.15, 24]} />
        </mesh>
      </group>

      {/* Right Sleeve */}
      <group position={[0.9, 0.65, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <mesh position={[0, -0.7, 0]} material={materials.current.main} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.2, 1.4, 24]} />
        </mesh>
        {/* Right Cuff */}
        <mesh position={[0, -1.45, 0]} material={materials.current.dark} castShadow receiveShadow>
          <cylinderGeometry args={[0.19, 0.19, 0.15, 24]} />
        </mesh>
      </group>

      {/* Hood */}
      <mesh position={[0, 0.8, -0.1]} rotation={[0.1, Math.PI, 0]} material={materials.current.main} castShadow receiveShadow>
        {/* Lathe sweeps around Y axis. Using half sweep facing front. */}
        <latheGeometry args={[hoodPoints, 32, -Math.PI / 2 - 0.2, Math.PI + 0.4]} />
      </mesh>

      {/* Drawstrings */}
      <mesh material={materials.current.dark} castShadow>
        <tubeGeometry args={[stringCurveL, 16, 0.015, 8, false]} />
      </mesh>
      <mesh material={materials.current.dark} castShadow>
        <tubeGeometry args={[stringCurveR, 16, 0.015, 8, false]} />
      </mesh>
      
      {/* Drawstring Aglets (tips) */}
      <mesh position={[-0.15, 0.2, 0.55]} material={materials.current.main}>
        <cylinderGeometry args={[0.016, 0.016, 0.04]} />
      </mesh>
      <mesh position={[0.15, 0.2, 0.55]} material={materials.current.main}>
        <cylinderGeometry args={[0.016, 0.016, 0.04]} />
      </mesh>
    </group>
  );
};
