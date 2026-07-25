import React from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';

const About: React.FC = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-background/50 z-10" />
        {/* Placeholder for an intense training image */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-40" />
        
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-text-primary mb-6"
          >
            Forged in the <span className="text-accent-primary">Fire</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg md:text-xl text-text-muted"
          >
            MuscFit was born from a simple obsession: to build apparel that doesn't just survive your training, but elevates it.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 lg:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl uppercase text-text-primary mb-6">Our Philosophy</h2>
            <p className="font-body text-text-muted text-lg leading-relaxed mb-6">
              The fitness industry is crowded with fast fashion masquerading as athletic wear. Gear that pills after one wash, loses shape after one squat, and fails when you need it most.
            </p>
            <p className="font-body text-text-muted text-lg leading-relaxed">
              We took a different approach. Every stitch, seam, and fabric blend at MuscFit is mathematically engineered for performance. We treat our garments like hardware, rigorously beta-testing them on elite athletes before they ever see a production line.
            </p>
          </div>
          <div className="aspect-square bg-surface border border-border rounded flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="font-display text-text-muted/10 text-9xl uppercase rotate-90 scale-150 pointer-events-none">Zero</span>
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-24 bg-surface-elevated border-y border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl uppercase text-text-primary">The MuscFit Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full border border-accent-primary mx-auto mb-6 flex items-center justify-center text-accent-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="font-display text-2xl text-text-primary uppercase mb-4">Apex Fabric Tech</h3>
              <p className="font-body text-text-muted">Proprietary blends designed for maximum thermal regulation and four-way ballistic stretch.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full border border-accent-primary mx-auto mb-6 flex items-center justify-center text-accent-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
              <h3 className="font-display text-2xl text-text-primary uppercase mb-4">Athlete Tested</h3>
              <p className="font-body text-text-muted">No product ships without 1,000 hours of real-world stress testing by professional powerlifters.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full border border-accent-primary mx-auto mb-6 flex items-center justify-center text-accent-primary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
              </div>
              <h3 className="font-display text-2xl text-text-primary uppercase mb-4">Sustainable Armor</h3>
              <p className="font-body text-text-muted">Built to last years, not months. We utilize recycled poly-blends without compromising durability.</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
