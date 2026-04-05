"use client";

import { motion } from "motion/react";
import { SEASONS, getCurrentSeason } from "@/data/seasonal-guide";

export default function SeasonalPage() {
  const current = getCurrentSeason();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Current season hero */}
        <div
          className="rounded-2xl border-2 p-8 text-center mb-10"
          style={{ backgroundColor: `${current.color}10`, borderColor: `${current.color}60` }}
        >
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Right Now</div>
          <div className="text-7xl mb-3">{current.emoji}</div>
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: current.color }}>{current.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">Your complete health guide for this season</p>
        </div>

        {/* Current season details */}
        <SeasonCard season={current} current />

        {/* All seasons */}
        <h2 className="text-2xl font-bold mt-12 mb-6">All Seasons</h2>
        <div className="space-y-6">
          {SEASONS.filter((s) => s.name !== current.name).map((s) => (
            <SeasonCard key={s.name} season={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SeasonCard({ season, current = false }: { season: (typeof SEASONS)[number]; current?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl border ${current ? "border-2" : ""} bg-card p-6`}
      style={current ? { borderColor: `${season.color}60` } : {}}
    >
      {!current && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{season.emoji}</span>
          <h3 className="text-xl font-bold" style={{ color: season.color }}>{season.name}</h3>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">⚠️ Top Risks</h4>
          <ul className="space-y-1 text-sm">
            {season.risks.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="text-rose-500 flex-shrink-0">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">✓ Health Tips</h4>
          <ul className="space-y-1 text-sm">
            {season.tips.slice(0, 5).map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-emerald-500 flex-shrink-0">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">🍛 Seasonal Foods</h4>
        <div className="flex flex-wrap gap-1.5">
          {season.foods.map((f) => (
            <span key={f} className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted">{f}</span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">🥘 Seasonal Recipes</h4>
        <p className="text-xs text-muted-foreground">{season.recipes.join(" · ")}</p>
      </div>
    </motion.div>
  );
}
