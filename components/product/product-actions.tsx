'use client';

import { useState, useRef } from 'react';
import { ShoppingBag, Loader2, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useCartStore } from '@/lib/cart-store';
import type { Product, ProductVariant } from '@/lib/shopify/types';
import { SizeGuideModal } from './size-guide-modal';
import { StickyAddToCart } from './sticky-add-to-cart';

interface ProductActionsProps {
  product: Product;
}

type BtnState = 'idle' | 'loading' | 'success' | 'error';

export function ProductActions({ product }: ProductActionsProps) {
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variants.length === 1 ? variants[0]!.id : null
  );
  const [btnState, setBtnState] = useState<BtnState>('idle');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem, openCart } = useCartStore();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const selectedVariant: ProductVariant | null =
    variants.find((v) => v.id === selectedVariantId) ?? null;

  const sizeOption = product.options.find(
    (o) => o.name.toLowerCase() === 'size'
  );

  async function handleAddToCart() {
    if (!selectedVariant) return;
    setBtnState('loading');
    try {
      await addItem(selectedVariant.id);
      setBtnState('success');
      toast.success(product.title, {
        description: 'Added to cart',
        action: { label: 'View Cart', onClick: openCart },
        duration: 3000,
      });
      setTimeout(() => setBtnState('idle'), 2000);
    } catch {
      setBtnState('error');
      setTimeout(() => setBtnState('idle'), 2000);
    }
  }

  const isDisabled =
    !selectedVariant ||
    btnState === 'loading' ||
    btnState === 'success' ||
    !selectedVariant?.availableForSale;

  const btnClass =
    (btnState as string) === 'success'
      ? 'bg-brand-success text-white cursor-default'
      : isDisabled
        ? 'bg-brand-surface text-brand-text-muted border border-brand-border cursor-not-allowed'
        : 'bg-brand-text text-white hover:bg-brand-gold cursor-pointer';

  return (
    <>
      <div className="space-y-5">
        {/* Size selector */}
        {sizeOption && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-brand-text text-[11px] font-semibold uppercase tracking-[0.2em]">Select Size</h3>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-[10px] text-brand-text-muted underline underline-offset-2 hover:text-brand-text transition-colors duration-200"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => {
                const sizeValue = variant.selectedOptions.find(
                  (o) => o.name.toLowerCase() === 'size'
                )?.value ?? variant.title;
                const isSelected  = selectedVariantId === variant.id;
                const isAvailable = variant.availableForSale;

                return (
                  <button
                    key={variant.id}
                    onClick={() => isAvailable && setSelectedVariantId(variant.id)}
                    disabled={!isAvailable}
                    aria-pressed={isSelected}
                    aria-label={`Size ${sizeValue}${!isAvailable ? ' — out of stock' : ''}`}
                    className={`
                      min-w-[3rem] px-3 py-2.5 text-sm font-medium border transition-all duration-200
                      ${isSelected
                        ? 'border-brand-text bg-brand-text text-white'
                        : isAvailable
                          ? 'border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text'
                          : 'border-brand-border text-brand-text-muted opacity-40 cursor-not-allowed line-through'
                      }
                    `}
                  >
                    {sizeValue}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isDisabled}
          aria-label="Add to cart"
          className={`w-full py-4 text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 ${btnClass}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {btnState === 'loading' && (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Adding...
              </motion.span>
            )}
            {btnState === 'success' && (
              <motion.span
                key="success"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Check size={16} aria-hidden="true" /> Added to Cart
              </motion.span>
            )}
            {btnState === 'error' && (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <AlertCircle size={16} aria-hidden="true" /> Try Again
              </motion.span>
            )}
            {btnState === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                {!selectedVariant ? (
                  'Select a Size'
                ) : !selectedVariant.availableForSale ? (
                  'Out of Stock'
                ) : (
                  <><ShoppingBag size={16} aria-hidden="true" /> Add to Cart</>
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Sentinel — StickyAddToCart watches this to know when native ATC scrolls away */}
      <div ref={sentinelRef} />

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <StickyAddToCart
        productTitle={product.title}
        variantId={selectedVariantId}
        availableForSale={selectedVariant?.availableForSale ?? false}
        selectedSize={
          selectedVariant?.selectedOptions.find((o) => o.name.toLowerCase() === 'size')?.value ?? null
        }
        triggerRef={sentinelRef}
      />
    </>
  );
}
