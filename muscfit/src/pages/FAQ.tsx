import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccordionItem } from '../components/ui/Accordion';

const faqData = [
  {
    title: "How does MuscFit sizing work?",
    content: "Our gear is engineered for an athletic fit. If you prefer a compressive, locked-in feel, order your standard size. For a slightly more relaxed fit during bulking seasons, we recommend sizing up. Refer to our detailed Size Guide on any product page for exact measurements."
  },
  {
    title: "What are your shipping timeframes?",
    content: "Domestic orders typically process within 24 hours and arrive in 2-4 business days via standard shipping. Expedited options are available at checkout. International shipping times vary by region but generally take 7-14 business days."
  },
  {
    title: "What is your return policy?",
    content: "We accept returns on all unworn, unwashed items with tags attached within 30 days of delivery. Just visit our Returns Portal to print a prepaid shipping label. Original shipping costs are non-refundable."
  },
  {
    title: "How should I wash my activewear?",
    content: "To maintain the integrity of our Apex Fabric Tech, machine wash cold with like colors inside out. Hang dry or tumble dry on the lowest heat setting. Never use fabric softeners or bleach, as they destroy the moisture-wicking properties of the garment."
  },
  {
    title: "Do you ship internationally?",
    content: "Yes, we ship globally. Customs duties and import taxes are calculated directly at checkout so there are no surprise fees when your gear arrives."
  },
  {
    title: "Can I cancel or modify my order?",
    content: "Our warehouse moves extremely fast. You have a 1-hour window after placing an order to cancel or modify it. After that, the order is locked in for processing."
  },
  {
    title: "What happens if an item is out of stock?",
    content: "We do limited drops to maintain high quality control. If an item is out of stock, sign up for email notifications on the product page. You will be the first to know when a restock occurs."
  },
  {
    title: "Do you offer military or first responder discounts?",
    content: "Absolutely. We offer a 15% discount for all active duty, veterans, and first responders. Please verify your status at checkout using our partner verification system."
  }
];

const FAQ: React.FC = () => {
  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-6 lg:px-12 max-w-[800px] mx-auto min-h-screen">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl lg:text-7xl uppercase text-text-primary mb-4">Frequently Asked Questions</h1>
          <p className="font-body text-text-muted text-lg">Everything you need to know about our gear, shipping, and policies.</p>
        </div>

        <div className="bg-surface-elevated border border-border rounded p-6 lg:p-8">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              title={faq.title}
              defaultOpen={index === 0}
            >
              <p className="font-body text-text-muted text-sm leading-relaxed pb-4">
                {faq.content}
              </p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default FAQ;
