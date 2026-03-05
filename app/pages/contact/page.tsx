import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Footway India team. We\'re here to help.',
};

export default function ContactPage() {
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
          Contact Us
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          A real person will respond — usually within a few hours on business days.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
          {[
            {
              label: 'Email Support',
              value: 'support@footwayindia.com',
              href: 'mailto:support@footwayindia.com',
              note: 'Response within 24 hours on business days',
            },
            {
              label: 'WhatsApp',
              value: '+91 98765 43210',
              href: 'https://wa.me/919876543210',
              note: 'Mon – Sat, 10 AM – 7 PM IST',
            },
            {
              label: 'Order Queries',
              value: 'orders@footwayindia.com',
              href: 'mailto:orders@footwayindia.com',
              note: 'Tracking, delays, and cancellations',
            },
          ].map((c) => (
            <div key={c.label} className="bg-brand-bg p-8 md:p-10">
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-brand-gold mb-4">{c.label}</p>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-brand-text text-sm font-medium hover:text-brand-gold transition-colors duration-200 block mb-3"
              >
                {c.value}
              </a>
              <p className="text-brand-text-muted text-xs font-light leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        {/* FAQ quick links */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Common Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            {[
              { q: 'Where is my order?', a: 'Orders are dispatched within 1–2 business days. You will receive a tracking link via email once your order ships.' },
              { q: 'Can I exchange my size?', a: 'Yes. We offer free size exchanges within 30 days of delivery. The item must be unworn and in original packaging.' },
              { q: 'What payment methods do you accept?', a: 'We accept UPI, all major credit/debit cards, net banking, and no-cost EMI via Razorpay.' },
              { q: 'Do you ship across India?', a: 'Yes, we ship pan-India. Delivery typically takes 3–6 business days depending on your location.' },
            ].map((item) => (
              <div key={item.q} className="bg-brand-surface p-7">
                <h3 className="text-brand-text text-sm font-medium mb-2">{item.q}</h3>
                <p className="text-brand-text-muted text-xs leading-relaxed font-light">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="border border-brand-border p-8 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Support Hours</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { day: 'Monday – Friday', time: '10 AM – 7 PM' },
              { day: 'Saturday', time: '10 AM – 5 PM' },
              { day: 'Sunday', time: 'Closed' },
              { day: 'Public Holidays', time: 'Closed' },
            ].map((s) => (
              <div key={s.day}>
                <p className="text-brand-text-muted text-[10px] tracking-[0.15em] uppercase mb-1">{s.day}</p>
                <p className="text-brand-text text-sm font-medium">{s.time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
