"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import { calculateCalories, type Gender, type Activity } from "@/lib/calculators/calorie-calculator";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, CartesianGrid, ReferenceArea } from "recharts";

export default function CalorieDeficitPage() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [age, setAge] = useState(30);
  const [heightCm, setHeightCm] = useState(170);
  const [currentKg, setCurrentKg] = useState(80);
  const [goalKg, setGoalKg] = useState(70);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().slice(0, 10);
  });

  const result = useMemo(() => {
    if (!gender || !activity || currentKg <= goalKg) return null;
    const today = new Date();
    const target = new Date(targetDate);
    const days = Math.max(1, Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const weeks = days / 7;
    const weightToLose = currentKg - goalKg;
    const totalDeficit = weightToLose * 7700;
    const dailyDeficit = Math.round(totalDeficit / days);
    const kgPerWeek = weightToLose / weeks;

    const tdeeResult = calculateCalories({ gender, age, heightCm, weightKg: currentKg, activity, goal: "maintain" });
    const dailyCalories = tdeeResult.tdee - dailyDeficit;

    let warning: string | null = null;
    const minCals = gender === "male" ? 1500 : 1200;
    if (dailyCalories < minCals) warning = `Target is too aggressive — you'd eat only ${dailyCalories} cal/day (below safe minimum of ${minCals}).`;
    else if (dailyDeficit > 1000) warning = "Deficit > 1000 cal/day leads to muscle loss. Aim for 500-750.";
    else if (kgPerWeek > 1) warning = "Losing > 1 kg/week is unsustainable long-term.";

    // Generate projection chart
    const projection = [];
    const safeKgPerWeek = Math.min(0.75, kgPerWeek);
    for (let w = 0; w <= Math.ceil(weeks); w++) {
      projection.push({
        week: w,
        aggressive: +(currentKg - kgPerWeek * w).toFixed(1),
        safe: +Math.max(goalKg, currentKg - safeKgPerWeek * w).toFixed(1),
      });
    }

    return { days, weeks: Math.round(weeks), dailyDeficit, dailyCalories, tdee: tdeeResult.tdee, kgPerWeek: +kgPerWeek.toFixed(2), warning, projection, weightToLose };
  }, [gender, age, heightCm, currentKg, goalKg, activity, targetDate]);

  const inputs = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age</label>
          <Input type="number" min={15} max={80} value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Height (cm)</label>
          <Input type="number" min={120} max={220} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Gender</label>
        <RadioCards<Gender> columns={2} options={[{ value: "male", label: "Male", icon: "👨" }, { value: "female", label: "Female", icon: "👩" }]} value={gender} onChange={setGender} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Current (kg)</label>
          <Input type="number" value={currentKg} onChange={(e) => setCurrentKg(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Goal (kg)</label>
          <Input type="number" value={goalKg} onChange={(e) => setGoalKg(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Target Date</label>
        <Input type="date" value={targetDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setTargetDate(e.target.value)} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Activity</label>
        <RadioCards<Activity>
          options={[
            { value: "sedentary", label: "Sedentary", icon: "🪑" },
            { value: "light", label: "Light", icon: "🚶" },
            { value: "moderate", label: "Moderate", icon: "🏃" },
            { value: "very", label: "Very Active", icon: "💪" },
            { value: "extreme", label: "Extreme", icon: "🔥" },
          ]}
          value={activity}
          onChange={setActivity}
        />
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">📉</div>
          <p className="text-muted-foreground">Fill in details (goal must be less than current weight).</p>
        </motion.div>
      ) : (
        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Eat Daily</p>
            <div className="text-6xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              <AnimatedNumber value={result.dailyCalories} /><span className="text-2xl"> cal</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Deficit: <strong>{result.dailyDeficit}</strong> cal/day · <strong>{result.kgPerWeek} kg/week</strong>
            </p>
          </div>

          {result.warning && (
            <div className="rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-900/40 p-4 text-sm text-rose-700 dark:text-rose-300">
              ⚠️ {result.warning}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border bg-card p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Days left</p>
              <p className="text-xl font-extrabold">{result.days}</p>
            </div>
            <div className="rounded-xl border bg-card p-3 text-center">
              <p className="text-[10px] text-muted-foreground">To lose</p>
              <p className="text-xl font-extrabold">{result.weightToLose} kg</p>
            </div>
            <div className="rounded-xl border bg-card p-3 text-center">
              <p className="text-[10px] text-muted-foreground">TDEE</p>
              <p className="text-xl font-extrabold">{result.tdee}</p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">Weight Projection</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={result.projection}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="kg" width={45} />
                <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="aggressive" stroke="#ef4444" strokeWidth={2} dot={false} name="Your pace" />
                <Line type="monotone" dataKey="safe" stroke="#10b981" strokeWidth={2} dot={false} name="Safe pace (0.75 kg/wk)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 text-xs mt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-rose-500" /> Your pace</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500" /> Safe pace</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="calorie-deficit"
      title="Calorie Deficit Planner"
      description="Plan your weight loss: how many calories to cut daily to hit your target weight by a specific date."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
