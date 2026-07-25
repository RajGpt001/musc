import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ProductCard } from '../components/product/ProductCard';
import { SEO } from '../lib/seo';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';

// Extract unique values for filters
const allCategories = Array.from(new Set(products.map(p => p.category)));
const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // URL State Parsing
  const activeCategories = searchParams.getAll('category');
  const activeSizes = searchParams.getAll('size');
  const activeColors = searchParams.getAll('color');
  const maxPriceParam = searchParams.get('maxPrice');
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : 200;
  const sortBy = searchParams.get('sort') || 'newest';

  // Toggle helpers
  const toggleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const existing = newParams.getAll(key);
    if (existing.includes(value)) {
      newParams.delete(key);
      existing.filter(v => v !== value).forEach(v => newParams.append(key, v));
    } else {
      newParams.append(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const removeFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    const existing = searchParams.getAll(key).filter(v => v !== value);
    existing.forEach(v => newParams.append(key, v));
    setSearchParams(newParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategories.length > 0) {
      result = result.filter(p => activeCategories.includes(p.category));
    }
    if (activeSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => activeSizes.includes(s)));
    }
    if (activeColors.length > 0) {
      result = result.filter(p => p.colors.some(c => activeColors.includes(c.name)));
    }
    
    result = result.filter(p => p.price <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        result.sort((a, b) => (a.isBestseller === b.isBestseller ? 0 : a.isBestseller ? -1 : 1));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
    }

    return result;
  }, [activeCategories, activeSizes, activeColors, maxPrice, sortBy]);

  // Disable scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFilterOpen]);

  // Sub-components
  const FilterSidebar = () => (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div>
        <h4 className="font-display tracking-widest uppercase text-text-primary text-sm mb-4">Category</h4>
        <div className="flex flex-col gap-2 font-body text-sm text-text-muted">
          {allCategories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-text-primary transition-colors">
              <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${activeCategories.includes(cat) ? 'bg-accent-primary border-accent-primary' : 'border-border'}`}>
                {activeCategories.includes(cat) && <svg className="w-3 h-3 text-background" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2"/></svg>}
              </div>
              <input type="checkbox" className="hidden" checked={activeCategories.includes(cat)} onChange={() => toggleFilter('category', cat)} />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-display tracking-widest uppercase text-text-primary text-sm mb-4">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleFilter('size', size)}
              className={`w-10 h-10 border flex items-center justify-center font-display text-sm transition-colors ${activeSizes.includes(size) ? 'bg-text-primary border-text-primary text-background' : 'border-border text-text-muted hover:border-text-primary hover:text-text-primary'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-display tracking-widest uppercase text-text-primary text-sm mb-4 flex justify-between">
          <span>Max Price</span>
          <span className="text-accent-primary">₹{maxPrice}</span>
        </h4>
        <input 
          type="range" 
          min="20" 
          max="200" 
          step="5" 
          value={maxPrice} 
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('maxPrice', e.target.value);
            setSearchParams(newParams);
          }}
          className="w-full accent-accent-primary"
        />
      </div>
    </div>
  );

  return (
    <PageWrapper>
      <SEO title="Shop All Gear" description="Browse the full collection of MuscFit performance apparel." canonical="/shop" />
      <div className="pt-32 pb-24 px-6 lg:px-12 max-w-[1800px] mx-auto min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl lg:text-7xl font-display text-text-primary uppercase mb-4 leading-none">Gear</h1>
            <p className="font-body text-text-muted">Showing {filteredProducts.length} of {products.length} products</p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button 
              className="lg:hidden flex-1 border border-border bg-surface px-4 py-3 font-display tracking-widest text-sm uppercase text-text-primary flex justify-center items-center gap-2"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              Filters
            </button>
            <div className="relative flex-1 lg:w-64">
              <select 
                value={sortBy}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set('sort', e.target.value);
                  setSearchParams(newParams);
                }}
                className="w-full appearance-none border border-border bg-surface px-4 py-3 font-display tracking-widest text-sm uppercase text-text-primary outline-none focus:border-accent-primary cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low - High</option>
                <option value="price-high">Price: High - Low</option>
                <option value="bestselling">Bestselling</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(activeCategories.length > 0 || activeSizes.length > 0 || maxPrice < 200) && (
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="font-body text-sm text-text-muted">Active:</span>
            {activeCategories.map(cat => (
              <button key={cat} onClick={() => removeFilter('category', cat)} className="flex items-center gap-2 px-3 py-1 bg-surface-elevated border border-border rounded-full text-xs font-display tracking-widest uppercase hover:border-accent-secondary transition-colors group">
                {cat} <span className="text-text-muted group-hover:text-accent-secondary">&times;</span>
              </button>
            ))}
            {activeSizes.map(size => (
              <button key={size} onClick={() => removeFilter('size', size)} className="flex items-center gap-2 px-3 py-1 bg-surface-elevated border border-border rounded-full text-xs font-display tracking-widest uppercase hover:border-accent-secondary transition-colors group">
                Size: {size} <span className="text-text-muted group-hover:text-accent-secondary">&times;</span>
              </button>
            ))}
            {maxPrice < 200 && (
              <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete('maxPrice'); setSearchParams(p); }} className="flex items-center gap-2 px-3 py-1 bg-surface-elevated border border-border rounded-full text-xs font-display tracking-widest uppercase hover:border-accent-secondary transition-colors group">
                Under ₹{maxPrice} <span className="text-text-muted group-hover:text-accent-secondary">&times;</span>
              </button>
            )}
            <button onClick={clearFilters} className="text-sm font-body text-text-muted underline hover:text-text-primary ml-2">Clear all</button>
          </div>
        )}

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar />
          </div>

          {/* Grid */}
          <div className="flex-1 w-full">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="w-full flex justify-center">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-surface border border-border rounded">
                <h3 className="font-display text-2xl uppercase text-text-primary mb-4">No results found</h3>
                <p className="font-body text-text-muted mb-8">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ ease: [0.87, 0, 0.13, 1], duration: 0.4 }}
              className="relative w-full bg-surface-elevated rounded-t-2xl p-6 h-[80vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-2xl uppercase text-text-primary">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="text-text-muted hover:text-text-primary text-2xl leading-none">&times;</button>
              </div>
              
              <div className="flex-1 overflow-y-auto pb-8 scrollbar-hide">
                <FilterSidebar />
              </div>

              <div className="pt-6 border-t border-border flex gap-4 mt-auto">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>Clear</Button>
                <Button className="flex-1" onClick={() => setIsMobileFilterOpen(false)}>Apply</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Shop;
