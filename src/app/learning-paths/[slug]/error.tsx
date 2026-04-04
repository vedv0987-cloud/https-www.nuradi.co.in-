"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">We couldn&apos;t load this learning path.</p>
      <Link href="/learning-paths" className={buttonVariants({ className: "mt-6" })}>
        Browse Learning Paths
      </Link>
    </div>
  );
}
