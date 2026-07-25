import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ProductGridSkeleton } from '../components/ui/Skeleton';

export const Shop: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ['all', 'hoodie', 'tee', 'leggings', 'shorts'];

  useEffect(() => {
    // Mock network request to show skeleton loader
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (filter !== 'all') {
      result = result.filter(p => p.category === filter);
    }

    // Sort
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      // Assuming 'new' tag means newest
      result.sort((a, b) => {
        if (a.tags.includes('new') && !b.tags.includes('new')) return -1;
        if (!a.tags.includes('new') && b.tags.includes('new')) return 1;
        return 0;
      });
    }

    return result;
  }, [filter, sort]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 md:px-12 lg:px-24">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-text-primary mb-4">
          All Gear
        </h1>
        <p className="text-text-muted font-body text-lg max-w-xl">
          Engineered for performance, designed for impact. Explore the full FORGE collection.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-border pb-8">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 clip-angled-sm font-display text-sm uppercase transition-all duration-300 ${
                filter === cat 
                  ? 'bg-text-primary text-black' 
                  : 'bg-surface text-text-primary hover:bg-surface-elevated'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-text-muted uppercase tracking-wider">Sort by:</span>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-text-primary font-body text-sm border-none focus:ring-0 cursor-pointer uppercase tracking-wider outline-none"
          >
            <option value="newest" className="bg-surface text-text-primary">Newest</option>
            <option value="price-low" className="bg-surface text-text-primary">Price: Low to High</option>
            <option value="price-high" className="bg-surface text-text-primary">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05, 
                ease: [0.19, 1, 0.22, 1]
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
