import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const { cartCount, cartBump, isMenuOpen, toggleMenu } = useStore();
  const cartControls = useAnimation();

  // Background and border transitions based on scroll
  const isHome = location.pathname === '/';
  
  // If not home, we always want the dark surface. If home, it transitions.
  const bgOpacity = useTransform(scrollY, [0, 100], [isHome ? 0 : 0.8, 0.8]);
  const blurValue = useTransform(scrollY, [0, 100], [isHome ? 0 : 12, 12]);
  const borderOpacity = useTransform(scrollY, [0, 100], [isHome ? 0 : 1, 1]);

  useEffect(() => {
    if (cartBump > 0) {
      cartControls.start({
        scale: [1, 1.3, 1],
        y: [0, -5, 0],
        transition: { duration: 0.4, ease: "easeOut" }
      });
    }
  }, [cartBump, cartControls]);

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 h-20 transition-colors"
        style={{
          backgroundColor: useTransform(bgOpacity, v => `rgba(22, 22, 26, ${v})`),
          backdropFilter: useTransform(blurValue, v => `blur(${v}px)`),
          borderBottom: useTransform(borderOpacity, v => `1px solid rgba(42, 42, 48, ${v})`)
        }}
      >
        {/* Brand */}
        <Link 
          to="/" 
          className="font-display text-2xl uppercase tracking-tighter text-text-primary z-50 hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          aria-label="Forge Home"
        >
          FORGE
        </Link>

        {/* Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 font-body text-sm uppercase tracking-wider font-medium">
          <Link to="/shop" className="text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary px-2 py-1">Shop</Link>
          <Link to="/collections" className="text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary px-2 py-1">Collections</Link>
          <Link to="/about" className="text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary px-2 py-1">About</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 lg:gap-6 z-50">
          <button 
            className="relative flex items-center justify-center w-10 h-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary" 
            aria-label="Open Cart"
            onClick={() => useStore.getState().toggleCartDrawer()}
          >
            <motion.div animate={cartControls} className="relative z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary group-hover:text-accent-primary transition-colors">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 01-8 0"></path>
              </svg>
              
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-secondary flex items-center justify-center text-[10px] font-bold text-white">
                  {cartCount}
                </div>
              )}
            </motion.div>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative flex items-center justify-center w-10 h-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            aria-label="Toggle Menu"
            onClick={() => toggleMenu()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary group-hover:text-accent-primary transition-colors">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link to="/shop" onClick={() => toggleMenu()} className="font-display text-4xl uppercase text-text-primary hover:text-accent-primary">Shop</Link>
            <Link to="/collections" onClick={() => toggleMenu()} className="font-display text-4xl uppercase text-text-primary hover:text-accent-primary">Collections</Link>
            <Link to="/about" onClick={() => toggleMenu()} className="font-display text-4xl uppercase text-text-primary hover:text-accent-primary">About</Link>
            
            <button 
              onClick={() => toggleMenu()}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary"
              aria-label="Close Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
