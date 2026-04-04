"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { Droplets, Plus, Minus, RotateCcw, Trophy, GlassWater } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────
function dateKey(d: Date = new Date()) {
  return `water-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function friendlyDate(d: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[d.getDay()];
}

interface LogEntry {
  time: string; // HH:MM
  amount: number; // ml
}

interface DayData {
  glasses: number;
  log: LogEntry[];
}

function loadDay(key: string): DayData {
  if (typeof window === "undefined") return { glasses: 0, log: [] };
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { glasses: 0, log: [] };
}

function saveDay(key: string, data: DayData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

function loadGoal(): number {
  if (typeof window === "undefined") return 8;
  const v = localStorage.getItem("water-goal");
  return v ? Number(v) : 8;
}

// ── confetti particles ───────────────────────────────────────────────
function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1.5,
    size: 6 + Math.random() * 8,
    color: ["#60a5fa", "#38bdf8", "#818cf8", "#34d399", "#facc15", "#f472b6"][
      Math.floor(Math.random() * 6)
    ],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: p.rotation + 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            borderRadius: p.size > 10 ? "50%" : "2px",
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ── circular progress ring ───────────────────────────────────────────
function ProgressRing({
  percent,
  size = 220,
  stroke = 10,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return (
    <svg width={size} height={size} className="absolute -inset-3 z-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-sky-100 dark:text-sky-900/40"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "center", rotate: "-90deg" }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── water bottle visualisation ───────────────────────────────────────
function WaterBottle({ percent }: { percent: number }) {
  const clamped = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="relative flex items-center justify-center">
      <ProgressRing percent={clamped} size={220} stroke={8} />

      {/* bottle outline */}
      <div className="relative z-10 flex flex-col items-center">
        {/* cap */}
        <div className="h-4 w-12 rounded-t-lg bg-sky-300 dark:bg-sky-600" />
        {/* neck */}
        <div className="h-3 w-10 bg-sky-200/60 dark:bg-sky-700/50" />

        {/* body */}
        <div
          className="relative h-40 w-24 overflow-hidden rounded-b-3xl border-2 border-sky-300 bg-sky-50/60 dark:border-sky-600 dark:bg-sky-950/40"
          style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
        >
          {/* water fill */}
          <motion.div
            className="absolute inset-x-0 bottom-0"
            initial={{ height: "0%" }}
            animate={{ height: `${clamped}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(to top, #1d4ed8, #38bdf8, #7dd3fc)",
            }}
          >
            {/* wave effect */}
            <svg
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              className="absolute -top-[10px] left-0 h-3 w-full"
            >
              <motion.path
                d="M0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6 V 12 H 0 Z"
                fill="url(#waveGrad)"
                animate={{ x: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* measurement lines */}
          {[25, 50, 75].map((line) => (
            <div
              key={line}
              className="absolute left-0 right-0 border-t border-dashed border-sky-200/40 dark:border-sky-700/30"
              style={{ bottom: `${line}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 7-day history bar chart ──────────────────────────────────────────
function WeekChart({ goal }: { goal: number }) {
  const bars: { label: string; glasses: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    const data = loadDay(key);
    bars.push({ label: friendlyDate(d), glasses: data.glasses });
  }
  const maxVal = Math.max(goal, ...bars.map((b) => b.glasses), 1);

  return (
    <div className="flex items-end justify-between gap-2 rounded-2xl bg-white/60 p-4 shadow-inner dark:bg-sky-950/30">
      {bars.map((bar, i) => {
        const pct = (bar.glasses / maxVal) * 100;
        const completionPct = goal > 0 ? bar.glasses / goal : 0;
        const barColor =
          completionPct >= 1
            ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
            : completionPct >= 0.5
              ? "bg-gradient-to-t from-sky-500 to-sky-300"
              : "bg-gradient-to-t from-sky-300 to-sky-200";

        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] font-semibold text-sky-700 dark:text-sky-300">
              {bar.glasses}
            </span>
            <div className="flex h-24 w-full items-end justify-center">
              <motion.div
                className={cn("w-full max-w-6 rounded-t-md", barColor)}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(pct, 4)}%` }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              />
            </div>
            <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── main page ────────────────────────────────────────────────────────
export default function WaterTrackerPage() {
  const todayKey = dateKey();

  const [glasses, setGlasses] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [goal, setGoal] = useState(8);
  const [customAmount, setCustomAmount] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevGoalReached = useRef(false);

  // ── load from localStorage on mount ──
  useEffect(() => {
    const data = loadDay(todayKey);
    setGlasses(data.glasses);
    setLog(data.log);
    setGoal(loadGoal());
    prevGoalReached.current = data.glasses >= loadGoal();
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── save to localStorage on change ──
  useEffect(() => {
    if (!mounted) return;
    saveDay(todayKey, { glasses, log });
  }, [glasses, log, todayKey, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("water-goal", String(goal));
  }, [goal, mounted]);

  // ── celebration check ──
  useEffect(() => {
    if (!mounted) return;
    if (glasses >= goal && goal > 0 && !prevGoalReached.current) {
      setShowConfetti(true);
      prevGoalReached.current = true;
      const t = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(t);
    }
    if (glasses < goal) {
      prevGoalReached.current = false;
    }
  }, [glasses, goal, mounted]);

  const addGlasses = useCallback(
    (amount: number) => {
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setGlasses((g) => Math.max(0, g + amount));
      if (amount > 0) {
        setLog((prev) => [...prev, { time, amount: amount * 250 }]);
      }
    },
    [],
  );

  const addCustom = useCallback(() => {
    const ml = parseInt(customAmount, 10);
    if (!ml || ml <= 0) return;
    const glassesCount = ml / 250;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setGlasses((g) => g + glassesCount);
    setLog((prev) => [...prev, { time, amount: ml }]);
    setCustomAmount("");
  }, [customAmount]);

  const resetDay = useCallback(() => {
    setGlasses(0);
    setLog([]);
    prevGoalReached.current = false;
  }, []);

  const percent = goal > 0 ? Math.min((glasses / goal) * 100, 100) : 0;
  const totalMl = Math.round(glasses * 250);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-white dark:from-sky-950 dark:to-gray-950">
        <Droplets className="h-10 w-10 animate-pulse text-sky-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 dark:from-sky-950 dark:via-gray-950 dark:to-sky-950">
      {showConfetti && <Confetti />}

      {/* ── header ── */}
      <header className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 px-4 py-8 text-white shadow-lg dark:from-sky-700 dark:via-cyan-700 dark:to-blue-800">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: 8 + i * 4,
                height: 8 + i * 4,
                left: `${10 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{ y: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 2 + i * 0.3,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <div className="relative mx-auto flex max-w-lg flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Droplets className="h-7 w-7" />
            <h1 className="text-2xl font-bold tracking-tight">Water Intake Tracker</h1>
          </div>
          <p className="text-sm text-sky-100">Stay hydrated, stay healthy</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 p-4 pb-12">
        {/* ── bottle + stats ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-sky-950/40"
        >
          <WaterBottle percent={percent} />

          {/* stats row */}
          <div className="flex w-full items-center justify-around text-center">
            <div>
              <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-300">
                {glasses % 1 === 0 ? glasses : glasses.toFixed(1)}
              </p>
              <p className="text-xs text-sky-500">
                of {goal} glasses
              </p>
            </div>
            <div className="h-10 w-px bg-sky-200 dark:bg-sky-700" />
            <div>
              <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-300">
                {totalMl}
                <span className="text-base font-medium">ml</span>
              </p>
              <p className="text-xs text-sky-500">total intake</p>
            </div>
            <div className="h-10 w-px bg-sky-200 dark:bg-sky-700" />
            <div>
              <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-300">
                {Math.round(percent)}%
              </p>
              <p className="text-xs text-sky-500">of daily goal</p>
            </div>
          </div>

          {glasses >= goal && goal > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              <Trophy className="h-5 w-5" />
              <span className="text-sm font-semibold">Daily goal reached!</span>
            </motion.div>
          )}
        </motion.section>

        {/* ── controls ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-sky-950/40"
        >
          {/* quick add */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-sky-300 text-sky-600 hover:bg-sky-100 dark:border-sky-600 dark:text-sky-300 dark:hover:bg-sky-900"
              onClick={() => glasses > 0 && addGlasses(-1)}
              disabled={glasses <= 0}
            >
              <Minus className="h-5 w-5" />
            </Button>

            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                className="h-16 gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 text-lg font-bold text-white shadow-lg hover:from-sky-600 hover:to-blue-700"
                onClick={() => addGlasses(1)}
              >
                <Plus className="h-5 w-5" />
                1 Glass
                <span className="text-xs font-normal opacity-80">(250ml)</span>
              </Button>
            </motion.div>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-rose-300 text-rose-500 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-950"
              onClick={resetDay}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {/* custom amount */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Custom ml"
              min={1}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              className="h-10 flex-1 rounded-xl border-sky-200 bg-sky-50/50 text-center dark:border-sky-700 dark:bg-sky-900/30"
            />
            <Button
              variant="outline"
              className="h-10 gap-1 rounded-xl border-sky-300 text-sky-600 hover:bg-sky-100 dark:border-sky-600 dark:text-sky-300"
              onClick={addCustom}
            >
              <GlassWater className="h-4 w-4" />
              Add
            </Button>
          </div>

          {/* goal adjustment */}
          <div className="flex items-center justify-between rounded-xl bg-sky-50/80 px-4 py-3 dark:bg-sky-900/20">
            <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
              Daily goal
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-sky-600"
                onClick={() => setGoal((g) => Math.max(1, g - 1))}
                disabled={goal <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-16 text-center text-lg font-bold text-sky-700 dark:text-sky-200">
                {goal} <span className="text-xs font-normal">glasses</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-sky-600"
                onClick={() => setGoal((g) => g + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* ── 7-day history ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-sky-950/40"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
            <Droplets className="h-4 w-4" />
            Last 7 Days
          </h2>
          <WeekChart goal={goal} />
        </motion.section>

        {/* ── time-stamped log ── */}
        {log.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-sky-950/40"
          >
            <h2 className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
              <GlassWater className="h-4 w-4" />
              Today&apos;s Log
            </h2>
            <div className="max-h-48 space-y-1 overflow-y-auto pr-1">
              {[...log].reverse().map((entry, i) => (
                <motion.div
                  key={`${entry.time}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg bg-sky-50/80 px-3 py-2 text-sm dark:bg-sky-900/20"
                >
                  <span className="font-mono text-sky-500 dark:text-sky-400">
                    {entry.time}
                  </span>
                  <span className="font-medium text-sky-700 dark:text-sky-300">
                    +{entry.amount}ml
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
