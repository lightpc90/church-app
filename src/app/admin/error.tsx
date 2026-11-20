"use client";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ivory p-6 text-center">
      <h1 className="font-display text-3xl text-ink">Something went wrong</h1>
      <p className="max-w-md text-stone">The dashboard couldn&apos;t load. This is usually a temporary database issue.</p>
      <button type="button" onClick={reset} className="rounded-full bg-ink px-5 py-2.5 font-semibold text-white">
        Try again
      </button>
    </main>
  );
}
