'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/shopify';

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCartStore();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;
  const subtotal = cart?.cost.subtotalAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-brand-text" aria-hidden="true" />
                <h2 className="font-display font-bold uppercase tracking-wide text-brand-text text-lg">
                  Cart {totalQuantity > 0 && <span className="text-brand-gold">({totalQuantity})</span>}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-brand-text-muted hover:text-brand-text transition-colors"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            {totalQuantity === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag size={48} className="text-brand-border mb-4" aria-hidden="true" />
                <p className="font-display font-bold uppercase text-xl text-brand-text mb-2">Your cart is empty</p>
                <p className="text-brand-text-muted text-sm mb-8">Add items to get started.</p>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 bg-brand-text text-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300"
                >
                  Start Shopping <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <>
                {/* Line items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {lines.map((line) => {
                    const product = line.merchandise.product;
                    const image   = product.featuredImage;
                    const options = line.merchandise.selectedOptions
                      .filter((o) => o.value !== 'Default Title')
                      .map((o) => o.value)
                      .join(', ');

                    return (
                      <div key={line.id} className="flex gap-4">
                        {/* Image */}
                        <div className="w-20 h-20 bg-brand-surface flex-shrink-0 overflow-hidden">
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
                            onClick={closeCart}
                            className="text-brand-text text-sm font-medium hover:text-brand-gold transition-colors line-clamp-2"
                          >
                            {product.title}
                          </Link>
                          {options && <p className="text-brand-text-muted text-xs mt-0.5">{options}</p>}
                          <p className="text-brand-text font-semibold text-sm mt-1">
                            {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                          </p>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => line.quantity === 1 ? removeItem(line.id) : updateItem(line.id, line.quantity - 1)}
                              disabled={isLoading}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 border border-brand-border flex items-center justify-center text-brand-text-muted hover:border-brand-text hover:text-brand-text transition-colors disabled:opacity-50"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-brand-text text-sm w-5 text-center">{line.quantity}</span>
                            <button
                              onClick={() => updateItem(line.id, line.quantity + 1)}
                              disabled={isLoading}
                              aria-label="Increase quantity"
                              className="w-6 h-6 border border-brand-border flex items-center justify-center text-brand-text-muted hover:border-brand-text hover:text-brand-text transition-colors disabled:opacity-50"
                            >
                              <Plus size={10} />
                            </button>
                            <button
                              onClick={() => removeItem(line.id)}
                              disabled={isLoading}
                              aria-label="Remove item"
                              className="ml-1 text-brand-text-muted hover:text-brand-error transition-colors disabled:opacity-50"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-brand-border px-6 py-5 space-y-3 bg-brand-surface">
                  <div className="flex justify-between text-brand-text-secondary text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium text-brand-text">
                      {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '—'}
                    </span>
                  </div>
                  <p className="text-brand-text-muted text-[10px] tracking-[0.1em]">
                    Shipping & taxes calculated at checkout
                  </p>

                  {cart?.checkoutUrl && (
                    <a
                      href={cart.checkoutUrl}
                      className="w-full bg-brand-text text-white py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-gold transition-colors duration-300"
                    >
                      <ShoppingBag size={15} /> Checkout
                    </a>
                  )}
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="w-full border border-brand-border text-brand-text-muted py-3 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center justify-center hover:border-brand-text hover:text-brand-text transition-all duration-300"
                  >
                    View Full Cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
