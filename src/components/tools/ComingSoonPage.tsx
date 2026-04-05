import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getToolBySlug } from "@/lib/tools-registry";
import { notFound } from "next/navigation";

export function ComingSoonPage({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> All tools
        </Link>
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center text-5xl mb-5">
          {tool.icon}
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full mb-4">
          <Sparkles className="h-3 w-3" /> Coming Soon
        </span>
        <h1 className="text-3xl font-bold mb-3">{tool.name}</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          {tool.description}
        </p>
        <p className="text-sm text-muted-foreground">
          This tool is launching soon.{" "}
          <Link
            href="/tools"
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            Browse our 9 live tools →
          </Link>
        </p>
      </div>
    </div>
  );
}
