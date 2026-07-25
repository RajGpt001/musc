import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, toggleCartDrawer, cartItems, updateQuantity, removeFromCart, setCursorState } = useStore();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toggleCartDrawer(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    toggleCartDrawer(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCartDrawer(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 z-[70] w-full max-w-md h-full bg-surface-elevated shadow-2xl flex flex-col border-l border-border"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.19, 1, 0.22, 1], duration: 0.5 }}
            onMouseEnter={() => setCursorState('default')}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl uppercase tracking-widest text-text-primary">Your Cart</h2>
              <button 
                onClick={() => toggleCartDrawer(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 01-8 0"></path>
                  </svg>
                  <p className="font-body text-text-primary">Your cart is empty.</p>
                  <Button variant="outline" size="sm" onClick={() => { toggleCartDrawer(false); navigate('/shop'); }}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Fake Thumbnail */}
                    <div className="w-24 h-32 bg-surface rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundColor: item.colorHex }} />
                      <span className="font-display text-xs text-text-muted uppercase rotate-90 tracking-widest">Forge</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-display uppercase tracking-wider text-text-primary text-sm pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-muted hover:text-accent-secondary transition-colors mt-1"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </div>
                        <p className="font-body text-xs text-text-muted mt-1">{item.colorName} / {item.size}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Stepper */}
                        <div className="flex items-center border border-border rounded-sm">
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-body text-sm text-text-primary">{item.quantity}</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="font-body font-medium text-text-primary">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-surface-elevated space-y-6">
                <div className="flex justify-between items-center text-text-primary font-display uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <p className="font-body text-xs text-text-muted">Taxes and shipping calculated at checkout.</p>
                <div className="space-y-3">
                  <Button fullWidth onClick={handleCheckout}>Checkout</Button>
                  <Button variant="ghost" fullWidth onClick={handleViewCart}>View Cart</Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
