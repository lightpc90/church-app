// Route-level loading state: a skeleton shaped like the page hero, so navigation feels instant.
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="relative flex min-h-[56svh] items-end overflow-hidden bg-ink pt-32 pb-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="h-3 w-28 animate-pulse rounded-full bg-gold/40" />
          <div className="mt-6 h-12 w-full max-w-xl animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-4 h-12 w-2/3 max-w-md animate-pulse rounded-2xl bg-white/10" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:grid-cols-3 sm:px-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-3xl bg-sand" />
        ))}
      </div>
    </div>
  );
}
