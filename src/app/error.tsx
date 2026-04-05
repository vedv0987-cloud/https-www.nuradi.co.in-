"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-4">💔</div>
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        We hit an unexpected error. This has been logged. Please try again.
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition text-sm"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 border bg-card rounded-xl font-semibold hover:bg-muted transition text-sm"
        >
          Go Home
        </Link>
      </div>
      {process.env.NODE_ENV === "development" && (
        <details className="mt-8 text-left max-w-lg w-full">
          <summary className="text-xs text-muted-foreground cursor-pointer">Error details (dev only)</summary>
          <pre className="mt-2 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/20 p-4 rounded-lg overflow-auto">
            {error.message}
            {"\n"}
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}
