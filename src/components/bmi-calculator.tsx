"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Lightbulb,
  BookOpen,
  Minus,
  Plus,
  User,
  Ruler,
  Weight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBMITips } from "@/data/health-tips";
import { getRandomFacts } from "@/data/health-facts";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  emoji: string;
  range: string;
  tip: string;
  idealMin: number;
  idealMax: number;
}

const BMI_CATEGORIES = [
  { max: 16, label: "Severe Thinness", color: "#3b82f6", emoji: "Severely Underweight" },
  { max: 17, label: "Moderate Thinness", color: "#60a5fa", emoji: "Moderately Underweight" },
  { max: 18.5, label: "Underweight", color: "#93c5fd", emoji: "Slightly Underweight" },
  { max: 25, label: "Normal Weight", color: "#22c55e", emoji: "Healthy Weight" },
  { max: 30, label: "Overweight", color: "#f59e0b", emoji: "Overweight" },
  { max: 35, label: "Obese Class I", color: "#f97316", emoji: "Obese (Class I)" },
  { max: 40, label: "Obese Class II", color: "#ef4444", emoji: "Obese (Class II)" },
  { max: 100, label: "Obese Class III", color: "#dc2626", emoji: "Obese (Class III)" },
];

function calcBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const cat = BMI_CATEGORIES.find((c) => bmi < c.max) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];

  const idealMin = Math.round(18.5 * heightM * heightM);
  const idealMax = Math.round(24.9 * heightM * heightM);

  let tip = "";
  if (bmi < 18.5) tip = "Consider consulting a nutritionist about healthy weight gain through balanced meals and strength training.";
  else if (bmi < 25) tip = "You're in the healthy range! Maintain your weight with regular exercise and a balanced diet.";
  else if (bmi < 30) tip = "A combination of portion control, regular cardio, and strength training can help reach a healthier weight.";
  else tip = "Consider speaking with a healthcare provider about a personalized weight management plan.";

  return {
    bmi: Math.round(bmi * 10) / 10,
    category: cat.label,
    color: cat.color,
    emoji: cat.emoji,
    range: `${idealMin}–${idealMax} kg`,
    tip,
    idealMin,
    idealMax,
  };
}

