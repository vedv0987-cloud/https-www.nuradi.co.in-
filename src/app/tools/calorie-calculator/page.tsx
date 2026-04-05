"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateCalories,
  projectWeightWeeks,
  type Gender,
  type Activity,
  type Goal,
} from "@/lib/calculators/calorie-calculator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Tooltip as RTooltip,
  CartesianGrid,
} from "recharts";

const MEAL_PLANS = {
  veg: [
    { emoji: "🌅", meal: "Breakfast", items: "2 moong dal cheela + 1 glass milk + 1 banana", pct: 0.25 },
    { emoji: "🌞", meal: "Lunch", items: "2 roti + 1 katori rajma + 1 katori rice + salad + curd", pct: 0.35 },
    { emoji: "🍵", meal: "Snack", items: "1 handful almonds + 1 cup green tea + 1 apple", pct: 0.12 },
    { emoji: "🌙", meal: "Dinner", items: "2 roti + 1 katori palak paneer + salad", pct: 0.28 },
  ],
  nonveg: [
    { emoji: "🌅", meal: "Breakfast", items: "3 boiled eggs + 2 slices brown bread + 1 banana", pct: 0.25 },
    { emoji: "🌞", meal: "Lunch", items: "2 roti + grilled chicken curry + 1 katori rice + salad", pct: 0.35 },
    { emoji: "🍵", meal: "Snack", items: "Greek yogurt + 1 handful walnuts + green tea", pct: 0.12 },
    { emoji: "🌙", meal: "Dinner", items: "Grilled fish + sautéed veggies + 1 roti", pct: 0.28 },
  ],
  egg: [
    { emoji: "🌅", meal: "Breakfast", items: "2 egg omelet + 2 roti + 1 glass milk", pct: 0.25 },
    { emoji: "🌞", meal: "Lunch", items: "2 roti + 1 katori rajma + 1 katori rice + salad + curd", pct: 0.35 },
    { emoji: "🍵", meal: "Snack", items: "1 boiled egg + 1 handful almonds + green tea", pct: 0.12 },
    { emoji: "🌙", meal: "Dinner", items: "2 roti + 1 katori paneer bhurji + salad", pct: 0.28 },
  ],
};

export default function CalorieCalculatorPage() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [mealType, setMealType] = useState<"veg" | "nonveg" | "egg">("veg");

  const canCalc = gender && activity && goal && age > 0 && heightCm > 0 && weightKg > 0;

  const result = useMemo(() => {
    if (!canCalc) return null;
    return calculateCalories({
      gender: gender!,
      age,
      heightCm,
      weightKg,
      activity: activity!,
      goal: goal!,
    });
  }, [canCalc, gender, age, heightCm, weightKg, activity, goal]);

  const projection = useMemo(() => {
    if (!result || goal === "maintain") return null;
    return projectWeightWeeks(weightKg, result.tdee - result.goalCalories, 12);
  }, [result, weightKg, goal]);

  const inputs = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Gender</label>
        <RadioCards<Gender>
          columns={2}
          options={[
            { value: "male", label: "Male", icon: "👨" },
            { value: "female", label: "Female", icon: "👩" },
          ]}
          value={gender}
          onChange={setGender}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age</label>
          <Input type="number" min={15} max={80} value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Height (cm)</label>
          <Input type="number" min={120} max={220} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Weight (kg)</label>
          <Input type="number" min={30} max={250} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Activity Level</label>
        <RadioCards<Activity>
          options={[
            { value: "sedentary", label: "Sedentary", description: "Desk job, little exercise", icon: "🪑" },
            { value: "light", label: "Lightly Active", description: "Walk 1-3x/week", icon: "🚶" },
            { value: "moderate", label: "Moderately Active", description: "Exercise 3-5x/week", icon: "🏃" },
            { value: "very", label: "Very Active", description: "Intense exercise 6-7x/week", icon: "💪" },
            { value: "extreme", label: "Extremely Active", description: "Athlete / physical job", icon: "🔥" },
          ]}
          value={activity}
          onChange={setActivity}
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Goal</label>
        <RadioCards<Goal>
          options={[
            { value: "lose", label: "Lose Weight", description: "−500 cal/day deficit", icon: "🔻" },
            { value: "maintain", label: "Maintain Weight", description: "Hold current weight", icon: "⚖️" },
            { value: "gain", label: "Gain Muscle", description: "+500 cal/day surplus", icon: "🔺" },
          ]}
          value={goal}
          onChange={setGoal}
        />
      </div>
    </div>
  );

  const barData = result
    ? [
        { name: "BMR", value: result.bmr, fill: "#94a3b8" },
        { name: "TDEE", value: result.tdee, fill: "#06b6d4" },
        { name: "Goal", value: result.goalCalories, fill: goal === "lose" ? "#10b981" : goal === "gain" ? "#f59e0b" : "#06b6d4" },
      ]
    : [];

  const donutData = result
    ? [
        { name: "Protein", value: result.proteinPct, grams: result.proteinG, color: "#3b82f6" },
        { name: "Carbs", value: result.carbsPct, grams: result.carbsG, color: "#f59e0b" },
        { name: "Fat", value: result.fatPct, grams: result.fatG, color: "#ef4444" },
      ]
    : [];

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border bg-card p-10 text-center"
        >
          <div className="text-5xl mb-3">🔥</div>
          <p className="text-muted-foreground">Fill in your details to calculate your daily calorie needs.</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Big number */}
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Daily Calorie Need</p>
            <div className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              <AnimatedNumber value={result.goalCalories} /> <span className="text-2xl font-semibold text-muted-foreground">cal</span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <span><span className="text-muted-foreground">BMR:</span> <strong>{result.bmr}</strong></span>
              <span className="text-muted-foreground">·</span>
              <span><span className="text-muted-foreground">TDEE:</span> <strong>{result.tdee}</strong></span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">Calorie Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} label={{ position: "top", fill: "currentColor", fontSize: 13, fontWeight: 600 }}>
                  {barData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Macros */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">Daily Macros</h3>
            <div className="grid grid-cols-3 gap-3">
              {donutData.map((m) => (
                <div key={m.name} className="text-center p-4 rounded-xl" style={{ backgroundColor: `${m.color}15` }}>
                  <div className="text-2xl font-extrabold" style={{ color: m.color }}>
                    <AnimatedNumber value={m.grams} />g
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: m.color }}>{m.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{m.value}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Indian meal plan */}
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Your Indian Meal Plan</h3>
              <div className="flex gap-1">
                {(["veg", "egg", "nonveg"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setMealType(t)}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      mealType === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                    }`}
                  >
                    {t === "veg" ? "Veg" : t === "egg" ? "Egg" : "Non-Veg"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {MEAL_PLANS[mealType].map((m) => (
                <div key={m.meal} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-2xl flex-shrink-0">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-semibold text-sm">{m.meal}</p>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                        ~{Math.round(result.goalCalories * m.pct)} cal
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{m.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projection */}
          {projection && (
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-1">12-Week Weight Projection</h3>
              <p className="text-xs text-muted-foreground mb-4">
                If you consistently eat {result.goalCalories} cal/day
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={projection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="week" tick={{ fill: "currentColor", fontSize: 11 }} />
                  <YAxis tick={{ fill: "currentColor", fontSize: 11 }} unit=" kg" width={50} />
                  <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-center mt-3">
                <strong>Week 12:</strong> {projection[projection.length - 1].weight} kg
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="calorie-calculator"
      title="Calorie Calculator"
      description="Calculate your daily calorie needs using the proven Mifflin-St Jeor equation. Includes macros, Indian meal plans, and a 12-week weight projection."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
