"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import {
  Plus,
  X,
  ClipboardCopy,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Activity,
} from "lucide-react";

interface SymptomEntry {
  name: string;
  severity: number;
}

interface JournalEntry {
  symptoms: SymptomEntry[];
  mood: number;
  notes: string;
  date: string;
}

const MOODS = ["😄", "😊", "😐", "😟", "😢"];

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getStorageKey(date: string): string {
  return `journal-${date}`;
}

function loadEntry(date: string): JournalEntry | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(getStorageKey(date));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveEntry(entry: JournalEntry) {
  localStorage.setItem(getStorageKey(entry.date), JSON.stringify(entry));
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
}

function getCalendarDays(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startPad = first.getDay();
  const cells: (string | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d);
    cells.push(formatDate(date));
  }
  return cells;
}

function avgSeverity(entry: JournalEntry): number {
  if (entry.symptoms.length === 0) return 0;
  return (
    entry.symptoms.reduce((s, e) => s + e.severity, 0) / entry.symptoms.length
  );
}

function severityColor(avg: number): string {
  if (avg === 0) return "bg-white/10";
  if (avg <= 2) return "bg-green-500";
  if (avg <= 3.5) return "bg-yellow-500";
  return "bg-red-500";
}

function severityDots(severity: number) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            i <= severity ? "bg-white" : "bg-white/20"
          )}
        />
      ))}
    </span>
  );
}

