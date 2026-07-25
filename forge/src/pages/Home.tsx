import React, { Suspense, useRef } from 'react';
import { HeroScene } from '../components/three/HeroScene';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ProductPanel } from '../components/product/ProductPanel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax for Brand Statement
      if (brandRef.current) {
        gsap.fromTo(brandRef.current, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: brandRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      }
      
      // Parallax for Categories
      if (highlightsRef.current) {
        const cards = highlightsRef.current.querySelectorAll('.category-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: "top 75%",
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background text-text-primary">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative h-[120vh] w-full overflow-hidden">
        {/* The 3D Canvas stays fixed within the 100vh portion, while the section is taller to allow scrubbing */}
        <div className="sticky top-0 h-screen w-full">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>

          <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-24 pointer-events-none">
            <div className="max-w-4xl space-y-8">
              <SectionLabel text="NEW ARRIVALS" />
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-text-primary leading-[0.85] tracking-tighter uppercase">
                Engineered <br />
                For <span className="text-accent-primary">Effort</span>
              </h1>
              
              <p className="font-body text-text-muted text-lg md:text-xl max-w-xl leading-relaxed">
                Advanced performance apparel built for the modern athlete. 
                Designed to move, adapt, and endure.
              </p>
              
              <div className="pt-8">
                <Button className="pointer-events-auto" variant="primary">
                  Shop The Drop
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND STATEMENT */}
      <section ref={brandRef} className="py-32 px-6 md:px-24 flex items-center justify-center bg-surface">
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-center max-w-4xl leading-tight">
          We don't do compromises. <br/>
          <span className="text-text-muted">Every stitch, every seam, engineered for maximum performance.</span>
        </h2>
      </section>

      {/* 3. FEATURED PRODUCT SHOWCASE */}
      <section id="product-panel-section" className="relative w-full border-t border-border">
        <ProductPanel />
      </section>

      {/* 4. CATEGORY HIGHLIGHTS */}
      <section ref={highlightsRef} className="py-32 px-6 md:px-24 border-t border-border">
        <SectionLabel text="GEAR UP" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Hoodies', 'Tees', 'Bottoms'].map((cat) => (
            <div key={cat} className="category-card group relative aspect-square bg-surface-elevated overflow-hidden flex items-end p-8 cursor-pointer border border-transparent hover:border-border transition-colors">
              {/* Fake image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              
              <div className="relative z-20 w-full flex justify-between items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-3xl uppercase tracking-tighter">{cat}</h3>
                <span className="text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 px-6 md:px-24 bg-surface text-center">
        <h3 className="font-display text-2xl uppercase tracking-widest text-text-muted mb-8">"Best fit I've ever worn."</h3>
        <p className="font-body text-text-primary text-sm uppercase tracking-wider">— Athlete 01</p>
      </section>

      {/* 6. FOOTER CTA */}
      <footer className="py-32 px-6 md:px-24 border-t border-border flex flex-col items-center text-center">
        <h2 className="text-6xl font-display uppercase tracking-tighter mb-8">Join The Forge</h2>
        <Button variant="primary">Sign Up for Exclusives</Button>
      </footer>
    </div>
  );
};
