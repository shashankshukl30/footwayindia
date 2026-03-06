export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-brand-border border-t-brand-gold rounded-full animate-spin" />
        <p className="text-brand-text-muted text-[10px] uppercase tracking-[0.3em]">Loading</p>
      </div>
    </div>
  );
}
