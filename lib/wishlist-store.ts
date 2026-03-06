'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[];                   // product handles
  toggle: (handle: string) => void;
  has:    (handle: string) => boolean;
  clear:  () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (handle) =>
        set((state) => ({
          items: state.items.includes(handle)
            ? state.items.filter((h) => h !== handle)
            : [...state.items, handle],
        })),

      has: (handle) => get().items.includes(handle),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'footway-wishlist',
    }
  )
);
