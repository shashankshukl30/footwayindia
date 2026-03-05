import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Footway India privacy policy — how we collect, use, and protect your data.',
};

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: [
      'When you place an order, we collect your name, email address, phone number, and delivery address.',
      'We also collect payment information, which is processed securely by Razorpay and never stored on our servers.',
      'We use cookies and similar technologies to understand how visitors use our site and to improve your experience.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'To process and fulfil your orders, and to communicate order status updates.',
      'To send you relevant product updates and offers — only if you have opted in.',
      'To improve our website, detect fraud, and comply with legal obligations.',
    ],
  },
  {
    title: 'Sharing of Information',
    body: [
      'We do not sell, rent, or trade your personal information to third parties.',
      'We share data only with trusted service providers (courier partners, payment gateway) strictly to fulfil your order.',
      'We may disclose information if required by law or to protect the rights of Footway India.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'All data transmitted on our site is encrypted using TLS/SSL.',
      'Payment data is handled entirely by PCI-DSS compliant processors.',
      'We retain your data only for as long as necessary to provide services and meet legal requirements.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You can request access to, correction of, or deletion of your personal data at any time.',
      'You can unsubscribe from marketing emails using the link in any email we send.',
      'To exercise any data rights, email us at support@footwayindia.com.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'We use essential cookies to run the website (cart, session management).',
      'Analytics cookies (Google Analytics) help us understand traffic patterns. These can be disabled in your browser settings.',
      'We do not use third-party advertising cookies.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this policy periodically. The date of the latest revision is shown at the bottom of this page.',
      'Continued use of our site after changes constitutes acceptance of the updated policy.',
    ],
  },
];

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          Last updated: January 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-brand-text-secondary text-sm leading-relaxed font-light mb-12">
          Footway India (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data.
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
          <p className="text-brand-text-muted text-xs font-light mb-2">Questions about this policy?</p>
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
