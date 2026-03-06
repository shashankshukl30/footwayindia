'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, RotateCcw, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/shopify';

export default function CartPage() {
  const { cart, updateItem, removeItem, isLoading } = useCartStore();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;
  const subtotal = cart?.cost.subtotalAmount;
  const total = cart?.cost.totalAmount;

  if (totalQuantity === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={56} className="text-brand-border mx-auto mb-6" aria-hidden="true" />
        <h1 className="font-display font-bold uppercase text-3xl text-brand-text mb-3">Your Cart is Empty</h1>
        <p className="text-brand-text-muted mb-8 text-sm">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-brand-text text-white px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300"
        >
          Continue Shopping
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <span className="divider-gold" />
        <h1 className="font-display font-bold uppercase tracking-tight text-brand-text text-3xl">
          Cart ({totalQuantity} item{totalQuantity !== 1 ? 's' : ''})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Cart lines */}
        <div className="lg:col-span-2 space-y-3">
          {lines.map((line) => {
            const product = line.merchandise.product;
            const image = product.featuredImage;
            const options = line.merchandise.selectedOptions
              .filter((o) => o.value !== 'Default Title')
              .map((o) => `${o.name}: ${o.value}`)
              .join(', ');

            return (
              <div key={line.id} className="flex gap-4 bg-brand-surface border border-brand-border p-4">
                {/* Image */}
                <div className="w-24 h-24 bg-brand-elevated flex-shrink-0 overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.url} alt={image.altText ?? product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-elevated" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.handle}`}
                    className="text-brand-text font-medium hover:text-brand-gold transition-colors text-sm line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  {options && <p className="text-brand-text-muted text-xs mt-1">{options}</p>}
                  <p className="text-brand-text font-semibold text-sm mt-2">
                    {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                  </p>
                </div>

                {/* Qty + remove */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => removeItem(line.id)}
                    disabled={isLoading}
                    aria-label={`Remove ${product.title}`}
                    className="text-brand-text-muted hover:text-brand-error transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => line.quantity === 1 ? removeItem(line.id) : updateItem(line.id, line.quantity - 1)}
                      disabled={isLoading}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 border border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <Minus size={11} aria-hidden="true" />
                    </button>
                    <span className="text-brand-text text-sm w-6 text-center" aria-live="polite">{line.quantity}</span>
                    <button
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      aria-label="Increase quantity"
                      className="w-7 h-7 border border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <Plus size={11} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="bg-brand-surface border border-brand-border p-6 h-fit">
          <h2 className="font-display font-bold uppercase text-xl text-brand-text mb-6 tracking-wide">
            Order Summary
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-brand-text-secondary text-sm">
              <span>Subtotal ({totalQuantity} items)</span>
              <span>{subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '—'}</span>
            </div>
            <div className="flex justify-between text-brand-text-secondary text-sm">
              <span>Shipping</span>
              <span className="text-brand-success font-medium">Free</span>
            </div>
          </div>
          <div className="flex justify-between text-brand-text font-semibold border-t border-brand-border pt-4 mb-6">
            <span>Total</span>
            <span>{total ? formatPrice(total.amount, total.currencyCode) : '—'}</span>
          </div>

          {cart?.checkoutUrl && (
            <a
              href={cart.checkoutUrl}
              className="w-full bg-brand-text text-white py-4 text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-gold transition-colors duration-300"
            >
              <ShoppingBag size={16} aria-hidden="true" />
              Proceed to Checkout
            </a>
          )}

          <Link
            href="/search"
            className="w-full mt-3 border border-brand-border text-brand-text-muted py-3 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center justify-center hover:border-brand-text hover:text-brand-text transition-all duration-300"
          >
            Continue Shopping
          </Link>

          {/* Trust strip */}
          <div className="mt-6 pt-4 border-t border-brand-border grid grid-cols-3 gap-2 text-center">
            {[
              { Icon: Lock,      text: 'Secure' },
              { Icon: RotateCcw, text: '30-Day Returns' },
              { Icon: Truck,     text: 'Free Shipping' },
            ].map(({ Icon, text }) => (
              <div key={text}>
                <Icon size={14} className="text-brand-text-muted mx-auto mb-1" aria-hidden="true" />
                <p className="text-brand-text-muted text-[10px] tracking-[0.1em]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
