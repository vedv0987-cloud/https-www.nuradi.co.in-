"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Timer, Play, Square, Utensils, Clock } from "lucide-react";
import { ToolLayout } from "@/components/health-lab/tool-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchRelatedVideos, saveToLS, loadFromLS } from "@/lib/health-lab-utils";
import type { Video } from "@/types";

type FastingPlan = "16:8" | "18:6" | "20:4" | "23:1";

interface PlanInfo {
  id: FastingPlan;
  label: string;
  fastHours: number;
  eatHours: number;
  badge?: string;
}

const PLANS: PlanInfo[] = [
  { id: "16:8", label: "16:8", fastHours: 16, eatHours: 8, badge: "Popular" },
  { id: "18:6", label: "18:6", fastHours: 18, eatHours: 6 },
  { id: "20:4", label: "20:4", fastHours: 20, eatHours: 4 },
  { id: "23:1", label: "OMAD", fastHours: 23, eatHours: 1 },
];

interface TimerState {
  plan: FastingPlan;
  startTimestamp: number; // ms since epoch
  fastDurationMs: number;
}

function getPhase(hoursElapsed: number): { label: string; color: string } {
  if (hoursElapsed < 4) return { label: "Blood sugar dropping", color: "#3b82f6" };
  if (hoursElapsed < 8) return { label: "Fat burning begins", color: "#f59e0b" };
  if (hoursElapsed < 12) return { label: "Fat burning active", color: "#f97316" };
  if (hoursElapsed < 16) return { label: "Ketosis starting", color: "#8b5cf6" };
  return { label: "Deep autophagy", color: "#14b8a6" };
}

function formatCountdown(ms: number): { h: string; m: string; s: string } {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return {
    h: h.toString().padStart(2, "0"),
    m: m.toString().padStart(2, "0"),
    s: s.toString().padStart(2, "0"),
  };
}