export default function JournalPage() {
  const today = formatDate(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [mood, setMood] = useState<number>(2);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<Record<string, JournalEntry>>({});
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadAllEntries = useCallback(() => {
    if (typeof window === "undefined") return;
    const loaded: Record<string, JournalEntry> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("journal-")) {
        const date = key.replace("journal-", "");
        const entry = loadEntry(date);
        if (entry) loaded[date] = entry;
      }
    }
    setEntries(loaded);
  }, []);

  useEffect(() => {
    loadAllEntries();
  }, [loadAllEntries]);

  useEffect(() => {
    const existing = entries[selectedDate];
    if (existing) {
      setSymptoms(existing.symptoms);
      setMood(existing.mood);
      setNotes(existing.notes);
    } else {
      setSymptoms([]);
      setMood(2);
      setNotes("");
    }
  }, [selectedDate, entries]);

  function addSymptoms() {
    const raw = symptomInput.trim();
    if (!raw) return;
    const names = raw.includes(",")
      ? raw.split(",").map((s) => s.trim()).filter(Boolean)
      : [raw];
    const newSymptoms = names.map((name) => ({ name, severity: 3 }));
    setSymptoms((prev) => [...prev, ...newSymptoms]);
    setSymptomInput("");
  }

  function removeSymptom(index: number) {
    setSymptoms((prev) => prev.filter((_, i) => i !== index));
  }

  function setSeverity(index: number, severity: number) {
    setSymptoms((prev) =>
      prev.map((s, i) => (i === index ? { ...s, severity } : s))
    );
  }

  function handleLog() {
    const entry: JournalEntry = {
      symptoms,
      mood,
      notes,
      date: selectedDate,
    };
    saveEntry(entry);
    loadAllEntries();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function detectPatterns(): string[] {
    const last7 = getLast7Days();
    const symptomCounts: Record<string, number> = {};
    for (const date of last7) {
      const entry = entries[date];
      if (entry) {
        for (const s of entry.symptoms) {
          symptomCounts[s.name] = (symptomCounts[s.name] || 0) + 1;
        }
      }
    }
    return Object.entries(symptomCounts)
      .filter(([, count]) => count >= 2)
      .map(([name, count]) => `You've reported "${name}" ${count} times this week`);
  }

  async function exportToText() {
    const sorted = Object.values(entries).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const lines = sorted.map((e) => {
      const symptomsStr = e.symptoms
        .map((s) => `${s.name} (severity: ${s.severity}/5)`)
        .join(", ");
      return [
        `Date: ${e.date}`,
        `Mood: ${MOODS[e.mood]}`,
        `Symptoms: ${symptomsStr || "None"}`,
        `Notes: ${e.notes || "—"}`,
        "---",
      ].join("\n");
    });
    const text = "=== Health Journal Export ===\n\n" + lines.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const last7 = getLast7Days();
  const patterns = detectPatterns();
  const calDays = getCalendarDays(calYear, calMonth);
  const monthName = new Date(calYear, calMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">
              Symptom Diary
            </h1>
          </div>
          <p className="text-sm text-white/50">
            Track your daily symptoms, mood, and health patterns
          </p>
        </motion.div>

        {/* Date selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
        >
          <span className="text-sm text-white/50">Date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded bg-black border border-white/20 px-3 py-1 text-sm text-white [color-scheme:dark]"
          />
        </motion.div>

        {/* Symptoms input */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Activity className="h-4 w-4" /> Symptoms
          </h2>
          <div className="flex gap-2">
            <Input
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSymptoms()}
              placeholder="Add symptoms (comma separated)"
              className="border-white/20 bg-white/5 text-white placeholder:text-white/30"
            />
            <Button
              onClick={addSymptoms}
              variant="outline"
              size="icon"
              className="shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {symptoms.length > 0 && (
            <div className="mt-3 space-y-2">
              {symptoms.map((symptom, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-sm">{symptom.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSeverity(idx, level)}
                          className={cn(
                            "h-6 w-6 rounded-full text-xs font-bold transition-colors",
                            symptom.severity >= level
                              ? level <= 2
                                ? "bg-green-500 text-black"
                                : level <= 3
                                  ? "bg-yellow-500 text-black"
                                  : "bg-red-500 text-black"
                              : "bg-white/10 text-white/30"
                          )}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => removeSymptom(idx)}
                      className="text-white/30 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Mood selector */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="mb-3 text-lg font-semibold">Mood</h2>
          <div className="flex justify-center gap-3">
            {MOODS.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => setMood(idx)}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all",
                  mood === idx
                    ? "scale-110 bg-white/20 ring-2 ring-white"
                    : "bg-white/5 hover:bg-white/10"
                )}
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Notes */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <h2 className="mb-3 text-lg font-semibold">Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any additional notes about how you're feeling today..."
            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
        </motion.section>

        {/* Log button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <Button
            onClick={handleLog}
            className="w-full bg-white text-black font-semibold hover:bg-white/90"
          >
            {saved ? "Saved!" : "Log Entry"}
          </Button>
        </motion.div>

        {/* Pattern detection */}
        {patterns.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-4 w-4" /> Patterns Detected
            </h2>
            <div className="space-y-2">
              {patterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-200"
                >
                  {pattern}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 7-day history */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="mb-3 text-lg font-semibold">Last 7 Days</h2>
          <div className="space-y-2">
            {last7.map((date) => {
              const entry = entries[date];
              const isToday = date === today;
              return (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "rounded-lg border p-3 cursor-pointer transition-colors",
                    isToday
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/[0.07]"
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {new Date(date + "T00:00:00").toLocaleDateString(
                        "default",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                      {isToday && (
                        <Badge
                          variant="outline"
                          className="ml-2 border-white/20 text-white/60 text-[10px]"
                        >
                          Today
                        </Badge>
                      )}
                    </span>
                    {entry && (
                      <span className="text-lg">{MOODS[entry.mood]}</span>
                    )}
                  </div>
                  {entry ? (
                    <div className="mt-1">
                      {entry.symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs text-white/60">
                          {entry.symptoms.map((s, i) => (
                            <span key={i} className="flex items-center gap-1">
                              {s.name} {severityDots(s.severity)}
                            </span>
                          ))}
                        </div>
                      )}
                      {entry.notes && (
                        <p className="mt-1 truncate text-xs text-white/40">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-white/20">No entry</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Calendar toggle */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="mb-3 flex items-center gap-2 text-lg font-semibold hover:text-white/80 transition-colors"
          >
            <CalendarDays className="h-4 w-4" />
            Calendar View
            <span className="text-xs text-white/40">
              {showCalendar ? "(hide)" : "(show)"}
            </span>
          </button>

          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (calMonth === 0) {
                      setCalMonth(11);
                      setCalYear(calYear - 1);
                    } else {
                      setCalMonth(calMonth - 1);
                    }
                  }}
                  className="rounded p-1 hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">{monthName}</span>
                <button
                  onClick={() => {
                    if (calMonth === 11) {
                      setCalMonth(0);
                      setCalYear(calYear + 1);
                    } else {
                      setCalMonth(calMonth + 1);
                    }
                  }}
                  className="rounded p-1 hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="py-1 text-white/40 font-medium">
                    {d}
                  </div>
                ))}
                {calDays.map((date, idx) => {
                  if (!date) {
                    return <div key={`pad-${idx}`} />;
                  }
                  const entry = entries[date];
                  const avg = entry ? avgSeverity(entry) : -1;
                  const dayNum = new Date(date + "T00:00:00").getDate();
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "relative flex h-8 items-center justify-center rounded text-xs transition-colors",
                        date === selectedDate && "ring-1 ring-white",
                        date === today && "font-bold",
                        entry ? severityColor(avg) : "hover:bg-white/10"
                      )}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-white/40">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                  Good
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                  Fair
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                  Bad
                </span>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Export button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={exportToText}
            variant="outline"
            className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            <ClipboardCopy className="mr-2 h-4 w-4" />
            {copied ? "Copied to clipboard!" : "Export to Text"}
          </Button>
        </motion.div>

        {/* Medical disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="rounded-lg border border-white/10 bg-white/5 p-4 text-center"
        >
          <div className="mb-1 flex items-center justify-center gap-1 text-white/40">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Medical Disclaimer
            </span>
          </div>
          <p className="text-xs text-white/30 leading-relaxed">
            This symptom diary is for personal tracking purposes only and does
            not constitute medical advice. Always consult a qualified healthcare
            professional for diagnosis and treatment. Do not use this tool to
            make medical decisions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
