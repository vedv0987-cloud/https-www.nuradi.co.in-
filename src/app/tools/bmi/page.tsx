"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Calculator,
  ArrowRight,
  Activity,
  Scale,
  Flame,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

function getBMICategory(bmi: number) {
  if (bmi < 18.5)
    return { label: "Underweight", color: "#3b82f6", bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" };
  if (bmi < 25)
    return { label: "Normal", color: "#22c55e", bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" };
  if (bmi < 30)
    return { label: "Overweight", color: "#f59e0b", bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30" };
  return { label: "Obese", color: "#ef4444", bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" };
}

function calcIdealWeight(heightCm: number, gender: Gender) {
  const heightIn = heightCm / 2.54;
  const inchesOver60 = Math.max(0, heightIn - 60);
  if (gender === "male") {
    const ideal = 50 + 2.3 * inchesOver60;
    return { min: ideal - 4.5, max: ideal + 4.5 };
  }
  const ideal = 45.5 + 2.3 * inchesOver60;
  return { min: ideal - 4.5, max: ideal + 4.5 };
}

function calcBMR(weightKg: number, heightCm: number, age: number, gender: Gender) {
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightVal, setWeightVal] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [calculated, setCalculated] = useState(false);

  const heightInCm = useMemo(() => {
    if (unit === "metric") return parseFloat(heightCm) || 0;
    const ft = parseFloat(heightFt) || 0;
    const inches = parseFloat(heightIn) || 0;
    return (ft * 12 + inches) * 2.54;
  }, [unit, heightCm, heightFt, heightIn]);

  const weightKg = useMemo(() => {
    const w = parseFloat(weightVal) || 0;
    return unit === "metric" ? w : w * 0.453592;
  }, [unit, weightVal]);

  const ageNum = parseInt(age) || 0;

  const bmi = useMemo(() => {
    if (heightInCm <= 0 || weightKg <= 0) return 0;
    const hm = heightInCm / 100;
    return weightKg / (hm * hm);
  }, [heightInCm, weightKg]);

  const canCalculate = heightInCm > 0 && weightKg > 0 && ageNum > 0;

  const category = getBMICategory(bmi);
  const idealWeight = calcIdealWeight(heightInCm, gender);
  const bmr = calcBMR(weightKg, heightInCm, ageNum, gender);

  const calorieNeeds = {
    sedentary: Math.round(bmr * 1.2),
    moderate: Math.round(bmr * 1.55),
    active: Math.round(bmr * 1.725),
  };

  const gaugePercent = Math.min(Math.max(((bmi - 10) / 35) * 100, 0), 100);

  function handleCalculate() {
    if (canCalculate) setCalculated(true);
  }

  function handleReset() {
    setCalculated(false);
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeightVal("");
    setAge("");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_40%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            BMI & Body Metrics Calculator
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto">
            Calculate your Body Mass Index, ideal weight range, and daily calorie
            needs with precision.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-6 p-6 rounded-2xl border bg-card shadow-sm"
          >
            {/* Unit Toggle */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Unit System
              </label>
              <div className="flex gap-2">
                {(["metric", "imperial"] as const).map((u) => (
                  <Button
                    key={u}
                    variant={unit === u ? "default" : "outline"}
                    onClick={() => setUnit(u)}
                    className={cn(
                      "flex-1 capitalize",
                      unit === u && "bg-emerald-600 hover:bg-emerald-700 text-white"
                    )}
                  >
                    {u === "metric" ? "Metric (cm / kg)" : "Imperial (ft / lbs)"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <User className="w-4 h-4 inline mr-1" />
                Gender
              </label>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((g) => (
                  <Button
                    key={g}
                    variant={gender === g ? "default" : "outline"}
                    onClick={() => setGender(g)}
                    className={cn(
                      "flex-1 capitalize",
                      gender === g && "bg-emerald-600 hover:bg-emerald-700 text-white"
                    )}
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Scale className="w-4 h-4 inline mr-1" />
                Height
              </label>
              {unit === "metric" ? (
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="e.g. 170"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    min={50}
                    max={300}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="Feet"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      min={1}
                      max={8}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      ft
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="Inches"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      min={0}
                      max={11}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Activity className="w-4 h-4 inline mr-1" />
                Weight
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                  value={weightVal}
                  onChange={(e) => setWeightVal(e.target.value)}
                  min={1}
                  max={500}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {unit === "metric" ? "kg" : "lbs"}
                </span>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Age
              </label>
              <Input
                type="number"
                placeholder="e.g. 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={10}
                max={120}
              />
            </div>

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="w-full h-12 text-base bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md"
            >
              Calculate BMI
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {calculated && (
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                Reset
              </Button>
            )}
          </motion.div>

          {/* Results Panel */}
          <div className="space-y-6">
            {calculated && bmi > 0 ? (
              <>
                {/* BMI Result Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="p-6 rounded-2xl border bg-card shadow-sm space-y-6"
                >
                  {/* BMI Value */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Your Body Mass Index
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.15 }}
                      className="text-6xl sm:text-7xl font-black"
                      style={{ color: category.color }}
                    >
                      {bmi.toFixed(1)}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3"
                    >
                      <Badge
                        className={cn(
                          "text-sm px-4 py-1 font-semibold",
                          category.bg,
                          category.text,
                          category.border,
                          "border"
                        )}
                      >
                        {category.label}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* BMI Scale Bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <div className="relative h-5 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(to right, #3b82f6 0%, #3b82f6 20%, #22c55e 20%, #22c55e 45%, #f59e0b 45%, #f59e0b 68%, #ef4444 68%, #ef4444 100%)",
                        }}
                      />
                      <motion.div
                        initial={{ left: "0%" }}
                        animate={{ left: `${gaugePercent}%` }}
                        transition={{ type: "spring", delay: 0.35, duration: 0.8 }}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-[3px] border-white shadow-lg bg-gray-900"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground px-0.5">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground/60 px-0.5">
                      <span>&lt;18.5</span>
                      <span>18.5-24.9</span>
                      <span>25-29.9</span>
                      <span>30+</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Ideal Weight Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-5 rounded-2xl border bg-card shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-violet-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      Ideal Weight Range
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Based on the Devine formula for your height and gender:
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {unit === "metric"
                      ? `${Math.max(0, idealWeight.min).toFixed(1)} - ${idealWeight.max.toFixed(1)} kg`
                      : `${Math.max(0, idealWeight.min * 2.20462).toFixed(1)} - ${(idealWeight.max * 2.20462).toFixed(1)} lbs`}
                  </p>
                </motion.div>

                {/* Calorie Needs Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-5 rounded-2xl border bg-card shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      Estimated Daily Calories
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on the Mifflin-St Jeor equation (BMR: {Math.round(bmr)} kcal):
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Sedentary", value: calorieNeeds.sedentary, desc: "Little/no exercise", color: "from-blue-500/10 to-blue-600/5" },
                      { label: "Moderate", value: calorieNeeds.moderate, desc: "3-5 days/week", color: "from-emerald-500/10 to-emerald-600/5" },
                      { label: "Active", value: calorieNeeds.active, desc: "6-7 days/week", color: "from-orange-500/10 to-orange-600/5" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={cn(
                          "text-center p-3 rounded-xl bg-gradient-to-b",
                          item.color
                        )}
                      >
                        <p className="text-xs text-muted-foreground font-medium">
                          {item.label}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-foreground mt-1">
                          {item.value}
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[350px]"
              >
                <Activity className="w-14 h-14 text-muted-foreground/25 mb-4" />
                <p className="text-muted-foreground font-medium">
                  Enter your details and click Calculate
                </p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  Get your BMI, ideal weight, and calorie needs
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Health Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-5 rounded-2xl border bg-muted/30 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Health Disclaimer:</span>{" "}
            This calculator provides estimates for informational purposes only. BMI does not
            differentiate between muscle and fat mass, and may not be accurate for athletes,
            elderly individuals, or pregnant women. The calorie estimates are based on the
            Mifflin-St Jeor equation and should be used as a general guide. Always consult a
            qualified healthcare professional before making any changes to your diet or
            exercise routine.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
