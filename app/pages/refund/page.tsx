import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Footway India refund policy — how and when you get your money back.',
};

export default function RefundPage() {
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
          Refund Policy
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          Refunds are straightforward. Here&apos;s exactly what to expect.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Refund timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-border">
          {[
            { n: '1–2', label: 'Days to inspect', body: 'We inspect your returned item within 1–2 business days of receiving it.' },
            { n: '5–7', label: 'Days to process', body: 'Once approved, the refund is initiated to your original payment method.' },
            { n: '2–5', label: 'Days to credit', body: 'Bank or card processing adds 2–5 more business days depending on your bank.' },
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

        {/* Refund methods */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Refund Methods</h2>
          </div>
          <div className="border border-brand-border overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-border">
                  {['Payment Method Used', 'Refunded To', 'Timeline'].map((h) => (
                    <th key={h} className="py-3 px-6 text-left text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'UPI', to: 'UPI ID / Bank Account', time: '2–3 business days' },
                  { method: 'Credit / Debit Card', to: 'Original card', time: '5–7 business days' },
                  { method: 'Net Banking', to: 'Bank account', time: '3–5 business days' },
                  { method: 'EMI', to: 'Original card (EMI cancelled)', time: '7–10 business days' },
                  { method: 'Store Credit (if chosen)', to: 'Footway India wallet', time: 'Instant' },
                ].map((row, i) => (
                  <tr key={row.method} className={`border-b border-brand-border/50 ${i % 2 === 0 ? '' : 'bg-brand-surface/40'}`}>
                    <td className="py-4 px-6 text-brand-text font-medium">{row.method}</td>
                    <td className="py-4 px-6 text-brand-text-muted">{row.to}</td>
                    <td className="py-4 px-6 text-brand-text-muted">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-refundable */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Non-Refundable Items</h2>
          </div>
          <div className="border border-brand-border p-8">
            <ul className="space-y-3">
              {[
                'Shipping charges on the original order (unless the return is due to our error).',
                'Items returned after the 30-day window.',
                'Items showing signs of use, wear, or damage not caused by manufacturing defects.',
                'Items marked as final sale or non-returnable at the time of purchase.',
              ].map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm text-brand-text-muted font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-error mt-1.5 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border border-brand-border p-8 text-center">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-3">Refund Not Received?</p>
          <h3 className="font-display font-bold uppercase text-brand-text text-2xl mb-4">We&apos;ll Sort It</h3>
          <p className="text-brand-text-muted text-sm font-light mb-6 max-w-sm mx-auto">
            If your refund hasn&apos;t arrived within the stated window, email us with your order number.
          </p>
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
