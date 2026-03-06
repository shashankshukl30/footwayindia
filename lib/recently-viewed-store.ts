'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecentProduct {
  handle: string;
  title: string;
  price: string;
  currencyCode: string;
  image: string | null;
  imageAlt: string | null;
  vendor: string | null;
}

interface RecentlyViewedStore {
  items: RecentProduct[];
  add(item: RecentProduct): void;
  clear(): void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      add(item) {
        const rest = get().items.filter((i) => i.handle !== item.handle);
        set({ items: [item, ...rest].slice(0, 8) });
      },
      clear: () => set({ items: [] }),
    }),
    { name: 'footway-recently-viewed' }
  )
);
