import React from 'react';

type BadgeType = 'new' | 'limited' | 'sold-out';

interface BadgeProps {
  type: BadgeType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  const getBadgeStyles = () => {
    switch (type) {
      case 'new':
        return 'bg-accent-primary text-black';
      case 'limited':
        return 'bg-accent-secondary text-white';
      case 'sold-out':
        return 'bg-surface-elevated text-text-muted';
      default:
        return 'bg-surface text-text-primary';
    }
  };

  const getBadgeText = () => {
    switch (type) {
      case 'new': return 'NEW';
      case 'limited': return 'LIMITED';
      case 'sold-out': return 'SOLD OUT';
      default: return '';
    }
  };

  return (
    <div className={`inline-flex clip-angled-sm px-3 py-1 font-display text-xs tracking-wider uppercase ${getBadgeStyles()} ${className}`}>
      {getBadgeText()}
    </div>
  );
};
