'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCustomerStore } from '@/lib/customer-store';
import { formatPrice } from '@/lib/shopify';

function statusColor(status: string) {
  const s = status.toUpperCase();
  if (s === 'PAID' || s === 'FULFILLED') return 'text-green-700 bg-green-50 border-green-200';
  if (s === 'PENDING' || s === 'UNFULFILLED') return 'text-amber-700 bg-amber-50 border-amber-200';
  if (s === 'REFUNDED' || s === 'VOIDED') return 'text-gray-600 bg-gray-50 border-gray-200';
  return 'text-brand-text-muted bg-brand-surface border-brand-border';
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { customer, accessToken, fetchCustomer } = useCustomerStore();

  useEffect(() => {
    if (!accessToken) {
      router.replace('/account/login');
      return;
    }
    if (!customer) {
      fetchCustomer();
    }
  }, [accessToken, customer, fetchCustomer, router]);

  const order = useMemo(() => {
    if (!customer) return null;
    const id = decodeURIComponent(params.id as string);
    return customer.orders.edges.find((e) => e.node.id === id)?.node ?? null;
  }, [customer, params.id]);

  if (!accessToken) return null;

  if (!customer || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-brand-surface rounded w-32" />
          <div className="h-48 bg-brand-surface rounded" />
        </div>
      </div>
    );
  }

  const lineItems = order.lineItems.edges.map((e) => e.node);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-brand-text-muted text-xs hover:text-brand-text transition-colors mb-8 tracking-wide"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Back to account
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="divider-gold" />
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-1">
              Order Detail
            </p>
            <h1 className="font-display font-bold uppercase text-2xl tracking-tight text-brand-text">
              #{order.orderNumber}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-[9px] font-semibold px-2 py-1 border uppercase tracking-[0.1em] ${statusColor(order.financialStatus)}`}>
            {order.financialStatus}
          </span>
          <span className={`text-[9px] font-semibold px-2 py-1 border uppercase tracking-[0.1em] ${statusColor(order.fulfillmentStatus)}`}>
            {order.fulfillmentStatus}
          </span>
        </div>
      </div>

      <p className="text-brand-text-muted text-xs mb-8">
        Placed on{' '}
        {new Date(order.processedAt).toLocaleDateString('en-IN', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>

      {/* Line items */}
      <div className="border border-brand-border divide-y divide-brand-border mb-6">
        {lineItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            {item.variant?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.variant.image.url}
                alt={item.variant.image.altText ?? item.title}
                className="w-16 h-16 object-cover flex-shrink-0 bg-brand-surface"
              />
            ) : (
              <div className="w-16 h-16 bg-brand-surface flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-brand-text text-sm font-medium leading-snug">{item.title}</p>
              <p className="text-brand-text-muted text-xs mt-0.5">Qty: {item.quantity}</p>
            </div>
            {item.variant?.price && (
              <p className="text-brand-text text-sm font-medium flex-shrink-0">
                {formatPrice(
                  String(parseFloat(item.variant.price.amount) * item.quantity),
                  item.variant.price.currencyCode
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border border-brand-border p-4 flex items-center justify-between">
        <span className="text-brand-text-muted text-xs uppercase tracking-[0.15em]">Order Total</span>
        <span className="text-brand-text text-lg font-bold">
          {formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
        </span>
      </div>
    </div>
  );
}
