'use client';

import Link from 'next/link';
import { useRecentlyViewedStore } from '@/lib/recently-viewed-store';
import { formatPrice } from '@/lib/shopify';

interface Props {
  excludeHandle?: string;
}

export function RecentlyViewedSection({ excludeHandle }: Props) {
  const items = useRecentlyViewedStore((s) => s.items).filter(
    (i) => i.handle !== excludeHandle
  );

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-brand-border">
      <div className="flex items-center gap-4 mb-8">
        <span className="divider-gold" />
        <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
          Recently Viewed
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <Link
            key={item.handle}
            href={`/products/${item.handle}`}
            className="group flex-shrink-0 w-40 sm:w-48"
          >
            <div className="aspect-[4/5] bg-brand-surface overflow-hidden mb-3">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-brand-text-muted text-[9px] uppercase tracking-widest">No image</span>
                </div>
              )}
            </div>
            <p className="text-brand-text-muted text-[9px] uppercase tracking-[0.15em] mb-0.5">
              {item.vendor ?? 'Footway India'}
            </p>
            <p className="text-brand-text text-xs font-light leading-snug mb-1 group-hover:text-brand-gold transition-colors duration-200 line-clamp-2">
              {item.title}
            </p>
            <p className="text-brand-text text-sm font-medium">
              {formatPrice(item.price, item.currencyCode)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
