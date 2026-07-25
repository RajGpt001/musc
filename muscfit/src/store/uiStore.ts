import { create } from 'zustand';

interface UiState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  isCartDrawerOpen: boolean;
  toggleCartDrawer: () => void;
  isSizeGuideOpen: boolean;
  toggleSizeGuide: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  isCartDrawerOpen: false,
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  isSizeGuideOpen: false,
  toggleSizeGuide: () => set((state) => ({ isSizeGuideOpen: !state.isSizeGuideOpen })),
}));
