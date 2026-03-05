import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
  description: 'Footway India 30-day returns and exchange policy.',
};

export default function ReturnsPage() {
  return (
    <>
      {/* Header */}
      <div className="border-b border-brand-border py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-5 h-px bg-brand-gold" />
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Footway India</p>
          <span className="w-5 h-px bg-brand-gold" />
        </div>
        <h1
          className="font-display font-bold uppercase tracking-tight text-brand-text mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}
        >
          Returns &amp; Exchanges
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          30-day hassle-free returns. No questions asked.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Policy overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-border">
          {[
            { n: '30', label: 'Day Window', body: 'Return or exchange any item within 30 days of delivery.' },
            { n: '₹0', label: 'Return Fee', body: 'We cover the cost of return shipping on eligible items.' },
            { n: '5–7', label: 'Day Refund', body: 'Refunds processed to your original payment method within 5–7 business days.' },
          ].map((s) => (
            <div key={s.label} className="bg-brand-bg text-center py-10 px-6">
              <p className="font-display font-bold text-brand-text leading-none mb-2"
                 style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
                {s.n}
              </p>
              <p className="text-brand-gold text-[10px] tracking-[0.3em] uppercase font-medium mb-3">{s.label}</p>
              <p className="text-brand-text-muted text-xs leading-relaxed font-light">{s.body}</p>
            </div>
          ))}
        </div>

        {/* How to return */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">How to Return</h2>
          </div>
          <div className="border border-brand-border p-8 md:p-10">
            <ol className="space-y-6">
              {[
                { n: '01', title: 'Email us within 30 days', body: 'Send your order number and reason to support@footwayindia.com. We\'ll reply with a prepaid return label within 24 hours.' },
                { n: '02', title: 'Pack the item securely', body: 'Place the item in its original box with all accessories included. Attach the return label provided.' },
                { n: '03', title: 'Drop it off', body: 'Hand the parcel to our designated courier partner (details shared via email). Keep the receipt.' },
                { n: '04', title: 'Receive your refund or exchange', body: 'Once we inspect the item (1–2 days after receipt), your refund is initiated or the replacement is dispatched.' },
              ].map((step) => (
                <li key={step.n} className="flex gap-5">
                  <span className="font-display font-bold text-brand-gold text-xl leading-none flex-shrink-0 w-8">{step.n}</span>
                  <div>
                    <p className="text-brand-text text-sm font-medium mb-1">{step.title}</p>
                    <p className="text-brand-text-muted text-xs leading-relaxed font-light">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Eligibility Conditions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            <div className="bg-brand-surface p-8">
              <h3 className="text-brand-text text-sm font-medium mb-4">Eligible for return</h3>
              <ul className="space-y-2">
                {[
                  'Unworn and in original condition',
                  'Original packaging and tags intact',
                  'Returned within 30 days of delivery',
                  'Manufacturing defects at any time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brand-text-muted font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-surface p-8">
              <h3 className="text-brand-text text-sm font-medium mb-4">Not eligible for return</h3>
              <ul className="space-y-2">
                {[
                  'Worn, washed, or altered items',
                  'Items returned after 30 days',
                  'Missing original packaging or tags',
                  'Items marked as final sale',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brand-text-muted font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-error mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border border-brand-border p-8 text-center">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-3">Need Help?</p>
          <h3 className="font-display font-bold uppercase text-brand-text text-2xl mb-4">We&apos;re Here</h3>
          <a
            href="mailto:support@footwayindia.com"
            className="inline-flex items-center gap-2 border border-brand-gold text-brand-gold px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Contact Support
          </a>
        </div>

      </div>
    </>
  );
}
