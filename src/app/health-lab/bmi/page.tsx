"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, Minus, Plus, Info, Lightbulb, FlaskConical } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import { getBMITips } from "@/data/health-tips";
import { getRandomFacts } from "@/data/health-facts";
import type { Video } from "@/types";
import type { HealthTip } from "@/data/health-tips";
import type { HealthFact } from "@/data/health-facts";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  idealMin: number;
  idealMax: number;
  tip: string;
}

function getBMICategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: "Underweight", color: "#3b82f6" };
  if (bmi < 25) return { category: "Normal", color: "#22c55e" };
  if (bmi < 30) return { category: "Overweight", color: "#f59e0b" };
  return { category: "Obese", color: "#ef4444" };
}

function getPersonalizedTip(category: string, gender: Gender, age: number): string {
  if (category === "Underweight") {
    if (age < 25) return "At your age, focus on nutrient-dense meals with lean proteins and healthy fats to support growth and development.";
    return "Consider increasing calorie intake with whole foods. Strength training can help build healthy muscle mass.";
  }
  if (category === "Normal") {
    if (gender === "female") return "Great job maintaining a healthy weight! Continue with balanced nutrition and regular exercise for long-term wellbeing.";
    return "You are in a healthy range. Focus on body composition by incorporating both cardio and resistance training.";
  }
  if (category === "Overweight") {
    if (age > 40) return "A modest reduction of 300-500 calories daily combined with low-impact exercise like walking or swimming can make a significant difference.";
    return "Small lifestyle changes add up. Try replacing sugary drinks with water and adding 30 minutes of daily movement.";
  }
  if (age > 50) return "Consult your healthcare provider for a personalized plan. Focus on gentle, sustainable changes rather than rapid weight loss.";
  return "Start with achievable goals. Even a 5-10% weight reduction can significantly improve blood pressure and blood sugar levels.";
}

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);
      setDisplay(start + (value - start) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value]);

  return <>{display.toFixed(decimals)}</>;
}

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [heightCm, setHeightCm] = useState(170);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(25);
  const [result, setResult] = useState<BMIResult | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [tips, setTips] = useState<HealthTip[]>([]);
  const [facts, setFacts] = useState<HealthFact[]>([]);

  useEffect(() => {
    const saved = loadFromLS<{
      unit: Unit; heightCm: number; heightFt: number; heightIn: number;
      weight: number; gender: Gender; age: number;
    }>("bmi_inputs");
    if (saved) {
      setUnit(saved.unit);
      setHeightCm(saved.heightCm);
      setHeightFt(saved.heightFt);
      setHeightIn(saved.heightIn);
      setWeight(saved.weight);
      setGender(saved.gender);
      setAge(saved.age);
    }
  }, []);

  const calculate = useCallback(() => {
    let h: number;
    let w: number;

    if (unit === "metric") {
      h = heightCm / 100;
      w = weight;
    } else {
      h = (heightFt * 12 + heightIn) * 0.0254;
      w = weight * 0.453592;
    }

    const bmi = w / (h * h);
    const { category, color } = getBMICategory(bmi);
    const idealMin = 18.5 * h * h;
    const idealMax = 24.9 * h * h;
    const tip = getPersonalizedTip(category, gender, age);

    const r: BMIResult = { bmi, category, color, idealMin, idealMax, tip };
    setResult(r);

    const searchTerm =
      category === "Underweight" ? "underweight gain weight nutrition" :
      category === "Normal" ? "healthy lifestyle fitness nutrition" :
      category === "Overweight" ? "weight loss exercise diet plan" :
      "obesity weight management health";
    setVideos(searchRelatedVideos(searchTerm));

    setTips(getBMITips(bmi).slice(0, 3));
    setFacts(getRandomFacts(3));

    saveToLS("bmi_inputs", { unit, heightCm, heightFt, heightIn, weight, gender, age });
  }, [unit, heightCm, heightFt, heightIn, weight, gender, age]);

  const gaugePercent = result ? Math.min(Math.max((result.bmi / 40) * 100, 0), 100) : 0;

  return (
    <ToolLayout
      toolId="bmi"
      title="BMI Calculator"
      icon={Scale}
      color="#10b981"
      relatedVideos={videos}
      science="BMI (Body Mass Index) is calculated by dividing weight in kilograms by height in meters squared (kg/m2). Developed by Adolphe Quetelet in the 1830s, it remains one of the most widely used screening tools for weight categories. While useful for population-level analysis, BMI does not distinguish between muscle and fat mass, so athletes may show misleadingly high readings. The WHO uses BMI thresholds of 18.5, 25, and 30 to classify underweight, normal, overweight, and obese categories respectively."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
          {/* Unit Toggle */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Unit System</label>
            <div className="flex gap-2">
              {(["metric", "imperial"] as const).map((u) => (
                <Button
                  key={u}
                  variant={unit === u ? "default" : "outline"}
                  onClick={() => {
                    setUnit(u);
                    if (u === "imperial") {
                      const totalIn = Math.round(heightCm / 2.54);
                      setHeightFt(Math.floor(totalIn / 12));
                      setHeightIn(totalIn % 12);
                      setWeight(Math.round(weight * 2.20462));
                    } else {
                      setHeightCm(Math.round((heightFt * 12 + heightIn) * 2.54));
                      setWeight(Math.round(weight / 2.20462));
                    }
                  }}
                  className="flex-1 capitalize"
                >
                  {u}
                </Button>
              ))}
            </div>
          </div>

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
              min={10}
              max={100}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#10b981]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>10</span>
              <span>100</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Height: <span className="text-foreground font-bold">
                {unit === "metric" ? `${heightCm} cm` : `${heightFt}' ${heightIn}"`}
              </span>
            </label>
            {unit === "metric" ? (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setHeightCm((v) => Math.max(100, v - 1))}>
                  <Minus className="w-4 h-4" />
                </Button>
                <input
                  type="range"
                  min={100}
                  max={250}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="flex-1 accent-[#10b981]"
                />
                <Button variant="outline" size="icon" onClick={() => setHeightCm((v) => Math.min(250, v + 1))}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={() => setHeightFt((v) => Math.max(3, v - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-bold">{heightFt}ft</span>
                  <Button variant="outline" size="icon" onClick={() => setHeightFt((v) => Math.min(8, v + 1))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={() => setHeightIn((v) => Math.max(0, v - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-bold">{heightIn}in</span>
                  <Button variant="outline" size="icon" onClick={() => setHeightIn((v) => Math.min(11, v + 1))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Weight: <span className="text-foreground font-bold">
                {weight} {unit === "metric" ? "kg" : "lbs"}
              </span>
            </label>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setWeight((v) => Math.max(30, v - 1))}>
                <Minus className="w-4 h-4" />
              </Button>
              <input
                type="range"
                min={unit === "metric" ? 30 : 66}
                max={unit === "metric" ? 200 : 440}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="flex-1 accent-[#10b981]"
              />
              <Button variant="outline" size="icon" onClick={() => setWeight((v) => Math.min(unit === "metric" ? 200 : 440, v + 1))}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#10b981] hover:bg-[#059669] text-white">
            Calculate BMI
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
                {/* BMI Number */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-6xl font-black"
                    style={{ color: result.color }}
                  >
                    <AnimatedNumber value={result.bmi} />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg font-bold mt-2"
                    style={{ color: result.color }}
                  >
                    {result.category}
                  </motion.p>
                </div>

                {/* Gauge Bar */}
                <div className="space-y-2">
                  <div className="relative h-4 rounded-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 bg-blue-400/40" />
                      <div className="flex-1 bg-green-400/40" />
                      <div className="flex-1 bg-amber-400/40" />
                      <div className="flex-1 bg-red-400/40" />
                    </div>
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: `${gaugePercent}%` }}
                      transition={{ type: "spring", delay: 0.3, duration: 0.8 }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: result.color }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>

                {/* Ideal Weight Range */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-xl bg-muted/50 text-center"
                >
                  <p className="text-sm text-muted-foreground">Ideal Weight Range</p>
                  <p className="text-lg font-bold text-foreground">
                    {unit === "metric"
                      ? `${result.idealMin.toFixed(1)} - ${result.idealMax.toFixed(1)} kg`
                      : `${(result.idealMin * 2.20462).toFixed(1)} - ${(result.idealMax * 2.20462).toFixed(1)} lbs`}
                  </p>
                </motion.div>

                {/* Personalized Tip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3 p-4 rounded-xl border"
                  style={{ borderColor: `${result.color}40`, backgroundColor: `${result.color}08` }}
                >
                  <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: result.color }} />
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.tip}</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <Scale className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Enter your details and click Calculate to see your BMI results</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips & Facts */}
          <AnimatePresence>
            {result && tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" /> Tips for You
                </h3>
                <div className="space-y-2">
                  {tips.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="p-3 rounded-lg border bg-card text-sm"
                    >
                      <p className="text-muted-foreground">{t.text}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">Source: {t.source}</p>
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-sm font-bold flex items-center gap-1.5 mt-4">
                  <FlaskConical className="w-4 h-4 text-primary" /> Did You Know?
                </h3>
                <div className="space-y-2">
                  {facts.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + i * 0.1 }}
                      className="p-3 rounded-lg border bg-card text-sm"
                    >
                      <p className="text-muted-foreground">{f.text}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">Source: {f.source}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
