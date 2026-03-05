import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Footway India shipping information — delivery times, charges, and coverage.',
};

export default function ShippingPage() {
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
          Shipping Policy
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          Free shipping on orders above ₹999. Pan-India delivery.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Shipping tiers */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Shipping Charges</h2>
          </div>
          <div className="border border-brand-border overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-border">
                  {['Order Value', 'Shipping Charge', 'Estimated Delivery'].map((h) => (
                    <th key={h} className="py-3 px-6 text-left text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { value: 'Below ₹999', charge: '₹79', time: '3–6 business days' },
                  { value: '₹999 and above', charge: 'FREE', time: '3–6 business days' },
                  { value: 'Express (select cities)', charge: '₹149', time: '1–2 business days' },
                ].map((row, i) => (
                  <tr key={row.value} className={`border-b border-brand-border/50 ${i % 2 === 0 ? '' : 'bg-brand-surface/40'}`}>
                    <td className="py-4 px-6 text-brand-text font-medium">{row.value}</td>
                    <td className="py-4 px-6 text-brand-gold font-semibold">{row.charge}</td>
                    <td className="py-4 px-6 text-brand-text-muted">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dispatch & Delivery */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">Dispatch & Delivery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            {[
              {
                title: 'Processing Time',
                body: 'Orders placed before 2 PM IST on a business day are typically dispatched the same day. Orders placed after 2 PM or on weekends are dispatched the next business day.',
              },
              {
                title: 'Delivery Partners',
                body: 'We ship via Delhivery, Blue Dart, and Ekart depending on your pin code. A tracking link is emailed and SMS\'d once your order ships.',
              },
              {
                title: 'Pan-India Coverage',
                body: 'We deliver to 27,000+ pin codes across India. Remote areas may take an additional 1–2 days. Check pin code serviceability at checkout.',
              },
              {
                title: 'Failed Delivery',
                body: 'If a delivery attempt fails, the courier will try twice more. After three failed attempts, the package is returned to us and a refund is issued.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-brand-bg p-8">
                <h3 className="text-brand-text text-sm font-medium mb-3">{item.title}</h3>
                <p className="text-brand-text-muted text-xs leading-relaxed font-light">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="border border-brand-border p-8">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-brand-gold mb-3">Please Note</p>
          <ul className="space-y-3">
            {[
              'Delivery estimates exclude Sundays and public holidays.',
              'Orders with multiple items may ship in separate parcels.',
              'Footway India is not liable for delays caused by the courier partner after dispatch.',
              'For high-value orders, a signature may be required upon delivery.',
            ].map((note) => (
              <li key={note} className="flex items-start gap-3 text-xs text-brand-text-muted font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}