export function BMICalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(170);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [weightKg, setWeightKg] = useState(70);
  const [weightLbs, setWeightLbs] = useState(154);
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculate = () => {
    let wKg = weightKg;
    let hCm = heightCm;
    if (unit === "imperial") {
      wKg = weightLbs * 0.453592;
      hCm = (heightFt * 12 + heightIn) * 2.54;
    }
    if (wKg > 0 && hCm > 0) {
      setResult(calcBMI(wKg, hCm));
    }
  };

  const reset = () => {
    setResult(null);
    setAge(25);
    setHeightCm(170);
    setWeightKg(70);
    setHeightFt(5);
    setHeightIn(7);
    setWeightLbs(154);
  };

  // Generate random tips/facts when result changes
  const tips = useMemo(() => (result ? getBMITips(result.bmi) : []), [result]);
  const facts = useMemo(() => (result ? getRandomFacts(3, "weight") : []), [result]);

  const bmiPosition = result
    ? Math.min(Math.max(((result.bmi - 12) / (42 - 12)) * 100, 0), 100)
    : 0;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Unit Toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-muted rounded-lg p-1">
                {(["metric", "imperial"] as Unit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                      unit === u
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/ft)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left: Gender + Age */}
              <div className="space-y-5">
                {/* Gender */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
                    <User className="w-3.5 h-3.5" /> Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["male", "female"] as Gender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={cn(
                          "py-3 rounded-xl border text-sm font-medium transition-all",
                          gender === g
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-muted-foreground/30"
                        )}
                      >
                        {g === "male" ? "Male" : "Female"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Age: <span className="text-foreground font-bold">{age}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl"
                      onClick={() => setAge(Math.max(2, age - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <input
                      type="range"
                      min={2}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="flex-1 accent-primary h-2"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl"
                      onClick={() => setAge(Math.min(100, age + 1))}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right: Height + Weight */}
              <div className="space-y-5">
                {/* Height */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
                    <Ruler className="w-3.5 h-3.5" /> Height
                  </label>
                  {unit === "metric" ? (
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-xl"
                        onClick={() => setHeightCm(Math.max(50, heightCm - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <span className="text-3xl font-bold">{heightCm}</span>
                        <span className="text-sm text-muted-foreground ml-1">cm</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-xl"
                        onClick={() => setHeightCm(Math.min(250, heightCm + 1))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 flex-1">
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setHeightFt(Math.max(1, heightFt - 1))}><Minus className="w-3 h-3" /></Button>
                        <div className="text-center flex-1">
                          <span className="text-2xl font-bold">{heightFt}</span>
                          <span className="text-xs text-muted-foreground ml-0.5">ft</span>
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setHeightFt(Math.min(8, heightFt + 1))}><Plus className="w-3 h-3" /></Button>
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setHeightIn(Math.max(0, heightIn - 1))}><Minus className="w-3 h-3" /></Button>
                        <div className="text-center flex-1">
                          <span className="text-2xl font-bold">{heightIn}</span>
                          <span className="text-xs text-muted-foreground ml-0.5">in</span>
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setHeightIn(Math.min(11, heightIn + 1))}><Plus className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
                    <Weight className="w-3.5 h-3.5" /> Weight
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl"
                      onClick={() =>
                        unit === "metric"
                          ? setWeightKg(Math.max(10, weightKg - 1))
                          : setWeightLbs(Math.max(20, weightLbs - 1))
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <span className="text-3xl font-bold">
                        {unit === "metric" ? weightKg : weightLbs}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        {unit === "metric" ? "kg" : "lbs"}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl"
                      onClick={() =>
                        unit === "metric"
                          ? setWeightKg(Math.min(300, weightKg + 1))
                          : setWeightLbs(Math.min(660, weightLbs + 1))
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center mt-8">
              <Button onClick={calculate} size="lg" className="gap-2 px-10 text-base">
                <Calculator className="w-5 h-5" />
                Calculate BMI
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          /* ─── RESULTS ─── */
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* BMI Score */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
                <p className="text-6xl font-bold" style={{ color: result.color }}>
                  {result.bmi}
                </p>
                <p
                  className="text-lg font-semibold mt-1"
                  style={{ color: result.color }}
                >
                  {result.emoji}
                </p>
              </motion.div>
            </div>

            {/* BMI Scale Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative h-4 rounded-full overflow-hidden flex">
                <div className="flex-1 bg-blue-400" />
                <div className="flex-1 bg-green-500" />
                <div className="flex-1 bg-yellow-500" />
                <div className="flex-1 bg-orange-500" />
                <div className="flex-1 bg-red-500" />
              </div>
              {/* Pointer */}
              <div className="relative h-6">
                <motion.div
                  className="absolute -top-1"
                  initial={{ left: "0%" }}
                  animate={{ left: `${bmiPosition}%` }}
                  transition={{ duration: 0.8, type: "spring" }}
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: result.color }} />
                  <div className="text-[10px] font-bold mt-0.5 whitespace-nowrap text-center" style={{ color: result.color }}>
                    {result.bmi}
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-3 mb-6"
            >
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-lg font-bold">{result.range}</p>
                <p className="text-[11px] text-muted-foreground">Ideal Weight</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-lg font-bold">{result.category}</p>
                <p className="text-[11px] text-muted-foreground">Category</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-lg font-bold flex items-center justify-center gap-1">
                  {result.bmi < 18.5 ? (
                    <TrendingDown className="w-4 h-4 text-blue-500" />
                  ) : result.bmi <= 25 ? (
                    <Minus className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                  )}
                  {result.bmi < 18.5
                    ? `+${result.idealMin - Math.round(unit === "metric" ? weightKg : weightLbs * 0.4536)} kg`
                    : result.bmi <= 25
                      ? "On track"
                      : `-${Math.round((unit === "metric" ? weightKg : weightLbs * 0.4536) - result.idealMax)} kg`}
                </p>
                <p className="text-[11px] text-muted-foreground">To Ideal</p>
              </div>
            </motion.div>

            {/* Tip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-muted/30 mb-6"
            >
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.tip}
                </p>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <p className="text-[11px] text-muted-foreground text-center mb-6">
              BMI is a screening tool, not a diagnostic measure. It doesn&apos;t account for muscle
              mass, bone density, or body composition. Consult a healthcare provider for personalized advice.
            </p>

            {/* Personalized Tips */}
            {tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl border bg-muted/20 mb-4"
              >
                <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Personalized Tips for You
                </h4>
                <div className="space-y-2">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-muted-foreground leading-relaxed">{tip.text}</p>
                        <span className="text-[10px] text-muted-foreground/60">— {tip.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Did You Know? */}
            {facts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-xl border bg-primary/5 mb-6"
              >
                <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Did You Know?
                </h4>
                <div className="space-y-2">
                  {facts.map((fact, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground leading-relaxed">{fact.text}</p>
                        <span className="text-[10px] text-muted-foreground/60">— {fact.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex justify-center">
              <Button onClick={reset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Calculate Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
