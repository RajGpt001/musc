import { create } from 'zustand';

export type CursorState = 'default' | 'drag' | 'view';
export type DeviceTier = 'full' | 'reduced' | 'static';

const getInitialDeviceTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'full';
  const width = window.innerWidth;
  // Use ts-ignore for deviceMemory as it's non-standard
  // @ts-ignore
  const memory = navigator.deviceMemory || 8; 
  const concurrency = navigator.hardwareConcurrency || 4;

  if (width < 480 || memory <= 4 || concurrency <= 2) return 'static';
  if (width < 1024 || memory < 8) return 'reduced';
  return 'full';
};

export interface CartItem {
  id: string; // unique combo of product ID + size + color
  productId: string;
  name: string;
  price: number;
  size: string;
  colorName: string;
  colorHex: string;
  quantity: number;
}

interface AppState {
  deviceTier: DeviceTier;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  activeProductColor: string;
  setActiveProductColor: (color: string) => void;
  activeProductSize: string;
  setActiveProductSize: (size: string) => void;
  isInspecting: boolean;
  setIsInspecting: (inspect: boolean) => void;
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  
  // Cart State
  cartItems: CartItem[];
  cartCount: number;
  cartBump: number;
  isCartDrawerOpen: boolean;
  
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  toggleCartDrawer: (open?: boolean) => void;
  
  flyingCartItem: { startX: number, startY: number, color: string } | null;
  setFlyingCartItem: (item: { startX: number, startY: number, color: string } | null) => void;
}

export const useStore = create<AppState>((set) => ({
  deviceTier: getInitialDeviceTier(),
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  activeProductColor: '',
  setActiveProductColor: (color) => set({ activeProductColor: color }),
  activeProductSize: '',
  setActiveProductSize: (size) => set({ activeProductSize: size }),
  isInspecting: false,
  setIsInspecting: (inspect) => set({ isInspecting: inspect }),
  cursorState: 'default',
  setCursorState: (state) => set({ cursorState: state }),
  
  cartItems: [],
  cartCount: 0,
  cartBump: 0,
  isCartDrawerOpen: false,
  
  addToCart: (item) => set((state) => {
    const id = `${item.productId}-${item.size}-${item.colorName}`;
    const existingIndex = state.cartItems.findIndex(i => i.id === id);
    let newItems = [...state.cartItems];
    
    if (existingIndex >= 0) {
      newItems[existingIndex].quantity += 1;
    } else {
      newItems.push({ ...item, id, quantity: 1 });
    }
    
    return {
      cartItems: newItems,
      cartCount: state.cartCount + 1,
      cartBump: Date.now()
    };
  }),
  
  removeFromCart: (id) => set((state) => {
    const item = state.cartItems.find(i => i.id === id);
    if (!item) return state;
    return {
      cartItems: state.cartItems.filter(i => i.id !== id),
      cartCount: state.cartCount - item.quantity
    };
  }),
  
  updateQuantity: (id, amount) => set((state) => {
    const newItems = state.cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + amount);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    
    const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
    return { cartItems: newItems, cartCount: newCount };
  }),
  
  clearCart: () => set({ cartItems: [], cartCount: 0 }),
  
  toggleCartDrawer: (open) => set((state) => ({ 
    isCartDrawerOpen: open !== undefined ? open : !state.isCartDrawerOpen 
  })),

  flyingCartItem: null,
  setFlyingCartItem: (item) => set({ flyingCartItem: item })
}));
