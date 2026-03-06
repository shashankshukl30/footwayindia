'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Package, User } from 'lucide-react';
import { useCustomerStore } from '@/lib/customer-store';
import { formatPrice } from '@/lib/shopify';

function statusColor(status: string) {
  const s = status.toUpperCase();
  if (s === 'PAID' || s === 'FULFILLED') return 'text-green-700 bg-green-50 border-green-200';
  if (s === 'PENDING' || s === 'UNFULFILLED') return 'text-amber-700 bg-amber-50 border-amber-200';
  if (s === 'REFUNDED' || s === 'VOIDED') return 'text-gray-600 bg-gray-50 border-gray-200';
  return 'text-brand-text-muted bg-brand-surface border-brand-border';
}

export default function AccountPage() {
  const router = useRouter();
  const { customer, accessToken, isLoading, logout, fetchCustomer } = useCustomerStore();

  useEffect(() => {
    if (!accessToken) {
      router.replace('/account/login');
      return;
    }
    if (!customer) fetchCustomer();
  }, [accessToken, customer, fetchCustomer, router]);

  if (!accessToken) return null;

  if (isLoading || !customer) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brand-surface rounded w-48" />
          <div className="h-4 bg-brand-surface rounded w-64" />
          <div className="h-48 bg-brand-surface rounded" />
        </div>
      </div>
    );
  }

  const orders = customer.orders.edges.map((e) => e.node);
  const displayName = [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-4">
          <span className="divider-gold" />
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-1">
              My Account
            </p>
            <h1 className="font-display font-bold uppercase text-3xl tracking-tight text-brand-text">
              {displayName}
            </h1>
          </div>
        </div>
        <button
          onClick={() => logout().then(() => router.push('/'))}
          className="flex items-center gap-2 text-brand-text-muted text-xs hover:text-brand-error transition-colors tracking-wide"
        >
          <LogOut size={14} aria-hidden="true" />
          Sign out
        </button>
      </div>

      {/* Profile card */}
      <div className="border border-brand-border p-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-text text-white flex items-center justify-center text-lg font-medium flex-shrink-0">
          {(customer.firstName?.[0] ?? customer.email[0]).toUpperCase()}
        </div>
        <div>
          <p className="text-brand-text font-medium">{displayName}</p>
          <p className="text-brand-text-muted text-sm">{customer.email}</p>
          {customer.phone && <p className="text-brand-text-muted text-sm">{customer.phone}</p>}
        </div>
        <div className="ml-auto flex items-center gap-1 text-brand-text-muted text-xs">
          <User size={12} aria-hidden="true" />
          <span>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Orders */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Package size={16} className="text-brand-gold" aria-hidden="true" />
          <h2 className="text-brand-text text-sm font-medium uppercase tracking-[0.15em]">Order History</h2>
        </div>

        {orders.length === 0 ? (
          <div className="border border-brand-border p-12 text-center">
            <Package size={32} strokeWidth={1} className="text-brand-border mx-auto mb-3" aria-hidden="true" />
            <p className="text-brand-text-muted text-sm mb-4">No orders yet.</p>
            <Link
              href="/search"
              className="inline-block bg-brand-text text-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-border border border-brand-border">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${encodeURIComponent(order.id)}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-surface transition-colors group"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-brand-text text-sm font-medium">#{order.orderNumber}</p>
                    <p className="text-brand-text-muted text-xs mt-0.5">
                      {new Date(order.processedAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-semibold px-2 py-1 border uppercase tracking-[0.1em] ${statusColor(order.financialStatus)}`}>
                      {order.financialStatus}
                    </span>
                    <span className={`text-[9px] font-semibold px-2 py-1 border uppercase tracking-[0.1em] ${statusColor(order.fulfillmentStatus)}`}>
                      {order.fulfillmentStatus}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-brand-text font-medium text-sm">
                    {formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
                  </span>
                  <span className="text-brand-text-muted group-hover:text-brand-text transition-colors">›</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
