export function OrganizationJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://footway-india.vercel.app';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Footway India',
    url: base,
    logo: `${base}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${base}/pages/contact`,
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
