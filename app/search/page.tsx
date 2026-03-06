import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/product-card';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search all Footway India products',
};

interface Props {
  searchParams: Promise<{ q?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, sort } = await searchParams;
  const query = q?.trim() ?? '';

  let products = await getProducts({ first: 48, query: query || undefined });

  // Client-safe sort
  if (sort === 'price-asc')  products = [...products].sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
  if (sort === 'price-desc') products = [...products].sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="divider-gold" />
        <div>
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-1">
            {query ? 'Search Results' : 'All Products'}
          </p>
          <h1 className="font-display font-bold uppercase text-3xl tracking-tight text-brand-text">
            {query ? `"${query}"` : 'Browse All'}
          </h1>
        </div>
      </div>

      {/* Search + sort bar */}
      <form method="GET" className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="flex flex-1 gap-3 max-w-lg">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search sneakers, boots, sandals..."
            className="flex-1 bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-text-muted px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="bg-brand-text text-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 flex-shrink-0"
          >
            Search
          </button>
        </div>
        <select
          name="sort"
          defaultValue={sort ?? ''}
          onChange={(e) => {
            const form = e.currentTarget.closest('form') as HTMLFormElement;
            form?.requestSubmit?.();
          }}
          className="bg-brand-surface border border-brand-border text-brand-text-secondary text-sm px-4 py-3 focus:outline-none focus:border-brand-text transition-colors"
          aria-label="Sort products"
        >
          <option value="">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </form>

      {/* Results */}
      {products.length === 0 ? (
        <div className="text-center py-24 border border-brand-border">
          <p className="text-brand-text text-lg font-medium mb-2">
            {query ? `No results for "${query}"` : 'No products available yet.'}
          </p>
          <p className="text-brand-text-muted text-sm mb-6">Try a different search term or browse our collections.</p>
          {query && (
            <a href="/search" className="text-brand-gold hover:underline text-sm">Clear search</a>
          )}
        </div>
      ) : (
        <>
          <p className="text-brand-text-muted text-xs tracking-[0.15em] uppercase mb-6">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
