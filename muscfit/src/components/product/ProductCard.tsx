import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../data/types';
import { Badge } from '../ui/Badge';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Dispatch fly animation event
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    window.dispatchEvent(new CustomEvent('cart-fly', {
      detail: { x: rect.left + rect.width / 2, y: rect.top, colorHex: activeColor.hex }
    }));

    addItem({
      product,
      quantity: 1,
      selectedSize: product.sizes[0], // default to first size for quick add
      selectedColor: activeColor.id
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      data-cursor="VIEW"
      className="group block relative w-[280px] shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ ease: [0.87, 0, 0.13, 1], duration: 0.3 }}
        className="relative aspect-[4/5] bg-surface-elevated rounded overflow-hidden mb-4 border border-border group-hover:border-accent-primary/50 transition-colors"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && <Badge variant="new" />}
          {product.isSale && <Badge variant="sale" />}
          {product.isBestseller && !product.isNew && !product.isSale && <Badge variant="bestseller" />}
        </div>

        {/* Quick Add Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 z-10 bg-surface/90 backdrop-blur text-text-primary text-xs font-display tracking-widest py-3 uppercase clip-angled hover:bg-accent-primary hover:text-background transition-colors"
        >
          Quick Add
        </motion.button>

        {/* Product Image Placeholder (Dynamic background based on active color) */}
        <div 
          className="absolute inset-0 transition-colors duration-500 flex items-center justify-center"
          style={{ backgroundColor: `${activeColor.hex}20` }} // 20% opacity of the active color as a subtle tint
        >
          <div className="w-32 h-32 opacity-20 border-2 border-current rounded-full flex items-center justify-center font-display text-4xl" style={{ color: activeColor.hex }}>
            {product.name.charAt(0)}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-1">
        <h3 className="font-body text-text-primary text-sm font-medium group-hover:text-accent-primary transition-colors truncate">
          {product.name}
        </h3>
        <p className="font-display tracking-wider text-text-muted text-sm">
          ₹{product.price}
        </p>

        {/* Color Swatches */}
        <div className="flex gap-2 mt-2">
          {product.colors.map(color => (
            <button
              key={color.id}
              onClick={(e) => { e.preventDefault(); setActiveColor(color); }}
              className={`w-4 h-4 rounded-full border-2 transition-all ${activeColor.id === color.id ? 'border-accent-primary scale-110' : 'border-transparent hover:scale-110'}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};
