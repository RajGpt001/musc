import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PageWrapper } from '../components/layout/PageWrapper';
const ProductShowcase = lazy(() => import('../components/product/ProductShowcase').then(m => ({ default: m.ProductShowcase })));
import { ErrorBoundary } from '../components/three/ErrorBoundary';
import { SizeChartModal } from '../components/product/SizeChartModal';
import { LazyCanvasWrapper } from '../components/three/LazyCanvasWrapper';
import { products } from '../data/products';
import { sizeCharts } from '../data/sizeCharts';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { AccordionItem } from '../components/ui/Accordion';
import { SEO } from '../lib/seo';
import { useCartStore } from '../store/cartStore';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.id === slug);
  const addItem = useCartStore(state => state.addItem);

  const [activeColor, setActiveColor] = useState(product?.colors[0]);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  // Related products (same category, exclude current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product || !activeColor) {
    return <Navigate to="/shop" replace />;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!activeSize) {
      setShowError(true);
      return;
    }
    setShowError(false);

    // Dispatch fly animation event
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    window.dispatchEvent(new CustomEvent('cart-fly', {
      detail: { x: rect.left + rect.width / 2, y: rect.top, colorHex: activeColor.hex }
    }));

    addItem({
      product,
      quantity: 1,
      selectedSize: activeSize,
      selectedColor: activeColor.id
    });
  };

  const sizeChart = sizeCharts[product.sizeChartId];

  return (
    <PageWrapper>
      <SEO 
        title={product.name} 
        description={product.description} 
        canonical={`/product/${product.id}`}
        image={product.images?.[0]} 
      />
      <div className="pt-24 pb-24 max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        
        {/* 3D Showcase (Sticky on desktop) */}
        <div data-cursor="DRAG" className="w-full lg:w-1/2 relative lg:sticky lg:top-24 h-[600px] lg:h-[calc(100vh-8rem)] rounded bg-surface-elevated overflow-hidden border border-border">
          <LazyCanvasWrapper minHeight="100%">
            <ErrorBoundary>
              <Suspense fallback={<div className="absolute inset-0 bg-surface-elevated animate-pulse" />}>
                <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }} dpr={[1, 2]}>
                  <ProductShowcase colorHex={activeColor.hex} isInspectMode={isInspectMode} />
                </Canvas>
              </Suspense>
            </ErrorBoundary>
          </LazyCanvasWrapper>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-4">
            <button
              onClick={() => setIsInspectMode(!isInspectMode)}
              className="bg-background/80 backdrop-blur text-text-primary px-6 py-2 rounded font-display tracking-widest uppercase text-sm border border-border hover:border-accent-primary transition-colors"
            >
              {isInspectMode ? 'Back to Full View' : 'Inspect Fabric'}
            </button>
          </div>
          
          <div className="absolute top-6 right-6 z-10 pointer-events-none text-text-muted/50 font-display text-sm tracking-widest uppercase">
            360° View
          </div>
        </div>

        {/* Product Info Panel */}
        <div className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-24 pb-32">
          <div className="mb-4">
            <span className="text-accent-primary font-display tracking-widest text-sm uppercase">{product.category}</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display text-text-primary uppercase leading-[0.9] mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-display tracking-wider text-text-muted">₹{product.price}</span>
            {product.isSale && <Badge variant="sale" />}
            {product.isNew && <Badge variant="new" />}
          </div>

          <p className="font-body text-text-muted text-lg mb-12 leading-relaxed max-w-lg">
            {product.description}
          </p>

          {/* Colorways */}
          <div className="mb-10">
            <h3 className="font-display uppercase tracking-widest text-sm mb-4 text-text-primary">
              Color: <span className="text-text-muted">{activeColor.name}</span>
            </h3>
            <div className="flex gap-4">
              {product.colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => setActiveColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${activeColor.id === color.id ? 'border-accent-primary scale-110' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-12">
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="font-display uppercase tracking-widest text-sm text-text-primary">Select Size</h3>
              {sizeChart && (
                <button onClick={() => setIsSizeModalOpen(true)} className="text-text-muted hover:text-accent-primary text-sm font-body underline transition-colors">
                  Size Guide
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => { setActiveSize(size); setShowError(false); }}
                  className={`w-16 h-12 flex items-center justify-center font-display text-lg uppercase transition-all clip-angled ${activeSize === size ? 'bg-text-primary text-background' : 'bg-surface-elevated text-text-muted hover:bg-surface border border-transparent hover:border-text-muted'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {showError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-accent-secondary text-sm mt-3 font-body">
                  Please select a size to continue.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mb-16">
            <Button size="lg" className="w-full lg:max-w-md py-6 text-xl" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
          </div>

          {/* Accordions */}
          <div className="border-t border-border pt-6">
            <AccordionItem title="Fabric & Fit" defaultOpen>
              <p className="font-body text-text-muted">
                {product.fabricComposition}. Designed for an athletic fit. If you are between sizes, we recommend sizing up for a more relaxed feel.
              </p>
            </AccordionItem>
            <AccordionItem title="Care Instructions">
              <ul className="font-body text-text-muted list-disc pl-4 space-y-1">
                <li>Machine wash cold with like colors</li>
                <li>Do not bleach or use fabric softeners</li>
                <li>Tumble dry low or hang dry</li>
                <li>Do not iron graphics</li>
              </ul>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <p className="font-body text-text-muted">
                Free standard shipping on orders over ₹150. We accept returns of unworn, unwashed items within 30 days of delivery. See full policy for details.
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 border-t border-border">
          <h2 className="font-display text-4xl uppercase text-text-primary mb-12">You Might Also Like</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {relatedProducts.map(prod => (
              <div key={prod.id} className="snap-start">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {sizeChart && (
        <SizeChartModal 
          isOpen={isSizeModalOpen} 
          onClose={() => setIsSizeModalOpen(false)} 
          sizeChart={sizeChart} 
        />
      )}
    </PageWrapper>
  );
};

export default ProductDetail;
