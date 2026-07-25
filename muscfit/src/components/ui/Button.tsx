import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    // Magnetic physics values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      x.set(distanceX * 0.2); // Pull strength
      y.set(distanceY * 0.2);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      x.set(0);
      y.set(0);
      if (props.onMouseLeave) props.onMouseLeave(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onMouseEnter) props.onMouseEnter(e);
    };

    const baseStyles = 'relative inline-flex items-center justify-center font-display tracking-widest uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-primary overflow-hidden';
    
    const variants = {
      primary: 'bg-accent-primary text-background hover:bg-[#a6e535]',
      secondary: 'bg-text-primary text-background hover:bg-text-muted',
      outline: 'border border-border text-text-primary hover:border-text-primary',
      ghost: 'text-text-muted hover:text-text-primary hover:bg-surface'
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-8 py-3 text-sm',
      lg: 'px-12 py-4 text-base'
    };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isLoading || props.disabled}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          x: prefersReducedMotion ? 0 : springX,
          y: prefersReducedMotion ? 0 : springY,
        }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
        {...(props as any)}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
