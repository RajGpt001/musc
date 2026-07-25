import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border pt-20 pb-8 px-6 lg:px-12 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start space-y-6">
            <Logo />
            <p className="text-text-muted font-body text-sm leading-relaxed max-w-sm">
              Advanced performance apparel built for the modern athlete. Designed to move, adapt, and endure. Engineered for effort.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-text-primary hover:text-accent-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-accent-primary transition-colors">
                <span className="sr-only">TikTok</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-accent-primary transition-colors">
                <span className="sr-only">YouTube</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-display text-text-primary uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop?category=hoodie" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Hoodies & Sweats</Link></li>
              <li><Link to="/shop?category=tee" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">T-Shirts</Link></li>
              <li><Link to="/shop?category=leggings" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Leggings</Link></li>
              <li><Link to="/shop?category=shorts" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Shorts</Link></li>
              <li><Link to="/shop?category=accessories" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Accessories</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-display text-text-primary uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/sizing" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Size Guide</Link></li>
              <li><Link to="/shipping" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">FAQ</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Contact Us</Link></li>
              <li><Link to="/account" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-display text-text-primary uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">About Us</Link></li>
              <li><Link to="/careers" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Careers</Link></li>
              <li><Link to="/sustainability" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Sustainability</Link></li>
              <li><Link to="/affiliates" className="text-text-muted hover:text-accent-primary transition-colors text-sm font-body">Affiliate Program</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex-1 max-w-md w-full">
            <p className="text-text-primary font-display uppercase tracking-widest text-sm mb-4">Join the MuscFit Community</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-1 bg-background border border-border px-4 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="flex flex-wrap gap-4 text-xs font-body text-text-muted">
              <Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-text-primary transition-colors">Accessibility</Link>
            </div>
            <p className="text-xs font-body text-text-muted/50">
              © {new Date().getFullYear()} MUSCFIT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
