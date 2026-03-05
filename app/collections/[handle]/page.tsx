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

  const products = collection?.products.edges.map((e) => e.node) ?? [];

  const title = collection?.title ?? handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = collection?.description;

  return (
    <>
      {/* Collection header */}
      <div className="border-b border-brand-border py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-5 h-px bg-brand-gold" />
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
            Collection
          </p>
          <span className="w-5 h-px bg-brand-gold" />
        </div>
        <h1 className="font-display font-bold uppercase tracking-tight text-brand-text"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}>
          {title}
        </h1>
        {description && (
          <p className="text-brand-text-muted text-sm mt-3 max-w-lg mx-auto font-light">
            {description}
          </p>
        )}
      </div>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-brand-text-muted text-[11px] tracking-[0.3em] uppercase">
              Products coming soon
            </p>
          </div>
        ) : (
          <>
            <p className="text-brand-text-muted text-[11px] tracking-[0.2em] uppercase mb-10">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
