import Link from 'next/link';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Shop',
    links: [
      { href: '/collections/mens',   label: "Men's Footwear" },
      { href: '/collections/womens', label: "Women's Footwear" },
      { href: '/collections/kids',   label: "Children's Footwear" },
      { href: '/search',             label: 'All Products' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/pages/size-guide', label: 'Size Guide' },
      { href: '/pages/returns',    label: 'Returns & Exchanges' },
      { href: '/pages/contact',    label: 'Contact Us' },
      { href: '/pages/about',      label: 'About Footway India' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { href: '/pages/privacy',  label: 'Privacy Policy' },
      { href: '/pages/terms',    label: 'Terms of Service' },
      { href: '/pages/shipping', label: 'Shipping Policy' },
      { href: '/pages/refund',   label: 'Refund Policy' },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Facebook,  label: 'Facebook' },
  { href: '#', icon: Youtube,   label: 'YouTube' },
  { href: '#', icon: Twitter,   label: 'Twitter/X' },
];

const TRUST_BADGES = [
  '🔒 100% Secure Payments',
  '🚚 Free Shipping ₹999+',
  '↩️ 30-Day Returns',
  '⭐ 4.8/5 Rating',
  '📞 24/7 Support',
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top: Brand + Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-xl font-bold tracking-widest text-brand-text uppercase mb-4">
              FOOTWAY INDIA
            </p>
            <p className="text-brand-text-muted text-sm leading-relaxed mb-6">
              Premium footwear crafted for those who move with intention.
              Quality you can feel with every step.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  className="text-brand-text-muted hover:text-brand-gold transition-colors duration-200"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-brand-text font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brand-text-muted text-sm hover:text-brand-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-t border-b border-brand-border mb-8">
          {TRUST_BADGES.map((badge) => (
            <span key={badge} className="text-brand-text-muted text-xs sm:text-sm font-medium">
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-muted text-xs">
            © {year} Footway India. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-brand-text-muted text-xs bg-brand-elevated px-2 py-1 rounded-sm">
              UPI
            </span>
            <span className="text-brand-text-muted text-xs bg-brand-elevated px-2 py-1 rounded-sm">
              Razorpay
            </span>
            <span className="text-brand-text-muted text-xs bg-brand-elevated px-2 py-1 rounded-sm">
              EMI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
