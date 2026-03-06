'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Customer } from './shopify/types';

interface CustomerStore {
  customer: Customer | null;
  accessToken: string | null;
  isLoading: boolean;
  login(email: string, password: string): Promise<{ error?: string }>;
  register(firstName: string, lastName: string, email: string, password: string): Promise<{ error?: string }>;
  logout(): Promise<void>;
  fetchCustomer(): Promise<void>;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customer: null,
      accessToken: null,
      isLoading: false,

      async login(email, password) {
        set({ isLoading: true });
        try {
          const res = await fetch('/api/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password }),
          });
          const data = await res.json();
          if (!res.ok || data.error) {
            return { error: data.error ?? 'Login failed' };
          }
          set({ customer: data.customer, accessToken: data.accessToken });
          return {};
        } finally {
          set({ isLoading: false });
        }
      },

      async register(firstName, lastName, email, password) {
        set({ isLoading: true });
        try {
          const res = await fetch('/api/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', firstName, lastName, email, password }),
          });
          const data = await res.json();
          if (!res.ok || data.error) {
            return { error: data.error ?? 'Registration failed' };
          }
          set({ customer: data.customer, accessToken: data.accessToken });
          return {};
        } finally {
          set({ isLoading: false });
        }
      },

      async logout() {
        const { accessToken } = get();
        await fetch('/api/customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logout', accessToken }),
        });
        set({ customer: null, accessToken: null });
      },

      async fetchCustomer() {
        const { accessToken } = get();
        if (!accessToken) return;
        set({ isLoading: true });
        try {
          const res = await fetch('/api/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get', accessToken }),
          });
          const data = await res.json();
          set({ customer: data.customer ?? null });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'footway-customer',
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);
