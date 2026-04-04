"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import {
  Smile,
  Heart,
  Brain,
  Wind,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

// ── types & helpers ─────────────────────────────────────────────────
interface MoodEntry {
  mood: number; // 1-5
  energy: number; // 1-5
  stress: number; // 1-5
  anxiety: number; // 1-5
  note: string;
}

function dateKey(d: Date = new Date()) {
  return `mood-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadEntry(key: string): MoodEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

function saveEntry(key: string, data: MoodEntry) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

function getDaysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function dayName(d: Date): string {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
}

function fullDayName(d: Date): string {
  return [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ][d.getDay()];
}

const MOOD_OPTIONS = [
  { value: 5, emoji: "😄", label: "Great", color: "bg-green-500", hex: "#22c55e" },
  { value: 4, emoji: "🙂", label: "Good", color: "bg-green-300", hex: "#86efac" },
  { value: 3, emoji: "😐", label: "Okay", color: "bg-yellow-400", hex: "#facc15" },
  { value: 2, emoji: "😟", label: "Low", color: "bg-orange-400", hex: "#fb923c" },
  { value: 1, emoji: "😢", label: "Awful", color: "bg-red-500", hex: "#ef4444" },
];

const STRESS_LABELS = ["Very Low", "Low", "Moderate", "High", "Very High"];
const ANXIETY_LABELS = ["Very Low", "Low", "Moderate", "High", "Very High"];
const ENERGY_LABELS = ["Exhausted", "Low", "Moderate", "Good", "Energized"];

function moodLabel(v: number): string {
  return MOOD_OPTIONS.find((m) => m.value === v)?.label ?? "Unknown";
}

function moodColor(v: number): string {
  return MOOD_OPTIONS.find((m) => m.value === v)?.hex ?? "#d1d5db";
}

function moodEmoji(v: number): string {
  return MOOD_OPTIONS.find((m) => m.value === v)?.emoji ?? "—";
}

// ── breathing exercise ──────────────────────────────────────────────
function BreathingExercise() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p === "inhale") return "exhale";
        setCount((c) => {
          if (c + 1 >= 3) {
            setTimeout(() => setActive(false), 4000);
          }
          return c + 1;
        });
        return "inhale";
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [active]);

  function start() {
    setCount(0);
    setPhase("inhale");
    setActive(true);
  }

  return (
    <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-6 text-center">
      <div className="mb-3 flex items-center justify-center gap-2 text-purple-700">
        <Wind className="h-5 w-5" />
        <h3 className="font-semibold">Quick Breathing Exercise</h3>
      </div>
      {!active ? (
        <>
          <p className="mb-4 text-sm text-gray-500">
            Take 3 deep breaths to calm your mind
          </p>
          <Button
            onClick={start}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Start Breathing
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              scale: phase === "inhale" ? 1.6 : 1,
              backgroundColor:
                phase === "inhale" ? "rgb(192,132,252)" : "rgb(216,180,254)",
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="flex h-28 w-28 items-center justify-center rounded-full"
          >
            <span className="text-lg font-semibold text-white">
              {phase === "inhale" ? "Breathe In" : "Breathe Out"}
            </span>
          </motion.div>
          <p className="text-sm text-gray-500">
            Breath {Math.min(count + 1, 3)} of 3
          </p>
        </div>
      )}
    </div>
  );
}

// ── main page ───────────────────────────────────────────────────────
export default function MoodTrackerPage() {
  const [mood, setMood] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [stress, setStress] = useState(0);
  const [anxiety, setAnxiety] = useState(0);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  // load today's data on mount
  useEffect(() => {
    setMounted(true);
    const existing = loadEntry(dateKey());
    if (existing) {
      setMood(existing.mood);
      setEnergy(existing.energy);
      setStress(existing.stress);
      setAnxiety(existing.anxiety);
      setNote(existing.note);
      setSaved(true);
    }
  }, []);

  // gather last 30 days of data
  const history = useMemo(() => {
    if (!mounted) return [];
    const entries: { date: Date; entry: MoodEntry | null }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = getDaysAgo(i);
      entries.push({ date: d, entry: loadEntry(dateKey(d)) });
    }
    return entries;
  }, [mounted, saved]);

  const last7 = useMemo(() => history.slice(-7), [history]);

  // pattern insights
  const insights = useMemo(() => {
    if (!mounted) return [];
    const lines: string[] = [];
    const filled = history.filter((h) => h.entry);
    if (filled.length === 0) return ["Start logging to see insights!"];

    // average mood this week
    const week = last7.filter((h) => h.entry);
    if (week.length > 0) {
      const avgMood = Math.round(
        week.reduce((s, h) => s + (h.entry?.mood ?? 0), 0) / week.length
      );
      lines.push(`Your average mood this week: ${moodLabel(avgMood)}`);
    }

    // stress by weekday
    const stressByDay: Record<number, number[]> = {};
    filled.forEach(({ date, entry }) => {
      if (!entry) return;
      const day = date.getDay();
      if (!stressByDay[day]) stressByDay[day] = [];
      stressByDay[day].push(entry.stress);
    });
    let maxStressDay = -1;
    let maxStressAvg = 0;
    Object.entries(stressByDay).forEach(([day, vals]) => {
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      if (avg > maxStressAvg) {
        maxStressAvg = avg;
        maxStressDay = Number(day);
      }
    });
    if (maxStressDay >= 0 && maxStressAvg >= 3) {
      lines.push(
        `You tend to feel more stressed on ${fullDayName(Object.assign(new Date(), { setDay: undefined }))}`.replace(
          /on .+/,
          `on ${fullDayName((() => { const d = new Date(); d.setDate(d.getDate() - d.getDay() + maxStressDay); return d; })())}`
        )
      );
    }

    // energy-stress correlation
    const withBoth = filled.filter(
      (h) => h.entry && h.entry.energy && h.entry.stress
    );
    if (withBoth.length >= 3) {
      const lowStress = withBoth.filter((h) => h.entry!.stress <= 2);
      const highStress = withBoth.filter((h) => h.entry!.stress >= 4);
      if (lowStress.length > 0 && highStress.length > 0) {
        const avgEnergyLow =
          lowStress.reduce((s, h) => s + h.entry!.energy, 0) /
          lowStress.length;
        const avgEnergyHigh =
          highStress.reduce((s, h) => s + h.entry!.energy, 0) /
          highStress.length;
        if (avgEnergyLow > avgEnergyHigh + 0.5) {
          lines.push("Energy is highest when stress is low");
        }
      }
    }

    return lines;
  }, [history, last7, mounted]);

  // consecutive bad days warning
  const showWarning = useMemo(() => {
    if (!mounted) return false;
    const recent = history.slice(-3);
    return recent.every(
      (h) => h.entry && (h.entry.stress >= 4 || h.entry.mood <= 2)
    );
  }, [history, mounted]);

  const handleSave = useCallback(() => {
    if (mood === 0 || energy === 0 || stress === 0 || anxiety === 0) return;
    const entry: MoodEntry = { mood, energy, stress, anxiety, note };
    saveEntry(dateKey(), entry);
    setSaved(true);
  }, [mood, energy, stress, anxiety, note]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1000px] px-4 pb-20 pt-6">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl bg-gradient-to-r from-purple-200 via-purple-100 to-lavender-100 p-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 50%, #ede9fe 100%)",
        }}
      >
        <div className="mb-1 flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-800">
            Mood &amp; Stress Tracker
          </h1>
        </div>
        <p className="text-sm text-purple-600">
          Check in with yourself daily
        </p>
      </motion.div>

      {/* ── daily check-in ─────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Smile className="h-5 w-5 text-purple-500" />
          Daily Check-in
        </h2>

        {/* mood */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-600">
            How are you feeling?
          </p>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((m) => (
              <Button
                key={m.value}
                variant={mood === m.value ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-1.5 text-sm",
                  mood === m.value &&
                    "bg-purple-600 text-white hover:bg-purple-700"
                )}
                onClick={() => setMood(m.value)}
              >
                <span className="text-lg">{m.emoji}</span> {m.label}
              </Button>
            ))}
          </div>
        </div>

        {/* energy */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Energy Level
          </p>
          <div className="flex flex-wrap gap-2">
            {ENERGY_LABELS.map((label, i) => (
              <Button
                key={i}
                variant={energy === i + 1 ? "default" : "outline"}
                size="sm"
                className={cn(
                  "text-xs",
                  energy === i + 1 &&
                    "bg-purple-600 text-white hover:bg-purple-700"
                )}
                onClick={() => setEnergy(i + 1)}
              >
                {i + 1} - {label}
              </Button>
            ))}
          </div>
        </div>

        {/* stress */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Stress Level
          </p>
          <div className="flex flex-wrap gap-2">
            {STRESS_LABELS.map((label, i) => (
              <Button
                key={i}
                variant={stress === i + 1 ? "default" : "outline"}
                size="sm"
                className={cn(
                  "text-xs",
                  stress === i + 1 &&
                    "bg-purple-600 text-white hover:bg-purple-700"
                )}
                onClick={() => setStress(i + 1)}
              >
                {i + 1} - {label}
              </Button>
            ))}
          </div>
        </div>

        {/* anxiety */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Anxiety Level
          </p>
          <div className="flex flex-wrap gap-2">
            {ANXIETY_LABELS.map((label, i) => (
              <Button
                key={i}
                variant={anxiety === i + 1 ? "default" : "outline"}
                size="sm"
                className={cn(
                  "text-xs",
                  anxiety === i + 1 &&
                    "bg-purple-600 text-white hover:bg-purple-700"
                )}
                onClick={() => setAnxiety(i + 1)}
              >
                {i + 1} - {label}
              </Button>
            ))}
          </div>
        </div>

        {/* note */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Note (optional)
          </p>
          <Input
            placeholder="Anything on your mind..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border-gray-200"
          />
        </div>

        {/* save */}
        <Button
          onClick={handleSave}
          disabled={mood === 0 || energy === 0 || stress === 0 || anxiety === 0}
          className="w-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-40"
        >
          {saved ? "Update Today" : "Log Today"}
        </Button>
        {saved && (
          <p className="mt-2 text-center text-xs text-green-600">
            Saved for today!
          </p>
        )}
      </motion.section>

      {/* ── 7-day chart ────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          Last 7 Days
        </h2>
        <div className="space-y-3">
          {last7.map(({ date, entry }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-10 shrink-0 font-medium text-gray-500">
                {dayName(date)}
              </span>
              {entry ? (
                <div className="flex flex-1 items-center gap-2">
                  {/* mood dot */}
                  <div className="flex items-center gap-1 w-24">
                    <span
                      className="inline-block h-4 w-4 rounded-full"
                      style={{ backgroundColor: moodColor(entry.mood) }}
                    />
                    <span className="text-xs text-gray-500">
                      {moodEmoji(entry.mood)}
                    </span>
                  </div>
                  {/* energy bar */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400 w-12">Energy</span>
                      <div className="h-2 flex-1 rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-blue-400"
                          style={{ width: `${(entry.energy / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* stress bar */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400 w-12">Stress</span>
                      <div className="h-2 flex-1 rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-red-400"
                          style={{ width: `${(entry.stress / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-gray-300">No data</span>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 30-day heatmap calendar ────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Calendar className="h-5 w-5 text-purple-500" />
          30-Day Mood Calendar
        </h2>
        <div className="grid grid-cols-7 gap-1.5">
          {history.map(({ date, entry }, i) => (
            <div
              key={i}
              className="group relative flex aspect-square items-center justify-center rounded-lg text-xs font-medium"
              style={{
                backgroundColor: entry
                  ? moodColor(entry.mood)
                  : "#f3f4f6",
                color: entry && entry.mood >= 3 ? "#fff" : entry ? "#fff" : "#9ca3af",
              }}
            >
              {date.getDate()}
              {/* tooltip */}
              {entry && (
                <div className="pointer-events-none absolute -top-14 left-1/2 z-10 hidden -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-white shadow-lg group-hover:block whitespace-nowrap">
                  {moodEmoji(entry.mood)} {moodLabel(entry.mood)} &middot; Stress{" "}
                  {entry.stress}/5
                </div>
              )}
            </div>
          ))}
        </div>
        {/* legend */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
          {MOOD_OPTIONS.map((m) => (
            <span key={m.value} className="flex items-center gap-1">
              <span
                className="inline-block h-3 w-3 rounded"
                style={{ backgroundColor: m.hex }}
              />
              {m.label}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded bg-gray-200" />
            No data
          </span>
        </div>
      </motion.section>

      {/* ── breathing exercise ─────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <BreathingExercise />
      </motion.section>

      {/* ── pattern insights ───────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Pattern Insights
        </h2>
        {insights.length > 0 ? (
          <ul className="space-y-2">
            {insights.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <Brain className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                {line}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">Log a few days to see patterns.</p>
        )}
      </motion.section>

      {/* ── gentle warning ─────────────────────────────────────────── */}
      {showWarning && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
            <div>
              <p className="font-semibold text-orange-800">A gentle reminder</p>
              <p className="mt-1 text-sm text-orange-700">
                It looks like you have been having a tough few days. Consider
                talking to someone you trust or a mental health professional.
                You are not alone, and reaching out is a sign of strength.
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
