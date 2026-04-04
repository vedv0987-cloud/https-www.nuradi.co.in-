"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Sunrise, Lightbulb, BookOpen, Flame, ChevronRight } from "lucide-react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getRandomFacts } from "@/data/health-facts";
import { getRandomTips } from "@/data/health-tips";

function getDayNumber(): number {
  const start = new Date("2026-01-01").getTime();
  const now = Date.now();
  return Math.floor((now - start) / 86400000) + 1;
}

export default function DailyDosePage() {
  const [streak, setStreak] = useState(0);

  const dayNum = getDayNumber();
  const videoIndex = dayNum % videos.length;
  const featuredVideo = videos[videoIndex];
  const channel = channels.find((c) => c.id === featuredVideo.channelId);
  const facts = useMemo(() => getRandomFacts(3), []);
  const tip = useMemo(() => getRandomTips(1)[0], []);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("healthedutv_streak") || "{}");
      const today = new Date().toISOString().split("T")[0];
      if (data.lastVisit === today) {
        setStreak(data.streak || 1);
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const newStreak = data.lastVisit === yesterday ? (data.streak || 0) + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem("healthedutv_streak", JSON.stringify({ streak: newStreak, lastVisit: today }));
      }
    } catch { setStreak(1); }
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sunrise className="w-4 h-4" /> Daily Dose — Day {dayNum}
        </div>
        <h1 className="text-3xl font-bold">Your 5-Minute Health Lesson</h1>
        <p className="text-muted-foreground mt-2">Learn something new every day. Come back tomorrow for more.</p>
      </motion.div>

      {/* Video */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-xl bg-black mb-8">
        <div className="aspect-video relative">
          <iframe
            src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?rel=0&modestbranding=1`}
            title={featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        <div className="p-4">
          <h2 className="text-white font-semibold">{featuredVideo.title}</h2>
          <p className="text-white/60 text-sm mt-1">{channel?.name}</p>
        </div>
      </motion.div>

      {/* Quick Facts */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
        <h3 className="font-bold flex items-center gap-1.5 mb-3"><BookOpen className="w-4 h-4 text-primary" /> Quick Facts</h3>
        <div className="grid gap-3">
          {facts.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-3 p-3 rounded-xl border bg-card">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <div>
                <p className="text-sm text-muted-foreground">{f.text}</p>
                <span className="text-[10px] text-muted-foreground/60">— {f.source}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Today's Tip */}
      {tip && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="p-5 rounded-xl border bg-primary/5 mb-8">
          <h3 className="font-bold flex items-center gap-1.5 mb-2"><Lightbulb className="w-4 h-4 text-yellow-500" /> Today&apos;s Tip</h3>
          <p className="text-sm text-muted-foreground">{tip.text}</p>
          <span className="text-[10px] text-muted-foreground/60">— {tip.source}</span>
        </motion.div>
      )}

      {/* Streak */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center p-5 rounded-xl border bg-card mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-lg font-bold">{streak} Day Streak</span>
        </div>
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 7 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + i * 0.05, type: "spring" }}
              className={cn("w-6 h-6 rounded-full border-2", i < streak ? "bg-primary border-primary" : "border-muted-foreground/30")}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Come back tomorrow for Day {dayNum + 1}!</p>
      </motion.div>

      {/* Dive Deeper */}
      <div className="flex flex-wrap gap-2">
        <Link href="/explore" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")}>More Videos <ChevronRight className="w-3 h-3" /></Link>
        <Link href="/health-lab" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")}>Health Lab <ChevronRight className="w-3 h-3" /></Link>
        <Link href="/health-az" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")}>Health A-Z <ChevronRight className="w-3 h-3" /></Link>
      </div>
    </div>
  );
}
