"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Newspaper, ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/lib/health-news-aggregator";
import { HomepageNewsCard } from "./HomepageNewsCard";
import { HealthFactWidget } from "./HealthFactWidget";
import { QuickPollWidget } from "./QuickPollWidget";
import { TrendingTopicsWidget } from "./TrendingTopicsWidget";

export function HomepageNewsSection() {
  const [articles, setArticles] = useState<NewsArticle[] | null>(null);

  useEffect(() => {
    fetch("/api/health-news")
      .then((r) => r.json())
      .then((d: { articles: NewsArticle[] }) => setArticles(d.articles || []))
      .catch(() => setArticles([]));
  }, []);

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Newspaper className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div className="flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
              </span>
              Live
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Today&apos;s Health News
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Live updates from 10 trusted sources · Refreshed every 30 min
          </p>
        </div>
        <Link
          href="/health-news"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
        >
          View all news <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 2-col grid: news left, widgets right */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* News column */}
        <div>
          {articles === null ? (
            // Loading skeletons
            <div className="grid sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl bg-card border border-border animate-pulse"
                >
                  <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground text-sm">
                News feed is refreshing. Check back in a minute.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="grid sm:grid-cols-2 gap-3"
            >
              {articles.slice(0, 8).map((article) => (
                <motion.div
                  key={article.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <HomepageNewsCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Widgets column */}
        <div className="flex flex-col gap-4">
          <HealthFactWidget />
          <QuickPollWidget />
          <TrendingTopicsWidget />
        </div>
      </div>
    </section>
  );
}
