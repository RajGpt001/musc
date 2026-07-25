import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store/useStore';

gsap.registerPlugin(ScrollTrigger);

const ParticleGrid = ({ count }: { count: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    const gridCols = Math.ceil(Math.sqrt(count));
    const gridRows = Math.ceil(count / gridCols);
    const spacing = 1.2;
    
    for (let i = 0; i < count; i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      
      const x = (col - gridCols / 2) * spacing + (Math.random() - 0.5) * 0.5;
      const y = (row - gridRows / 2) * spacing + (Math.random() - 0.5) * 0.5;
      const z = (Math.random() - 0.5) * 2;
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        originalPosition: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    const mouse3D = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );

    particles.forEach((particle, i) => {
      const idleY = Math.sin(time * particle.speed + particle.offset) * 0.2;
      
      particle.rotation.x += 0.002 * particle.speed;
      particle.rotation.y += 0.003 * particle.speed;

      const dist = mouse3D.distanceTo(particle.originalPosition);
      const influence = Math.max(0, 1 - dist / 3);
      
      const repelVector = new THREE.Vector3().subVectors(particle.originalPosition, mouse3D).normalize();
      
      const targetX = particle.originalPosition.x + repelVector.x * influence * 0.8;
      const targetY = particle.originalPosition.y + idleY + repelVector.y * influence * 0.8;
      const targetZ = particle.originalPosition.z + influence * 1.5;

      particle.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
      
      particle.rotation.z = THREE.MathUtils.lerp(particle.rotation.z, influence * Math.PI * 0.25, 0.1);

      dummy.position.copy(particle.position);
      dummy.rotation.copy(particle.rotation);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
      <meshStandardMaterial 
        color="#111111" 
        metalness={0.9} 
        roughness={0.2}
      />
    </instancedMesh>
  );
};

const ScrollCamera = () => {
  const { camera } = useThree();
  
  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Tie camera pull back to the window scroll over the hero section (first 100vh)
      gsap.to(camera.position, {
        z: 20,
        y: -5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100%", // relative to viewport or body height. Let's use absolute pixel values roughly equivalent to 100vh
          endTrigger: "#hero-section", 
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, { dependencies: [camera] });

  useFrame((state) => {
    // Keep the subtle drift running independently of scroll
    const time = state.clock.getElapsedTime();
    // We add the offset to the current camera position which might be scrubbed by GSAP
    // Wait, GSAP sets camera.position directly, so animating it here simultaneously causes jumping.
    // Better to animate a group or lookAt target. Let's just animate lookAt and slight x rotation.
    const lookX = Math.sin(time * 0.2) * 1.5;
    const lookY = Math.cos(time * 0.3) * 0.8;
    camera.lookAt(lookX, lookY, 0);
  });

  return null;
};

export const HeroScene = () => {
  const deviceTier = useStore(state => state.deviceTier);
  const [instanceCount, setInstanceCount] = useState(400);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Override with device tier logic
    if (deviceTier === 'static') {
      setInstanceCount(0);
    } else if (deviceTier === 'reduced' || window.innerWidth < 768) {
      setInstanceCount(100);
    } else {
      setInstanceCount(400);
    }
  }, [deviceTier]);

  useGSAP(() => {
    if (deviceTier === 'static') return;
    
    gsap.to(containerRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef, dependencies: [deviceTier] });

  // Static Fallback
  if (deviceTier === 'static') {
    return (
      <div className="absolute inset-0 z-0 bg-background pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-primary via-background to-background" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-background pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        dpr={deviceTier === 'reduced' ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: deviceTier !== 'reduced', alpha: false, powerPreference: "high-performance" }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#8A8A93" />
        <spotLight position={[10, 10, -5]} intensity={8} color="#C6FF3A" angle={0.5} penumbra={1} />
        {instanceCount > 0 && <ParticleGrid count={instanceCount} />}
        <ScrollCamera />
      </Canvas>
    </div>
  );
};
