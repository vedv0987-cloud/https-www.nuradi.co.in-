"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/health-news-aggregator";
import type { NewsSource } from "@/lib/health-news-sources";

function timeAgo(iso: string): string {
  const date = new Date(iso);
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)} min ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} hr ago`;
  if (secs < 604800) return `${Math.floor(secs / 86400)} day${Math.floor(secs / 86400) > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

type RegionFilter = "all" | "india" | "global";

interface Props {
  initialArticles: NewsArticle[];
  sources: NewsSource[];
}

export default function HealthNewsClient({ initialArticles, sources }: Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  const filtered = useMemo(() => {
    let list = initialArticles;
    if (region !== "all") list = list.filter((a) => a.region === region);
    if (selectedSource !== "all") list = list.filter((a) => a.sourceId === selectedSource);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.sourceName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [initialArticles, region, selectedSource, query]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            Live · Updated hourly
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Health News Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground max-w-2xl mx-auto"
          >
            Real-time health news aggregated from {sources.length} trusted sources — NDTV, BBC, WHO, The Hindu, Healthline & more.
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-xl mx-auto mb-6"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search headlines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </motion.div>

        {/* Region filter */}
        <div className="flex gap-2 justify-center mb-3">
          {(["all", "india", "global"] as RegionFilter[]).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors border",
                region === r ? "bg-foreground text-background border-foreground" : "bg-card text-foreground hover:bg-muted border-border"
              )}
            >
              {r === "india" ? "🇮🇳 India" : r === "global" ? "🌍 Global" : "All"}
            </button>
          ))}
        </div>

        {/* Source filter */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4">
          <div className="flex gap-2 w-max mx-auto">
            <button
              onClick={() => setSelectedSource("all")}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                selectedSource === "all" ? "bg-emerald-600 text-white border-emerald-600" : "bg-card text-foreground hover:bg-muted border-border"
              )}
            >
              All sources
            </button>
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSource(s.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                  selectedSource === s.id ? "bg-emerald-600 text-white border-emerald-600" : "bg-card text-foreground hover:bg-muted border-border"
                )}
              >
                {s.logo} {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            {initialArticles.length === 0
              ? "Unable to fetch news right now. Please refresh in a moment."
              : "No articles match your filters."}
          </p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Showing {filtered.length} of {initialArticles.length} articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((article, i) => (
                <motion.a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6) }}
                  className="group block rounded-2xl border bg-card overflow-hidden hover:border-emerald-500/40 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {article.image && (
                    <div className="relative aspect-video w-full bg-muted overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {article.sourceLogo} {article.sourceName}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {timeAgo(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      Read at {article.sourceName} <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 rounded-xl bg-muted/50 p-4 text-xs text-muted-foreground text-center">
          News articles link to their original sources. NuradiHealth does not own or republish this content. Feeds refresh hourly.
        </div>
      </div>
    </div>
  );
}
