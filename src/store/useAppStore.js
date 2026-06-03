import { create } from 'zustand';
import { getUserTypeById } from '../constants/userTypes';

export const useAppStore = create((set, get) => ({
  user: null,
  role: null,
  cart: [],

  /** Perfil de la visita actual (no se guarda en el navegador) */
  userProfile: null,

  pendingContact: null,
  contactModal: null,
  /** 'business' | 'retail' cuando se muestra el popup de gracias */
  thankYouModal: null,

  login: (userData) => set({ user: userData, role: userData.role }),

  logout: () => set({ user: null, role: null, cart: [] }),

  setUserProfile: (typeId, intent = '') => {
    const type = getUserTypeById(typeId);
    if (!type) return;
    set({
      userProfile: {
        typeId: type.id,
        label: type.label,
        channel: type.channel,
        catalogSegment: type.catalogSegment,
        intent: intent.trim(),
        setAt: new Date().toISOString(),
      },
    });
  },

  updateProfileIntent: (intent) =>
    set((state) =>
      state.userProfile
        ? { userProfile: { ...state.userProfile, intent: intent.trim() } }
        : {},
    ),

  clearUserProfile: () =>
    set({ userProfile: null, pendingContact: null, contactModal: null }),

  setPendingContact: (payload) => set({ pendingContact: payload }),

  setContactModal: (modal) => set({ contactModal: modal }),

  showThankYouModal: (variant) => set({ thankYouModal: variant }),

  closeThankYouModal: () => set({ thankYouModal: null }),

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),
}));
