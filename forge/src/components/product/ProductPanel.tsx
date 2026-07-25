import React, { useEffect, useRef } from 'react';
import { ProductShowcase } from '../three/ProductShowcase';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';

const DUMMY_PRODUCT = {
  id: 'forge-hoodie-01',
  name: 'Apex Technical Hoodie',
  price: 120,
  category: 'hoodie',
  colorways: [
    { name: 'Onyx', hex: '#16161A' },
    { name: 'Bone', hex: '#E2E2DF' },
    { name: 'Acid', hex: '#C6FF3A' }
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  features: ['85% Cotton, 15% Elastane', 'Athletic Fit', 'Thermal Regulating'],
};

export const ProductPanel: React.FC = () => {
  const { 
    activeProductColor, 
    setActiveProductColor, 
    activeProductSize, 
    setActiveProductSize,
    isInspecting,
    setIsInspecting,
    addToCart,
    setFlyingCartItem,
    setCursorState
  } = useStore();

  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initialize defaults
    if (!activeProductColor) setActiveProductColor(DUMMY_PRODUCT.colorways[0].hex);
    if (!activeProductSize) setActiveProductSize(DUMMY_PRODUCT.sizes[2]);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    const colorway = DUMMY_PRODUCT.colorways.find(c => c.hex === activeProductColor) || DUMMY_PRODUCT.colorways[0];
    
    // Spawn flying item at click coordinates
    setFlyingCartItem({
      startX: e.clientX,
      startY: e.clientY,
      color: colorway.hex
    });
    
    // Trigger real cart add
    addToCart({
      productId: DUMMY_PRODUCT.id,
      name: DUMMY_PRODUCT.name,
      price: DUMMY_PRODUCT.price,
      size: activeProductSize,
      colorName: colorway.name,
      colorHex: colorway.hex,
    });
  };

  return (
    <div className="w-full min-h-screen bg-background relative flex flex-col lg:flex-row pt-20">
      
      {/* Left: 3D Showcase */}
      <div 
        className="w-full lg:w-3/5 h-[60vh] lg:h-[calc(100vh-80px)] relative bg-surface"
        onMouseEnter={() => setCursorState('drag')}
        onMouseLeave={() => setCursorState('default')}
      >
        <ProductShowcase />
        
        {/* Inspect Toggle Overlay */}
        <div className="absolute bottom-8 right-8 z-20" onMouseEnter={(e) => { e.stopPropagation(); setCursorState('default'); }}>
          <button 
            onClick={() => setIsInspecting(!isInspecting)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-elevated border border-border text-text-primary hover:text-accent-primary transition-colors duration-300"
          >
            {isInspecting ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Right: UI Panel */}
      <div className="w-full lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center overflow-y-auto">
        <SectionLabel text="FEATURED" className="mb-6" />
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-4xl font-display uppercase tracking-tight text-text-primary">
            {DUMMY_PRODUCT.name}
          </h2>
          <Badge type="new" />
        </div>
        
        <div className="text-2xl font-body font-medium text-text-muted mb-8">
          ${DUMMY_PRODUCT.price}
        </div>

        {/* Colorways */}
        <div className="mb-8">
          <div className="font-body text-sm text-text-muted mb-3 uppercase tracking-wider">
            Color: <span className="text-text-primary ml-1">{DUMMY_PRODUCT.colorways.find(c => c.hex === activeProductColor)?.name}</span>
          </div>
          <div className="flex gap-4">
            {DUMMY_PRODUCT.colorways.map((color) => (
              <button
                key={color.name}
                onClick={() => setActiveProductColor(color.hex)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${activeProductColor === color.hex ? 'border-text-primary scale-110' : 'border-transparent hover:border-border'}`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="font-body text-sm text-text-muted uppercase tracking-wider">Size</span>
            <button className="text-xs text-accent-secondary underline hover:text-white transition-colors">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {DUMMY_PRODUCT.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveProductSize(size)}
                className={`w-14 h-12 flex items-center justify-center font-display text-sm uppercase transition-all duration-300 clip-angled-sm border ${
                  activeProductSize === size 
                    ? 'bg-text-primary text-black border-text-primary' 
                    : 'bg-transparent text-text-primary border-border hover:border-text-muted hover:bg-surface-elevated'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <span ref={ctaRef} className="block w-full" onMouseEnter={() => setCursorState('default')}>
          <Button variant="primary" className="w-full mb-8" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </span>

        {/* Features list */}
        <div className="border-t border-border pt-8">
          <ul className="space-y-3">
            {DUMMY_PRODUCT.features.map((feature, i) => (
              <li key={i} className="flex items-center text-text-muted font-body text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
