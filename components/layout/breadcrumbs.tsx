import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: crumb.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="text-brand-text-muted text-[10px] uppercase tracking-[0.2em] mb-5"
      >
        <ol className="flex items-center gap-2 flex-wrap" role="list">
          {crumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-brand-border">›</span>}
              {crumb.href && i < crumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-brand-text transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={i === crumbs.length - 1 ? 'page' : undefined}
                  className={i === crumbs.length - 1 ? 'text-brand-text' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
