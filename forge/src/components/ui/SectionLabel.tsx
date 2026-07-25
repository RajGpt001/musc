import React from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-text-primary">
        {text}
      </span>
      <div className="h-px w-12 bg-accent-primary" />
    </div>
  );
};
