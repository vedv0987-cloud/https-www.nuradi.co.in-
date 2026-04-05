"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";

type Method = "16-8" | "18-6" | "20-4" | "omad";

const METHODS: Record<Method, { fastHours: number; eatHours: number; label: string }> = {
  "16-8": { fastHours: 16, eatHours: 8, label: "16:8 — Beginner friendly" },
  "18-6": { fastHours: 18, eatHours: 6, label: "18:6 — Intermediate" },
  "20-4": { fastHours: 20, eatHours: 4, label: "20:4 — Warrior diet" },
  "omad": { fastHours: 23, eatHours: 1, label: "OMAD — One Meal A Day" },
};

const BODY_STATES = [
  { hours: 0, emoji: "🍽️", label: "Fed state", desc: "Insulin rising, glucose in use" },
  { hours: 4, emoji: "⚡", label: "Post-absorptive", desc: "Blood glucose stable" },
  { hours: 8, emoji: "🔥", label: "Early fasting", desc: "Glycogen breakdown starts" },
  { hours: 12, emoji: "💪", label: "Fat burning begins", desc: "Ketosis starts building" },
  { hours: 16, emoji: "🧬", label: "Autophagy activated", desc: "Cell cleanup kicks in" },
  { hours: 20, emoji: "🌟", label: "Deep ketosis", desc: "Full fat adaptation" },
];

export default function FastingTimerPage() {
  const [method, setMethod] = useState<Method>("16-8");
  const [startTime, setStartTime] = useState<string>(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:00`;
  });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const { elapsed, phase, progressPct, timeDisplay, endsAt } = useMemo(() => {
    const today = new Date();
    const [h, m] = startTime.split(":").map(Number);
    const start = new Date(today);
    start.setHours(h, m, 0, 0);

    let diff = (now - start.getTime()) / 1000 / 3600; // hours
    if (diff < 0) diff += 24;
    diff = diff % 24;

    const m_info = METHODS[method];
    const eatHours = m_info.eatHours;
    const fastHours = m_info.fastHours;

    const phaseVal: "eating" | "fasting" = diff < eatHours ? "eating" : "fasting";
    const phaseElapsed = phaseVal === "eating" ? diff : diff - eatHours;
    const phaseTotal = phaseVal === "eating" ? eatHours : fastHours;
    const progress = Math.min(100, (phaseElapsed / phaseTotal) * 100);

    const remaining = phaseTotal - phaseElapsed;
    const hh = Math.floor(remaining);
    const mm = Math.floor((remaining - hh) * 60);
    const ss = Math.floor(((remaining - hh) * 60 - mm) * 60);

    const endsDate = new Date(now + remaining * 3600 * 1000);
    const endsAtStr = `${String(endsDate.getHours()).padStart(2, "0")}:${String(endsDate.getMinutes()).padStart(2, "0")}`;

    return {
      elapsed: phaseElapsed,
      phase: phaseVal,
      progressPct: progress,
      timeDisplay: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`,
      endsAt: endsAtStr,
    };
  }, [now, method, startTime]);

  const currentState = [...BODY_STATES].reverse().find((s) => elapsed >= s.hours) || BODY_STATES[0];

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Fasting Method</label>
        <RadioCards<Method>
          options={(Object.keys(METHODS) as Method[]).map((m) => ({ value: m, label: m.toUpperCase(), description: METHODS[m].label }))}
          value={method}
          onChange={setMethod}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Eating Window Start</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />
      </div>
    </div>
  );

  const isEating = phase === "eating";
  const color = isEating ? "#10b981" : "#f59e0b";

  const resultPanel = (
    <div className="space-y-6">
      {/* Circular timer */}
      <div className="rounded-2xl border bg-card p-8">
        <div className="relative w-56 h-56 mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="12" />
            <motion.circle
              cx="100" cy="100" r="90" fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 90}
              animate={{ strokeDashoffset: (2 * Math.PI * 90) * (1 - progressPct / 100) }}
              transition={{ duration: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{isEating ? "Eating Window" : "Fasting"}</p>
            <p className="text-3xl font-extrabold font-mono" style={{ color }}>{timeDisplay}</p>
            <p className="text-xs text-muted-foreground mt-1">until {isEating ? "fast begins" : "eating window"}</p>
            <p className="text-[10px] text-muted-foreground">ends at {endsAt}</p>
          </div>
        </div>
      </div>

      {/* Body state */}
      <div className="rounded-2xl border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 text-center">
        <div className="text-5xl mb-2">{currentState.emoji}</div>
        <p className="font-bold">{currentState.label}</p>
        <p className="text-xs text-muted-foreground mt-1">{currentState.desc}</p>
      </div>

      {/* All stages */}
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-3">Fasting Stages</h3>
        <div className="space-y-2">
          {BODY_STATES.map((s) => {
            const reached = elapsed >= s.hours && !isEating;
            return (
              <div key={s.hours} className={`flex items-center gap-3 py-2 ${reached ? "opacity-100" : "opacity-40"}`}>
                <div className={`w-12 text-center text-xs font-bold rounded-lg px-1.5 py-1 ${reached ? "bg-amber-500 text-white" : "bg-muted"}`}>
                  {s.hours}h
                </div>
                <span className="text-lg">{s.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      slug="fasting-timer"
      title="Intermittent Fasting Timer"
      description="Live fasting countdown with real-time body-state stages. Pick your schedule (16:8, 18:6, 20:4, OMAD) and track progress."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
