"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import {
  calculateCycle,
  classifyDay,
  formatDate,
  type DayType,
} from "@/lib/calculators/period-tracker";

const DAY_COLORS: Record<DayType, { bg: string; label: string; text: string }> = {
  period: { bg: "#fca5a5", label: "Period", text: "#991b1b" },
  fertile: { bg: "#86efac", label: "Fertile", text: "#14532d" },
  ovulation: { bg: "#fcd34d", label: "Ovulation", text: "#78350f" },
  safe: { bg: "transparent", label: "Regular", text: "inherit" },
};

const PHASE_LABELS = {
  menstrual: { emoji: "🌙", label: "Menstrual Phase", desc: "Your period is active" },
  follicular: { emoji: "🌱", label: "Follicular Phase", desc: "Estrogen rising, energy building" },
  ovulation: { emoji: "🌟", label: "Ovulation Phase", desc: "Peak fertility window" },
  luteal: { emoji: "🍂", label: "Luteal Phase", desc: "Progesterone rises before next period" },
};

export default function PeriodTrackerPage() {
  const today = new Date();
  const defaultLmp = new Date(today);
  defaultLmp.setDate(today.getDate() - 14);

  const [lmpStr, setLmpStr] = useState<string>(
    defaultLmp.toISOString().slice(0, 10)
  );
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);

  const result = useMemo(() => {
    const lmp = new Date(lmpStr);
    if (isNaN(lmp.getTime())) return null;
    return calculateCycle({ lmp, cycleLength, periodLength });
  }, [lmpStr, cycleLength, periodLength]);

  // Generate 3-month calendar
  const calendar = useMemo(() => {
    if (!result) return [];
    const lmp = new Date(lmpStr);
    const months = [];
    const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    for (let m = 0; m < 3; m++) {
      const monthDate = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + m,
        1
      );
      const monthName = monthDate.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });
      const daysInMonth = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0
      ).getDate();
      const firstDayOfWeek = monthDate.getDay();

      const days = Array.from({ length: daysInMonth }, (_, d) => {
        const date = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          d + 1
        );
        const type = classifyDay(date, lmp, cycleLength, periodLength);
        const isToday = date.toDateString() === today.toDateString();
        return { day: d + 1, date, type, isToday };
      });

      months.push({ monthName, days, firstDayOfWeek });
    }
    return months;
  }, [result, lmpStr, cycleLength, periodLength, today]);

  const inputs = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Last Period Start Date
        </label>
        <Input
          type="date"
          value={lmpStr}
          max={today.toISOString().slice(0, 10)}
          onChange={(e) => setLmpStr(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Cycle Length: {cycleLength} days
        </label>
        <input
          type="range"
          min={21}
          max={35}
          value={cycleLength}
          onChange={(e) => setCycleLength(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>21</span>
          <span>28 (avg)</span>
          <span>35</span>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Period Duration: {periodLength} days
        </label>
        <input
          type="range"
          min={3}
          max={8}
          value={periodLength}
          onChange={(e) => setPeriodLength(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>3</span>
          <span>5 (avg)</span>
          <span>8</span>
        </div>
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border bg-card p-10 text-center"
        >
          <div className="text-5xl mb-3">🌸</div>
          <p className="text-muted-foreground">
            Select your last period start date to see predictions.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Current phase */}
          <div className="rounded-2xl border bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 p-6 text-center">
            <div className="text-4xl mb-2">
              {PHASE_LABELS[result.currentPhase].emoji}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              You&apos;re in the
            </p>
            <h2 className="text-2xl font-extrabold text-rose-700 dark:text-rose-300">
              {PHASE_LABELS[result.currentPhase].label}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {PHASE_LABELS[result.currentPhase].desc}
            </p>
          </div>

          {/* Key dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                Next Period
              </p>
              <p className="text-lg font-extrabold">
                {formatDate(result.nextPeriod)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                in {result.daysUntilNextPeriod} days
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                Ovulation
              </p>
              <p className="text-lg font-extrabold">
                {formatDate(result.ovulation)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {result.daysUntilOvulation >= 0
                  ? `in ${result.daysUntilOvulation} days`
                  : `${-result.daysUntilOvulation} days ago`}
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                Fertile Window
              </p>
              <p className="text-sm font-extrabold">
                {result.fertileStart.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} –{" "}
                {result.fertileEnd.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div className="rounded-2xl border bg-card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-bold">3-Month Forecast</h3>
              <div className="flex flex-wrap gap-3 text-[10px]">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-rose-300" /> Period
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-300" /> Fertile
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-300" /> Ovulation
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {calendar.map((month) => (
                <div key={month.monthName}>
                  <p className="text-sm font-semibold mb-2">{month.monthName}</p>
                  <div className="grid grid-cols-7 gap-1 text-[10px] text-muted-foreground font-semibold mb-1">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <div key={i} className="text-center">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: month.firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {month.days.map((day) => {
                      const color = DAY_COLORS[day.type];
                      return (
                        <div
                          key={day.day}
                          className={`aspect-square rounded-md flex items-center justify-center text-[11px] font-medium ${
                            day.isToday ? "ring-2 ring-foreground ring-offset-1" : ""
                          }`}
                          style={{
                            backgroundColor: color.bg,
                            color: color.text,
                          }}
                          title={color.label}
                        >
                          {day.day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 text-xs text-muted-foreground">
            ⚠️ <strong>Not a contraception method.</strong> These predictions are estimates. Consult a doctor for reliable family planning.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="period-tracker"
      title="Period & Ovulation Tracker"
      description="Predict your next period, fertile window, and ovulation day. Full 3-month calendar forecast with color-coded phases."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
