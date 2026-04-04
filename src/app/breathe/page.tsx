"use client";

import { motion } from "motion/react";
import { Wind, Info } from "lucide-react";
import { BreathingExercise } from "@/components/breathing-exercise";

const BENEFITS = [
  "Reduces cortisol (stress hormone) by up to 25%",
  "Lowers blood pressure within 60 seconds",
  "Activates parasympathetic nervous system",
  "Improves focus and mental clarity",
  "Helps manage anxiety and panic attacks",
  "Promotes better sleep quality",
];

export default function BreathePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Wind className="w-4 h-4" />
          1-Minute Breathing Exercise
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">
          Breathe. Reset. Focus.
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Choose a breathing technique, press start, and follow the animated
          guide. Just 60 seconds to calm your mind.
        </p>
      </motion.div>

      <BreathingExercise />

      {/* Science Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 p-6 rounded-2xl border bg-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Why Breathing Exercises Work</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {benefit}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
