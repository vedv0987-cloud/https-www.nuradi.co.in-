"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Utensils, TrendingDown, TrendingUp, Minus as MinusIcon } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

type Gender = "male" | "female";
type Goal = "lose" | "maintain" | "gain";

interface ActivityLevel {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

const ACTIVITY_LEVELS: ActivityLevel[] = [
  { id: "sedentary", label: "Sedentary", description: "Little or no exercise, desk job", multiplier: 1.2 },
  { id: "light", label: "Lightly Active", description: "Light exercise 1-3 days/week", multiplier: 1.375 },
  { id: "moderate", label: "Moderately Active", description: "Moderate exercise 3-5 days/week", multiplier: 1.55 },
  { id: "very", label: "Very Active", description: "Hard exercise 6-7 days/week", multiplier: 1.725 },
  { id: "extreme", label: "Extremely Active", description: "Very intense exercise, physical job", multiplier: 1.9 },
];

const GOAL_CONFIG: Record<Goal, { label: string; icon: React.ElementType; offset: number; color: string; description: string }> = {
  lose: { label: "Lose Weight", icon: TrendingDown, offset: -500, color: "#3b82f6", description: "Calorie deficit for steady fat loss" },
  maintain: { label: "Maintain", icon: MinusIcon, offset: 0, color: "#22c55e", description: "Keep your current weight stable" },
  gain: { label: "Gain Weight", icon: TrendingUp, offset: 500, color: "#f59e0b", description: "Calorie surplus for muscle building" },
};

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    const startVal = display;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);
      setDisplay(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

export default function CalorieCalculatorPage() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [tdee, setTdee] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const saved = loadFromLS<{
      gender: Gender; age: number; heightCm: number; weightKg: number;
      activityLevel: string; goal: Goal;
    }>("calories_inputs");
    if (saved) {
      setGender(saved.gender);
      setAge(saved.age);
      setHeightCm(saved.heightCm);
      setWeightKg(saved.weightKg);
      setActivityLevel(saved.activityLevel);
      setGoal(saved.goal);
    }
  }, []);

  const calculate = useCallback(() => {
    // Mifflin-St Jeor Equation
    let baseBmr: number;
    if (gender === "male") {
      baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const activity = ACTIVITY_LEVELS.find((a) => a.id === activityLevel)!;
    const calculatedTdee = Math.round(baseBmr * activity.multiplier);

    setBmr(Math.round(baseBmr));
    setTdee(calculatedTdee);

    const goalLabel = goal === "lose" ? "weight loss" : goal === "gain" ? "muscle gain" : "maintenance";
    setVideos(searchRelatedVideos(`calories nutrition meal plan ${goalLabel}`));

    saveToLS("calories_inputs", { gender, age, heightCm, weightKg, activityLevel, goal });
  }, [gender, age, heightCm, weightKg, activityLevel, goal]);

  const mealBreakdown = tdee
    ? {
        breakfast: Math.round((tdee + GOAL_CONFIG[goal].offset) * 0.25),
        lunch: Math.round((tdee + GOAL_CONFIG[goal].offset) * 0.35),
        dinner: Math.round((tdee + GOAL_CONFIG[goal].offset) * 0.30),
        snacks: Math.round((tdee + GOAL_CONFIG[goal].offset) * 0.10),
      }
    : null;

  return (
    <ToolLayout
      toolId="calories"
      title="Calorie Calculator"
      icon={Flame}
      color="#f97316"
      relatedVideos={videos}
      science="This calculator uses the Mifflin-St Jeor equation, considered the most accurate formula for estimating Basal Metabolic Rate (BMR). BMR represents the calories your body burns at complete rest. Your Total Daily Energy Expenditure (TDEE) is then calculated by multiplying BMR by an activity factor. For weight loss, a 500-calorie daily deficit results in approximately 1 pound of fat loss per week; for muscle gain, a 500-calorie surplus provides the energy needed for muscle protein synthesis."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-5 p-6 rounded-2xl border bg-card"
        >
          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Gender</label>
            <div className="flex gap-2">
              {(["male", "female"] as const).map((g) => (
                <Button
                  key={g}
                  variant={gender === g ? "default" : "outline"}
                  onClick={() => setGender(g)}
                  className="flex-1 capitalize"
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Age: <span className="text-foreground font-bold">{age}</span>
            </label>
            <input
              type="range"
              min={15}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#f97316]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15</span>
              <span>80</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Height: <span className="text-foreground font-bold">{heightCm} cm</span>
            </label>
            <input
              type="range"
              min={120}
              max={220}
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-[#f97316]"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Weight: <span className="text-foreground font-bold">{weightKg} kg</span>
            </label>
            <input
              type="range"
              min={30}
              max={200}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[#f97316]"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Activity Level</label>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActivityLevel(a.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all text-sm",
                    activityLevel === a.id
                      ? "border-[#f97316] bg-[#f97316]/10 ring-1 ring-[#f97316]/30"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span className="font-medium">{a.label}</span>
                  <span className="text-muted-foreground ml-2 text-xs">{a.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Goal</label>
            <div className="flex gap-2">
              {(["lose", "maintain", "gain"] as const).map((g) => {
                const cfg = GOAL_CONFIG[g];
                return (
                  <Button
                    key={g}
                    variant={goal === g ? "default" : "outline"}
                    onClick={() => setGoal(g)}
                    className="flex-1"
                  >
                    {cfg.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#f97316] hover:bg-[#ea580c] text-white">
            Calculate Calories
          </Button>
        </motion.div>

        {/* Result Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {tdee !== null && bmr !== null ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="space-y-6"
              >
                {/* TDEE Number */}
                <div className="p-6 rounded-2xl border bg-card text-center">
                  <p className="text-sm text-muted-foreground mb-1">Your Daily Energy Expenditure</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-5xl font-black text-[#f97316]"
                  >
                    <AnimatedNumber value={tdee} />
                  </motion.div>
                  <p className="text-muted-foreground text-sm mt-1">calories/day</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Basal Metabolic Rate: <span className="font-medium text-foreground">{bmr} cal</span>
                  </p>
                </div>

                {/* 3 Goal Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {(["lose", "maintain", "gain"] as const).map((g, i) => {
                    const cfg = GOAL_CONFIG[g];
                    const GoalIcon = cfg.icon;
                    const cals = tdee + cfg.offset;
                    return (
                      <motion.div
                        key={g}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className={cn(
                          "p-4 rounded-xl border text-center",
                          goal === g ? "ring-2" : ""
                        )}
                        style={{
                          borderColor: goal === g ? cfg.color : undefined,
                          backgroundColor: goal === g ? `${cfg.color}10` : undefined,
                        }}
                      >
                        <GoalIcon className="w-5 h-5 mx-auto mb-1" style={{ color: cfg.color }} />
                        <p className="text-xs text-muted-foreground">{cfg.label}</p>
                        <p className="text-lg font-bold" style={{ color: cfg.color }}>
                          {cals.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground">cal/day</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Meal Breakdown */}
                {mealBreakdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-5 rounded-2xl border bg-card"
                  >
                    <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
                      <Utensils className="w-4 h-4 text-[#f97316]" /> Daily Meal Breakdown
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Breakfast", pct: 25, cal: mealBreakdown.breakfast, color: "#f97316" },
                        { label: "Lunch", pct: 35, cal: mealBreakdown.lunch, color: "#22c55e" },
                        { label: "Dinner", pct: 30, cal: mealBreakdown.dinner, color: "#3b82f6" },
                        { label: "Snacks", pct: 10, cal: mealBreakdown.snacks, color: "#8b5cf6" },
                      ].map((meal, i) => (
                        <div key={meal.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{meal.label} ({meal.pct}%)</span>
                            <span className="font-bold">{meal.cal} cal</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${meal.pct}%` }}
                              transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: meal.color, maxWidth: "100%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <Flame className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Configure your details and hit Calculate to see your daily calorie needs</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
