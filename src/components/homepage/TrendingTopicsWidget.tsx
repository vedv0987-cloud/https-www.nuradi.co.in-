"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

const TOPICS = [
  "#DiabetesAwareness",
  "#HeartHealth",
  "#PCOS",
  "#MentalHealth",
  "#SleepTips",
  "#Hydration",
  "#Vaccination",
  "#IntermittentFasting",
];

export function TrendingTopicsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-card border border-border p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Trending Topics
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <Link
            key={topic}
            href={`/health-news?q=${encodeURIComponent(topic.replace("#", ""))}`}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
          >
            {topic}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
