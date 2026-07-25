import { create } from 'zustand';
import type { Product } from '../data/types';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  get totalItems(): number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => 
      i.product.id === newItem.product.id && 
      i.selectedSize === newItem.selectedSize && 
      i.selectedColor === newItem.selectedColor
    );
    if (existing) {
      return {
        items: state.items.map(i => 
          i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i
        )
      };
    }
    return { items: [...state.items, newItem] };
  }),
  removeItem: (productId, size, color) => set((state) => ({
    items: state.items.filter(i => 
      !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
    )
  })),
  updateQuantity: (productId, size, color, quantity) => set((state) => {
    if (quantity < 1) return state; // Don't allow less than 1, use remove instead
    return {
      items: state.items.map(i => 
        (i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
          ? { ...i, quantity }
          : i
      )
    };
  }),
  clearCart: () => set({ items: [] }),
  get totalItems() {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));
