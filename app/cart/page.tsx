'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/shopify';

export default function CartPage() {
  const { cart, updateItem, removeItem, isLoading } = useCartStore();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;
  const subtotal = cart?.cost.subtotalAmount;

  if (totalQuantity === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="text-brand-text-muted mx-auto mb-6" aria-hidden="true" />
        <h1 className="font-serif text-3xl text-brand-text mb-4">Your cart is empty</h1>
        <p className="text-brand-text-muted mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-bg px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-brand-gold-light transition-colors"
        >
          Continue Shopping
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-brand-text mb-8">
        Shopping Cart ({totalQuantity} item{totalQuantity !== 1 ? 's' : ''})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Cart lines */}
        <div className="lg:col-span-2 space-y-4">
          {lines.map((line) => {
            const product = line.merchandise.product;
            const image = product.featuredImage;
            const options = line.merchandise.selectedOptions
              .filter((o) => o.value !== 'Default Title')
              .map((o) => `${o.name}: ${o.value}`)
              .join(', ');

            return (
              <div
                key={line.id}
                className="flex gap-4 bg-brand-surface border border-brand-border p-4"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-brand-elevated flex-shrink-0 overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.url}
                      alt={image.altText ?? product.title}
                      className="w-full h-full object-cover"
                    />
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
                  {options && (
                    <p className="text-brand-text-muted text-xs mt-1">{options}</p>
                  )}
                  <p className="text-brand-gold font-semibold text-sm mt-2">
                    {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                  </p>
                </div>

                {/* Qty + remove */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => removeItem(line.id)}
                    disabled={isLoading}
                    aria-label={`Remove ${product.title} from cart`}
                    className="text-brand-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                      disabled={isLoading}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 border border-brand-border text-brand-text-secondary hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <Minus size={12} aria-hidden="true" />
                    </button>
                    <span className="text-brand-text text-sm w-6 text-center" aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      aria-label="Increase quantity"
                      className="w-7 h-7 border border-brand-border text-brand-text-secondary hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <Plus size={12} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="bg-brand-surface border border-brand-border p-6 h-fit">
          <h2 className="font-serif text-xl font-semibold text-brand-text mb-6">
            Order Summary
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-brand-text-secondary text-sm">
              <span>Subtotal ({totalQuantity} items)</span>
              <span>{subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '—'}</span>
            </div>
            <div className="flex justify-between text-brand-text-secondary text-sm">
              <span>Shipping</span>
              <span className="text-brand-success">Free</span>
            </div>
          </div>
          <div className="flex justify-between text-brand-text font-semibold border-t border-brand-border pt-4 mb-6">
            <span>Total</span>
            <span className="text-brand-gold">
              {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '—'}
            </span>
          </div>

          {cart?.checkoutUrl && (
            <a
              href={cart.checkoutUrl}
              className="w-full bg-brand-gold text-brand-bg py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-gold-light transition-colors animate-pulse-gold"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              Proceed to Checkout
            </a>
          )}

          <div className="mt-4 flex justify-center gap-4">
            {['🔒 Secure', '↩️ 30-Day Returns', '🚚 Free Shipping'].map((badge) => (
              <span key={badge} className="text-brand-text-muted text-xs">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
