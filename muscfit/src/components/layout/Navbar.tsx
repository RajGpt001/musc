import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { Logo } from '../ui/Logo';
import { AccordionItem } from '../ui/Accordion';
import { Menu, MenuItem, HoveredLink, ProductItem } from '../ui/navbar-menu';
const navLinks = [
  { name: 'MEN', path: '/shop?category=men', hasMega: true },
  { name: 'WOMEN', path: '/shop?category=women', hasMega: true },
  { name: 'HOODIES & SWEATS', path: '/shop?category=hoodie', hasMega: false },
  { name: 'T-SHIRTS', path: '/shop?category=tee', hasMega: false },
  { name: 'LEGGINGS', path: '/shop?category=leggings', hasMega: false },
  { name: 'SHORTS', path: '/shop?category=shorts', hasMega: false },
  { name: 'ACCESSORIES', path: '/shop?category=accessories', hasMega: false },
  { name: 'SALE', path: '/shop?sale=true', hasMega: false }
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Topwear');
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobileMenuOpen = useUiStore(state => state.isMobileMenuOpen);
  const toggleMobileMenu = useUiStore(state => state.toggleMobileMenu);
  const toggleCartDrawer = useUiStore(state => state.toggleCartDrawer);
  const totalItems = useCartStore(state => state.totalItems);
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 80);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) toggleMobileMenu();
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          !isVisible ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0 pointer-events-auto'
        } ${scrolled ? 'bg-surface-elevated/90 backdrop-blur-md border-b border-border' : 'bg-transparent border-transparent'}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger & Logo Container */}
          <div className="flex items-center lg:mr-12">
            {/* Mobile Hamburger */}
            <div className="lg:hidden mr-4">
              <button onClick={toggleMobileMenu} className="text-text-primary p-2 -ml-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex-none z-50">
              <Logo className="hidden lg:flex" />
              <Logo variant="icon" className="lg:hidden" />
            </Link>
          </div>

          {/* Desktop Nav (Aceternity UI Menu) */}
          <div className="hidden lg:flex items-center justify-start flex-1 h-full pt-1">
            <Menu setActive={setHoveredNav}>
              <MenuItem setActive={setHoveredNav} active={hoveredNav} item="MEN">
                <div className="flex w-[850px] bg-surface-elevated overflow-hidden rounded-xl">
                  {/* Left Sidebar - Categories */}
                  <div className="w-[200px] bg-surface flex flex-col py-4 border-r border-border">
                    {['Topwear', 'Bottomwear', 'Innerwear', 'Shop the Look ✨', 'Summer Shreds'].map((tab) => (
                      <div 
                        key={tab}
                        onMouseEnter={() => setActiveTab(tab)}
                        className={`flex justify-between items-center py-3 pl-6 pr-4 cursor-pointer transition-colors ${
                          tab === activeTab 
                            ? 'bg-surface-elevated text-accent-primary font-bold shadow-[-4px_0_0_0_#CCFF00_inset]' 
                            : 'text-text-primary hover:text-accent-primary'
                        }`}
                      >
                        <span className="font-display tracking-wide uppercase text-[11px]">{tab}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={tab === activeTab ? 'text-accent-primary' : 'text-text-muted'}>
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                  
                  {/* Middle - Subcategories */}
                  <div className="w-[220px] bg-surface-elevated px-6 py-6 border-r border-border">
                    <ul className="space-y-3">
                      {(activeTab === 'Topwear' ? ['T-shirts', 'Shirts', 'Stringers', 'Jackets & Hoodies', 'Sweatshirts & Pullovers', 'All Topwear'] :
                        activeTab === 'Bottomwear' ? ['Shorts', 'Joggers', 'Track Pants', 'Compression Tights', 'All Bottomwear'] :
                        activeTab === 'Innerwear' ? ['Boxers', 'Briefs', 'Base Layers', 'Socks', 'All Innerwear'] :
                        activeTab === 'Shop the Look ✨' ? ['Gym Rat Bundle', 'Aesthetic Fit', 'Powerlifter Pack'] :
                        ['Tanks', 'Cut-offs', 'Lightweight Shorts', 'All Summer Shreds']
                      ).map((link) => (
                        <li key={link}>
                          <HoveredLink to="/shop">{link}</HoveredLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right - Promo Cards */}
                  <div className="flex-1 bg-surface-elevated py-6 px-6 grid grid-cols-2 gap-4">
                    <ProductItem 
                      title="Aesthetic Fit"
                      href="/shop"
                      src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
                      description="Tailored for a slim fit."
                    />
                    <ProductItem 
                      title="Gym Vibes"
                      href="/shop"
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
                      description="The Core Collection."
                    />
                  </div>
                </div>
              </MenuItem>

              <MenuItem setActive={setHoveredNav} active={hoveredNav} item="WOMEN">
                <div className="flex w-[750px] bg-surface-elevated overflow-hidden rounded-xl">
                  {/* Left - Subcategories */}
                  <div className="w-[250px] bg-surface flex flex-col justify-center px-8 py-6 border-r border-border">
                    <ul className="space-y-4">
                      {['New Arrivals', 'Bottoms', 'T-shirts', 'Sports Bra', 'Hoodies & Jackets', 'Tank Tops', 'View All Products'].map((link) => (
                        <li key={link}>
                          <HoveredLink to="/shop?category=women">{link}</HoveredLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right - Promo Cards */}
                  <div className="flex-1 bg-surface-elevated py-6 px-6 grid grid-cols-2 gap-4">
                    <ProductItem 
                      title="Easy Comfort"
                      href="/shop?category=women"
                      src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop"
                      description="Oversized Tee."
                    />
                    <ProductItem 
                      title="Move & Flow"
                      href="/shop?category=women"
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
                      description="Premium Bottoms."
                    />
                  </div>
                </div>
              </MenuItem>

              <MenuItem setActive={setHoveredNav} active={hoveredNav} item="HOODIES & SWEATS">
                <div className="flex flex-col space-y-4 text-sm p-4 w-[200px]">
                  <HoveredLink to="/shop?category=hoodie">Shop Hoodies</HoveredLink>
                  <HoveredLink to="/shop?category=sweatshirts">Shop Sweatshirts</HoveredLink>
                </div>
              </MenuItem>
              
              <MenuItem setActive={setHoveredNav} active={hoveredNav} item="ACCESSORIES">
                 <div className="flex flex-col space-y-4 text-sm p-4 w-[200px]">
                  <HoveredLink to="/shop?category=accessories">Bags</HoveredLink>
                  <HoveredLink to="/shop?category=accessories">Lifting Belts</HoveredLink>
                  <HoveredLink to="/shop?category=accessories">Bottles</HoveredLink>
                </div>
              </MenuItem>

              <div onMouseEnter={() => setHoveredNav(null)} className="cursor-pointer text-accent-secondary hover:opacity-80 font-display uppercase tracking-wide text-sm py-2 px-2">
                <Link to="/shop?sale=true">SALE</Link>
              </div>
            </Menu>
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end flex-none gap-4 lg:gap-6 z-50">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-text-primary hover:text-accent-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            <Link to="/account" className="hidden lg:block text-text-primary hover:text-accent-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button 
              onClick={toggleCartDrawer}
              className="p-2 text-text-primary hover:text-accent-primary transition-colors relative"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden bg-surface-elevated border-b border-border absolute top-20 left-0 w-full"
            >
              <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6">
                <input 
                  type="text" 
                  placeholder="SEARCH MUSCFIT..." 
                  className="w-full bg-transparent text-2xl lg:text-4xl font-display uppercase tracking-wider text-text-primary placeholder:text-text-muted/50 outline-none"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.87, 0, 0.13, 1], duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-background pt-24 px-6 overflow-y-auto lg:hidden"
          >
            <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-text-primary p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="space-y-2 mb-12">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasMega ? (
                    <AccordionItem title={link.name}>
                      <ul className="space-y-4 pt-2">
                        <li><Link to="/shop" className="text-text-primary">Shop All {link.name}</Link></li>
                        <li><Link to="/shop" className="text-text-primary">Bestsellers</Link></li>
                        <li><Link to="/shop" className="text-text-primary">New Arrivals</Link></li>
                      </ul>
                    </AccordionItem>
                  ) : (
                    <Link to={link.path} className={`block py-5 border-b border-border font-body font-medium ${link.name === 'SALE' ? 'text-accent-secondary' : 'text-text-primary'}`}>
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Promo */}
            <div className="bg-surface p-6 rounded mb-12">
              <span className="text-accent-primary text-xs font-display tracking-widest mb-2 block">NEW DROP</span>
              <h4 className="text-text-primary font-display text-xl uppercase mb-4">The Apex Collection</h4>
              <Link to="/shop" className="text-sm font-display tracking-widest underline underline-offset-4">SHOP NOW</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
