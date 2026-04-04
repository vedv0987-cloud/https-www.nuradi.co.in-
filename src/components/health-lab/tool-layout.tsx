"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, AlertCircle } from "lucide-react";
import { VideoCard } from "@/components/video-card";
import { Video } from "@/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const OTHER_TOOLS = [
  { id: "bmi", name: "BMI", color: "#10b981" },
  { id: "calories", name: "Calories", color: "#f97316" },
  { id: "water", name: "Water", color: "#3b82f6" },
  { id: "heart-rate", name: "Heart Rate", color: "#ec4899" },
  { id: "body-fat", name: "Body Fat", color: "#f59e0b" },
  { id: "macros", name: "Macros", color: "#22c55e" },
  { id: "sleep", name: "Sleep", color: "#8b5cf6" },
  { id: "fasting", name: "Fasting", color: "#14b8a6" },
];

export function ToolLayout({
  toolId,
  title,
  icon: Icon,
  color,
  children,
  relatedVideos = [],
  science,
}: {
  toolId: string;
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
  relatedVideos?: Video[];
  science?: string;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/health-lab"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Health Lab
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      </motion.div>

      {children}

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="text-lg font-bold mb-4">Related Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedVideos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Science */}
      {science && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-5 rounded-xl border bg-muted/30"
        >
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-primary" /> How This Works
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{science}</p>
        </motion.div>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-muted-foreground text-center mt-6">
        This tool is for educational purposes only. Not medical advice. Consult a healthcare professional.
      </p>

      {/* Try Another Tool */}
      <div className="mt-10 border-t pt-8">
        <h3 className="font-bold mb-3">Try Another Tool</h3>
        <div className="flex flex-wrap gap-2">
          {OTHER_TOOLS.filter((t) => t.id !== toolId).map((t) => (
            <Link
              key={t.id}
              href={`/health-lab/${t.id}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              {t.name}
              <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
