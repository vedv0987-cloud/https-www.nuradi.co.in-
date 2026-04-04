"use client";

import { motion } from "motion/react";

export interface InfographicTip {
  text: string;
  emoji: string;
}

export interface InfographicData {
  id: number;
  disease: string;
  icon: string;
  category: string;
  categoryLabel: string;
  color: string;
  bg: string;
  tips: InfographicTip[];
}

export function InfographicCard({
  data,
  index = 0,
}: {
  data: InfographicData;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      style={{ backgroundColor: data.bg }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">
          Tips for
        </p>
        <h3
          className="text-lg font-extrabold uppercase tracking-wide"
          style={{ color: data.color }}
        >
          {data.disease}
        </h3>
      </div>

      {/* Center Icon */}
      <div className="flex justify-center py-3">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
          style={{ backgroundColor: `${data.color}20`, border: `3px solid ${data.color}40` }}
        >
          {data.icon}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        {data.tips.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-2.5 rounded-xl bg-white/60 dark:bg-black/10"
          >
            <span className="text-lg flex-shrink-0 mt-0.5">{tip.emoji}</span>
            <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 leading-tight uppercase">
              {tip.text}
            </span>
          </div>
        ))}
      </div>

      {/* Category Badge */}
      <div className="px-4 pb-4 flex justify-center">
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: data.color }}
        >
          {data.categoryLabel}
        </span>
      </div>
    </motion.div>
  );
}
