"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PremiumGate } from "@/components/premium-gate";
import {
  Apple,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  Shield,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5;

interface Answers {
  fruitVegDiversity: string;
  fermentedFoods: string;
  wholeGrains: string;
  fiberIntake: string;
  bloating: string;
  gas: string;
  bowelRegularity: string;
  stoolConsistency: string;
  acidReflux: string;
  waterIntake: string;
  stressLevel: string;
  sleepQuality: string;
  antibioticUse: string;
  probioticUse: string;
  bloodInStool: string;
  unexplainedWeightLoss: string;
  persistentPain: string;
  foodIntolerances: string;
}

const DEFAULT: Answers = {
  fruitVegDiversity: "",
  fermentedFoods: "",
  wholeGrains: "",
  fiberIntake: "",
  bloating: "",
  gas: "",
  bowelRegularity: "",
  stoolConsistency: "",
  acidReflux: "",
  waterIntake: "",
  stressLevel: "",
  sleepQuality: "",
  antibioticUse: "",
  probioticUse: "",
  bloodInStool: "",
  unexplainedWeightLoss: "",
  persistentPain: "",
  foodIntolerances: "",
};

const STEPS = [
  { n: 1, label: "Diet", icon: Apple },
  { n: 2, label: "Symptoms", icon: AlertCircle },
  { n: 3, label: "Lifestyle", icon: Leaf },
  { n: 4, label: "Red Flags", icon: Shield },
  { n: 5, label: "Result", icon: Sparkles },
];

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
        selected
          ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
          : "border-muted bg-card hover:border-emerald-300"
      )}
    >
      {label}
    </button>
  );
}

