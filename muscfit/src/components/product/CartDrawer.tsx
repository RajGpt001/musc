import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, toggleCartDrawer } = useUiStore();
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        toggleCartDrawer();
      }
    };
    
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, toggleCartDrawer]);

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartDrawer}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-elevated z-[101] shadow-2xl flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl uppercase tracking-widest text-text-primary">Your Cart</h2>
              <button 
                onClick={toggleCartDrawer}
                className="text-text-muted hover:text-accent-primary transition-colors p-2"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-text-muted">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-text-primary uppercase mb-2">Cart is empty</h3>
                    <p className="text-text-muted mb-8">Ready to gear up?</p>
                    <Button onClick={toggleCartDrawer} variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              ) : (
                items.map((item, index) => {
                  const colorObj = item.product.colors.find(c => c.id === item.selectedColor);
                  return (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex gap-4">
                      {/* Thumbnail */}
                      <Link 
                        to={`/product/${item.product.id}`} 
                        onClick={toggleCartDrawer}
                        className="w-24 h-24 bg-surface rounded border border-border flex items-center justify-center shrink-0"
                      >
                        <img src={item.product.images?.[0]} alt={item.product.name} className="w-full h-full object-cover rounded opacity-80 mix-blend-screen" />
                      </Link>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-display text-text-primary uppercase tracking-wide">
                              <Link to={`/product/${item.product.id}`} onClick={toggleCartDrawer} className="hover:text-accent-primary transition-colors">
                                {item.product.name}
                              </Link>
                            </h3>
                            <button 
                              onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                              className="text-text-muted hover:text-accent-secondary transition-colors"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-sm text-text-muted font-body mb-2 flex items-center gap-2">
                            <span>{colorObj?.name}</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span>Size {item.selectedSize}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-border rounded h-8">
                            <button 
                              onClick={() => item.quantity > 1 ? updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1) : removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                              className="px-2 text-text-muted hover:text-text-primary transition-colors h-full flex items-center"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-body text-text-primary">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                              className="px-2 text-text-muted hover:text-text-primary transition-colors h-full flex items-center"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-display text-text-primary">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-surface-elevated">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-text-muted uppercase tracking-widest">Subtotal</span>
                  <span className="font-display text-2xl text-text-primary">₹{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-text-muted text-xs mb-6 font-body">Shipping & taxes calculated at checkout.</p>
                <div className="flex flex-col gap-3">
                  <Button onClick={handleCheckout} className="w-full">
                    Checkout
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      toggleCartDrawer();
                      navigate('/cart');
                    }}
                    className="w-full text-xs"
                  >
                    View Full Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
