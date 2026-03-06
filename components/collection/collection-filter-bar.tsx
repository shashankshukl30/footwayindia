'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/lib/shopify/types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest';
type PriceRange = 'all' | 'under-999' | '999-2999' | '3000-plus';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'newest',     label: 'Newest' },
];

const PRICE_OPTIONS: { value: PriceRange; label: string }[] = [
  { value: 'all',         label: 'All Prices' },
  { value: 'under-999',   label: 'Under ₹999' },
  { value: '999-2999',    label: '₹999 – ₹2,999' },
  { value: '3000-plus',   label: '₹3,000+' },
];

interface Props {
  products: Product[];
}

export function CollectionFilterBar({ products }: Props) {
  const [sort,       setSort]       = useState<SortKey>('featured');
  const [price,      setPrice]      = useState<PriceRange>('all');
  const [open,       setOpen]       = useState(false);

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    for (const p of products) {
      const sizeOpt = p.options.find((o) => o.name.toLowerCase() === 'size');
      if (sizeOpt) sizeOpt.values.forEach((v) => sizes.add(v));
    }
    return Array.from(sizes).sort();
  }, [products]);

  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      next.has(size) ? next.delete(size) : next.add(size);
      return next;
    });

  const filtered = useMemo(() => {
    let list = [...products];

    // Price filter
    if (price !== 'all') {
      list = list.filter((p) => {
        const amt = parseFloat(p.priceRange.minVariantPrice.amount);
        if (price === 'under-999')  return amt < 999;
        if (price === '999-2999')   return amt >= 999 && amt <= 2999;
        if (price === '3000-plus')  return amt >= 3000;
        return true;
      });
    }

    // Size filter
    if (selectedSizes.size > 0) {
      list = list.filter((p) => {
        const sizeOpt = p.options.find((o) => o.name.toLowerCase() === 'size');
        if (!sizeOpt) return false;
        return sizeOpt.values.some((v) => selectedSizes.has(v));
      });
    }

    // Sort
    if (sort === 'price-asc') {
      list.sort((a, b) =>
        parseFloat(a.priceRange.minVariantPrice.amount) -
        parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (sort === 'price-desc') {
      list.sort((a, b) =>
        parseFloat(b.priceRange.minVariantPrice.amount) -
        parseFloat(a.priceRange.minVariantPrice.amount)
      );
    }
    // 'featured' and 'newest' keep server order

    return list;
  }, [products, sort, price, selectedSizes]);

  const activeFilterCount =
    (price !== 'all' ? 1 : 0) + selectedSizes.size;

  const clearAll = () => {
    setSort('featured');
    setPrice('all');
    setSelectedSizes(new Set());
  };

  return (
    <>
      {/* Filter toolbar */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">

        {/* Left: count + clear */}
        <div className="flex items-center gap-4">
          <p className="text-brand-text-muted text-[11px] tracking-[0.2em] uppercase">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-[10px] text-brand-gold uppercase tracking-[0.15em] hover:text-brand-text transition-colors duration-200"
            >
              <X size={11} />
              Clear filters ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Right: filter toggle + sort */}
        <div className="flex items-center gap-3">
          {/* Filter panel toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 border text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-200 ${
              open || activeFilterCount > 0
                ? 'border-brand-text bg-brand-text text-white'
                : 'border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text'
            }`}
          >
            <SlidersHorizontal size={12} />
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>

          {/* Sort select */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-4 py-2 border border-brand-border bg-white text-brand-text-secondary text-[10px] font-medium uppercase tracking-[0.1em] focus:outline-none focus:border-brand-text hover:border-brand-text transition-colors duration-200 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expandable filter panel */}
      {open && (
        <div className="mb-8 p-6 border border-brand-border bg-brand-surface/50 grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Price range */}
          <div>
            <p className="text-brand-text text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">Price</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setPrice(o.value)}
                  className={`px-3 py-1.5 border text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                    price === o.value
                      ? 'border-brand-text bg-brand-text text-white'
                      : 'border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          {allSizes.length > 0 && (
            <div>
              <p className="text-brand-text text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">Size</p>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    aria-pressed={selectedSizes.has(size)}
                    className={`min-w-[2.5rem] px-3 py-1.5 border text-[10px] font-medium uppercase tracking-[0.1em] transition-all duration-200 ${
                      selectedSizes.has(size)
                        ? 'border-brand-text bg-brand-text text-white'
                        : 'border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-brand-text-muted text-[11px] tracking-[0.3em] uppercase mb-4">
            No products match your filters
          </p>
          <button
            onClick={clearAll}
            className="text-[10px] text-brand-gold uppercase tracking-[0.2em] hover:text-brand-text transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
