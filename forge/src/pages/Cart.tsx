import React from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12 lg:px-24 pb-24">
      <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-text-primary mb-12">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border-t border-border">
          <p className="font-body text-lg text-text-muted mb-8">Your cart is completely empty.</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* Main Items Column */}
          <div className="flex-1 w-full">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border font-body text-xs uppercase tracking-widest text-text-muted">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="divide-y divide-border">
              {cartItems.map((item) => (
                <div key={item.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="w-24 h-32 md:w-32 md:h-40 bg-surface rounded-sm flex items-center justify-center relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundColor: item.colorHex }} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-display text-lg tracking-wider text-text-primary uppercase mb-2">{item.name}</h3>
                      <p className="font-body text-sm text-text-muted mb-1">Color: <span className="text-text-primary">{item.colorName}</span></p>
                      <p className="font-body text-sm text-text-muted mb-4">Size: <span className="text-text-primary">{item.size}</span></p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-text-muted hover:text-accent-secondary text-xs uppercase tracking-widest font-body w-fit transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                    <div className="flex items-center border border-border rounded-sm h-12">
                      <button className="w-12 h-full flex items-center justify-center text-text-muted hover:text-text-primary transition-colors" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="w-12 text-center font-body text-sm text-text-primary">{item.quantity}</span>
                      <button className="w-12 h-full flex items-center justify-center text-text-muted hover:text-text-primary transition-colors" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>

                  {/* Price Total */}
                  <div className="col-span-1 md:col-span-3 text-left md:text-right">
                    <span className="font-body font-medium text-lg text-text-primary">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-surface-elevated p-8 sticky top-32">
              <h2 className="font-display text-xl uppercase tracking-widest text-text-primary mb-6 border-b border-border pb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4 font-body text-sm mb-6">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span className="text-text-primary">${subtotal}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span className="text-text-primary">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Taxes</span>
                  <span className="text-text-primary">Calculated at next step</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-border pt-6 mb-8">
                <span className="font-display uppercase tracking-widest text-text-primary">Estimated Total</span>
                <span className="font-display text-xl text-text-primary">${subtotal}</span>
              </div>

              <div className="mb-8">
                <label className="block font-body text-xs text-text-muted uppercase tracking-widest mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER CODE" 
                    className="w-full bg-background border border-border px-4 py-3 text-sm text-text-primary uppercase tracking-widest outline-none focus:border-accent-primary transition-colors"
                  />
                  <Button variant="outline" size="sm" className="px-6">Apply</Button>
                </div>
              </div>

              <Button fullWidth onClick={() => navigate('/checkout')}>Proceed To Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
