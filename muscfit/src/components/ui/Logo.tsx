import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`w-8 h-8 ${className}`}
      >
        <path d="M20 80 L50 20 L80 80 L65 80 L50 50 L35 80 Z" fill="currentColor" />
        <path d="M42 45 L50 29 L58 45" stroke="var(--color-accent-primary)" strokeWidth="6" strokeLinecap="square" />
      </svg>
    );
  }

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-[2px]">
        <span className="font-display text-text-primary text-3xl tracking-[-0.04em] leading-none uppercase">
          MUSC
        </span>
        <span className="font-display text-accent-primary text-3xl tracking-[-0.04em] leading-none uppercase">
          FIT
        </span>
      </div>
    </div>
  );
};
