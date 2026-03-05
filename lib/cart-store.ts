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

async function cartFetch(body: Record<string, unknown>): Promise<Cart> {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error ?? `Cart API error: ${res.status}`);
  }
  const { cart } = await res.json();
  if (!cart) throw new Error('Cart API returned empty cart');
  return cart;
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
        const { cartId } = get();
        set({ isLoading: true });
        try {
          const body = cartId
            ? { action: 'add', cartId, lines: [{ merchandiseId, quantity }] }
            : { action: 'create', lines: [{ merchandiseId, quantity }] };
          const cart = await cartFetch(body);
          set({ cart, cartId: cart.id, isOpen: true });
        } catch (err) {
          console.error('addItem failed:', err);
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        const { cartId } = get();
        if (!cartId) return; // Guard BEFORE setting isLoading
        set({ isLoading: true });
        try {
          const cart = await cartFetch({ action: 'update', cartId, lineId, quantity });
          set({ cart });
        } catch (err) {
          console.error('updateItem failed:', err);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId) => {
        const { cartId } = get();
        if (!cartId) return; // Guard BEFORE setting isLoading
        set({ isLoading: true });
        try {
          const cart = await cartFetch({ action: 'remove', cartId, lineIds: [lineId] });
          set({ cart });
        } catch (err) {
          console.error('removeItem failed:', err);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'footway-cart',
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);
