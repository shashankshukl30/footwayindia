import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/product-card';
import { SearchForm } from '@/components/search/search-form';

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

      {/* Search + sort bar — client component (event handlers) */}
      <SearchForm query={query} sort={sort ?? ''} />

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
