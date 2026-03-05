import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct } from '@/lib/shopify';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductActions } from '@/components/product/product-actions';
import { UrgencyBadge } from '@/components/product/urgency-badge';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const minInventory = Math.min(...variants.map((v) => v.quantityAvailable ?? 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left: Gallery */}
        <ProductGallery images={images.length > 0 ? images : (product.featuredImage ? [product.featuredImage] : [])} title={product.title} />

        {/* Right: Info + Actions */}
        <div>
          {/* Breadcrumb */}
          <nav className="text-brand-text-muted text-xs uppercase tracking-wide mb-4" aria-label="Breadcrumb">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>{product.title}</span>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-3xl font-bold text-brand-text mb-2">
            {product.title}
          </h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-brand-gold text-sm">★★★★★</span>
            <span className="text-brand-text-muted text-sm">4.8 (127 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-gold text-2xl font-bold">
              {(() => {
                const p = product.priceRange.minVariantPrice;
                const num = parseFloat(p.amount);
                return `₹${num.toLocaleString('en-IN')}`;
              })()}
            </span>
            {product.compareAtPriceRange?.minVariantPrice && (
              <span className="text-brand-text-muted text-lg line-through">
                {(() => {
                  const cp = product.compareAtPriceRange.minVariantPrice;
                  const num = parseFloat(cp.amount);
                  return `₹${num.toLocaleString('en-IN')}`;
                })()}
              </span>
            )}
          </div>

          {/* Urgency badge */}
          <UrgencyBadge inventoryCount={minInventory} />

          {/* Product actions (size selector + add to cart) */}
          <ProductActions product={product} />

          {/* Description */}
          <div className="mt-8 pt-8 border-t border-brand-border">
            <h2 className="text-brand-text font-semibold mb-3">About this product</h2>
            <div
              className="text-brand-text-secondary text-sm leading-relaxed prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>

          {/* Trust row */}
          <div className="mt-8 pt-6 border-t border-brand-border grid grid-cols-3 gap-4">
            {[
              { icon: '🚚', text: 'Free Shipping ₹999+' },
              { icon: '↩️', text: '30-Day Returns' },
              { icon: '🔒', text: 'Secure Checkout' },
            ].map(({ icon, text }) => (
              <div key={text} className="text-center">
                <p className="text-lg mb-1">{icon}</p>
                <p className="text-brand-text-muted text-xs">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
