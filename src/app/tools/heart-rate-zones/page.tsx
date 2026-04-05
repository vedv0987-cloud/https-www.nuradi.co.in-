"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";

const ZONES = [
  { name: "Zone 1", pct: [50, 60], label: "Warm-up / Recovery", color: "#94a3b8", use: "Easy walking, stretching", calsPerMin: 4 },
  { name: "Zone 2", pct: [60, 70], label: "Fat Burn", color: "#10b981", use: "Brisk walk, easy cycling", calsPerMin: 7 },
  { name: "Zone 3", pct: [70, 80], label: "Aerobic / Cardio", color: "#06b6d4", use: "Jogging, cycling", calsPerMin: 10 },
  { name: "Zone 4", pct: [80, 90], label: "Anaerobic", color: "#f59e0b", use: "Running, HIIT", calsPerMin: 13 },
  { name: "Zone 5", pct: [90, 100], label: "Max Effort (VO2 Max)", color: "#ef4444", use: "Sprints, max intervals", calsPerMin: 16 },
];

export default function HeartRateZonesPage() {
  const [age, setAge] = useState(30);
  const [restingHR, setRestingHR] = useState(65);

  const zones = useMemo(() => {
    const maxHR = 220 - age;
    const hrReserve = maxHR - restingHR;
    return ZONES.map((z) => ({
      ...z,
      // Karvonen: target = ((max - resting) × intensity%) + resting
      min: Math.round((hrReserve * z.pct[0]) / 100 + restingHR),
      max: Math.round((hrReserve * z.pct[1]) / 100 + restingHR),
    }));
  }, [age, restingHR]);

  const maxHR = 220 - age;

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Your Age</label>
        <Input type="number" min={15} max={90} value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Resting HR (BPM)</label>
        <Input type="number" min={40} max={120} value={restingHR} onChange={(e) => setRestingHR(Number(e.target.value))} />
        <p className="text-[10px] text-muted-foreground mt-1">Check in the morning, before getting out of bed.</p>
      </div>
      <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
        💡 Formula: Karvonen — ((Max HR − Resting HR) × intensity%) + Resting HR
      </div>
    </div>
  );

  const resultPanel = (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-2xl border bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 p-6 text-center">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-4xl mb-2">💓</motion.div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Max Heart Rate</p>
        <p className="text-5xl font-extrabold text-rose-700 dark:text-rose-300">
          <AnimatedNumber value={maxHR} /> <span className="text-xl">BPM</span>
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-4">Your 5 Training Zones</h3>
        <div className="space-y-3">
          {zones.map((z) => (
            <motion.div
              key={z.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ZONES.indexOf(ZONES.find((x) => x.name === z.name)!) * 0.1 }}
              className="rounded-xl border-l-4 p-3 bg-muted/30"
              style={{ borderLeftColor: z.color }}
            >
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: z.color }}>{z.name}</span>
                  <span className="text-sm font-semibold">{z.label}</span>
                </div>
                <span className="text-base font-extrabold" style={{ color: z.color }}>{z.min}-{z.max}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{z.use}</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${z.pct[1]}%`, backgroundColor: z.color, opacity: 0.3 }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">~{z.calsPerMin} cal/min</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 text-sm">
        <p><strong className="text-emerald-700 dark:text-emerald-300">Fat burn zone:</strong> keep HR between <strong>{zones[1].min}-{zones[1].max} BPM</strong>. Most efficient for burning fat stores over 30-60 minutes.</p>
      </div>
    </motion.div>
  );

  return (
    <CalculatorShell
      slug="heart-rate-zones"
      title="Heart Rate Zones"
      description="Your 5 training zones calculated via the Karvonen formula. Know exactly which BPM range to target for fat burn, cardio, or peak performance."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