function formatTimeFromDate(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function FastingPage() {
  const [plan, setPlan] = useState<FastingPlan>("16:8");
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState(0);
  const [startAmpm, setStartAmpm] = useState<"AM" | "PM">("PM");
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const [now, setNow] = useState(Date.now());
  const [videos, setVideos] = useState<Video[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load saved timer from localStorage on mount
  useEffect(() => {
    const saved = loadFromLS<TimerState>("fasting_timer");
    if (saved && saved.startTimestamp) {
      const endTime = saved.startTimestamp + saved.fastDurationMs;
      if (Date.now() < endTime) {
        setTimerState(saved);
        setPlan(saved.plan);
      } else {
        // Timer expired, clear it
        saveToLS("fasting_timer", null);
      }
    }

    const savedInputs = loadFromLS<{
      plan: FastingPlan; startHour: number; startMinute: number; startAmpm: "AM" | "PM";
    }>("fasting_inputs");
    if (savedInputs) {
      setPlan(savedInputs.plan);
      setStartHour(savedInputs.startHour);
      setStartMinute(savedInputs.startMinute);
      setStartAmpm(savedInputs.startAmpm);
    }
  }, []);

  // Real-time countdown interval
  useEffect(() => {
    if (timerState) {
      intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 1000);

      setVideos(
        searchRelatedVideos("intermittent fasting " + timerState.plan + " autophagy benefits")
      );

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [timerState]);

  const startFasting = useCallback(() => {
    const planInfo = PLANS.find((p) => p.id === plan)!;

    // Build start timestamp from input
    let h24 = startHour;
    if (startAmpm === "PM" && startHour !== 12) h24 += 12;
    if (startAmpm === "AM" && startHour === 12) h24 = 0;

    const startDate = new Date();
    startDate.setHours(h24, startMinute, 0, 0);

    // If the start time is in the future, assume it was yesterday
    if (startDate.getTime() > Date.now()) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const fastDurationMs = planInfo.fastHours * 60 * 60 * 1000;

    const state: TimerState = {
      plan,
      startTimestamp: startDate.getTime(),
      fastDurationMs,
    };

    setTimerState(state);
    saveToLS("fasting_timer", state);
    saveToLS("fasting_inputs", { plan, startHour, startMinute, startAmpm });
  }, [plan, startHour, startMinute, startAmpm]);

  const stopFasting = useCallback(() => {
    setTimerState(null);
    saveToLS("fasting_timer", null);
  }, []);

  // Derived timer values
  const elapsed = timerState ? now - timerState.startTimestamp : 0;
  const remaining = timerState ? Math.max(0, timerState.fastDurationMs - elapsed) : 0;
  const progress = timerState
    ? Math.min(1, elapsed / timerState.fastDurationMs)
    : 0;
  const hoursElapsed = elapsed / (1000 * 60 * 60);
  const phase = timerState ? getPhase(hoursElapsed) : null;
  const countdown = formatCountdown(remaining);
  const isComplete = timerState ? remaining <= 0 : false;

  // Eating window calculation
  const planInfo = PLANS.find((p) => p.id === plan)!;
  const eatingWindowStart = timerState
    ? new Date(timerState.startTimestamp + timerState.fastDurationMs)
    : null;
  const eatingWindowEnd = eatingWindowStart
    ? new Date(eatingWindowStart.getTime() + planInfo.eatHours * 60 * 60 * 1000)
    : null;

  // SVG circle
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - progress * circumference;

  return (
    <ToolLayout
      toolId="fasting"
      title="Fasting Timer"
      icon={Timer}
      color="#14b8a6"
      relatedVideos={videos}
      science="Intermittent fasting cycles between periods of eating and fasting. During fasting, insulin levels drop, prompting the body to switch from glucose to stored fat for energy. After 12-16 hours, the body enters ketosis, producing ketone bodies for fuel. Extended fasting (16+ hours) activates autophagy, a cellular cleanup process where damaged components are recycled. Research suggests intermittent fasting may improve insulin sensitivity, reduce inflammation, and support cardiovascular health. The 16:8 method is the most popular protocol, balancing ease of adherence with metabolic benefits."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input / Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 p-6 rounded-2xl border bg-card"
        >
          {!timerState ? (
            <>
              {/* Plan Selection */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Fasting Plan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PLANS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className={cn(
                        "relative p-4 rounded-xl border-2 text-left transition-all",
                        plan === p.id
                          ? "border-[#14b8a6] bg-[#14b8a6]/5"
                          : "border-muted hover:border-muted-foreground/30"
                      )}
                    >
                      {p.badge && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold bg-[#14b8a6] text-white px-1.5 py-0.5 rounded-full">
                          {p.badge}
                        </span>
                      )}
                      <p className="text-lg font-black">{p.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.fastHours}h fast / {p.eatHours}h eat
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Time Input */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  <Clock className="w-4 h-4 inline mr-1.5" />
                  I started fasting at
                </label>
                <div className="flex items-center gap-2 justify-center">
                  {/* Hour */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStartHour((h) => (h >= 12 ? 1 : h + 1))}
                      className="w-10"
                    >
                      +
                    </Button>
                    <div className="w-14 h-14 rounded-xl border-2 border-[#14b8a6]/30 bg-[#14b8a6]/5 flex items-center justify-center">
                      <span className="text-2xl font-black">{startHour.toString().padStart(2, "0")}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStartHour((h) => (h <= 1 ? 12 : h - 1))}
                      className="w-10"
                    >
                      -
                    </Button>
                  </div>

                  <span className="text-2xl font-black text-muted-foreground mt-[-20px]">:</span>

                  {/* Minute */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStartMinute((m) => (m >= 55 ? 0 : m + 5))}
                      className="w-10"
                    >
                      +
                    </Button>
                    <div className="w-14 h-14 rounded-xl border-2 border-[#14b8a6]/30 bg-[#14b8a6]/5 flex items-center justify-center">
                      <span className="text-2xl font-black">{startMinute.toString().padStart(2, "0")}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStartMinute((m) => (m <= 0 ? 55 : m - 5))}
                      className="w-10"
                    >
                      -
                    </Button>
                  </div>

                  {/* AM/PM */}
                  <div className="flex flex-col items-center gap-1 ml-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStartAmpm((v) => (v === "AM" ? "PM" : "AM"))}
                      className="w-10"
                    >
                      +
                    </Button>
                    <div className="w-14 h-14 rounded-xl border-2 border-[#14b8a6]/30 bg-[#14b8a6]/5 flex items-center justify-center">
                      <span className="text-lg font-black">{startAmpm}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStartAmpm((v) => (v === "AM" ? "PM" : "AM"))}
                      className="w-10"
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={startFasting}
                className="w-full h-11 text-base bg-[#14b8a6] hover:bg-[#0d9488] text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Fasting
              </Button>
            </>
          ) : (
            <>
              {/* Active Timer Info */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Currently fasting on</p>
                <p className="text-3xl font-black text-[#14b8a6]">{timerState.plan} Plan</p>
                <p className="text-xs text-muted-foreground">
                  Started at{" "}
                  {formatTimeFromDate(new Date(timerState.startTimestamp))}
                </p>
              </div>

              {/* Phase Indicator */}
              {phase && (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: `${phase.color}15` }}
                >
                  <p className="text-xs text-muted-foreground mb-1">Current Phase</p>
                  <p className="text-lg font-bold" style={{ color: phase.color }}>
                    {isComplete ? "Fast Complete!" : phase.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {hoursElapsed.toFixed(1)} hours elapsed
                  </p>
                </motion.div>
              )}

              {/* Eating Window */}
              {eatingWindowStart && eatingWindowEnd && (
                <div className="p-4 rounded-xl bg-muted/30 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="w-4 h-4 text-[#14b8a6]" />
                    <span className="font-medium">Eating Window</span>
                  </div>
                  <p className="text-lg font-bold">
                    {formatTimeFromDate(eatingWindowStart)} - {formatTimeFromDate(eatingWindowEnd)}
                  </p>
                </div>
              )}

              {/* Phase Timeline */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Fasting Phases</p>
                {[
                  { range: "0-4h", label: "Blood sugar dropping", color: "#3b82f6" },
                  { range: "4-8h", label: "Fat burning begins", color: "#f59e0b" },
                  { range: "8-12h", label: "Fat burning active", color: "#f97316" },
                  { range: "12-16h", label: "Ketosis starting", color: "#8b5cf6" },
                  { range: "16-24h", label: "Deep autophagy", color: "#14b8a6" },
                ].map((p) => {
                  const rangeStart = parseInt(p.range);
                  const isActive = phase?.label === p.label;
                  const isPast = hoursElapsed >= parseInt(p.range.split("-")[1]);
                  return (
                    <div
                      key={p.range}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all",
                        isActive && "border font-bold",
                        !isActive && !isPast && "opacity-40"
                      )}
                      style={
                        isActive
                          ? { borderColor: p.color, backgroundColor: `${p.color}10` }
                          : isPast
                            ? { backgroundColor: `${p.color}08` }
                            : {}
                      }
                    >
                      <div
                        className={cn("w-2.5 h-2.5 rounded-full", isPast || isActive ? "" : "opacity-30")}
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="text-muted-foreground">{p.range}</span>
                      <span style={isActive ? { color: p.color } : {}}>{p.label}</span>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={stopFasting}
                variant="outline"
                className="w-full h-11 text-base border-red-500/30 text-red-500 hover:bg-red-500/10"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Fasting
              </Button>
            </>
          )}
        </motion.div>

        {/* Timer Display Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {timerState ? (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="p-6 rounded-2xl border bg-card flex flex-col items-center space-y-6"
              >
                {/* Circular Countdown */}
                <div className="relative w-56 h-56">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                    <circle
                      cx="90"
                      cy="90"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      className="text-muted/20"
                      strokeWidth="8"
                    />
                    <circle
                      cx="90"
                      cy="90"
                      r={radius}
                      fill="none"
                      stroke={isComplete ? "#22c55e" : "#14b8a6"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeOffset}
                      className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {isComplete ? (
                      <>
                        <span className="text-2xl font-black text-[#22c55e]">Done!</span>
                        <span className="text-xs text-muted-foreground">Time to eat</span>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-4xl font-black tabular-nums text-foreground">
                            {countdown.h}
                          </span>
                          <span className="text-lg text-muted-foreground">:</span>
                          <span className="text-4xl font-black tabular-nums text-foreground">
                            {countdown.m}
                          </span>
                          <span className="text-lg text-muted-foreground">:</span>
                          <span className="text-4xl font-black tabular-nums text-foreground">
                            {countdown.s}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">remaining</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(progress * 100)}% complete</span>
                    <span>
                      {hoursElapsed.toFixed(1)}h / {planInfo.fastHours}h
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-linear"
                      style={{
                        width: `${Math.min(100, progress * 100)}%`,
                        backgroundColor: isComplete ? "#22c55e" : "#14b8a6",
                      }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="p-3 rounded-xl bg-muted/30 text-center">
                    <p className="text-xs text-muted-foreground">Fasting Window</p>
                    <p className="text-lg font-bold">{planInfo.fastHours}h</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 text-center">
                    <p className="text-xs text-muted-foreground">Eating Window</p>
                    <p className="text-lg font-bold">{planInfo.eatHours}h</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 rounded-2xl border border-dashed bg-muted/20 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <Timer className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Choose a fasting plan and start time, then click Start to begin your fast
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
