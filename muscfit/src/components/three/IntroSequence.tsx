import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { IntroParticles } from './IntroParticles';
import { Logo } from '../ui/Logo';
import { getDeviceTier } from '../../utils/performance';

type IntroPhase = 'scatter' | 'assemble' | 'text_reveal' | 'scatter_away' | 'logo' | 'done';

export const IntroSequence: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>('scatter');
  const [isCapable, setIsCapable] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('muscfit_intro_played');
    if (hasPlayed) return; // Already played this session
    
    setIsMounted(true);
    
    if (prefersReducedMotion || getDeviceTier() === 'fallback') {
      setIsCapable(false);
      setPhase('logo'); // Skip 3D
      return;
    }
    
    let isSkipping = false;

    const timers = [
      setTimeout(() => setPhase('assemble'), 100),
      setTimeout(() => setPhase('text_reveal'), 3500),
      setTimeout(() => {
        if (!isSkipping) triggerVanish();
      }, 6500)
    ];
    
    const triggerVanish = () => {
      if (isSkipping) return;
      isSkipping = true;
      setPhase('scatter_away');
      
      setTimeout(() => {
        setPhase('done');
        sessionStorage.setItem('muscfit_intro_played', 'true');
        setIsMounted(false);
      }, 1500); 
    };
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        triggerVanish();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerVanishEarly = () => {
    setPhase('scatter_away');
    sessionStorage.setItem('muscfit_intro_played', 'true');
    setTimeout(() => setIsMounted(false), 1500);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={triggerVanishEarly}
        >
          {isCapable && phase !== 'logo' && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <IntroParticles phase={(phase === 'text_reveal' ? 'assemble' : phase) as any} />
              </Canvas>
            </div>
          )}
          
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="z-20 relative"
              >
                <Logo className="scale-150" />
              </motion.div>
            )}
            
            {phase === 'text_reveal' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="z-20 absolute top-1/4 text-center pointer-events-none"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-widest text-text-primary drop-shadow-2xl">
                  Your journey<br/>begins with us
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-12 right-12 z-30">
            <button 
              onClick={(e) => { e.stopPropagation(); triggerVanishEarly(); }}
              className="text-text-muted font-display tracking-widest text-xs uppercase hover:text-text-primary transition-colors"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
