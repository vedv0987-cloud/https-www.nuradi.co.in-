export default function Loading() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-16 space-y-12 animate-pulse">
      {/* Hero skeleton */}
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted rounded-full" />
          <div className="space-y-3">
            <div className="h-12 w-3/4 bg-muted rounded-lg" />
            <div className="h-12 w-1/2 bg-muted rounded-lg" />
          </div>
          <div className="h-5 w-2/3 bg-muted rounded" />
          <div className="flex gap-3">
            <div className="h-12 w-40 bg-muted rounded-xl" />
            <div className="h-12 w-40 bg-muted rounded-xl" />
          </div>
        </div>
        <div className="aspect-video bg-muted rounded-2xl" />
      </div>

      {/* Video grid skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video bg-muted rounded-xl" />
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/2 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
