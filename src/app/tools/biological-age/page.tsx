"use client";

import { useState, useMemo, useCallback } from "react";
import { PremiumGate } from "@/components/premium-gate";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Brain,
  Moon,
  Apple,
  Dumbbell,
  Shield,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  // Step 1 — Basic Info
  age: number | "";
  gender: string;
  height: number | "";
  weight: number | "";
  // Step 2 — Lifestyle
  exercise: string;
  smoking: string;
  alcohol: string;
  sitting: string;
  // Step 3 — Diet
  fruits: string;
  water: string;
  processed: string;
  sugar: string;
  // Step 4 — Sleep & Stress
  sleepHours: number | "";
  sleepQuality: string;
  stress: string;
  meditation: string;
  // Step 5 — Health
  conditions: string[];
  familyHistory: string;
  checkup: string;
}

const INITIAL: FormData = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  exercise: "",
  smoking: "",
  alcohol: "",
  sitting: "",
  fruits: "",
  water: "",
  processed: "",
  sugar: "",
  sleepHours: "",
  sleepQuality: "",
  stress: "",
  meditation: "",
  conditions: [],
  familyHistory: "",
  checkup: "",
};

/* ------------------------------------------------------------------ */
/*  Steps metadata                                                     */
/* ------------------------------------------------------------------ */

const STEPS = [
  { label: "Basic Info", icon: Activity },
  { label: "Lifestyle", icon: Dumbbell },
  { label: "Diet", icon: Apple },
  { label: "Sleep & Stress", icon: Moon },
  { label: "Health", icon: Shield },
];

/* ------------------------------------------------------------------ */
/*  Reusable option‑button grid                                        */
/* ------------------------------------------------------------------ */

function OptionGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4"
      )}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all",
            value === o.value
              ? "border-violet-500 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-500/10"
              : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkbox grid (for chronic conditions)                             */
/* ------------------------------------------------------------------ */

