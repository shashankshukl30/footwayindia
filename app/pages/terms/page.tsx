import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Footway India terms of service and conditions of use.',
};

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using footwayindia.com, you agree to these Terms of Service in full.',
      'If you do not agree with any part of these terms, please do not use our website.',
      'We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of revised terms.',
    ],
  },
  {
    title: 'Products & Pricing',
    body: [
      'All prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.',
      'We reserve the right to modify prices at any time without prior notice.',
      'Product images are for illustrative purposes. Actual colours may vary slightly due to screen calibration.',
      'We reserve the right to cancel or refuse orders at our discretion, including in cases of pricing errors.',
    ],
  },
  {
    title: 'Orders & Payment',
    body: [
      'An order confirmation email does not constitute a binding contract until the item is dispatched.',
      'We accept UPI, credit/debit cards, net banking, and EMI via Razorpay.',
      'You agree not to use fraudulent payment methods. Fraudulent orders will be reported to the relevant authorities.',
    ],
  },
  {
    title: 'Shipping & Delivery',
    body: [
      'Delivery timelines are estimates and not guaranteed. Delays may occur due to courier issues or force majeure events.',
      'Risk of loss passes to you upon delivery confirmation.',
      'Please refer to our Shipping Policy for full details.',
    ],
  },
  {
    title: 'Returns & Refunds',
    body: [
      'Returns and refunds are subject to our Returns & Refund Policy, incorporated herein by reference.',
      'We reserve the right to reject returns that do not meet the stated eligibility conditions.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All content on this site — including text, images, logos, and design — is the property of Footway India and protected by Indian copyright law.',
      'You may not reproduce, distribute, or create derivative works without our written consent.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'Footway India is not liable for any indirect, incidental, or consequential damages arising from your use of our products or website.',
      'Our total liability for any claim shall not exceed the amount paid for the specific order in question.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These terms are governed by the laws of India.',
      'Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
    ],
  },
];

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          Last updated: January 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-brand-text-secondary text-sm leading-relaxed font-light mb-12">
          Please read these Terms of Service carefully before using our website or placing an order. These terms govern your relationship with Footway India.
        </p>

        <div className="space-y-10">
          {SECTIONS.map((section, i) => (
            <div key={section.title} className="border-t border-brand-border pt-8">
              <div className="flex items-start gap-5 mb-4">
                <span className="font-display font-bold text-brand-gold text-lg leading-none flex-shrink-0 w-7">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-brand-text text-base font-medium">{section.title}</h2>
              </div>
              <ul className="space-y-2 ml-12">
                {section.body.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-brand-text-muted font-light leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-brand-border p-6 text-center">
          <p className="text-brand-text-muted text-xs font-light mb-2">Questions about these terms?</p>
          <a
            href="mailto:support@footwayindia.com"
            className="text-brand-gold text-sm hover:underline"
          >
            support@footwayindia.com
          </a>
        </div>
      </div>
    </>
  );
}
