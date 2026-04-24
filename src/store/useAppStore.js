import { create } from 'zustand';

export const useAppStore = create((set) => ({
  user: null, // User object when logged in
  role: null, // 'admin', 'b2c', 'b2b'
  cart: [],
  
  // Auth actions
  login: (userData) => set({ user: userData, role: userData.role }),
  logout: () => set({ user: null, role: null, cart: [] }),
  
  // Cart actions
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(p => p.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(p => 
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(p => p.id !== productId)
  })),
  clearCart: () => set({ cart: [] }),
}));
