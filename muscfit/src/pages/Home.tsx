import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyCanvasWrapper } from '../components/three/LazyCanvasWrapper';
import { ErrorBoundary } from '../components/three/ErrorBoundary';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { products } from '../data/products';
import { PageWrapper } from '../components/layout/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

// Removed HeroScene import to fix TS6133
const ProductShowcase = lazy(() => import('../components/product/ProductShowcase').then(m => ({ default: m.ProductShowcase })));
import { SEO } from '../lib/seo';
import { ImageCarouselHeroDemo } from '../components/ui/demo';
// Framer motion variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const Home: React.FC = () => {
  // Use a subset of products for bestsellers
  const bestsellers = products.filter(p => p.isBestseller).concat(products).slice(0, 5); // Pad if needed

  const showcaseRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect on manifesto
    if (parallaxRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(parallaxRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Scale + rotate settle entrance for 3D Showcase
    if (showcaseRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(showcaseRef.current, 
        { scale: 0.8, opacity: 0, rotationY: -15 },
        { 
          scale: 1, opacity: 1, rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <PageWrapper>
      <SEO />
      {/* Hero Section */}
      <ImageCarouselHeroDemo />

      {/* 2. CATEGORY BENTO GRID */}
      <section className="py-24 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px] lg:auto-rows-[400px]"
        >
          {/* Main Large Tile */}
          <Link to="/shop?category=hoodie" className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-surface-elevated rounded block">
            <img 
              src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=1200&auto=format&fit=crop" 
              alt="Hoodies & Sweats" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 z-20 transition-transform duration-500 group-hover:-translate-y-2">
              <h2 className="font-display text-4xl text-white uppercase mb-2">Hoodies & Sweats</h2>
              <span className="text-white/80 font-display tracking-widest text-sm flex items-center gap-2 group-hover:text-accent-primary transition-colors">
                Explore <span className="text-lg">→</span>
              </span>
            </div>
          </Link>
          
          {/* Secondary Tiles */}
          <Link to="/shop?category=tee" className="md:col-span-2 relative group overflow-hidden bg-surface-elevated rounded block">
            <img 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" 
              alt="T-Shirts" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 z-20 group-hover:-translate-y-1 transition-transform flex items-center justify-between w-[calc(100%-3rem)]">
              <h2 className="font-display text-2xl text-white uppercase">T-Shirts</h2>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-accent-primary group-hover:text-accent-primary transition-colors">
                <span className="text-sm">→</span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=leggings" className="relative group overflow-hidden bg-surface-elevated rounded block">
             <img 
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop" 
              alt="Leggings" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
             <div className="absolute bottom-6 left-6 z-20 group-hover:-translate-y-1 transition-transform flex items-center justify-between w-[calc(100%-3rem)]">
              <h2 className="font-display text-2xl text-white uppercase">Leggings</h2>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-accent-primary group-hover:text-accent-primary transition-colors">
                <span className="text-sm">→</span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=shorts" className="relative group overflow-hidden bg-surface-elevated rounded block">
             <img 
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop" 
              alt="Shorts" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 object-top"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
             <div className="absolute bottom-6 left-6 z-20 group-hover:-translate-y-1 transition-transform flex items-center justify-between w-[calc(100%-3rem)]">
              <h2 className="font-display text-2xl text-white uppercase">Shorts</h2>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-accent-primary group-hover:text-accent-primary transition-colors">
                <span className="text-sm">→</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* 3. 3D PRODUCT SHOWCASE (Placeholder) */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div ref={showcaseRef} data-cursor="DRAG" className="flex-1 w-full h-[500px] lg:h-[700px] bg-surface-elevated rounded flex items-center justify-center border border-border relative overflow-hidden">
              <LazyCanvasWrapper minHeight="100%">
                <ErrorBoundary>
                  <Suspense fallback={<div className="absolute inset-0 bg-surface-elevated animate-pulse" />}>
                    <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }} dpr={[1, 2]}>
                      <ProductShowcase colorHex="#cccccc" isInspectMode={false} />
                    </Canvas>
                  </Suspense>
                </ErrorBoundary>
              </LazyCanvasWrapper>
              <div className="absolute top-6 right-6 pointer-events-none text-text-muted/50 font-display text-sm tracking-widest uppercase">
                Interactive 3D
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <Badge variant="new" />
              <h2 className="font-display text-5xl lg:text-7xl uppercase text-text-primary leading-none">The Apex Hoodie</h2>
              <p className="font-body text-text-muted text-lg max-w-md">
                Experience unparalleled thermal regulation. Explore the garment in full 360° before you commit.
              </p>
              <Button size="lg">Explore Details</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. BESTSELLERS CAROUSEL */}
      <section className="py-24 max-w-[1600px] mx-auto overflow-hidden">
        <div className="px-6 lg:px-12 flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl lg:text-5xl uppercase text-text-primary">Global Bestsellers</h2>
          <Link to="/shop" className="hidden sm:flex font-display text-text-muted hover:text-accent-primary transition-colors tracking-widest uppercase text-sm border-b border-current pb-1">
            View All
          </Link>
        </div>
        
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-6 overflow-x-auto pb-8 px-6 lg:px-12 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {bestsellers.map((prod, i) => (
            <div key={`${prod.id}-${i}`} className="snap-start">
              <ProductCard product={prod} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* 5. BRAND STATEMENT & SOCIAL PROOF */}
      <section className="py-32 bg-accent-primary text-background border-y border-accent-primary">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div ref={parallaxRef}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-8xl uppercase leading-[0.9] tracking-tight mb-8">
                We Don't Make Activewear.<br/>We Build Armor.
              </h2>
              <p className="font-body font-medium md:text-xl max-w-2xl opacity-90 mx-auto mb-16">
                True progression demands friction. Our gear is mathematically engineered to withstand your darkest hours and most punishing routines. No compromises.
              </p>
            </div>
            
            {/* Social Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full pt-16 border-t border-background/20">
              <div className="flex flex-col items-center">
                <span className="font-display text-6xl uppercase tracking-tighter mb-2">50K+</span>
                <span className="font-body font-bold text-sm tracking-widest uppercase opacity-80">Athletes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-6xl uppercase tracking-tighter mb-2">4.9★</span>
                <span className="font-body font-bold text-sm tracking-widest uppercase opacity-80">Average Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-6xl uppercase tracking-tighter mb-2">30</span>
                <span className="font-body font-bold text-sm tracking-widest uppercase opacity-80">Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
