export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl text-brand-gold mb-4">
          FOOTWAY INDIA
        </h1>
        <p className="font-sans text-brand-text-secondary mb-8">
          Premium footwear for those who refuse to settle.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-brand-surface border border-brand-border p-4 rounded-sm">
            <p className="text-brand-text text-sm">Surface</p>
          </div>
          <div className="bg-brand-elevated border border-brand-border p-4 rounded-sm">
            <p className="text-brand-text text-sm">Elevated</p>
          </div>
          <div className="bg-brand-gold p-4 rounded-sm">
            <p className="text-brand-bg text-sm font-bold">Gold CTA</p>
          </div>
        </div>
        <button className="bg-brand-gold text-brand-bg px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-brand-gold-light transition-colors animate-pulse-gold">
          Shop Now
        </button>
      </div>
    </main>
  );
}
