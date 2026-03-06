import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://footway-india.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/search`,              lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/collections/mens`,    lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/collections/womens`,  lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/collections/kids`,    lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/pages/about`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/pages/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/pages/size-guide`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/pages/shipping`,      lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/pages/returns`,       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/pages/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/pages/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({ first: 250 });
    productRoutes = products.map((p) => ({
      url: `${BASE}/products/${p.handle}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));
  } catch {
    // Shopify not connected yet — skip product routes
  }

  return [...staticRoutes, ...productRoutes];
}
