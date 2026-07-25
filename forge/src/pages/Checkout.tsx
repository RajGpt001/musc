import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { cartItems, clearCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNext = () => setStep(2);
  
  const handlePlaceOrder = () => {
    setStep(3);
    clearCart(); // Empties cart on confirmation
  };

  const steps = [
    { num: 1, label: 'Shipping' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Confirmation' }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12 lg:px-24 pb-24">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-16 relative">
        <div className="flex justify-between items-center relative z-10">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-sm border-2 transition-colors duration-500 ${step >= s.num ? 'bg-accent-primary border-accent-primary text-black' : 'bg-surface border-border text-text-muted'}`}>
                {s.num}
              </div>
              <span className={`font-body text-xs uppercase tracking-widest ${step >= s.num ? 'text-text-primary' : 'text-text-muted'}`}>{s.label}</span>
            </div>
          ))}
        </div>
        {/* Connecting Line */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-border -z-0">
          <motion.div 
            className="h-full bg-accent-primary" 
            initial={{ width: '0%' }}
            animate={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-surface-elevated p-8 lg:p-12 border border-border relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 1: SHIPPING */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-2xl uppercase tracking-widest text-text-primary mb-8">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <input type="text" placeholder="FIRST NAME" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary" />
                <input type="text" placeholder="LAST NAME" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary" />
                <input type="text" placeholder="ADDRESS" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary md:col-span-2" />
                <input type="text" placeholder="CITY" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary" />
                <input type="text" placeholder="POSTAL CODE" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary" />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNext}>Continue to Payment</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-2xl uppercase tracking-widest text-text-primary mb-8">Payment Details</h2>
              <div className="space-y-6 mb-8">
                <div className="p-4 border border-accent-primary bg-background flex items-center justify-between">
                  <span className="font-body text-text-primary uppercase tracking-widest text-sm">Credit Card (Demo)</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-surface-elevated rounded-sm" />
                    <div className="w-8 h-5 bg-surface-elevated rounded-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="CARD NUMBER (MOCK)" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary md:col-span-2" />
                  <input type="text" placeholder="MM/YY" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary" />
                  <input type="text" placeholder="CVC" className="bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary" />
                </div>
              </div>
              
              <div className="border-t border-border pt-6 flex justify-between items-center mb-8">
                <span className="font-display uppercase tracking-widest text-text-primary">Total to pay</span>
                <span className="font-display text-2xl text-accent-primary">${subtotal}</span>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back to Shipping</Button>
                <Button onClick={handlePlaceOrder}>Place Order</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-24 h-24 rounded-full border-4 border-surface flex items-center justify-center mb-8 relative">
                <svg viewBox="0 0 50 50" className="w-12 h-12 text-accent-primary">
                  <motion.path
                    fill="none"
                    strokeWidth="4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l8 8 16-16"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  />
                </svg>
              </div>
              <h2 className="font-display text-3xl uppercase tracking-widest text-text-primary mb-4">Order Confirmed</h2>
              <p className="font-body text-text-muted mb-8 max-w-md mx-auto">
                Your order #FRG-{Math.floor(Math.random() * 100000)} has been successfully placed. You will receive an email confirmation shortly.
              </p>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
