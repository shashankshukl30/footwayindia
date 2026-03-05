import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/product-card';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search all Footway India products',
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const products = await getProducts({
    first: 24,
    query: query || undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-8">
        <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">
          {query ? 'Search Results' : 'All Products'}
        </p>
        <h1 className="font-serif text-3xl font-bold text-brand-text">
          {query ? `Results for "${query}"` : 'Browse All Products'}
        </h1>
      </div>

      {/* Search form */}
      <form method="GET" className="mb-10">
        <div className="flex gap-3 max-w-lg">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search sneakers, boots, sandals..."
            className="flex-1 bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-text-muted px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="bg-brand-gold text-brand-bg px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-brand-gold-light transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-brand-text-muted text-lg mb-4">
            {query ? `No results found for &quot;${query}&quot;` : 'No products available yet.'}
          </p>
          {query && (
            <a href="/search" className="text-brand-gold hover:text-brand-gold-light text-sm underline">
              Clear search
            </a>
          )}
        </div>
      ) : (
        <>
          <p className="text-brand-text-muted text-sm mb-6">
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
