import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-6 lg:px-12 max-w-[1200px] mx-auto min-h-[calc(100vh-10rem)] flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Info */}
        <div className="flex-1">
          <h1 className="font-display text-5xl lg:text-7xl uppercase text-text-primary mb-6">Hit Us Up</h1>
          <p className="font-body text-text-muted text-lg mb-12 max-w-md">
            Got a question about sizing? Issues with an order? Or just want to talk training? Our support squad is on standby.
          </p>

          <div className="space-y-8 font-body">
            <div>
              <h3 className="font-display text-xl uppercase text-text-primary mb-2">Email Support</h3>
              <p className="text-text-muted">support@muscfit.com</p>
              <p className="text-text-muted text-sm mt-1">Average response time: 2 hours</p>
            </div>
            
            <div>
              <h3 className="font-display text-xl uppercase text-text-primary mb-2">Headquarters</h3>
              <p className="text-text-muted">123 Iron Avenue<br />Suite 400<br />Los Angeles, CA 90021</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="bg-surface-elevated border border-border rounded p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-display text-sm uppercase tracking-widest text-text-muted">Name *</label>
                    <input type="text" required className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-display text-sm uppercase tracking-widest text-text-muted">Email *</label>
                    <input type="email" required className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-display text-sm uppercase tracking-widest text-text-muted">Order Number (Optional)</label>
                  <input type="text" className="w-full bg-background border border-border text-text-primary px-4 h-12 rounded focus:outline-none focus:border-accent-primary transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="font-display text-sm uppercase tracking-widest text-text-muted">Message *</label>
                  <textarea required rows={5} className="w-full bg-background border border-border text-text-primary p-4 rounded focus:outline-none focus:border-accent-primary transition-colors resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  Send Transmission
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-accent-primary rounded p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl uppercase text-text-primary mb-4">Message Sent</h3>
                <p className="text-text-muted font-body mb-8">Our team has received your transmission. We will get back to you shortly.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">Send Another</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </PageWrapper>
  );
};

export default Contact;
