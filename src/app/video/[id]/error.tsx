"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">We couldn&apos;t load this video. It may have been removed.</p>
      <Link href="/explore" className={buttonVariants({ className: "mt-6" })}>
        Browse Videos
      </Link>
    </div>
  );
}
