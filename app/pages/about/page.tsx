import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Footway India — our story, mission, and commitment to premium footwear.',
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="border-b border-brand-border py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-5 h-px bg-brand-gold" />
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Our Story</p>
          <span className="w-5 h-px bg-brand-gold" />
        </div>
        <h1
          className="font-display font-bold uppercase tracking-tight text-brand-text mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}
        >
          About Us
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          Built for India. Built to last.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
          <div className="bg-brand-bg p-10 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="divider-gold" />
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Who We Are</p>
            </div>
            <h2 className="font-display font-bold uppercase text-brand-text text-3xl mb-5 leading-tight">
              Premium Footwear,<br />Indian Roots
            </h2>
            <p className="text-brand-text-secondary text-sm leading-relaxed font-light mb-4">
              Footway India was founded with a single conviction: Indian consumers deserve world-class footwear without compromise — in quality, fit, or price.
            </p>
            <p className="text-brand-text-secondary text-sm leading-relaxed font-light">
              We source from certified manufacturers that meet international quality benchmarks, and we test every product against the demands of Indian climate, terrain, and lifestyle.
            </p>
          </div>
          <div className="bg-brand-surface p-10 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="divider-gold" />
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Our Mission</p>
            </div>
            <h2 className="font-display font-bold uppercase text-brand-text text-3xl mb-5 leading-tight">
              Move With<br />Intention
            </h2>
            <p className="text-brand-text-secondary text-sm leading-relaxed font-light mb-4">
              Every pair we carry is selected to meet a purpose — whether that&apos;s performing at your best, looking sharp at work, or keeping up with your kids.
            </p>
            <p className="text-brand-text-secondary text-sm leading-relaxed font-light">
              We believe great shoes change how you carry yourself. That&apos;s the Footway promise.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-border">
            {[
              {
                n: '01',
                title: 'Uncompromised Quality',
                body: 'Every product passes a rigorous review. If it doesn\'t meet our standards, it doesn\'t reach you.',
              },
              {
                n: '02',
                title: 'Made for India',
                body: 'Sizes, widths, and materials chosen specifically for Indian feet and Indian weather.',
              },
              {
                n: '03',
                title: 'Customer First',
                body: '30-day returns, responsive support, and honest sizing guidance — because your trust matters more than a sale.',
              },
            ].map((item) => (
              <div key={item.n} className="bg-brand-bg p-8">
                <span className="font-display font-bold text-brand-gold text-2xl leading-none block mb-4">{item.n}</span>
                <h3 className="text-brand-text text-sm font-medium mb-3">{item.title}</h3>
                <p className="text-brand-text-muted text-xs leading-relaxed font-light">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-brand-border p-8 md:p-12 text-center">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-3">Get In Touch</p>
          <h3 className="font-display font-bold uppercase text-brand-text text-2xl mb-4">Have a Question?</h3>
          <p className="text-brand-text-muted text-sm font-light mb-6 max-w-sm mx-auto">
            We&apos;re a small team that genuinely cares. Write to us anytime.
          </p>
          <a
            href="mailto:support@footwayindia.com"
            className="inline-flex items-center gap-2 border border-brand-gold text-brand-gold px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            support@footwayindia.com
          </a>
        </div>

      </div>
    </>
  );
}
