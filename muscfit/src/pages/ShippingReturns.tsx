import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';

const ShippingReturns: React.FC = () => {
  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-6 lg:px-12 max-w-[800px] mx-auto min-h-screen">
        <h1 className="font-display text-5xl lg:text-7xl uppercase text-text-primary mb-12">Shipping & Returns</h1>
        
        <div className="space-y-16 text-text-muted font-body leading-relaxed">
          
          <section>
            <h2 className="font-display text-3xl uppercase text-text-primary mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-accent-primary" /> Shipping Policy
            </h2>
            <div className="space-y-6">
              <p>We process all orders within 24 hours of placement during business days. Orders placed on weekends or holidays will be processed the next business day.</p>
              <div className="bg-surface border border-border rounded p-6">
                <h3 className="font-display text-xl uppercase text-text-primary mb-4">Domestic Rates (US)</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Standard (3-5 Business Days)</span>
                    <span className="text-text-primary font-bold">Free over ₹100</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Expedited (2 Business Days)</span>
                    <span className="text-text-primary font-bold">₹15.00</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span>Overnight (1 Business Day)</span>
                    <span className="text-text-primary font-bold">₹35.00</span>
                  </li>
                </ul>
              </div>
              <p>International shipping is calculated at checkout based on weight and destination. All customs and import duties are pre-calculated and paid at checkout to ensure seamless delivery.</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl uppercase text-text-primary mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-accent-primary" /> Return Policy
            </h2>
            <div className="space-y-6">
              <p>Your satisfaction is our baseline. If your gear doesn't perform to your standards, we offer a <span className="text-text-primary font-bold">30-day return window</span> from the date of delivery.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Items must be unworn and unwashed.</li>
                <li>All original tags must still be attached.</li>
                <li>Final Sale items cannot be returned or exchanged.</li>
              </ul>
              <div className="bg-surface border border-border rounded p-6 mt-6">
                <h3 className="font-display text-xl uppercase text-text-primary mb-2">How to start a return</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Visit our <a href="#" className="text-accent-primary hover:underline">Returns Portal</a>.</li>
                  <li>Enter your order number and zip code.</li>
                  <li>Select the items you wish to return and instantly print your prepaid shipping label.</li>
                </ol>
                <p className="text-sm mt-4 italic">*A flat ₹6.00 processing fee will be deducted from your refund for the return label.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
};

export default ShippingReturns;
