import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useUiStore();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-background pt-20 px-6 flex flex-col"
        >
          <nav className="flex flex-col gap-6 mt-8 font-display text-3xl uppercase tracking-widest text-text-primary">
            <Link to="/shop?category=men" onClick={toggleMobileMenu}>Men</Link>
            <Link to="/shop?category=women" onClick={toggleMobileMenu}>Women</Link>
            <Link to="/shop?category=hoodie" onClick={toggleMobileMenu}>Hoodies</Link>
            <Link to="/shop?category=tee" onClick={toggleMobileMenu}>Tees</Link>
            <Link to="/shop?category=leggings" onClick={toggleMobileMenu}>Leggings</Link>
            <Link to="/shop?category=shorts" onClick={toggleMobileMenu}>Shorts</Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