function CheckboxGrid({
  options,
  values,
  onChange,
}: {
  options: { label: string; value: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (val: string) => {
    if (val === "none") {
      onChange(values.includes("none") ? [] : ["none"]);
      return;
    }
    const without = values.filter((v) => v !== "none");
    if (without.includes(val)) {
      onChange(without.filter((v) => v !== val));
    } else {
      onChange([...without, val]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((o) => {
        const active = values.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={cn(
              "flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all",
              active
                ? "border-violet-500 bg-violet-500/10 text-violet-300"
                : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                active
                  ? "border-violet-500 bg-violet-500"
                  : "border-white/20"
              )}
            >
              {active && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
            </div>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoring                                                            */
/* ------------------------------------------------------------------ */

function computeResult(d: FormData) {
  const age = Number(d.age) || 30;
  let offset = 0;

  // --- Lifestyle ---
  const exerciseMap: Record<string, number> = { "5+": -3, "3-4": -1, "1-2": 0, never: 4 };
  const smokingMap: Record<string, number> = { never: -2, quit: 0, occasionally: 3, daily: 8 };
  const alcoholMap: Record<string, number> = { never: -1, occasionally: 0, weekly: 1, daily: 4 };
  const sittingMap: Record<string, number> = { "<4": -1, "4-8": 0, "8+": 2 };

  const lifestyleScore =
    (exerciseMap[d.exercise] ?? 0) +
    (smokingMap[d.smoking] ?? 0) +
    (alcoholMap[d.alcohol] ?? 0) +
    (sittingMap[d.sitting] ?? 0);
  offset += lifestyleScore;

  // --- Diet ---
  const fruitsMap: Record<string, number> = { "5+": -3, "3-4": -1, "1-2": 0, "0": 2 };
  const waterMap: Record<string, number> = { "9+": -1, "7-8": 0, "4-6": 1, "1-3": 2 };
  const processedMap: Record<string, number> = { rarely: -1, sometimes: 0, often: 2, daily: 3 };
  const sugarMap: Record<string, number> = { low: -1, moderate: 0, high: 2 };

  const dietScore =
    (fruitsMap[d.fruits] ?? 0) +
    (waterMap[d.water] ?? 0) +
    (processedMap[d.processed] ?? 0) +
    (sugarMap[d.sugar] ?? 0);
  offset += dietScore;

  // --- Sleep & Stress ---
  const sleepH = Number(d.sleepHours) || 7;
  let sleepHScore = 0;
  if (sleepH >= 7 && sleepH <= 8) sleepHScore = -2;
  else if (sleepH >= 6 && sleepH < 7) sleepHScore = 0;
  else if (sleepH < 6) sleepHScore = 3;
  else if (sleepH > 9) sleepHScore = 1;

  const sleepQMap: Record<string, number> = { excellent: -2, good: -1, fair: 1, poor: 3 };
  const stressMap: Record<string, number> = { low: -2, moderate: 0, high: 2, "very-high": 4 };
  const meditationMap: Record<string, number> = { regularly: -2, sometimes: -1, never: 0 };

  const sleepStressScore =
    sleepHScore +
    (sleepQMap[d.sleepQuality] ?? 0) +
    (stressMap[d.stress] ?? 0) +
    (meditationMap[d.meditation] ?? 0);
  offset += sleepStressScore;

  // --- Health ---
  const conditionCount = d.conditions.filter((c) => c !== "none").length;
  const conditionScore = conditionCount > 0 ? conditionCount * 2 : -1;
  const checkupMap: Record<string, number> = { "6-monthly": -1, yearly: 0, never: 2 };

  const healthScore = conditionScore + (checkupMap[d.checkup] ?? 0);
  offset += healthScore;

  const bioAge = Math.max(1, Math.round(age + offset));
  const diff = bioAge - age;

  return { bioAge, age, diff, lifestyleScore, dietScore, sleepStressScore, healthScore };
}

/* ------------------------------------------------------------------ */
/*  Tips generator                                                     */
/* ------------------------------------------------------------------ */

function generateTips(d: FormData, scores: ReturnType<typeof computeResult>) {
  const tips: string[] = [];

  // Lifestyle tips
  if (scores.lifestyleScore > 2) {
    if (d.smoking === "daily" || d.smoking === "occasionally")
      tips.push("Quitting smoking is the single most impactful change you can make. Even cutting down helps.");
    if (d.exercise === "never" || d.exercise === "1-2")
      tips.push("Aim for at least 150 minutes of moderate exercise per week. Start with daily 20-minute walks.");
    if (d.sitting === "8+")
      tips.push("Break up long sitting stretches every 30 minutes with a short walk or standing break.");
  }

  // Diet tips
  if (scores.dietScore > 1) {
    if (d.fruits === "0" || d.fruits === "1-2")
      tips.push("Add more colorful fruits and vegetables to every meal. Aim for 5+ servings daily.");
    if (d.processed === "daily" || d.processed === "often")
      tips.push("Gradually replace processed foods with whole-food alternatives for long-term benefits.");
    if (d.water === "1-3" || d.water === "4-6")
      tips.push("Increase your water intake. Keep a bottle with you and aim for 8+ glasses a day.");
  }

  // Sleep tips
  if (scores.sleepStressScore > 1) {
    if (d.sleepQuality === "poor" || d.sleepQuality === "fair")
      tips.push("Improve sleep hygiene: keep a consistent schedule, limit screens before bed, and keep your room cool and dark.");
    if (d.stress === "high" || d.stress === "very-high")
      tips.push("Practice daily stress management: even 5 minutes of deep breathing or journaling can lower cortisol levels.");
    if (d.meditation === "never")
      tips.push("Start a short meditation practice (5-10 min/day). Apps like Headspace or Insight Timer can help.");
  }

  // Health tips
  if (scores.healthScore > 0) {
    if (d.checkup === "never")
      tips.push("Schedule regular health check-ups. Early detection is key for managing chronic conditions.");
    if (d.conditions.length > 0 && !d.conditions.includes("none"))
      tips.push("Work closely with your healthcare provider to manage your conditions and monitor key biomarkers.");
  }

  // Fallback general tips
  if (tips.length === 0) {
    tips.push("You're doing great! Maintain your healthy habits and stay consistent.");
    tips.push("Consider tracking your biomarkers annually to monitor your biological age over time.");
  }

  return tips.slice(0, 5);
}

/* ------------------------------------------------------------------ */
/*  Circular gauge component                                           */
/* ------------------------------------------------------------------ */

function CircularGauge({
  bioAge,
  actualAge,
}: {
  bioAge: number;
  actualAge: number;
}) {
  const diff = bioAge - actualAge;
  const isYounger = diff < 0;
  const isSame = diff === 0;

  // Map bio age to 0-100 range, center around actual age
  const maxRange = Math.max(actualAge * 1.5, 80);
  const pct = Math.min(100, Math.max(0, (bioAge / maxRange) * 100));
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const color = isSame
    ? "text-blue-400"
    : isYounger
    ? "text-emerald-400"
    : "text-amber-400";

  const glowColor = isSame
    ? "drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]"
    : isYounger
    ? "drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]"
    : "drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]";

  return (
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
      <svg
        className={cn("-rotate-90", glowColor)}
        viewBox="0 0 200 200"
        width="256"
        height="256"
      >
        {/* Background ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          className="text-white/5"
          strokeWidth="12"
        />
        {/* Progress ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          className={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className={cn("text-6xl font-bold", color)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {bioAge}
        </motion.span>
        <span className="mt-1 text-sm text-gray-400">Biological Age</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Category bar                                                       */
/* ------------------------------------------------------------------ */

function CategoryBar({
  label,
  score,
  maxNeg,
  maxPos,
  icon: Icon,
}: {
  label: string;
  score: number;
  maxNeg: number;
  maxPos: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  // Normalize score to 0-100 where 50 is neutral
  const range = maxPos - maxNeg;
  const pct = Math.min(100, Math.max(0, ((score - maxNeg) / range) * 100));

  const barColor =
    pct < 35
      ? "bg-emerald-500"
      : pct < 65
      ? "bg-yellow-500"
      : "bg-red-500";

  const textColor =
    pct < 35
      ? "text-emerald-400"
      : pct < 65
      ? "text-yellow-400"
      : "text-red-400";

  const badgeLabel = pct < 35 ? "Great" : pct < 65 ? "Okay" : "Needs Work";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", textColor)} />
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <Badge
          variant="outline"
          className={cn("border-0 text-xs", textColor, barColor.replace("bg-", "bg-") + "/10")}
        >
          {badgeLabel}
        </Badge>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={cn("h-full rounded-full", barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${100 - pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step validation                                                    */
/* ------------------------------------------------------------------ */

function isStepValid(step: number, d: FormData): boolean {
  switch (step) {
    case 0:
      return d.age !== "" && d.gender !== "" && d.height !== "" && d.weight !== "";
    case 1:
      return d.exercise !== "" && d.smoking !== "" && d.alcohol !== "" && d.sitting !== "";
    case 2:
      return d.fruits !== "" && d.water !== "" && d.processed !== "" && d.sugar !== "";
    case 3:
      return d.sleepHours !== "" && d.sleepQuality !== "" && d.stress !== "" && d.meditation !== "";
    case 4:
      return d.conditions.length > 0 && d.familyHistory !== "" && d.checkup !== "";
    default:
      return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function BiologicalAgePage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [showResult, setShowResult] = useState(false);

  const update = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const result = useMemo(() => computeResult(form), [form]);
  const tips = useMemo(() => generateTips(form, result), [form, result]);

  const next = () => {
    if (step < 4) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const restart = () => {
    setForm(INITIAL);
    setStep(0);
    setShowResult(false);
  };

  /* ---------- step renderers ---------- */

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Your Age
              </label>
              <Input
                type="number"
                min={1}
                max={120}
                placeholder="e.g. 30"
                value={form.age}
                onChange={(e) =>
                  update("age", e.target.value === "" ? "" : Number(e.target.value))
                }
                className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Gender
              </label>
              <OptionGrid
                columns={3}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                value={form.gender}
                onChange={(v) => update("gender", v)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Height (cm)
                </label>
                <Input
                  type="number"
                  min={50}
                  max={250}
                  placeholder="170"
                  value={form.height}
                  onChange={(e) =>
                    update("height", e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Weight (kg)
                </label>
                <Input
                  type="number"
                  min={20}
                  max={300}
                  placeholder="70"
                  value={form.weight}
                  onChange={(e) =>
                    update("weight", e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Exercise Frequency
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "Never", value: "never" },
                  { label: "1-2x/wk", value: "1-2" },
                  { label: "3-4x/wk", value: "3-4" },
                  { label: "5+x/wk", value: "5+" },
                ]}
                value={form.exercise}
                onChange={(v) => update("exercise", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Smoking
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "Never", value: "never" },
                  { label: "Quit", value: "quit" },
                  { label: "Occasional", value: "occasionally" },
                  { label: "Daily", value: "daily" },
                ]}
                value={form.smoking}
                onChange={(v) => update("smoking", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Alcohol Consumption
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "Never", value: "never" },
                  { label: "Occasional", value: "occasionally" },
                  { label: "Weekly", value: "weekly" },
                  { label: "Daily", value: "daily" },
                ]}
                value={form.alcohol}
                onChange={(v) => update("alcohol", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Daily Sitting Hours
              </label>
              <OptionGrid
                columns={3}
                options={[
                  { label: "< 4 hours", value: "<4" },
                  { label: "4-8 hours", value: "4-8" },
                  { label: "8+ hours", value: "8+" },
                ]}
                value={form.sitting}
                onChange={(v) => update("sitting", v)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Fruit & Veg Servings / Day
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "0", value: "0" },
                  { label: "1-2", value: "1-2" },
                  { label: "3-4", value: "3-4" },
                  { label: "5+", value: "5+" },
                ]}
                value={form.fruits}
                onChange={(v) => update("fruits", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Glasses of Water / Day
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "1-3", value: "1-3" },
                  { label: "4-6", value: "4-6" },
                  { label: "7-8", value: "7-8" },
                  { label: "9+", value: "9+" },
                ]}
                value={form.water}
                onChange={(v) => update("water", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Processed Food Frequency
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "Daily", value: "daily" },
                  { label: "Often", value: "often" },
                  { label: "Sometimes", value: "sometimes" },
                  { label: "Rarely", value: "rarely" },
                ]}
                value={form.processed}
                onChange={(v) => update("processed", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Sugar Intake
              </label>
              <OptionGrid
                columns={3}
                options={[
                  { label: "High", value: "high" },
                  { label: "Moderate", value: "moderate" },
                  { label: "Low", value: "low" },
                ]}
                value={form.sugar}
                onChange={(v) => update("sugar", v)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Hours of Sleep per Night
              </label>
              <Input
                type="number"
                min={1}
                max={16}
                step={0.5}
                placeholder="e.g. 7"
                value={form.sleepHours}
                onChange={(e) =>
                  update(
                    "sleepHours",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Sleep Quality
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "Poor", value: "poor" },
                  { label: "Fair", value: "fair" },
                  { label: "Good", value: "good" },
                  { label: "Excellent", value: "excellent" },
                ]}
                value={form.sleepQuality}
                onChange={(v) => update("sleepQuality", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Stress Level
              </label>
              <OptionGrid
                columns={4}
                options={[
                  { label: "Low", value: "low" },
                  { label: "Moderate", value: "moderate" },
                  { label: "High", value: "high" },
                  { label: "Very High", value: "very-high" },
                ]}
                value={form.stress}
                onChange={(v) => update("stress", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Meditation / Mindfulness
              </label>
              <OptionGrid
                columns={3}
                options={[
                  { label: "Never", value: "never" },
                  { label: "Sometimes", value: "sometimes" },
                  { label: "Regularly", value: "regularly" },
                ]}
                value={form.meditation}
                onChange={(v) => update("meditation", v)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Chronic Conditions (select all that apply)
              </label>
              <CheckboxGrid
                options={[
                  { label: "None", value: "none" },
                  { label: "Diabetes", value: "diabetes" },
                  { label: "Hypertension", value: "hypertension" },
                  { label: "Heart Disease", value: "heart" },
                  { label: "Thyroid", value: "thyroid" },
                ]}
                values={form.conditions}
                onChange={(v) => update("conditions", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Family History of Disease
              </label>
              <OptionGrid
                columns={2}
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                value={form.familyHistory}
                onChange={(v) => update("familyHistory", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Regular Health Check-ups
              </label>
              <OptionGrid
                columns={3}
                options={[
                  { label: "Never", value: "never" },
                  { label: "Yearly", value: "yearly" },
                  { label: "Every 6 Months", value: "6-monthly" },
                ]}
                value={form.checkup}
                onChange={(v) => update("checkup", v)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ---------- Result screen ---------- */

  const renderResult = () => {
    const { bioAge, age, diff } = result;
    const isYounger = diff < 0;
    const isSame = diff === 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Gauge */}
        <CircularGauge bioAge={bioAge} actualAge={age} />

        {/* Headline */}
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Your Biological Age is{" "}
            <span
              className={cn(
                isSame
                  ? "text-blue-400"
                  : isYounger
                  ? "text-emerald-400"
                  : "text-amber-400"
              )}
            >
              {bioAge}
            </span>
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {isSame
              ? "Your biological age matches your actual age."
              : isYounger
              ? `You're ${Math.abs(diff)} year${Math.abs(diff) > 1 ? "s" : ""} younger than your actual age of ${age}!`
              : `You're ${diff} year${diff > 1 ? "s" : ""} older than your actual age of ${age}.`}
          </motion.p>
          {isYounger && (
            <motion.p
              className="mt-1 text-sm text-emerald-400/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Great job! Your healthy habits are paying off.
            </motion.p>
          )}
          {!isYounger && !isSame && (
            <motion.p
              className="mt-1 text-sm text-amber-400/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Don&apos;t worry &mdash; small lifestyle changes can make a big difference.
            </motion.p>
          )}
        </div>

        {/* Category breakdown */}
        <motion.div
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Category Breakdown
          </h3>
          <CategoryBar
            label="Lifestyle"
            score={result.lifestyleScore}
            maxNeg={-7}
            maxPos={14}
            icon={Dumbbell}
          />
          <CategoryBar
            label="Diet"
            score={result.dietScore}
            maxNeg={-6}
            maxPos={9}
            icon={Apple}
          />
          <CategoryBar
            label="Sleep & Stress"
            score={result.sleepStressScore}
            maxNeg={-8}
            maxPos={10}
            icon={Brain}
          />
          <CategoryBar
            label="Health"
            score={result.healthScore}
            maxNeg={-2}
            maxPos={10}
            icon={Heart}
          />
        </motion.div>

        {/* Personalized tips */}
        <motion.div
          className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Personalized Tips
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <motion.li
                key={i}
                className="flex gap-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Start Over */}
        <motion.div
          className="pt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <Button
            onClick={restart}
            className="rounded-full bg-violet-600 px-8 py-3 text-white hover:bg-violet-700"
          >
            Start Over
          </Button>
        </motion.div>
      </motion.div>
    );
  };

  /* ---------- Main render ---------- */

  return (
    <PremiumGate feature="Biological Age Calculator" description="Discover your true biological age based on 25+ lifestyle, diet, sleep, and health factors. Get personalized tips to slow down aging.">
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-4 pb-16 pt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Activity className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Biological Age Calculator</h1>
          <p className="mt-2 text-sm text-white/70">
            Discover your body&apos;s true age based on your lifestyle, diet, and health habits.
          </p>
        </motion.div>
      </div>

      {/* Card */}
      <div className="mx-auto -mt-8 max-w-lg px-4 pb-12">
        <div className="rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
          {!showResult ? (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const done = i < step;
                    const active = i === step;
                    return (
                      <div key={i} className="flex flex-1 items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                              done
                                ? "border-violet-500 bg-violet-500 text-white"
                                : active
                                ? "border-violet-500 bg-violet-500/20 text-violet-400"
                                : "border-white/10 bg-white/5 text-gray-500"
                            )}
                          >
                            {done ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Icon className="h-5 w-5" />
                            )}
                          </div>
                          <span
                            className={cn(
                              "mt-1.5 hidden text-[10px] font-medium sm:block",
                              active
                                ? "text-violet-400"
                                : done
                                ? "text-violet-300"
                                : "text-gray-500"
                            )}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            className={cn(
                              "mx-1 h-0.5 flex-1 rounded-full transition-all",
                              done ? "bg-violet-500" : "bg-white/10"
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step title */}
              <h2 className="mb-5 text-lg font-semibold text-white">
                {STEPS[step].label}
              </h2>

              {/* Step content with animation */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                <span className="text-xs text-gray-500">
                  Step {step + 1} of 5
                </span>
                <Button
                  onClick={next}
                  disabled={!isStepValid(step, form)}
                  className="rounded-full bg-violet-600 px-6 text-white hover:bg-violet-700 disabled:opacity-40"
                >
                  {step === 4 ? "See Results" : "Next"}
                  {step < 4 && <ArrowRight className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </>
          ) : (
            renderResult()
          )}
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-gray-600">
          This is an educational estimate and not a medical diagnosis. Consult a healthcare professional for personalized advice.
        </p>
      </div>
    </div>
    </PremiumGate>
  );
}
