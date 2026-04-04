"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Newspaper, TrendingUp, Clock } from "lucide-react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { VideoCard } from "@/components/video-card";
import { Category, CATEGORY_META } from "@/types";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const sorted = useMemo(() => {
    let v = [...videos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (filter !== "all") v = v.filter((vi) => vi.category === filter);
    return v;
  }, [filter]);

  const trending = useMemo(() => [...videos].sort((a, b) => b.views - a.views).slice(0, 4), []);

  const latestPerChannel = useMemo(() => {
    const map = new Map<string, typeof videos[0]>();
    const sortedAll = [...videos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    sortedAll.forEach((v) => { if (!map.has(v.channelId)) map.set(v.channelId, v); });
    return Array.from(map.values()).slice(0, 8);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Newspaper className="w-5 h-5 text-primary" />
          <h1 className="text-3xl font-bold">Health News</h1>
        </div>
        <p className="text-muted-foreground">Latest videos from 28 expert channels</p>
      </motion.div>

      {/* Trending */}
      <section className="mb-12">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-primary" /> Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
        </div>
      </section>

      {/* Channel Updates */}
      <section className="mb-12">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-primary" /> Latest from Each Channel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestPerChannel.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
        </div>
      </section>

      {/* All Videos */}
      <section>
        <h2 className="text-lg font-bold mb-4">All Videos — Newest First</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>All</Button>
          {(Object.entries(CATEGORY_META) as [Category, (typeof CATEGORY_META)[Category]][]).map(([k, m]) => (
            <Button key={k} variant={filter === k ? "default" : "outline"} size="sm" onClick={() => setFilter(k)} className="whitespace-nowrap">{m.label}</Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.slice(0, 24).map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
        </div>
      </section>
    </div>
  );
}
