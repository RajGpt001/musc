import React from 'react';

type BadgeVariant = 'new' | 'bestseller' | 'sale' | 'low-stock';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, className = '' }) => {
  const base = "inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-display uppercase tracking-wider clip-angled-sm leading-none";
  
  const variants: Record<BadgeVariant, string> = {
    'new': "bg-accent-primary text-background",
    'bestseller': "bg-surface-elevated border border-border text-text-primary",
    'sale': "bg-accent-secondary text-text-primary",
    'low-stock': "bg-transparent border border-accent-secondary text-accent-secondary"
  };

  const labels: Record<BadgeVariant, string> = {
    'new': "NEW ARRIVAL",
    'bestseller': "BESTSELLER",
    'sale': "SALE",
    'low-stock': "ALMOST GONE"
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {labels[variant]}
    </span>
  );
};
