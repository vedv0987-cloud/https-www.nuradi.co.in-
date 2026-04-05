"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";

export default function SittingCalculatorPage() {
  const [workHrs, setWorkHrs] = useState(8);
  const [commuteHrs, setCommuteHrs] = useState(1);
  const [homeHrs, setHomeHrs] = useState(3);
  const [exerciseMin, setExerciseMin] = useState(30);

  const result = useMemo(() => {
    const totalSitting = workHrs + commuteHrs + homeHrs;
    const wakingHours = 16;
    const ratio = totalSitting / wakingHours;
    const exerciseOffset = Math.min(0.15, exerciseMin / 200);
    const adjustedRatio = Math.max(0, ratio - exerciseOffset);

    let risk: string, color: string, desc: string;
    if (adjustedRatio < 0.3) { risk = "Low Risk"; color = "#10b981"; desc = "You move enough throughout the day."; }
    else if (adjustedRatio < 0.5) { risk = "Moderate Risk"; color = "#f59e0b"; desc = "Try to move every hour."; }
    else if (adjustedRatio < 0.65) { risk = "High Risk"; color = "#f97316"; desc = "Equivalent metabolic risk to smoking 5 cigs/day."; }
    else { risk = "Very High Risk"; color = "#ef4444"; desc = "Sitting this much raises heart disease risk ~2x."; }

    return { totalSitting, ratio: Math.round(ratio * 100), risk, color, desc };
  }, [workHrs, commuteHrs, homeHrs, exerciseMin]);

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Work sitting: <strong>{workHrs}h</strong>
        </label>
        <input type="range" min={0} max={14} value={workHrs} onChange={(e) => setWorkHrs(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Commute sitting: <strong>{commuteHrs}h</strong>
        </label>
        <input type="range" min={0} max={4} value={commuteHrs} onChange={(e) => setCommuteHrs(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Home sitting (TV, meals): <strong>{homeHrs}h</strong>
        </label>
        <input type="range" min={0} max={8} value={homeHrs} onChange={(e) => setHomeHrs(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Daily exercise: <strong>{exerciseMin} min</strong>
        </label>
        <input type="range" min={0} max={120} value={exerciseMin} onChange={(e) => setExerciseMin(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
    </div>
  );

  const resultPanel = (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${result.color}10`, borderColor: `${result.color}40` }}>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">You Sit For</p>
        <div className="text-6xl font-extrabold" style={{ color: result.color }}>
          <AnimatedNumber value={result.totalSitting} />h
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          That&apos;s <strong>{result.ratio}%</strong> of your waking hours
        </p>
        <p className="text-xl font-bold mt-3" style={{ color: result.color }}>{result.risk}</p>
        <p className="text-sm text-muted-foreground mt-1">{result.desc}</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-3">Hourly Movement Plan</h3>
        <div className="space-y-2">
          {[
            { time: "Every 30 min", action: "Stand & stretch (1 min)", emoji: "🧍" },
            { time: "Every 1 hour", action: "Walk around office (2-3 min)", emoji: "🚶" },
            { time: "Every 2 hours", action: "Climb stairs or do squats (5 min)", emoji: "🪜" },
            { time: "Lunch break", action: "15-min walk outside", emoji: "☀️" },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs">{p.time}</p>
                <p className="text-xs text-muted-foreground">{p.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <CalculatorShell
      slug="sitting-calculator"
      title="Sitting Disease Risk"
      description="Hours you sit vs healthy benchmark. 'Sitting is the new smoking' — see your metabolic risk + action plan."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
