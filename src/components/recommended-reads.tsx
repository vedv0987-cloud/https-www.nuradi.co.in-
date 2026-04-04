"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { Category, CATEGORY_META } from "@/types";
import { formatViews, timeAgo } from "@/lib/utils";

const TABS = [
  { key: "all" as const, label: "Top Reads" },
  { key: "fitness" as Category, label: "Fitness" },
  { key: "mental-health" as Category, label: "Mental Well-Being" },
  { key: "nutrition" as Category, label: "Nutrition" },
  { key: "medical" as Category, label: "Medical" },
  { key: "science" as Category, label: "Science" },
];

export function RecommendedReads() {
  const [activeTab, setActiveTab] = useState<Category | "all">("all");

  const items = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? [...videos].sort((a, b) => b.views - a.views)
        : videos.filter((v) => v.category === activeTab).sort((a, b) => b.views - a.views);
    return filtered.slice(0, 6);
  }, [activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Recommended reads</h2>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-teal-700 text-white shadow-md"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((video, i) => {
            const channel = channels.find((c) => c.id === video.channelId);
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/video/${video.id}`}
                  className="group flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="144px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {channel?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatViews(video.views)} · {timeAgo(video.publishedAt)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
