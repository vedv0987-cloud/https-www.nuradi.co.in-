"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  TOOLS,
  CATEGORY_LABELS,
  type ToolCategory,
} from "@/lib/tools-registry";

const CATEGORIES: { key: ToolCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "body-weight", label: CATEGORY_LABELS["body-weight"] },
  { key: "nutrition", label: CATEGORY_LABELS.nutrition },
  { key: "disease-risk", label: CATEGORY_LABELS["disease-risk"] },
  { key: "womens-health", label: CATEGORY_LABELS["womens-health"] },
  { key: "lifestyle", label: CATEGORY_LABELS.lifestyle },
  { key: "daily-trackers", label: CATEGORY_LABELS["daily-trackers"] },
];

export default function ToolsHubPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(
    "all"
  );

  const filtered = useMemo(() => {
    let list = TOOLS;
    if (activeCategory !== "all") {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, activeCategory]);

  const liveCount = TOOLS.filter((t) => t.status === "live").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
          >
            {TOOLS.length} Free Health Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Calculate, track, and understand your health — no signup needed.
          </motion.p>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {liveCount} live now
            </span>{" "}
            · {TOOLS.length - liveCount} launching soon
          </p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative max-w-xl mx-auto mb-6"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </motion.div>

        {/* Category pills */}
        <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4">
          <div className="flex gap-2 w-max mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                  activeCategory === cat.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-foreground hover:bg-muted border-border"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No tools found. Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool, i) => {
              const isComingSoon = tool.status === "coming-soon";
              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(0.05 * i, 0.4) }}
                >
                  <Link
                    href={`/tools/${tool.slug}`}
                    className={cn(
                      "group block rounded-2xl border bg-card p-5 h-full transition-all",
                      "hover:border-emerald-500/40 hover:shadow-lg hover:-translate-y-1",
                      isComingSoon && "opacity-80"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {tool.popular && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            <TrendingUp className="h-3 w-3" /> Popular
                          </span>
                        )}
                        {tool.isNew && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            <Sparkles className="h-3 w-3" /> New
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="font-bold text-base leading-tight mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-snug line-clamp-2 mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {tool.estimatedTime}
                      </span>
                      {isComingSoon ? (
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                          Try it →
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
