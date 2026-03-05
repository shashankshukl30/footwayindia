'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart } from './shopify/types';

interface CartStore {
  cart: Cart | null;
  cartId: string | null;
  isOpen: boolean;
  isLoading: boolean;
  setCart: (cart: Cart) => void;
  setCartId: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  setLoading: (loading: boolean) => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      cartId: null,
      isOpen: false,
      isLoading: false,

      setCart: (cart) => set({ cart }),
      setCartId: (id) => set({ cartId: id }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setLoading: (loading) => set({ isLoading: loading }),

      addItem: async (merchandiseId, quantity = 1) => {
        set({ isLoading: true });
        const { cartId } = get();
        try {
          const body = cartId
            ? { action: 'add', cartId, lines: [{ merchandiseId, quantity }] }
            : { action: 'create', lines: [{ merchandiseId, quantity }] };

          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          const { cart } = await res.json();
          set({ cart, cartId: cart.id, isOpen: true });
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        set({ isLoading: true });
        const { cartId } = get();
        if (!cartId) return;
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update', cartId, lineId, quantity }),
          });
          const { cart } = await res.json();
          set({ cart });
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId) => {
        set({ isLoading: true });
        const { cartId } = get();
        if (!cartId) return;
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'remove', cartId, lineIds: [lineId] }),
          });
          const { cart } = await res.json();
          set({ cart });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'footway-cart',
      partialize: (state) => ({ cartId: state.cartId }), // Only persist cartId, not full cart
    }
  )
);
