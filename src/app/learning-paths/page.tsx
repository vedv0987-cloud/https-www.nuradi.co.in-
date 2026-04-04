"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, Clock, BarChart, ChevronRight, Heart, Brain, Syringe, TrendingDown, Moon } from "lucide-react";
import { LEARNING_PATHS } from "@/data/learning-paths";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ICON_MAP: Record<string, React.ElementType> = { Heart, Brain, Syringe, TrendingDown, Moon };

export default function LearningPathsPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" /> Structured Learning
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Learning Paths</h1>
        <p className="text-muted-foreground mt-2">Expert-curated video courses on health topics. Learn step by step.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {LEARNING_PATHS.map((path, i) => {
          const PathIcon = ICON_MAP[path.icon] || BookOpen;
          return (
            <motion.div key={path.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
              <Link href={`/learning-paths/${path.slug}`} className="group block p-6 rounded-2xl border bg-card hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${path.color}15` }}>
                    <PathIcon className="w-6 h-6" style={{ color: path.color }} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold group-hover:text-primary transition-colors">{path.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {path.totalVideos} videos</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {path.totalDuration}</span>
                      <Badge variant="secondary" className="text-[10px]">{path.difficulty}</Badge>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                      Start learning <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
