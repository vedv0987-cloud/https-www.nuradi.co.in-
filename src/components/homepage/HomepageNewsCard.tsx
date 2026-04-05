"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import type { NewsArticle } from "@/lib/health-news-aggregator";

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)} min ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} hr ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

export function HomepageNewsCard({ article }: { article: NewsArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 p-3 rounded-xl bg-white hover:bg-gray-50 dark:bg-card dark:hover:bg-card/80 border border-border hover:border-emerald-500/40 hover:shadow-md transition-all group"
    >
      {article.image ? (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={article.image}
            alt=""
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="80px"
          />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-lg flex-shrink-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center text-3xl">
          {article.sourceLogo || "📰"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            {article.sourceLogo} {article.sourceName}
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <Clock className="h-2.5 w-2.5" />
            {timeAgo(article.publishedAt)}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {article.title}
        </h3>
      </div>
    </a>
  );
}
