import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getProducts, formatPrice } from '@/lib/shopify';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductActions } from '@/components/product/product-actions';
import { UrgencyBadge } from '@/components/product/urgency-badge';
import { ProductCard } from '@/components/product/product-card';
import { WishlistButton } from '@/components/product/wishlist-button';
import { Truck, RotateCcw, Lock } from 'lucide-react';

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

  const images   = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const minInventory = variants.length > 0
    ? Math.min(...variants.map((v) => v.quantityAvailable ?? 0))
    : 0;

  // Related products — fetch by first tag, exclude self
  const relatedRaw = product.tags?.[0]
    ? await getProducts({ first: 5, query: product.tags[0] })
    : await getProducts({ first: 5 });
  const related = relatedRaw.filter((p) => p.handle !== handle).slice(0, 4);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Gallery */}
          <ProductGallery
            images={images.length > 0 ? images : (product.featuredImage ? [product.featuredImage] : [])}
            title={product.title}
          />

          {/* Right: Info + Actions */}
          <div>
            {/* Breadcrumb */}
            <nav className="text-brand-text-muted text-[10px] uppercase tracking-[0.2em] mb-5" aria-label="Breadcrumb">
              <span>Home</span>
              <span className="mx-2 text-brand-border">›</span>
              <span className="text-brand-text">{product.title}</span>
            </nav>

            {/* Title + Wishlist */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="font-display font-bold uppercase text-3xl leading-tight text-brand-text tracking-tight">
                {product.title}
              </h1>
              <WishlistButton handle={product.handle} />
            </div>

            {/* Rating — terracotta dots */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1" aria-label="4.8 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                ))}
              </div>
              <span className="text-brand-text-muted text-xs tracking-wide">4.8 (127 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-brand-text text-2xl font-bold">
                {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
              </span>
              {product.compareAtPriceRange?.minVariantPrice && (
                <span className="text-brand-text-muted text-lg line-through font-light">
                  {formatPrice(product.compareAtPriceRange.minVariantPrice.amount, product.compareAtPriceRange.minVariantPrice.currencyCode)}
                </span>
              )}
            </div>

            {/* Urgency badge */}
            <UrgencyBadge inventoryCount={minInventory} />

            {/* Product actions */}
            <ProductActions product={product} />

            {/* Description */}
            <div className="mt-8 pt-8 border-t border-brand-border">
              <h2 className="text-brand-text text-sm font-medium uppercase tracking-[0.15em] mb-4">About this product</h2>
              <div
                className="text-brand-text-secondary text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>

            {/* Trust row */}
            <div className="mt-8 pt-6 border-t border-brand-border grid grid-cols-3 gap-4">
              {[
                { Icon: Truck,      text: 'Free Shipping ₹999+' },
                { Icon: RotateCcw,  text: '30-Day Returns' },
                { Icon: Lock,       text: 'Secure Checkout' },
              ].map(({ Icon, text }) => (
                <div key={text} className="text-center">
                  <Icon size={18} className="text-brand-gold mx-auto mb-2" aria-hidden="true" />
                  <p className="text-brand-text-muted text-[10px] tracking-[0.1em] uppercase">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-brand-border">
          <div className="flex items-center gap-4 mb-10">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
