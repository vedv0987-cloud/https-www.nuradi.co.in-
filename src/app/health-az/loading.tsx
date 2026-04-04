export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-10 w-64 bg-muted rounded mb-4" />
      <div className="h-5 w-96 bg-muted rounded mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}
