export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-10 w-48 bg-muted rounded mb-4" />
      <div className="h-5 w-80 bg-muted rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-40 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}
