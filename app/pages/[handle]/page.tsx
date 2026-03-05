import type { Metadata } from 'next';

interface Props {
  params: Promise<{ handle: string }>;
}

const PAGE_TITLES: Record<string, string> = {
  'size-guide':  'Size Guide',
  'returns':     'Returns & Exchanges',
  'contact':     'Contact Us',
  'about':       'About Us',
  'privacy':     'Privacy Policy',
  'terms':       'Terms of Service',
  'shipping':    'Shipping Policy',
  'refund':      'Refund Policy',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const title = PAGE_TITLES[handle] ?? handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return { title };
}

export default async function StaticPage({ params }: Props) {
  const { handle } = await params;
  const title = PAGE_TITLES[handle] ?? handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* Page header */}
      <div className="border-b border-brand-border py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-5 h-px bg-brand-gold" />
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
            Footway India
          </p>
          <span className="w-5 h-px bg-brand-gold" />
        </div>
        <h1
          className="font-display font-bold uppercase tracking-tight text-brand-text"
          style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}
        >
          {title}
        </h1>
      </div>

      {/* Placeholder content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-brand-text-muted text-[11px] tracking-[0.3em] uppercase">
          Content coming soon
        </p>
      </div>
    </>
  );
}
