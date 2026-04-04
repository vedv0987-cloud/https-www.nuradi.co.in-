"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HeartPulse, Activity } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

interface HRZone {
  name: string;
  minPct: number;
  maxPct: number;
  color: string;
  bgColor: string;
  description: string;
  exercise: string;
}

const ZONES: HRZone[] = [
  {
    name: "Zone 1 - Warm Up",
    minPct: 0.50,
    maxPct: 0.60,
    color: "#6b7280",
    bgColor: "#6b728015",
    description: "Very light effort. Improves overall health and recovery.",
    exercise: "Easy walking, light stretching, warm-up cooldown",
  },
  {
    name: "Zone 2 - Fat Burn",
    minPct: 0.60,
    maxPct: 0.70,
    color: "#3b82f6",
    bgColor: "#3b82f615",
    description: "Light effort. Best zone for fat oxidation and endurance building.",
    exercise: "Brisk walking, easy cycling, light jogging",
  },
  {
    name: "Zone 3 - Cardio",
    minPct: 0.70,
    maxPct: 0.80,
    color: "#22c55e",
    bgColor: "#22c55e15",
    description: "Moderate effort. Improves cardiovascular fitness and aerobic capacity.",
    exercise: "Running, swimming, cycling at moderate intensity",
  },
  {
    name: "Zone 4 - Hard",
    minPct: 0.80,
    maxPct: 0.90,
    color: "#f59e0b",
    bgColor: "#f59e0b15",
    description: "Hard effort. Increases maximum performance and anaerobic threshold.",
    exercise: "Tempo runs, high-intensity intervals, competitive sports",
  },
  {
    name: "Zone 5 - Maximum",
    minPct: 0.90,
    maxPct: 1.00,
    color: "#ef4444",
    bgColor: "#ef444415",
    description: "Maximum effort. Short bursts only. Develops speed and power.",
    exercise: "All-out sprints, HIIT peak intervals, race finishes",
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress * (2 - progress);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value]);

  return <>{display}</>;
}

export default function HeartRateZonePage() {
  const [age, setAge] = useState(30);
  const [restingHR, setRestingHR] = useState(70);
  const [useResting, setUseResting] = useState(false);
  const [maxHR, setMaxHR] = useState<number | null>(null);
  const [zoneData, setZoneData] = useState<{ zone: HRZone; minBPM: number; maxBPM: number }[] | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const saved = loadFromLS<{
      age: number; restingHR: number; useResting: boolean;
    }>("heartrate_inputs");
    if (saved) {
      setAge(saved.age);
      setRestingHR(saved.restingHR);
      setUseResting(saved.useResting);
    }
  }, []);

  const calculate = useCallback(() => {
    const mhr = 220 - age;
    setMaxHR(mhr);

    const zones = ZONES.map((zone) => {
      let minBPM: number;
      let maxBPM: number;

      if (useResting) {
        // Karvonen formula: Target HR = ((Max HR - Resting HR) x %Intensity) + Resting HR
        const reserve = mhr - restingHR;
        minBPM = Math.round(reserve * zone.minPct + restingHR);
        maxBPM = Math.round(reserve * zone.maxPct + restingHR);
      } else {
        minBPM = Math.round(mhr * zone.minPct);
        maxBPM = Math.round(mhr * zone.maxPct);
      }

      return { zone, minBPM, maxBPM };
    });

    setZoneData(zones);
    setVideos(searchRelatedVideos("heart rate zones cardio training exercise"));
    saveToLS("heartrate_inputs", { age, restingHR, useResting });
  }, [age, restingHR, useResting]);

  return (
    <ToolLayout
      toolId="heart-rate"
      title="Heart Rate Zones"
      icon={HeartPulse}
      color="#ec4899"
      relatedVideos={videos}
      science="Maximum heart rate is estimated using the formula 220 minus your age, a widely accepted approximation first proposed by Fox et al. in 1971. When a resting heart rate is provided, the Karvonen method is used instead, which calculates target zones based on heart rate reserve (max HR minus resting HR) for more personalized results. Training in different heart rate zones targets distinct physiological adaptations: lower zones improve fat metabolism and aerobic base, while higher zones develop anaerobic capacity and speed."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
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
              className="w-full accent-[#ec4899]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15</span>
              <span>80</span>
            </div>
          </div>

          {/* Resting HR Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-muted-foreground">
                Resting Heart Rate <span className="text-xs">(optional)</span>
              </label>
              <button
                onClick={() => setUseResting(!useResting)}
                className={cn(
                  "relative w-10 h-5 rounded-full transition-colors",
                  useResting ? "bg-[#ec4899]" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                    useResting ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
            {useResting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="text-sm text-muted-foreground mb-1 block">
                  Resting HR: <span className="text-foreground font-bold">{restingHR} bpm</span>
                </label>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={restingHR}
                  onChange={(e) => setRestingHR(Number(e.target.value))}
                  className="w-full accent-[#ec4899]"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>40 bpm</span>
                  <span>100 bpm</span>
                </div>
              </motion.div>
            )}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg bg-muted/50">
            <Activity className="w-3.5 h-3.5 inline mr-1" />
            {useResting
              ? "Using the Karvonen formula with your resting heart rate for more personalized zones."
              : "Using the standard formula (220 - age). Enable resting HR for more accurate zones."}
          </p>

          <Button onClick={calculate} className="w-full h-11 text-base bg-[#ec4899] hover:bg-[#db2777] text-white">
            Calculate Heart Rate Zones
          </Button>
        </motion.div>

        {/* Result Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {maxHR !== null && zoneData ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="space-y-4"
              >
                {/* Max HR Display */}
                <div className="p-6 rounded-2xl border bg-card text-center">
                  <p className="text-sm text-muted-foreground mb-1">Maximum Heart Rate</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-5xl font-black text-[#ec4899]"
                  >
                    <AnimatedNumber value={maxHR} />
                  </motion.div>
                  <p className="text-muted-foreground text-sm mt-1">beats per minute</p>
                  {useResting && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Heart Rate Reserve: <span className="font-medium text-foreground">{maxHR - restingHR} bpm</span>
                    </p>
                  )}
                </div>

                {/* Zone Bars */}
                <div className="space-y-3">
                  {zoneData.map((z, i) => (
                    <motion.div
                      key={z.zone.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      className="p-4 rounded-xl border"
                      style={{ borderColor: `${z.zone.color}30`, backgroundColor: z.zone.bgColor }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold" style={{ color: z.zone.color }}>
                          {z.zone.name}
                        </span>
                        <span className="text-sm font-mono font-bold" style={{ color: z.zone.color }}>
                          {z.minBPM} - {z.maxBPM} bpm
                        </span>
                      </div>

                      {/* Animated fill bar */}
                      <div className="h-2.5 bg-muted/60 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${z.zone.maxPct * 100}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: z.zone.color }}
                        />
                      </div>

                      <p className="text-xs text-muted-foreground">{z.zone.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="font-medium text-foreground">Best for:</span> {z.zone.exercise}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <HeartPulse className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Enter your age and click Calculate to discover your heart rate training zones</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
