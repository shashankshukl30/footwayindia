import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCollection } from '@/lib/shopify';
import { ProductCard } from '@/components/product/product-card';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: collection.title,
    description: collection.description || `Shop our ${collection.title} collection at Footway India`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) notFound();

  const products = collection.products.edges.map((e) => e.node);

  return (
    <>
      {/* Collection header */}
      <div className="bg-brand-surface border-b border-brand-border py-12 px-4 text-center">
        <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">
          Collection
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-brand-text-muted text-sm mt-3 max-w-lg mx-auto">
            {collection.description}
          </p>
        )}
      </div>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-brand-text-muted text-lg">No products in this collection yet.</p>
          </div>
        ) : (
          <>
            <p className="text-brand-text-muted text-sm mb-8">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
