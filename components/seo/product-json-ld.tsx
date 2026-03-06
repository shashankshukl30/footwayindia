import type { Product } from '@/lib/shopify/types';

interface Props {
  product: Product;
  url: string;
}

export function ProductJsonLd({ product, url }: Props) {
  const price = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const inStock = product.variants.edges.some((e) => e.node.availableForSale);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    url,
    brand: {
      '@type': 'Brand',
      name: product.vendor ?? 'Footway India',
    },
    image: product.images.edges.map((e) => e.node.url),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: price.currencyCode,
      lowPrice: price.amount,
      highPrice: maxPrice.amount,
      offerCount: product.variants.edges.length,
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Footway India' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
