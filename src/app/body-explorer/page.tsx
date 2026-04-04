"use client";

import { motion } from "motion/react";
import { Stethoscope } from "lucide-react";
import { bodyParts } from "@/data/body-parts";
import { BodyPartGrid } from "@/components/body-part-grid";

export default function BodyExplorerPage() {
  const totalVideos = bodyParts.reduce((sum, bp) => sum + bp.videoCount, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Stethoscope className="w-4 h-4" />
          Body Explorer
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">
          Explore by Body Part
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Tap any organ to discover curated videos about that body system.
          {totalVideos > 0 && (
            <span className="block mt-1 text-sm">
              {totalVideos}+ related videos across 28 channels
            </span>
          )}
        </p>
      </motion.div>

      <BodyPartGrid parts={bodyParts} />
    </div>
  );
}
