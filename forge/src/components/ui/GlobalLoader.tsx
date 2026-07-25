import React from 'react';
import { useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

export const GlobalLoader: React.FC = () => {
  const { active, progress } = useProgress();

  if (!active && progress === 100) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        color: '#ffffff' // Using explicit hex since tailwind colors are empty
      }}
    >
      <div style={{
        fontFamily: 'impact, sans-serif',
        fontSize: '4rem',
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>
        {Math.round(progress)}%
      </div>
      <div style={{
        width: '60%',
        height: '2px',
        backgroundColor: '#333333',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
          style={{
            height: '100%',
            backgroundColor: '#ffffff'
          }}
        />
      </div>
    </div>
  );
};
