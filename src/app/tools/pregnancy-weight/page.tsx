"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceArea, CartesianGrid, Tooltip as RTooltip } from "recharts";

type BMICategory = "under" | "normal" | "over" | "obese";

const GAIN_RANGES: Record<BMICategory, { min: number; max: number; label: string }> = {
  under: { min: 12.5, max: 18, label: "Underweight (BMI <18.5)" },
  normal: { min: 11.5, max: 16, label: "Normal (BMI 18.5-24.9)" },
  over: { min: 7, max: 11.5, label: "Overweight (BMI 25-29.9)" },
  obese: { min: 5, max: 9, label: "Obese (BMI ≥30)" },
};

function categorize(bmi: number): BMICategory {
  if (bmi < 18.5) return "under";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "over";
  return "obese";
}

export default function PregnancyWeightPage() {
  const [preWeight, setPreWeight] = useState(55);
  const [heightCm, setHeightCm] = useState(160);
  const [currentWeek, setCurrentWeek] = useState(20);
  const [currentWeight, setCurrentWeight] = useState(62);

  const result = useMemo(() => {
    const heightM = heightCm / 100;
    const preBMI = preWeight / (heightM * heightM);
    const cat = categorize(preBMI);
    const range = GAIN_RANGES[cat];
    const gained = +(currentWeight - preWeight).toFixed(1);

    // Generate expected curve
    const projection = [];
    for (let w = 0; w <= 40; w += 2) {
      // 1st tri: max 2kg by week 12. 2nd+3rd: ~0.4 kg/week for normal
      let expectedMin: number, expectedMax: number;
      if (w <= 12) {
        expectedMin = (w / 12) * (cat === "under" ? 2 : cat === "normal" ? 1.5 : cat === "over" ? 1 : 0.5);
        expectedMax = (w / 12) * (cat === "under" ? 2.5 : cat === "normal" ? 2 : 1.5);
      } else {
        const weeksAfter = w - 12;
        const minRate = (range.min - (cat === "under" ? 2 : cat === "normal" ? 1.5 : cat === "over" ? 1 : 0.5)) / 28;
        const maxRate = (range.max - (cat === "under" ? 2.5 : cat === "normal" ? 2 : 1.5)) / 28;
        expectedMin = (cat === "under" ? 2 : cat === "normal" ? 1.5 : cat === "over" ? 1 : 0.5) + minRate * weeksAfter;
        expectedMax = (cat === "under" ? 2.5 : cat === "normal" ? 2 : 1.5) + maxRate * weeksAfter;
      }
      projection.push({
        week: w,
        min: +expectedMin.toFixed(1),
        max: +expectedMax.toFixed(1),
        actual: w === currentWeek ? gained : null,
      });
    }

    // Weekly expected at current week
    const currentExpected = projection.find((p) => p.week >= currentWeek) || projection[projection.length - 1];
    const status: "under" | "on-track" | "over" =
      gained < currentExpected.min - 0.5 ? "under" :
      gained > currentExpected.max + 0.5 ? "over" : "on-track";

    return { preBMI: +preBMI.toFixed(1), cat, range, gained, projection, status, currentExpected };
  }, [preWeight, heightCm, currentWeek, currentWeight]);

  const statusColor = result.status === "on-track" ? "#10b981" : result.status === "under" ? "#3b82f6" : "#f59e0b";
  const statusMsg = result.status === "on-track" ? "Right on track ✓" : result.status === "under" ? "Gaining less than expected" : "Gaining more than expected";

  const inputs = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Pre-pregnancy weight (kg)</label>
          <Input type="number" value={preWeight} onChange={(e) => setPreWeight(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Height (cm)</label>
          <Input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Current pregnancy week: <strong>{currentWeek}</strong>
        </label>
        <input type="range" min={4} max={40} value={currentWeek} onChange={(e) => setCurrentWeek(Number(e.target.value))} className="w-full accent-pink-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Current weight (kg)</label>
        <Input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(Number(e.target.value))} />
      </div>
    </div>
  );

  const resultPanel = (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${statusColor}10`, borderColor: `${statusColor}40` }}>
        <div className="text-4xl mb-2">🤰</div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Weight Gained</p>
        <div className="text-6xl font-extrabold" style={{ color: statusColor }}>
          <AnimatedNumber value={result.gained} format={(n) => n.toFixed(1)} /> <span className="text-2xl">kg</span>
        </div>
        <p className="text-sm mt-3 font-bold" style={{ color: statusColor }}>{statusMsg}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Expected at week {currentWeek}: <strong>{result.currentExpected.min}-{result.currentExpected.max} kg</strong>
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Pre-pregnancy BMI</p>
        <p className="text-2xl font-bold">{result.preBMI} · {result.range.label.split("(")[0]}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Recommended total gain: <strong>{result.range.min}-{result.range.max} kg</strong>
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-4">Weight Gain Curve</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={result.projection}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} label={{ value: "Week", position: "insideBottom", offset: -5, fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} unit="kg" width={45} />
            <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Line type="monotone" dataKey="min" stroke="#10b981" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Min expected" />
            <Line type="monotone" dataKey="max" stroke="#10b981" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Max expected" />
            <Line type="monotone" dataKey="actual" stroke="#f43f5e" strokeWidth={0} dot={{ fill: "#f43f5e", r: 6 }} name="You" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  return (
    <CalculatorShell
      slug="pregnancy-weight"
      title="Pregnancy Weight Gain"
      description="Track healthy pregnancy weight gain based on your pre-pregnancy BMI. Compare your progress to the IOM-recommended curve."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
