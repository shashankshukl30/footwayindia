'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/customer-store';

export default function RegisterPage() {
  const router = useRouter();
  const { register, customer, isLoading } = useCustomerStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) router.replace('/account');
  }, [customer, router]);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 5) {
      setError('Password must be at least 5 characters');
      return;
    }
    const result = await register(form.firstName, form.lastName, form.email, form.password);
    if (result.error) setError(result.error);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="divider-gold" />
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-1">
              Join Us
            </p>
            <h1 className="font-display font-bold uppercase text-3xl tracking-tight text-brand-text">
              Create Account
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={set('firstName')}
                required
                autoComplete="given-name"
                className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
                placeholder="Arjun"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={set('lastName')}
                required
                autoComplete="family-name"
                className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
                placeholder="Sharma"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              required
              autoComplete="email"
              className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              required
              autoComplete="new-password"
              className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
              placeholder="At least 5 characters"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              required
              autoComplete="new-password"
              className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-text text-white py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>

          <p className="text-center text-brand-text-muted text-sm pt-2">
            Already have an account?{' '}
            <Link href="/account/login" className="text-brand-text hover:text-brand-gold transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
