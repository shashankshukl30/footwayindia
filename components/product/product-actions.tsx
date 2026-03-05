'use client';

import { useState } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import type { Product, ProductVariant } from '@/lib/shopify/types';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variants.length === 1 ? variants[0]!.id : null
  );
  const { addItem, isLoading } = useCartStore();

  const selectedVariant: ProductVariant | null =
    variants.find((v) => v.id === selectedVariantId) ?? null;

  const sizeOption = product.options.find(
    (o) => o.name.toLowerCase() === 'size'
  );

  async function handleAddToCart() {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id);
  }

  return (
    <div className="space-y-5">
      {/* Size selector */}
      {sizeOption && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-brand-text text-sm font-semibold uppercase tracking-wide">
              Size
            </h3>
            {selectedVariant && (
              <span className="text-brand-text-muted text-xs">
                Selected: {selectedVariant.selectedOptions.find(o => o.name.toLowerCase() === 'size')?.value}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const sizeValue = variant.selectedOptions.find(
                (o) => o.name.toLowerCase() === 'size'
              )?.value ?? variant.title;
              const isSelected = selectedVariantId === variant.id;
              const isAvailable = variant.availableForSale;

              return (
                <button
                  key={variant.id}
                  onClick={() => isAvailable && setSelectedVariantId(variant.id)}
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  aria-label={`Size ${sizeValue}${!isAvailable ? ' — out of stock' : ''}`}
                  className={`
                    min-w-[3rem] px-3 py-2 text-sm font-medium border transition-all duration-200
                    ${isSelected
                      ? 'border-brand-gold bg-brand-gold text-brand-bg'
                      : isAvailable
                        ? 'border-brand-border text-brand-text-secondary hover:border-brand-gold hover:text-brand-gold'
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

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant || isLoading || !selectedVariant?.availableForSale}
        aria-label="Add to cart"
        className={`
          w-full py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3
          transition-all duration-200
          ${selectedVariant && selectedVariant.availableForSale && !isLoading
            ? 'bg-brand-gold text-brand-bg hover:bg-brand-gold-light cursor-pointer'
            : 'bg-brand-border text-brand-text-muted cursor-not-allowed'
          }
        `}
      >
        {isLoading ? (
          <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Adding...</>
        ) : !selectedVariant ? (
          'Select a Size'
        ) : !selectedVariant.availableForSale ? (
          'Out of Stock'
        ) : (
          <><ShoppingBag size={18} aria-hidden="true" /> Add to Cart</>
        )}
      </button>
    </div>
  );
}
