export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-10 w-64 bg-muted rounded mb-8" />
      <div className="flex gap-3 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-muted rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video bg-muted rounded-xl" />
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
