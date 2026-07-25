import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || variant !== 'primary') return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    // Magnetic pull strength (max ~10px)
    setPosition({ x: distance.x * 0.2, y: distance.y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-display uppercase tracking-widest transition-all duration-300 overflow-hidden';
  const sizeStyles = {
    sm: 'h-10 px-6 text-xs',
    md: 'h-14 px-8 text-sm',
    lg: 'h-16 px-12 text-base'
  };

  // Primary variant uses the fill-sweep effect via a span
  const variantStyles = {
    primary: 'bg-accent-primary text-black hover:text-black group',
    secondary: 'bg-surface-elevated text-text-primary hover:bg-white hover:text-black',
    outline: 'border border-border text-text-primary hover:border-text-primary',
    ghost: 'text-text-primary hover:text-accent-primary'
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${variant === 'primary' ? 'clip-angled' : ''}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
