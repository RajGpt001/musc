import React from 'react';
import { useCartStore } from '../store/cartStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-[calc(100vh-10rem)]">
        <h1 className="font-display text-5xl lg:text-7xl uppercase text-text-primary mb-12">Your Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="font-display text-3xl uppercase text-text-primary mb-4">Cart is Empty</h2>
            <p className="text-text-muted mb-8 max-w-md">You haven't added any gear to your cart yet. Gear up for your next session.</p>
            <Link to="/shop"><Button size="lg">Explore Gear</Button></Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            {/* Items List */}
            <div className="flex-1 space-y-8">
              {items.map((item, index) => {
                const colorObj = item.product.colors.find(c => c.id === item.selectedColor);
                return (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex gap-6 pb-8 border-b border-border">
                    <Link to={`/product/${item.product.id}`} className="w-32 h-32 md:w-48 md:h-48 bg-surface rounded border border-border shrink-0">
                      <img src={item.product.images?.[0]} alt={item.product.name} className="w-full h-full object-cover mix-blend-screen opacity-90" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display text-xl md:text-2xl text-text-primary uppercase tracking-wide mb-1">
                            <Link to={`/product/${item.product.id}`} className="hover:text-accent-primary transition-colors">{item.product.name}</Link>
                          </h3>
                          <div className="text-text-muted font-body text-sm flex items-center gap-2 mb-4">
                            <span>{colorObj?.name}</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span>Size {item.selectedSize}</span>
                          </div>
                        </div>
                        <span className="font-display text-xl text-text-primary">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-border rounded h-10 w-32">
                          <button 
                            onClick={() => item.quantity > 1 ? updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1) : removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                            className="flex-1 h-full text-text-muted hover:text-text-primary transition-colors"
                            aria-label="Decrease quantity"
                          >-</button>
                          <span className="font-body text-sm w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="flex-1 h-full text-text-muted hover:text-text-primary transition-colors"
                            aria-label="Increase quantity"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-text-muted hover:text-accent-secondary text-sm font-display uppercase tracking-widest transition-colors border-b border-transparent hover:border-accent-secondary"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Order Summary Sidebar */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-surface-elevated border border-border rounded p-8 lg:sticky lg:top-28">
                <h2 className="font-display text-2xl uppercase tracking-widest text-text-primary mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8 font-body text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="h-px w-full bg-border my-4" />
                  <div className="flex justify-between font-display text-xl text-text-primary uppercase tracking-widest">
                    <span>Estimated Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-display text-xs text-text-muted uppercase tracking-widest mb-2">Promo Code</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="ENTER CODE" 
                      className="flex-1 bg-surface border border-border text-text-primary font-body text-sm px-4 h-12 rounded focus:outline-none focus:border-accent-primary"
                    />
                    <Button variant="outline" className="h-12">Apply</Button>
                  </div>
                </div>

                <Button onClick={() => navigate('/checkout')} size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
