"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Percent, Info } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

type Gender = "male" | "female";

interface BodyFatResult {
  bodyFat: number;
  category: string;
  color: string;
  fatMass: number;
  leanMass: number;
}

function getCategory(bf: number, gender: Gender): { category: string; color: string } {
  if (gender === "male") {
    if (bf < 6) return { category: "Essential", color: "#ef4444" };
    if (bf < 14) return { category: "Athletes", color: "#3b82f6" };
    if (bf < 18) return { category: "Fitness", color: "#22c55e" };
    if (bf < 25) return { category: "Average", color: "#f59e0b" };
    return { category: "Above Average", color: "#ef4444" };
  }
  if (bf < 14) return { category: "Essential", color: "#ef4444" };
  if (bf < 21) return { category: "Athletes", color: "#3b82f6" };
  if (bf < 25) return { category: "Fitness", color: "#22c55e" };
  if (bf < 32) return { category: "Average", color: "#f59e0b" };
  return { category: "Above Average", color: "#ef4444" };
}

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    const startVal = 0;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);
      setDisplay(startVal + (value - startVal) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value]);

  return <>{display.toFixed(decimals)}</>;
}

export default function BodyFatPage() {
  const [gender, setGender] = useState<Gender>("male");
  const [height, setHeight] = useState(170);
  const [neck, setNeck] = useState(38);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(100);
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [animatedBf, setAnimatedBf] = useState(0);

  useEffect(() => {
    const saved = loadFromLS<{
      gender: Gender; height: number; neck: number; waist: number; hip: number;
    }>("bodyfat_inputs");
    if (saved) {
      setGender(saved.gender);
      setHeight(saved.height);
      setNeck(saved.neck);
      setWaist(saved.waist);
      setHip(saved.hip);
    }
  }, []);

  // Animate the circular progress ring value
  useEffect(() => {
    if (!result) return;
    const duration = 1200;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);
      setAnimatedBf((result?.bodyFat ?? 0) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [result]);

  const calculate = useCallback(() => {
    let bf: number;

    if (gender === "male") {
      bf =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
    } else {
      bf =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450;
    }

    bf = Math.max(0, Math.min(bf, 60));
    const { category, color } = getCategory(bf, gender);

    // Estimate weight from height for mass calc (rough estimate)
    const heightM = height / 100;
    const estimatedWeight = 22 * heightM * heightM; // BMI of 22
    const fatMass = (bf / 100) * estimatedWeight;
    const leanMass = estimatedWeight - fatMass;

    setResult({ bodyFat: bf, category, color, fatMass, leanMass });
    setVideos(searchRelatedVideos("body fat percentage fitness body composition"));
    saveToLS("bodyfat_inputs", { gender, height, neck, waist, hip });
  }, [gender, height, neck, waist, hip]);

  const circumference = 2 * Math.PI * 70; // SVG circle radius=70
  const progressOffset = result
    ? circumference - (animatedBf / 60) * circumference
    : circumference;

  return (
    <ToolLayout
      toolId="body-fat"
      title="Body Fat Estimator"
      icon={Percent}
      color="#f59e0b"
      relatedVideos={videos}
      science="The US Navy body fat formula uses circumference measurements to estimate body fat percentage. For men, it uses waist and neck circumferences along with height. For women, it adds hip circumference. Developed by Hodgdon and Beckett at the Naval Health Research Center, this method correlates well with hydrostatic weighing and DEXA scans while requiring only a tape measure. The formula uses logarithmic relationships between body circumferences and body density to derive fat percentage."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
          {/* Gender Toggle */}
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

          {/* Height */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Height: <span className="text-foreground font-bold">{height} cm</span>
            </label>
            <input
              type="range"
              min={100}
              max={250}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-[#f59e0b]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>100 cm</span>
              <span>250 cm</span>
            </div>
          </div>

          {/* Neck */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Neck Circumference: <span className="text-foreground font-bold">{neck} cm</span>
            </label>
            <input
              type="range"
              min={20}
              max={60}
              value={neck}
              onChange={(e) => setNeck(Number(e.target.value))}
              className="w-full accent-[#f59e0b]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>20 cm</span>
              <span>60 cm</span>
            </div>
          </div>

          {/* Waist */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Waist Circumference: <span className="text-foreground font-bold">{waist} cm</span>
            </label>
            <input
              type="range"
              min={50}
              max={150}
              value={waist}
              onChange={(e) => setWaist(Number(e.target.value))}
              className="w-full accent-[#f59e0b]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>50 cm</span>
              <span>150 cm</span>
            </div>
          </div>

          {/* Hip (female only) */}
          <AnimatePresence>
            {gender === "female" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Hip Circumference: <span className="text-foreground font-bold">{hip} cm</span>
                </label>
                <input
                  type="range"
                  min={60}
                  max={160}
                  value={hip}
                  onChange={(e) => setHip(Number(e.target.value))}
                  className="w-full accent-[#f59e0b]"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>60 cm</span>
                  <span>160 cm</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#f59e0b] hover:bg-[#d97706] text-white">
            Estimate Body Fat
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
                {/* Circular Progress Ring */}
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        className="text-muted/20"
                        strokeWidth="10"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke={result.color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: progressOffset }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black" style={{ color: result.color }}>
                        <AnimatedNumber value={result.bodyFat} />%
                      </span>
                      <span className="text-sm text-muted-foreground">Body Fat</span>
                    </div>
                  </div>

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

                {/* Category Scale */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-muted-foreground font-medium">
                    Category Ranges ({gender === "male" ? "Male" : "Female"})
                  </p>
                  <div className="space-y-1.5">
                    {(gender === "male"
                      ? [
                          { label: "Essential", range: "2-5%", color: "#ef4444" },
                          { label: "Athletes", range: "6-13%", color: "#3b82f6" },
                          { label: "Fitness", range: "14-17%", color: "#22c55e" },
                          { label: "Average", range: "18-24%", color: "#f59e0b" },
                          { label: "Above Average", range: "25%+", color: "#ef4444" },
                        ]
                      : [
                          { label: "Essential", range: "10-13%", color: "#ef4444" },
                          { label: "Athletes", range: "14-20%", color: "#3b82f6" },
                          { label: "Fitness", range: "21-24%", color: "#22c55e" },
                          { label: "Average", range: "25-31%", color: "#f59e0b" },
                          { label: "Above Average", range: "32%+", color: "#ef4444" },
                        ]
                    ).map((cat) => (
                      <div
                        key={cat.label}
                        className={cn(
                          "flex items-center justify-between px-3 py-1.5 rounded-lg text-sm",
                          result.category === cat.label ? "border-2 font-bold" : "bg-muted/30"
                        )}
                        style={
                          result.category === cat.label
                            ? { borderColor: cat.color, backgroundColor: `${cat.color}10` }
                            : {}
                        }
                      >
                        <span>{cat.label}</span>
                        <span className="text-muted-foreground">{cat.range}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Fat Mass vs Lean Mass Stacked Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-muted-foreground font-medium">Body Composition (estimated)</p>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.bodyFat}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#f59e0b" }}
                    >
                      {result.bodyFat > 10 && `${result.bodyFat.toFixed(1)}% Fat`}
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - result.bodyFat}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#3b82f6" }}
                    >
                      {(100 - result.bodyFat) > 10 && `${(100 - result.bodyFat).toFixed(1)}% Lean`}
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                      Fat Mass ~{result.fatMass.toFixed(1)} kg
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                      Lean Mass ~{result.leanMass.toFixed(1)} kg
                    </div>
                  </div>
                </motion.div>

                {/* Tip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-3 p-4 rounded-xl border"
                  style={{ borderColor: `${result.color}40`, backgroundColor: `${result.color}08` }}
                >
                  <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: result.color }} />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.category === "Essential"
                      ? "Essential fat levels are necessary for basic physiological functions. Going below this level can be dangerous."
                      : result.category === "Athletes"
                        ? "You are in the athletic range. This level of body fat is common in trained athletes and is considered healthy."
                        : result.category === "Fitness"
                          ? "You are in the fitness range. This is a healthy body fat level associated with good physical fitness."
                          : result.category === "Average"
                            ? "You are in the average range. Consider increasing physical activity and improving nutrition to lower body fat."
                            : "Your body fat is above average. Focus on a caloric deficit with strength training to improve body composition."}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <Percent className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Enter your measurements and click Estimate to see your body fat percentage</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
