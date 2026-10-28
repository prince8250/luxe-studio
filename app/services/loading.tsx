export default function Loading() {
  return (
    <main className="min-h-screen bg-base px-5 pb-24 pt-32 text-on-dark sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl" aria-busy="true">
        <p className="font-condensed text-sm uppercase tracking-[0.2em] text-muted-dark">
          Loading services
        </p>
        <div className="mt-8 h-10 w-48 animate-pulse bg-surface" />
        <div className="mt-16 space-y-4">
          <div className="h-20 animate-pulse bg-surface" />
          <div className="h-40 animate-pulse bg-surface" />
        </div>
      </div>
    </main>
  );
}