function Question({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold block">{label}</label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function calculateScore(a: Answers): {
  total: number;
  diet: number;
  symptoms: number;
  lifestyle: number;
  risk: number;
  tips: string[];
  hasRedFlags: boolean;
} {
  let diet = 25;
  let symptoms = 25;
  let lifestyle = 25;
  let risk = 25;
  const tips: string[] = [];
  let hasRedFlags = false;

  // --- Diet Diversity (25 points) ---
  if (a.fruitVegDiversity === "16+") diet += 0;
  else if (a.fruitVegDiversity === "11-15") diet -= 3;
  else if (a.fruitVegDiversity === "6-10") diet -= 7;
  else if (a.fruitVegDiversity === "1-5") {
    diet -= 12;
    tips.push(
      "Try to eat at least 10 different fruits and vegetables per week for better gut diversity"
    );
  }

  if (a.fermentedFoods === "daily") diet += 2;
  else if (a.fermentedFoods === "weekly") diet += 0;
  else if (a.fermentedFoods === "rarely") diet -= 3;
  else if (a.fermentedFoods === "never") {
    diet -= 6;
    tips.push(
      "Include fermented foods like dahi, idli, or buttermilk daily for natural probiotics"
    );
  }

  if (a.wholeGrains === "daily") diet += 0;
  else if (a.wholeGrains === "sometimes") diet -= 3;
  else if (a.wholeGrains === "rarely") {
    diet -= 6;
    tips.push(
      "Switch to whole grains like brown rice, oats, or ragi for more fiber"
    );
  }

  if (a.fiberIntake === "high") diet += 0;
  else if (a.fiberIntake === "moderate") diet -= 2;
  else if (a.fiberIntake === "low") {
    diet -= 5;
    tips.push(
      "Increase fiber intake with vegetables, fruits, and isabgol (psyllium husk)"
    );
  }

  // --- Symptoms (25 points) ---
  if (a.bloating === "never") symptoms += 0;
  else if (a.bloating === "sometimes") symptoms -= 3;
  else if (a.bloating === "often") {
    symptoms -= 7;
    tips.push(
      "Frequent bloating may be caused by certain foods or eating habits \u2014 try eating slowly"
    );
  } else if (a.bloating === "always") symptoms -= 12;

  if (a.gas === "minimal") symptoms += 0;
  else if (a.gas === "moderate") symptoms -= 3;
  else if (a.gas === "excessive") {
    symptoms -= 7;
    tips.push(
      "Excessive gas can indicate food intolerances \u2014 try an elimination diet"
    );
  }

  if (a.bowelRegularity === "regular") symptoms += 0;
  else if (a.bowelRegularity === "mostly") symptoms -= 3;
  else if (a.bowelRegularity === "irregular") symptoms -= 6;
  else if (a.bowelRegularity === "very-irregular") {
    symptoms -= 10;
    tips.push(
      "Very irregular bowels may indicate IBS \u2014 consult a gastroenterologist"
    );
  }

  if (a.stoolConsistency === "normal") symptoms += 0;
  else if (a.stoolConsistency === "sometimes-loose") symptoms -= 3;
  else if (a.stoolConsistency === "often-hard") symptoms -= 5;
  else if (a.stoolConsistency === "alternating") symptoms -= 7;

  if (a.acidReflux === "never") symptoms += 0;
  else if (a.acidReflux === "sometimes") symptoms -= 3;
  else if (a.acidReflux === "often") {
    symptoms -= 6;
    tips.push(
      "Frequent acid reflux? Avoid spicy, fried food and don't lie down right after meals"
    );
  }

  // --- Lifestyle (25 points) ---
  if (a.waterIntake === "8+") lifestyle += 0;
  else if (a.waterIntake === "5-7") lifestyle -= 3;
  else if (a.waterIntake === "3-4") lifestyle -= 6;
  else if (a.waterIntake === "less-3") {
    lifestyle -= 10;
    tips.push(
      "Drink at least 8 glasses of water daily \u2014 dehydration worsens constipation"
    );
  }

  if (a.stressLevel === "low") lifestyle += 0;
  else if (a.stressLevel === "moderate") lifestyle -= 3;
  else if (a.stressLevel === "high") {
    lifestyle -= 8;
    tips.push(
      "High stress directly affects gut health \u2014 try yoga, meditation, or pranayama"
    );
  }

  if (a.sleepQuality === "good") lifestyle += 0;
  else if (a.sleepQuality === "fair") lifestyle -= 3;
  else if (a.sleepQuality === "poor") lifestyle -= 6;

  if (a.antibioticUse === "none") lifestyle += 0;
  else if (a.antibioticUse === "once") lifestyle -= 3;
  else if (a.antibioticUse === "multiple") {
    lifestyle -= 7;
    tips.push(
      "Frequent antibiotics destroy gut bacteria \u2014 take probiotics after any antibiotic course"
    );
  }

  if (a.probioticUse === "regular") lifestyle += 2;
  else if (a.probioticUse === "sometimes") lifestyle += 0;
  else if (a.probioticUse === "never") lifestyle -= 3;

  // --- Red Flags (25 points) ---
  if (a.bloodInStool === "yes") {
    risk -= 10;
    hasRedFlags = true;
  }
  if (a.unexplainedWeightLoss === "yes") {
    risk -= 8;
    hasRedFlags = true;
  }
  if (a.persistentPain === "yes") {
    risk -= 8;
    hasRedFlags = true;
  }

  if (a.foodIntolerances === "none") risk += 0;
  else if (a.foodIntolerances === "1-2") risk -= 3;
  else if (a.foodIntolerances === "many") {
    risk -= 6;
    tips.push(
      "Multiple food intolerances may indicate leaky gut \u2014 consider an allergy test"
    );
  }

  diet = Math.max(0, Math.min(25, diet));
  symptoms = Math.max(0, Math.min(25, symptoms));
  lifestyle = Math.max(0, Math.min(25, lifestyle));
  risk = Math.max(0, Math.min(25, risk));

  return {
    total: diet + symptoms + lifestyle + risk,
    diet,
    symptoms,
    lifestyle,
    risk,
    tips: tips.slice(0, 5),
    hasRedFlags,
  };
}

const GOOD_FOODS = [
  {
    name: "Dahi (Curd)",
    desc: "Rich in probiotics, aids digestion",
    emoji: "\uD83E\uDD5B",
  },
  {
    name: "Chaas (Buttermilk)",
    desc: "Cools the gut, contains good bacteria",
    emoji: "\uD83E\uDD5B",
  },
  {
    name: "Idli",
    desc: "Fermented, easy to digest, prebiotic",
    emoji: "\uD83E\uDD5E",
  },
  {
    name: "Banana",
    desc: "Prebiotic fiber, soothes the stomach",
    emoji: "\uD83C\uDF4C",
  },
  {
    name: "Jeera Water",
    desc: "Reduces bloating, improves digestion",
    emoji: "\uD83E\uDED6",
  },
  {
    name: "Isabgol (Psyllium Husk)",
    desc: "Soluble fiber, regulates bowel movements",
    emoji: "\uD83C\uDF3E",
  },
];

const LIMIT_FOODS = [
  {
    name: "Spicy Food",
    desc: "Irritates gut lining, worsens reflux",
    emoji: "\uD83C\uDF36\uFE0F",
  },
  {
    name: "Fried / Oily Food",
    desc: "Slows digestion, causes bloating",
    emoji: "\uD83C\uDF5F",
  },
  {
    name: "Processed / Packaged Food",
    desc: "Preservatives harm gut bacteria",
    emoji: "\uD83C\uDF6B",
  },
  {
    name: "Excess Tea / Coffee",
    desc: "Increases acidity and reflux",
    emoji: "\u2615",
  },
  {
    name: "Carbonated Drinks",
    desc: "Causes gas and bloating",
    emoji: "\uD83E\uDD64",
  },
];

export default function GutHealthPage() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>(DEFAULT);

  const set = (key: keyof Answers, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          answers.fruitVegDiversity &&
          answers.fermentedFoods &&
          answers.wholeGrains &&
          answers.fiberIntake
        );
      case 2:
        return (
          answers.bloating &&
          answers.gas &&
          answers.bowelRegularity &&
          answers.stoolConsistency &&
          answers.acidReflux
        );
      case 3:
        return (
          answers.waterIntake &&
          answers.stressLevel &&
          answers.sleepQuality &&
          answers.antibioticUse &&
          answers.probioticUse
        );
      case 4:
        return (
          answers.bloodInStool &&
          answers.unexplainedWeightLoss &&
          answers.persistentPain &&
          answers.foodIntolerances
        );
      default:
        return false;
    }
  };

  const result = step === 5 ? calculateScore(answers) : null;

  const getGrade = (score: number) => {
    if (score >= 85)
      return { label: "Excellent", emoji: "\uD83D\uDE0A", color: "text-emerald-500" };
    if (score >= 70)
      return { label: "Good", emoji: "\uD83D\uDE42", color: "text-green-500" };
    if (score >= 55)
      return { label: "Fair", emoji: "\uD83D\uDE10", color: "text-amber-500" };
    if (score >= 35)
      return { label: "Poor", emoji: "\uD83D\uDE1F", color: "text-orange-500" };
    return { label: "Needs Attention", emoji: "\uD83E\uDD22", color: "text-red-500" };
  };

  const getGutEmoji = (score: number) => {
    if (score >= 75) return "\uD83D\uDCAA";
    if (score >= 50) return "\uD83E\uDD14";
    return "\uD83E\uDE7A";
  };

  const getCatColor = (val: number) => {
    const pct = (val / 25) * 100;
    if (pct >= 80) return "bg-emerald-500";
    if (pct >= 60) return "bg-green-500";
    if (pct >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <PremiumGate feature="Gut Health Score" description="Get a comprehensive assessment of your digestive health with personalized Indian food recommendations and tips.">
    <div className="min-h-screen bg-gradient-to-b from-emerald-950/10 to-background">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            Gut Health Score Calculator
          </div>
          <h1 className="text-3xl font-bold mb-2">How Healthy Is Your Gut?</h1>
          <p className="text-muted-foreground text-sm">
            Answer a few questions to get your personalized gut health score
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step >= s.n
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.n ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <s.icon className="w-3.5 h-3.5" />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-6 sm:w-12 h-0.5 rounded",
                    step > s.n ? "bg-emerald-500" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pb-20">
        <AnimatePresence mode="wait">
          {/* Step 1: Diet Diversity */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-center">Diet Diversity</h2>

              <Question label="How many different fruits & vegetables do you eat per week?">
                {[
                  ["1-5", "1\u20135"],
                  ["6-10", "6\u201310"],
                  ["11-15", "11\u201315"],
                  ["16+", "16+"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.fruitVegDiversity === v}
                    onClick={() => set("fruitVegDiversity", v)}
                  />
                ))}
              </Question>

              <Question label="How often do you eat fermented foods (dahi, idli, pickles)?">
                {[
                  ["daily", "Daily"],
                  ["weekly", "Weekly"],
                  ["rarely", "Rarely"],
                  ["never", "Never"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.fermentedFoods === v}
                    onClick={() => set("fermentedFoods", v)}
                  />
                ))}
              </Question>

              <Question label="How often do you eat whole grains?">
                {[
                  ["daily", "Daily"],
                  ["sometimes", "Sometimes"],
                  ["rarely", "Rarely"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.wholeGrains === v}
                    onClick={() => set("wholeGrains", v)}
                  />
                ))}
              </Question>

              <Question label="How would you rate your daily fiber intake?">
                {[
                  ["high", "High"],
                  ["moderate", "Moderate"],
                  ["low", "Low"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.fiberIntake === v}
                    onClick={() => set("fiberIntake", v)}
                  />
                ))}
              </Question>
            </motion.div>
          )}

          {/* Step 2: Symptoms */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-center">
                Digestive Symptoms
              </h2>

              <Question label="How often do you experience bloating?">
                {[
                  ["never", "Never"],
                  ["sometimes", "Sometimes"],
                  ["often", "Often"],
                  ["always", "Always"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.bloating === v}
                    onClick={() => set("bloating", v)}
                  />
                ))}
              </Question>

              <Question label="Gas / flatulence level?">
                {[
                  ["minimal", "Minimal"],
                  ["moderate", "Moderate"],
                  ["excessive", "Excessive"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.gas === v}
                    onClick={() => set("gas", v)}
                  />
                ))}
              </Question>

              <Question label="Bowel regularity?">
                {[
                  ["regular", "Regular daily"],
                  ["mostly", "Mostly regular"],
                  ["irregular", "Irregular"],
                  ["very-irregular", "Very irregular"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.bowelRegularity === v}
                    onClick={() => set("bowelRegularity", v)}
                  />
                ))}
              </Question>

              <Question label="Stool consistency?">
                {[
                  ["normal", "Normal"],
                  ["sometimes-loose", "Sometimes loose"],
                  ["often-hard", "Often hard"],
                  ["alternating", "Alternating"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.stoolConsistency === v}
                    onClick={() => set("stoolConsistency", v)}
                  />
                ))}
              </Question>

              <Question label="Do you experience acid reflux / heartburn?">
                {[
                  ["never", "Never"],
                  ["sometimes", "Sometimes"],
                  ["often", "Often"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.acidReflux === v}
                    onClick={() => set("acidReflux", v)}
                  />
                ))}
              </Question>
            </motion.div>
          )}

          {/* Step 3: Lifestyle */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-center">
                Lifestyle Factors
              </h2>

              <Question label="Daily water intake?">
                {[
                  ["8+", "8+ glasses"],
                  ["5-7", "5\u20137 glasses"],
                  ["3-4", "3\u20134 glasses"],
                  ["less-3", "Less than 3"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.waterIntake === v}
                    onClick={() => set("waterIntake", v)}
                  />
                ))}
              </Question>

              <Question label="Your stress level?">
                {[
                  ["low", "Low"],
                  ["moderate", "Moderate"],
                  ["high", "High"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.stressLevel === v}
                    onClick={() => set("stressLevel", v)}
                  />
                ))}
              </Question>

              <Question label="How is your sleep quality?">
                {[
                  ["good", "Good"],
                  ["fair", "Fair"],
                  ["poor", "Poor"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.sleepQuality === v}
                    onClick={() => set("sleepQuality", v)}
                  />
                ))}
              </Question>

              <Question label="Antibiotic use in the past year?">
                {[
                  ["none", "None"],
                  ["once", "Once"],
                  ["multiple", "Multiple times"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.antibioticUse === v}
                    onClick={() => set("antibioticUse", v)}
                  />
                ))}
              </Question>

              <Question label="Do you take probiotics?">
                {[
                  ["regular", "Regularly"],
                  ["sometimes", "Sometimes"],
                  ["never", "Never"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.probioticUse === v}
                    onClick={() => set("probioticUse", v)}
                  />
                ))}
              </Question>
            </motion.div>
          )}

          {/* Step 4: Red Flags */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-center">
                Important Checks
              </h2>

              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  These questions help identify potential red flags. Answer
                  honestly &mdash; this is not a diagnosis.
                </p>
              </div>

              <Question label="Have you noticed blood in your stool?">
                {[
                  ["no", "No"],
                  ["yes", "Yes"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.bloodInStool === v}
                    onClick={() => set("bloodInStool", v)}
                  />
                ))}
              </Question>

              <Question label="Any unexplained weight loss recently?">
                {[
                  ["no", "No"],
                  ["yes", "Yes"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.unexplainedWeightLoss === v}
                    onClick={() => set("unexplainedWeightLoss", v)}
                  />
                ))}
              </Question>

              <Question label="Persistent abdominal pain for more than 2 weeks?">
                {[
                  ["no", "No"],
                  ["yes", "Yes"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.persistentPain === v}
                    onClick={() => set("persistentPain", v)}
                  />
                ))}
              </Question>

              <Question label="Do you have food intolerances?">
                {[
                  ["none", "None"],
                  ["1-2", "1\u20132 foods"],
                  ["many", "Many foods"],
                ].map(([v, l]) => (
                  <OptionButton
                    key={v}
                    label={l}
                    selected={answers.foodIntolerances === v}
                    onClick={() => set("foodIntolerances", v)}
                  />
                ))}
              </Question>
            </motion.div>
          )}

          {/* Step 5: Results */}
          {step === 5 && result && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Red Flag Warning */}
              {result.hasRedFlags && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-700 rounded-2xl p-5 flex items-start gap-4"
                >
                  <AlertCircle className="w-7 h-7 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 text-base mb-1">
                      Please Consult a Gastroenterologist
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      You have reported one or more red flag symptoms (blood in
                      stool, unexplained weight loss, or persistent pain). These
                      require professional medical evaluation. Please see a
                      doctor at the earliest.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Score Circle */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-card rounded-3xl border shadow-xl p-8 text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/30"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className={
                        result.total >= 75
                          ? "text-emerald-500"
                          : result.total >= 50
                            ? "text-amber-500"
                            : "text-red-500"
                      }
                      stroke="currentColor"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 52 * (1 - result.total / 100),
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold">
                      {result.total}
                    </span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>

                <div className="text-3xl mb-1">{getGutEmoji(result.total)}</div>

                <div
                  className={cn(
                    "text-2xl font-bold",
                    getGrade(result.total).color
                  )}
                >
                  {getGrade(result.total).emoji} {getGrade(result.total).label}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.total >= 80
                    ? "Your gut is in great shape! Keep nourishing it."
                    : result.total >= 60
                      ? "Your gut health is decent, but there's room to improve."
                      : result.total >= 40
                        ? "Your gut needs some care. Follow the tips below."
                        : "Your gut health needs serious attention. Consider seeing a specialist."}
                </p>
              </motion.div>

              {/* Category Breakdown */}
              <div className="bg-card rounded-2xl border p-6 space-y-4">
                <h3 className="font-bold text-sm">Category Breakdown</h3>
                {[
                  { label: "Diet", value: result.diet, icon: Apple },
                  {
                    label: "Symptoms",
                    value: result.symptoms,
                    icon: AlertCircle,
                  },
                  { label: "Lifestyle", value: result.lifestyle, icon: Leaf },
                  { label: "Risk", value: result.risk, icon: Shield },
                ].map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium flex items-center gap-1.5">
                        <cat.icon className="w-3.5 h-3.5" /> {cat.label}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {cat.value}/25
                      </Badge>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          getCatColor(cat.value)
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.value / 25) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Good Foods */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  Foods Good for Your Gut
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOOD_FOODS.map((food) => (
                    <motion.div
                      key={food.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-3"
                    >
                      <span className="text-2xl">{food.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold">{food.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {food.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Foods to Limit */}
              {result.total < 70 && (
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Foods to Limit
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {LIMIT_FOODS.map((food) => (
                      <motion.div
                        key={food.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 bg-red-50 dark:bg-red-900/10 rounded-xl p-3"
                      >
                        <span className="text-2xl">{food.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold">{food.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {food.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalized Tips */}
              {result.tips.length > 0 && (
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Personalized Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => {
                    setStep(1);
                    setAnswers(DEFAULT);
                  }}
                >
                  Start Over
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-muted-foreground text-center">
                This is for informational purposes only. Not a medical
                assessment. Consult a gastroenterologist for persistent
                digestive issues.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={() => setStep((step - 1) as Step)}
              disabled={step === 1}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canProceed()}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8"
            >
              {step === 4 ? "Get Score" : "Next"}{" "}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
    </PremiumGate>
  );
}
