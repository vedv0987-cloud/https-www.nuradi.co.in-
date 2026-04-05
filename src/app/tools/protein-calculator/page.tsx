"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateProtein,
  FOODS,
  type ProteinGoal,
  type DietType,
} from "@/lib/calculators/protein-calculator";

export default function ProteinCalculatorPage() {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [goal, setGoal] = useState<ProteinGoal | null>(null);
  const [diet, setDiet] = useState<DietType | null>(null);
  const [selected, setSelected] = useState<Record<string, number>>({});

  const result = useMemo(
    () => (goal ? calculateProtein(weightKg, goal) : null),
    [weightKg, goal]
  );

  const filteredFoods = useMemo(
    () => (diet ? FOODS.filter((f) => f.diet.includes(diet)) : []),
    [diet]
  );

  const totalSelected = useMemo(
    () =>
      Object.entries(selected).reduce((sum, [id, count]) => {
        const food = FOODS.find((f) => f.id === id);
        return sum + (food ? food.protein * count : 0);
      }, 0),
    [selected]
  );

  const progress = result ? Math.min(100, (totalSelected / result.target) * 100) : 0;

  const addFood = (id: string) =>
    setSelected((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  const removeFood = (id: string) =>
    setSelected((s) => {
      const n = (s[id] || 0) - 1;
      const { [id]: _, ...rest } = s;
      return n <= 0 ? rest : { ...s, [id]: n };
    });

  const inputs = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Your Weight (kg)</label>
        <Input type="number" min={30} max={250} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Your Goal</label>
        <RadioCards<ProteinGoal>
          options={[
            { value: "sedentary", label: "Sedentary", description: "0.8 g/kg — general health", icon: "🪑" },
            { value: "weight-loss", label: "Weight Loss", description: "1.2-1.6 g/kg — preserves muscle while cutting", icon: "🔻" },
            { value: "maintenance", label: "Maintenance", description: "1.0-1.2 g/kg — hold weight", icon: "⚖️" },
            { value: "muscle", label: "Muscle Building", description: "1.6-2.2 g/kg — gym regularly", icon: "💪" },
            { value: "athlete", label: "Athlete", description: "1.8-2.5 g/kg — competitive training", icon: "🏃" },
          ]}
          value={goal}
          onChange={setGoal}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Diet Type</label>
        <RadioCards<DietType>
          columns={2}
          options={[
            { value: "veg", label: "Vegetarian", icon: "🥦" },
            { value: "egg", label: "Eggetarian", icon: "🥚" },
            { value: "nonveg", label: "Non-Veg", icon: "🍗" },
            { value: "vegan", label: "Vegan", icon: "🌱" },
          ]}
          value={diet}
          onChange={setDiet}
        />
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result || !diet ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border bg-card p-10 text-center"
        >
          <div className="text-5xl mb-3">🥚</div>
          <p className="text-muted-foreground">Enter your weight, goal, and diet to calculate.</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Target */}
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Daily Protein Target</p>
            <div className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              <AnimatedNumber value={result.target} /><span className="text-2xl font-semibold text-muted-foreground">g</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Range: <strong>{result.min}g–{result.max}g</strong> per day
            </p>
          </div>

          {/* Gap vs Indian average */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3">You vs Average Indian Intake</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Avg Indian adult</span>
                  <strong>~55g</strong>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (55 / result.target) * 100)}%` }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gray-400"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Your target</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">{result.target}g</strong>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              You need <strong>{Math.max(0, result.target - 55)}g more</strong> daily than the average Indian gets.
            </p>
          </div>

          {/* Food builder */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-1">Build Your Protein Plan</h3>
            <p className="text-xs text-muted-foreground mb-4">Tap + to add servings. Hit your target!</p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span>Your plan: <span className="text-emerald-600 dark:text-emerald-400">{totalSelected}g</span></span>
                <span className="text-muted-foreground">Target: {result.target}g</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 15 }}
                  className={`h-full ${progress >= 100 ? "bg-emerald-500" : "bg-gradient-to-r from-emerald-500 to-teal-500"}`}
                />
              </div>
              {progress >= 100 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2"
                >
                  ✓ You&apos;ve hit your protein target!
                </motion.p>
              )}
            </div>

            {/* Food grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredFoods.map((food) => {
                const count = selected[food.id] || 0;
                return (
                  <div
                    key={food.id}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-colors ${count > 0 ? "border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20" : "bg-muted/30"}`}
                  >
                    <span className="text-xl flex-shrink-0">{food.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{food.name}</p>
                      <p className="text-[10px] text-muted-foreground">{food.protein}g · {food.serving}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => removeFood(food.id)}
                        disabled={count === 0}
                        className="w-6 h-6 rounded-full bg-background border flex items-center justify-center disabled:opacity-30 hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{count}</span>
                      <button
                        onClick={() => addFood(food.id)}
                        className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="protein-calculator"
      title="Protein Calculator"
      description="How much protein you need daily, plus an interactive builder with Indian foods to plan your intake."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
