import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-5">
          <WifiOff className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">You&apos;re offline</h1>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          No internet connection. Some cached pages still work — try the links
          below.
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link
            href="/tools"
            className="rounded-xl border bg-card p-3 hover:border-emerald-500/40 font-semibold"
          >
            🧰 Tools
          </Link>
          <Link
            href="/infographics"
            className="rounded-xl border bg-card p-3 hover:border-emerald-500/40 font-semibold"
          >
            📊 Infographics
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border bg-card p-3 hover:border-emerald-500/40 font-semibold"
          >
            📝 Blog
          </Link>
          <Link
            href="/first-aid"
            className="rounded-xl border bg-card p-3 hover:border-emerald-500/40 font-semibold"
          >
            🆘 First Aid
          </Link>
        </div>
      </div>
    </div>
  );
}
