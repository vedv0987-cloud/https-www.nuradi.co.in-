"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Droplets, GlassWater, Clock, Sun, Activity } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

type ActivityLevel = "low" | "medium" | "high";
type Climate = "moderate" | "hot";

interface WaterResult {
  liters: number;
  glasses: number;
  schedule: { time: string; amount: number }[];
}

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value]);

  return <>{display.toFixed(decimals)}</>;
}

function generateSchedule(totalMl: number): { time: string; amount: number }[] {
  const schedule: { time: string; amount: number }[] = [];
  const wakeHour = 7;
  const sleepHour = 23;
  const hours = sleepHour - wakeHour;
  const perHour = Math.round(totalMl / hours);

  for (let h = wakeHour; h < sleepHour; h++) {
    const hour12 = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    schedule.push({
      time: `${hour12}:00 ${ampm}`,
      amount: perHour,
    });
  }
  return schedule;
}

export default function WaterIntakeCalculatorPage() {
  const [weightKg, setWeightKg] = useState(70);
  const [activity, setActivity] = useState<ActivityLevel>("medium");
  const [climate, setClimate] = useState<Climate>("moderate");
  const [result, setResult] = useState<WaterResult | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const saved = loadFromLS<{
      weightKg: number; activity: ActivityLevel; climate: Climate;
    }>("water_inputs");
    if (saved) {
      setWeightKg(saved.weightKg);
      setActivity(saved.activity);
      setClimate(saved.climate);
    }
  }, []);

  const calculate = useCallback(() => {
    let liters = weightKg * 0.033;

    if (activity === "medium") liters += 0.5;
    if (activity === "high") liters += 1.0;

    if (climate === "hot") liters += 0.5;

    const glasses = Math.ceil((liters * 1000) / 250);
    const schedule = generateSchedule(liters * 1000);

    setResult({ liters, glasses, schedule });
    setVideos(searchRelatedVideos("water hydration health kidney"));
    saveToLS("water_inputs", { weightKg, activity, climate });
  }, [weightKg, activity, climate]);

  return (
    <ToolLayout
      toolId="water"
      title="Water Intake Calculator"
      icon={Droplets}
      color="#3b82f6"
      relatedVideos={videos}
      science="The base water intake formula multiplies body weight (kg) by 0.033 to get liters per day. This accounts for the water needed for cellular functions, temperature regulation, and waste removal. Physical activity increases water loss through sweat (0.5-1L per hour of exercise), while hot climates accelerate evaporative water loss. The Institute of Medicine recommends 3.7L/day for men and 2.7L/day for women from all sources including food, which typically provides about 20% of daily water intake."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
          {/* Weight */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Weight: <span className="text-foreground font-bold">{weightKg} kg</span>
            </label>
            <input
              type="range"
              min={30}
              max={180}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[#3b82f6]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>30 kg</span>
              <span>180 kg</span>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              <Activity className="w-3.5 h-3.5 inline mr-1" /> Activity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "low" as const, label: "Low", desc: "Mostly sitting" },
                { id: "medium" as const, label: "Medium", desc: "Regular exercise" },
                { id: "high" as const, label: "High", desc: "Intense training" },
              ]).map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActivity(a.id)}
                  className={cn(
                    "p-3 rounded-xl border text-center transition-all",
                    activity === a.id
                      ? "border-[#3b82f6] bg-[#3b82f6]/10 ring-1 ring-[#3b82f6]/30"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Climate */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              <Sun className="w-3.5 h-3.5 inline mr-1" /> Climate
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "moderate" as const, label: "Moderate", desc: "Temperate weather" },
                { id: "hot" as const, label: "Hot", desc: "Warm / tropical" },
              ]).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setClimate(c.id)}
                  className={cn(
                    "p-3 rounded-xl border text-center transition-all",
                    climate === c.id
                      ? "border-[#3b82f6] bg-[#3b82f6]/10 ring-1 ring-[#3b82f6]/30"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <p className="text-sm font-medium">{c.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#3b82f6] hover:bg-[#2563eb] text-white">
            Calculate Water Intake
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
                className="space-y-6"
              >
                {/* Liters Display */}
                <div className="p-6 rounded-2xl border bg-card text-center">
                  <p className="text-sm text-muted-foreground mb-1">Daily Water Intake</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-5xl font-black text-[#3b82f6]"
                  >
                    <AnimatedNumber value={result.liters} />
                  </motion.div>
                  <p className="text-muted-foreground text-sm mt-1">liters per day</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    That is <span className="font-medium text-foreground">{Math.round(result.liters * 1000)} ml</span> or{" "}
                    <span className="font-medium text-foreground">{result.glasses} glasses</span>
                  </p>
                </div>

                {/* Glass Icons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-5 rounded-2xl border bg-card"
                >
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-1.5">
                    <GlassWater className="w-4 h-4 text-[#3b82f6]" /> {result.glasses} Glasses (250ml each)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: result.glasses }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.06, type: "spring" }}
                        className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center"
                      >
                        <GlassWater className="w-4 h-4 text-[#3b82f6]" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Hourly Schedule */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-5 rounded-2xl border bg-card"
                >
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#3b82f6]" /> Hourly Drinking Schedule
                  </h3>
                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {result.schedule.map((slot, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.03 }}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                      >
                        <span className="text-muted-foreground text-xs">{slot.time}</span>
                        <span className="font-medium text-[#3b82f6]">{slot.amount} ml</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <Droplets className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Enter your weight and preferences to calculate your daily water needs</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
