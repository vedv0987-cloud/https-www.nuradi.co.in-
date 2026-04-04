export default function Loading() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-10 w-64 bg-muted rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-xl">
            <div className="w-16 h-16 bg-muted rounded-full flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-2/3 bg-muted rounded" />
              <div className="h-3 w-1/2 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
