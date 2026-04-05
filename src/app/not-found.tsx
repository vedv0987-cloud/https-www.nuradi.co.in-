import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* Animated ECG flatline */}
      <svg viewBox="0 0 200 50" className="w-64 h-16 mb-6">
        <path
          d="M0,25 L40,25 L50,10 L60,40 L70,15 L80,35 L90,25 L200,25"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <h1 className="text-[100px] font-black text-foreground/10 leading-none">404</h1>
      <h2 className="text-2xl font-bold mt-2">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. But your health tools are still here!
      </p>

      <div className="flex flex-wrap gap-3 mt-8 justify-center">
        <Link href="/" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition text-sm">
          Go Home
        </Link>
        <Link href="/tools" className="px-5 py-2.5 border bg-card rounded-xl font-semibold hover:bg-muted transition text-sm">
          Health Tools
        </Link>
        <Link href="/health-news" className="px-5 py-2.5 border bg-card rounded-xl font-semibold hover:bg-muted transition text-sm">
          Health News
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-12">
        💡 Did you know? Your body produces 25 million new cells each second. This page might be lost, but your cells aren&apos;t!
      </p>
    </div>
  );
}
