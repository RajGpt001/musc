import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Fallback if accessed empty
  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-3xl uppercase mb-4 text-text-primary">Checkout Unavailable</h1>
        <p className="text-text-muted mb-8">Your cart is empty.</p>
        <Link to="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate real payment gateway (Stripe, Braintree, etc.) here.
    // For now, simulate success.
    clearCart();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body selection:bg-accent-primary selection:text-background">
      {/* Checkout Header */}
      <header className="p-6 border-b border-border flex justify-between items-center bg-surface-elevated/50 backdrop-blur">
        <Link to="/" className="font-display text-2xl tracking-tighter uppercase text-text-primary hover:text-accent-primary transition-colors">
          Musc<span className="text-accent-primary">Fit</span>
        </Link>
        <Link to="/cart" className="text-sm text-text-muted hover:text-text-primary transition-colors">
          Return to Cart
        </Link>
      </header>

      {/* Main Checkout Area */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full flex flex-col lg:flex-row gap-12 p-6 lg:p-12 relative">
        
        {/* Left Form Area */}
        <div className="flex-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-4 mb-12 font-display text-sm tracking-widest uppercase">
            <span className={step >= 1 ? 'text-accent-primary' : 'text-text-muted'}>Shipping</span>
            <span className="text-text-muted">/</span>
            <span className={step >= 2 ? 'text-accent-primary' : 'text-text-muted'}>Payment</span>
            <span className="text-text-muted">/</span>
            <span className={step === 3 ? 'text-accent-primary' : 'text-text-muted'}>Confirmation</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
              >
                <div>
                  <h2 className="font-display text-2xl text-text-primary uppercase mb-6">Contact Information</h2>
                  <input type="email" required placeholder="Email address" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary mb-4" />
                  <label className="flex items-center gap-3 text-sm text-text-muted cursor-pointer">
                    <input type="checkbox" className="accent-accent-primary w-4 h-4" />
                    <span>Email me with news and offers</span>
                  </label>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-text-primary uppercase mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="First name" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                    <input type="text" required placeholder="Last name" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                    <input type="text" required placeholder="Address" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary col-span-2" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary col-span-2" />
                    <input type="text" required placeholder="City" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                    <input type="text" required placeholder="Postal code" className="w-full bg-surface border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full">Continue to Payment</Button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
                onSubmit={handleCompleteOrder}
              >
                <div>
                  <h2 className="font-display text-2xl text-text-primary uppercase mb-6">Payment</h2>
                  <p className="text-text-muted text-sm mb-4">All transactions are secure and encrypted.</p>
                  
                  {/* Mock Credit Card Form */}
                  <div className="bg-surface border border-border rounded p-6 space-y-4">
                    <input type="text" required placeholder="Card number" className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                    <input type="text" required placeholder="Name on card" className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" required placeholder="Expiration date (MM / YY)" className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                      <input type="text" required placeholder="Security code" className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button type="submit" size="lg" className="flex-1">Pay Now</Button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-24"
              >
                {/* Animated checkmark */}
                <motion.svg 
                  className="w-24 h-24 text-accent-primary mb-8"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <motion.circle 
                    cx="25" cy="25" r="22" 
                    stroke="currentColor" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.path 
                    d="M15 25l7 7 13-13" 
                    stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  />
                </motion.svg>
                
                <h1 className="font-display text-4xl text-text-primary uppercase mb-4">Order Confirmed</h1>
                <p className="text-text-muted max-w-md mx-auto mb-8">
                  Your armor is being prepared. We've emailed you a receipt and tracking information will follow shortly.
                </p>
                <Link to="/">
                  <Button size="lg">Return Home</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Order Summary (hidden on confirmation) */}
        {step !== 3 && (
          <div className="w-full lg:w-[400px]">
            <div className="bg-surface-elevated border border-border rounded p-6 sticky top-6">
              <h3 className="font-display text-xl uppercase text-text-primary mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-16 bg-surface border border-border rounded relative shrink-0">
                      <img src={item.product.images?.[0]} alt="" className="w-full h-full object-cover mix-blend-screen opacity-90" />
                      <span className="absolute -top-2 -right-2 bg-text-muted text-background text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-display uppercase text-text-primary truncate">{item.product.name}</p>
                      <p className="text-text-muted font-body">Size {item.selectedSize}</p>
                    </div>
                    <span className="text-text-primary font-display">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 space-y-2 font-body text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-display text-lg text-text-primary uppercase">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
