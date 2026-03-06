export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-brand-elevated" />
      <div className="pt-4 pb-2 space-y-2">
        <div className="h-2 bg-brand-elevated rounded w-1/3" />
        <div className="h-3 bg-brand-elevated rounded w-3/4" />
        <div className="h-3 bg-brand-elevated rounded w-1/2" />
        <div className="h-3 bg-brand-elevated rounded w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
