'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/lib/customer-store';

export default function LoginPage() {
  const router = useRouter();
  const { login, customer, isLoading } = useCustomerStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    if (customer) router.replace('/account');
  }, [customer, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.error) setError(result.error);
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setForgotLoading(true);
    try {
      const res = await fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'recover', email: forgotEmail }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setForgotSent(true);
    } finally {
      setForgotLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="divider-gold" />
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-1">
              Welcome Back
            </p>
            <h1 className="font-display font-bold uppercase text-3xl tracking-tight text-brand-text">
              {showForgot ? 'Reset Password' : 'Sign In'}
            </h1>
          </div>
        </div>

        {showForgot ? (
          forgotSent ? (
            <div className="border border-brand-border p-6 text-center">
              <p className="text-brand-text text-sm font-medium mb-2">Check your email</p>
              <p className="text-brand-text-muted text-sm mb-6">
                We sent a password reset link to <strong>{forgotEmail}</strong>.
              </p>
              <button
                onClick={() => { setShowForgot(false); setForgotSent(false); }}
                className="text-brand-gold text-sm hover:underline"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgot} className="space-y-4">
              <p className="text-brand-text-muted text-sm mb-6">
                Enter your email and we&#39;ll send you a reset link.
              </p>
              {error && (
                <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</p>
              )}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full bg-brand-text text-white py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 disabled:opacity-50"
              >
                {forgotLoading ? 'Sending…' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForgot(false); setError(''); }}
                className="w-full text-brand-text-muted text-sm hover:text-brand-text transition-colors py-2"
              >
                Back to sign in
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</p>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-brand-surface border border-brand-border text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setShowForgot(true); setError(''); setForgotEmail(email); }}
                className="text-brand-text-muted text-xs hover:text-brand-text transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-text text-white py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>

            <p className="text-center text-brand-text-muted text-sm pt-2">
              New to Footway India?{' '}
              <Link href="/account/register" className="text-brand-text hover:text-brand-gold transition-colors font-medium">
                Create account
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
