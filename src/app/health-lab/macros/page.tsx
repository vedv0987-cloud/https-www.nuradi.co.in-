"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Beef, Wheat, Droplets } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

type Goal = "lose" | "maintain" | "build";
type DietType = "balanced" | "highprotein" | "keto" | "lowfat";

interface MacroSplit {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroResult {
  split: MacroSplit;
  grams: { protein: number; carbs: number; fat: number };
  calories: { protein: number; carbs: number; fat: number };
  perMeal: { protein: number; carbs: number; fat: number };
}

const DIET_SPLITS: Record<DietType, MacroSplit> = {
  balanced: { protein: 30, carbs: 40, fat: 30 },
  highprotein: { protein: 40, carbs: 35, fat: 25 },
  keto: { protein: 25, carbs: 5, fat: 70 },
  lowfat: { protein: 30, carbs: 50, fat: 20 },
};

const DIET_LABELS: Record<DietType, string> = {
  balanced: "Balanced",
  highprotein: "High Protein",
  keto: "Keto",
  lowfat: "Low Fat",
};

const GOAL_LABELS: Record<Goal, string> = {
  lose: "Lose Fat",
  maintain: "Maintain",
  build: "Build Muscle",
};

const FOOD_EXAMPLES = {
  protein: ["Chicken breast", "Greek yogurt", "Eggs", "Salmon", "Tofu", "Whey protein"],
  carbs: ["Brown rice", "Sweet potato", "Oats", "Quinoa", "Banana", "Whole wheat bread"],
  fat: ["Avocado", "Almonds", "Olive oil", "Peanut butter", "Chia seeds", "Dark chocolate"],
};

function DonutChart({
  split,
  colors,
}: {
  split: MacroSplit;
  colors: { protein: string; carbs: string; fat: string };
}) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { key: "protein", value: split.protein, color: colors.protein },
    { key: "carbs", value: split.carbs, color: colors.carbs },
    { key: "fat", value: split.fat, color: colors.fat },
  ];

  let cumulativeOffset = 0;

  return (
    <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
      <circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke="currentColor"
        className="text-muted/10"
        strokeWidth="18"
      />
      {segments.map((seg, i) => {
        const segLen = (seg.value / 100) * circumference;
        const offset = circumference - segLen;
        const rotation = (cumulativeOffset / 100) * 360;
        cumulativeOffset += seg.value;

        return (
          <motion.circle
            key={seg.key}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="18"
            strokeLinecap="butt"
            strokeDasharray={`${segLen} ${circumference - segLen}`}
            strokeDashoffset={0}
            style={{ transformOrigin: "80px 80px", rotate: `${rotation}deg` }}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${segLen} ${circumference - segLen}` }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: "easeOut" }}
          />
        );
      })}
    </svg>
  );
}

export default function MacrosPage() {
  const [calories, setCalories] = useState(2000);
  const [goal, setGoal] = useState<Goal>("maintain");
  const [dietType, setDietType] = useState<DietType>("balanced");
  const [result, setResult] = useState<MacroResult | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const saved = loadFromLS<{
      calories: number; goal: Goal; dietType: DietType;
    }>("macros_inputs");
    if (saved) {
      setCalories(saved.calories);
      setGoal(saved.goal);
      setDietType(saved.dietType);
    }
  }, []);

  const calculate = useCallback(() => {
    const base = { ...DIET_SPLITS[dietType] };

    // Adjust for goal
    if (goal === "lose") {
      base.protein += 5;
      base.carbs -= 5;
    } else if (goal === "build") {
      base.protein += 5;
      base.fat -= 5;
    }

    // Ensure total is 100
    const total = base.protein + base.carbs + base.fat;
    base.protein = Math.round((base.protein / total) * 100);
    base.carbs = Math.round((base.carbs / total) * 100);
    base.fat = 100 - base.protein - base.carbs;

    const grams = {
      protein: Math.round((calories * (base.protein / 100)) / 4),
      carbs: Math.round((calories * (base.carbs / 100)) / 4),
      fat: Math.round((calories * (base.fat / 100)) / 9),
    };

    const cals = {
      protein: grams.protein * 4,
      carbs: grams.carbs * 4,
      fat: grams.fat * 9,
    };

    const perMeal = {
      protein: Math.round(grams.protein / 4),
      carbs: Math.round(grams.carbs / 4),
      fat: Math.round(grams.fat / 4),
    };

    setResult({ split: base, grams, calories: cals, perMeal });
    setVideos(
      searchRelatedVideos("macros " + DIET_LABELS[dietType] + " " + GOAL_LABELS[goal] + " meal plan protein")
    );
    saveToLS("macros_inputs", { calories, goal, dietType });
  }, [calories, goal, dietType]);

  const macroColors = {
    protein: "#ef4444",
    carbs: "#3b82f6",
    fat: "#f59e0b",
  };

  return (
    <ToolLayout
      toolId="macros"
      title="Macro Calculator"
      icon={PieChart}
      color="#22c55e"
      relatedVideos={videos}
      science="Macronutrients (protein, carbohydrates, and fat) provide the calories your body needs. Protein and carbs provide 4 calories per gram, while fat provides 9 calories per gram. The optimal macro split varies by goal: higher protein supports muscle building and satiety during fat loss, while adequate carbohydrates fuel intense exercise. Keto diets shift the body to use fat as its primary fuel source through ketosis. Research suggests that total calorie intake matters most for weight change, but macro ratios significantly affect body composition and performance."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
          {/* Daily Calories */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Daily Calories
            </label>
            <input
              type="number"
              min={800}
              max={6000}
              value={calories}
              onChange={(e) => setCalories(Math.max(800, Math.min(6000, Number(e.target.value))))}
              className="w-full h-11 px-4 rounded-lg border bg-background text-foreground text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Goal</label>
            <div className="flex gap-2">
              {(["lose", "maintain", "build"] as const).map((g) => (
                <Button
                  key={g}
                  variant={goal === g ? "default" : "outline"}
                  onClick={() => setGoal(g)}
                  className="flex-1"
                >
                  {GOAL_LABELS[g]}
                </Button>
              ))}
            </div>
          </div>

          {/* Diet Type */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Diet Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(["balanced", "highprotein", "keto", "lowfat"] as const).map((d) => (
                <Button
                  key={d}
                  variant={dietType === d ? "default" : "outline"}
                  onClick={() => setDietType(d)}
                  className="w-full"
                >
                  {DIET_LABELS[d]}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#22c55e] hover:bg-[#16a34a] text-white">
            Calculate Macros
          </Button>
        </motion.div>

        {/* Result Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="p-6 rounded-2xl border bg-card space-y-6"
              >
                {/* Donut Chart */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <DonutChart split={result.split} colors={macroColors} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                      <span className="text-2xl font-black">{calories}</span>
                      <span className="text-xs text-muted-foreground">kcal/day</span>
                    </div>
                  </div>
                </div>

                {/* Macro Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { key: "protein", label: "Protein", icon: Beef, color: macroColors.protein },
                      { key: "carbs", label: "Carbs", icon: Wheat, color: macroColors.carbs },
                      { key: "fat", label: "Fat", icon: Droplets, color: macroColors.fat },
                    ] as const
                  ).map((macro, i) => (
                    <motion.div
                      key={macro.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="p-3 rounded-xl text-center border"
                      style={{ borderColor: `${macro.color}30`, backgroundColor: `${macro.color}08` }}
                    >
                      <macro.icon className="w-5 h-5 mx-auto mb-1" style={{ color: macro.color }} />
                      <p className="text-xs text-muted-foreground">{macro.label}</p>
                      <p className="text-lg font-black" style={{ color: macro.color }}>
                        {result.grams[macro.key]}g
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {result.split[macro.key]}% / {result.calories[macro.key]} kcal
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Per Meal Breakdown */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <p className="text-xs font-medium text-muted-foreground">Per Meal (4 meals/day)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((meal) => (
                      <div key={meal} className="p-2 rounded-lg bg-muted/40 text-center">
                        <p className="text-[10px] text-muted-foreground mb-1">Meal {meal}</p>
                        <p className="text-xs">
                          <span style={{ color: macroColors.protein }}>{result.perMeal.protein}g P</span>
                        </p>
                        <p className="text-xs">
                          <span style={{ color: macroColors.carbs }}>{result.perMeal.carbs}g C</span>
                        </p>
                        <p className="text-xs">
                          <span style={{ color: macroColors.fat }}>{result.perMeal.fat}g F</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Food Examples */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <p className="text-xs font-medium text-muted-foreground">Food Examples</p>
                  {(
                    [
                      { key: "protein", label: "Protein Sources", color: macroColors.protein },
                      { key: "carbs", label: "Carb Sources", color: macroColors.carbs },
                      { key: "fat", label: "Fat Sources", color: macroColors.fat },
                    ] as const
                  ).map((cat) => (
                    <div key={cat.key} className="flex flex-wrap gap-1.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.label}
                      </span>
                      {FOOD_EXAMPLES[cat.key].map((food) => (
                        <span
                          key={food}
                          className="text-[10px] px-2 py-0.5 rounded-full border"
                          style={{ borderColor: `${cat.color}30` }}
                        >
                          {food}
                        </span>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <PieChart className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Set your calories and preferences, then click Calculate to see your macro split</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
