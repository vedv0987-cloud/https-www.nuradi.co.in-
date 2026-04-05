"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus } from "lucide-react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  THALI_ITEMS,
  sumNutrition,
  GOAL_TARGETS,
  type ThaliItem,
  type ThaliCategory,
  type ThaliGoal,
} from "@/lib/calculators/thali-builder";

const CATEGORY_LABELS: Record<ThaliCategory, string> = {
  roti: "Roti",
  rice: "Rice",
  dal: "Dal",
  sabzi: "Sabzi",
  extras: "Extras",
  drinks: "Drinks",
};

export default function ThaliBuilderPage() {
  const [selected, setSelected] = useState<ThaliItem[]>([]);
  const [goal, setGoal] = useState<ThaliGoal>("balanced");
  const [activeCat, setActiveCat] = useState<ThaliCategory>("roti");

  const totals = useMemo(() => sumNutrition(selected), [selected]);
  const target = GOAL_TARGETS[goal];

  const addItem = (item: ThaliItem) =>
    setSelected((s) => [...s, { ...item, id: `${item.id}-${Date.now()}` }]);
  const removeItem = (id: string) =>
    setSelected((s) => s.filter((i) => i.id !== id));

  const categoryItems = THALI_ITEMS.filter((i) => i.category === activeCat);

  const pct = (n: number, t: number) => Math.min(150, (n / t) * 100);
  const barColor = (value: number, target: number) => {
    const p = (value / target) * 100;
    if (p < 50) return "#94a3b8";
    if (p <= 110) return "#10b981";
    return "#ef4444";
  };

  const inputPanel = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Goal</label>
        <RadioCards<ThaliGoal>
          columns={1}
          options={[
            { value: "balanced", label: "Balanced Meal", icon: "⚖️" },
            { value: "weight-loss", label: "Weight Loss", icon: "🔻" },
            { value: "diabetes", label: "Diabetes-Friendly", icon: "🩸" },
            { value: "high-protein", label: "High Protein", icon: "💪" },
            { value: "heart", label: "Heart-Healthy", icon: "❤️" },
          ]}
          value={goal}
          onChange={setGoal}
        />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Add to Thali</label>
        {/* Category tabs */}
        <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
          {(Object.keys(CATEGORY_LABELS) as ThaliCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                activeCat === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-foreground hover:bg-muted-foreground/10"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {categoryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => addItem(item)}
              className="flex items-center gap-3 p-2.5 rounded-xl border bg-card hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors text-left group"
            >
              <span className="text-2xl flex-shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.calories} cal · {item.protein}g protein · {item.fiber}g fiber
                </p>
              </div>
              <Plus className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const resultPanel = (
    <div className="space-y-6">
      {/* Thali plate */}
      <div className="rounded-2xl border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6">
        <h3 className="font-bold mb-3 flex items-center gap-2">🍽️ Your Thali</h3>
        {selected.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground text-sm">Add items from the left to build your meal</p>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {selected.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-card"
                >
                  <span className="text-xl flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.calories} cal</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-500/20 flex-shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Nutrition vs target */}
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Nutrition</h3>
          <span className="text-xs text-muted-foreground">Target: {target.label}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Calories</p>
            <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              <AnimatedNumber value={totals.calories} />
            </p>
            <p className="text-[10px] text-muted-foreground">target: {target.calories}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Protein</p>
            <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">
              <AnimatedNumber value={totals.protein} />g
            </p>
            <p className="text-[10px] text-muted-foreground">target: {target.protein}g</p>
          </div>
        </div>

        {/* Macro bars */}
        <div className="space-y-3">
          {[
            { name: "Carbs", value: totals.carbs, target: target.carbs, unit: "g" },
            { name: "Fat", value: totals.fat, target: target.fat, unit: "g" },
            { name: "Fiber", value: totals.fiber, target: target.fiber, unit: "g" },
            { name: "Sodium", value: totals.sodium, target: target.sodium, unit: "mg" },
          ].map((m) => (
            <div key={m.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold">{m.name}</span>
                <span><strong>{m.value}</strong>{m.unit} <span className="text-muted-foreground">/ {m.target}{m.unit}</span></span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${pct(m.value, m.target)}%` }}
                  transition={{ type: "spring", damping: 15 }}
                  className="h-full"
                  style={{ backgroundColor: barColor(m.value, m.target) }}
                />
              </div>
            </div>
          ))}
        </div>

        {selected.length > 0 && totals.sodium > target.sodium && (
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-4">
            ⚠️ Sodium is {Math.round(((totals.sodium - target.sodium) / target.sodium) * 100)}% over target — consider reducing pickle/papad.
          </p>
        )}
        {selected.length > 0 && totals.protein < target.protein * 0.7 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-4">
            💡 Protein is low — add more dal, paneer, or curd to balance.
          </p>
        )}
        {selected.length > 0 && totals.calories >= target.calories * 0.9 && totals.calories <= target.calories * 1.1 && totals.protein >= target.protein * 0.8 && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-4 font-semibold">
            ✓ Well-balanced thali for your goal!
          </p>
        )}
      </div>
    </div>
  );

  return (
    <CalculatorShell
      slug="thali-builder"
      title="Indian Thali Builder"
      description="Build a balanced Indian meal. Add roti, rice, dal, sabzi & extras — see live nutrition totals against your goal."
      inputs={inputPanel}
      result={resultPanel}
    />
  );
}
