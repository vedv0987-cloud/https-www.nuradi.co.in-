"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Circle, Play, Clock, BookOpen } from "lucide-react";
import { LEARNING_PATHS } from "@/data/learning-paths";
import { searchRelatedVideos } from "@/lib/health-lab-utils";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

export default function LearningPathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const path = LEARNING_PATHS.find((p) => p.slug === slug);
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`lp_${slug}`) || "[]");
      setCompleted(saved);
    } catch {}
  }, [slug]);

  const stepVideos = useMemo(() => {
    if (!path) return [];
    return path.steps.map((s) => searchRelatedVideos(s.searchQuery, 1)[0]);
  }, [path]);

  const toggleComplete = (order: number) => {
    const next = completed.includes(order)
      ? completed.filter((c) => c !== order)
      : [...completed, order];
    setCompleted(next);
    try { localStorage.setItem(`lp_${slug}`, JSON.stringify(next)); } catch {}
  };

  if (!path) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Path not found</h1>
        <Link href="/learning-paths" className={cn(buttonVariants(), "mt-4")}>All Paths</Link>
      </div>
    );
  }

  const progress = Math.round((completed.length / path.steps.length) * 100);
  const activeVideo = stepVideos[activeStep];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <Link href="/learning-paths" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Learning Paths
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold">{path.name}</h1>
        <p className="text-muted-foreground mt-1">{path.description}</p>
        <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
          <span>{path.totalVideos} videos</span>
          <span>·</span>
          <span>{path.totalDuration}</span>
          <span>·</span>
          <span>{completed.length}/{path.steps.length} completed</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full mt-3 overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: path.color }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} />
        </div>
      </motion.div>

      {/* Video Player */}
      {activeVideo && (
        <motion.div key={activeStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden shadow-xl bg-black mb-6">
          <div className="aspect-video relative">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <div className="p-4">
            <p className="text-white font-semibold text-sm">{path.steps[activeStep].title}</p>
            <p className="text-white/60 text-xs mt-1">{activeVideo.title}</p>
          </div>
        </motion.div>
      )}

      {/* Steps */}
      <div className="space-y-2">
        {path.steps.map((step, i) => {
          const done = completed.includes(step.order);
          const active = i === activeStep;
          return (
            <motion.div
              key={step.order}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn("flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all", active ? "border-primary bg-primary/5" : "hover:bg-muted/50")}
              onClick={() => setActiveStep(i)}
            >
              <button onClick={(e) => { e.stopPropagation(); toggleComplete(step.order); }} className="flex-shrink-0">
                {done ? <CheckCircle2 className="w-6 h-6 text-primary" /> : <Circle className="w-6 h-6 text-muted-foreground/40" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", done && "line-through text-muted-foreground")}>{step.order}. {step.title}</p>
                {stepVideos[i] && <p className="text-[11px] text-muted-foreground truncate">{stepVideos[i].title}</p>}
              </div>
              {active && <Play className="w-4 h-4 text-primary flex-shrink-0" />}
            </motion.div>
          );
        })}
      </div>

      {completed.length === path.steps.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 p-6 rounded-2xl border bg-primary/5 text-center">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-2" />
          <h2 className="text-xl font-bold">Path Complete!</h2>
          <p className="text-sm text-muted-foreground mt-1">You&apos;ve finished all {path.steps.length} lessons. Great job!</p>
          <Link href="/learning-paths" className={cn(buttonVariants(), "mt-4")}>Explore More Paths</Link>
        </motion.div>
      )}
    </div>
  );
}
