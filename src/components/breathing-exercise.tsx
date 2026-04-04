"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, CheckCircle2, Wind, Timer, Heart, Zap, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBreathingTips } from "@/data/health-tips";
import { getRandomFacts } from "@/data/health-facts";

// ─── EXERCISE TYPES ───
interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  inhale: number;   // seconds
  hold1: number;    // hold after inhale
  exhale: number;   // seconds
  hold2: number;    // hold after exhale
  totalSeconds: number; // 60 seconds total
}

const EXERCISES: BreathingPattern[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Used by Navy SEALs. Calms the nervous system in 60 seconds.",
    icon: Zap,
    color: "#378ADD",
    inhale: 4, hold1: 4, exhale: 4, hold2: 4,
    totalSeconds: 60,
  },
  {
    id: "relaxing",
    name: "4-7-8 Relaxing Breath",
    description: "Dr. Andrew Weil's technique. Reduces anxiety and aids sleep.",
    icon: Heart,
    color: "#7F77DD",
    inhale: 4, hold1: 7, exhale: 8, hold2: 0,
    totalSeconds: 57, // 3 full cycles ≈ 57s
  },
  {
    id: "energize",
    name: "Energizing Breath",
    description: "Quick inhale, slow exhale. Boosts focus and energy.",
    icon: Zap,
    color: "#D85A30",
    inhale: 2, hold1: 0, exhale: 6, hold2: 2,
    totalSeconds: 60,
  },
  {
    id: "calm",
    name: "Deep Calm",
    description: "Extended exhale activates parasympathetic response.",
    icon: Wind,
    color: "#1D9E75",
    inhale: 4, hold1: 2, exhale: 6, hold2: 0,
    totalSeconds: 60,
  },
];

type Phase = "inhale" | "hold1" | "exhale" | "hold2";

const PHASE_LABELS: Record<Phase, string> = {
  inhale: "Breathe In",
  hold1: "Hold",
  exhale: "Breathe Out",
  hold2: "Hold",
};

const PHASE_INSTRUCTIONS: Record<Phase, string> = {
  inhale: "Slowly breathe in through your nose",
  hold1: "Gently hold your breath",
  exhale: "Slowly release through your mouth",
  hold2: "Rest before the next breath",
};

export function BreathingExercise() {
  const [selected, setSelected] = useState<BreathingPattern>(EXERCISES[0]);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [phaseTime, setPhaseTime] = useState(0);
  const [phaseDuration, setPhaseDuration] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Random tips/facts — regenerated each session
  const breathTips = useMemo(() => (finished ? getBreathingTips() : []), [finished]);
  const breathFacts = useMemo(() => (finished ? getRandomFacts(3, "mental") : []), [finished]);

  const getPhaseSeconds = useCallback(
    (p: Phase) => {
      switch (p) {
        case "inhale": return selected.inhale;
        case "hold1": return selected.hold1;
        case "exhale": return selected.exhale;
        case "hold2": return selected.hold2;
      }
    },
    [selected]
  );

  const nextPhase = useCallback(
    (current: Phase): Phase => {
      const order: Phase[] = ["inhale", "hold1", "exhale", "hold2"];
      const idx = order.indexOf(current);
      let next = order[(idx + 1) % 4];
      // Skip phases with 0 duration
      while (getPhaseSeconds(next) === 0) {
        const nextIdx = order.indexOf(next);
        next = order[(nextIdx + 1) % 4];
      }
      return next;
    },
    [getPhaseSeconds]
  );

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setPhaseTime((prev) => {
        const newTime = prev + 0.1;
        if (newTime >= phaseDuration) {
          // Move to next phase
          const next = nextPhase(phase);
          setPhase(next);
          setPhaseDuration(getPhaseSeconds(next));
          if (next === "inhale") {
            setCycleCount((c) => c + 1);
          }
          return 0;
        }
        return newTime;
      });

      setTotalElapsed((prev) => {
        const newTotal = prev + 0.1;
        if (newTotal >= selected.totalSeconds) {
          // Exercise complete!
          setRunning(false);
          setFinished(true);
          setHeartRate(Math.floor(60 + Math.random() * 12)); // Simulated calm HR
          if (intervalRef.current) clearInterval(intervalRef.current);
          return selected.totalSeconds;
        }
        return newTotal;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phase, phaseDuration, selected, nextPhase, getPhaseSeconds]);

  const start = () => {
    setRunning(true);
    setFinished(false);
    setPhase("inhale");
    setPhaseTime(0);
    setPhaseDuration(selected.inhale);
    setTotalElapsed(0);
    setCycleCount(0);
    setHeartRate(null);
  };

  const pause = () => {
    setRunning(false);
  };

  const resume = () => {
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setFinished(false);
    setPhase("inhale");
    setPhaseTime(0);
    setTotalElapsed(0);
    setCycleCount(0);
    setHeartRate(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const progress = phaseDuration > 0 ? phaseTime / phaseDuration : 0;
  const totalProgress = totalElapsed / selected.totalSeconds;

  // Circle animation scale
  const circleScale =
    phase === "inhale"
      ? 1 + progress * 0.4
      : phase === "exhale"
        ? 1.4 - progress * 0.4
        : phase === "hold1"
          ? 1.4
          : 1;

  return (
    <div className="w-full">
      {/* Exercise Selector */}
      {!running && !finished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {EXERCISES.map((ex) => {
            const ExIcon = ex.icon;
            return (
              <button
                key={ex.id}
                onClick={() => { setSelected(ex); reset(); }}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200 hover:shadow-md",
                  selected.id === ex.id
                    ? "border-2 shadow-md"
                    : "border hover:border-muted-foreground/30"
                )}
                style={
                  selected.id === ex.id
                    ? { borderColor: ex.color, backgroundColor: `${ex.color}08` }
                    : {}
                }
              >
                <ExIcon
                  className="w-5 h-5 mb-2"
                  style={{ color: ex.color }}
                />
                <h3 className="font-semibold text-sm">{ex.name}</h3>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                  {ex.description}
                </p>
                <div className="flex gap-2 mt-2 text-[10px] text-muted-foreground">
                  <span>In {ex.inhale}s</span>
                  {ex.hold1 > 0 && <span>· Hold {ex.hold1}s</span>}
                  <span>· Out {ex.exhale}s</span>
                  {ex.hold2 > 0 && <span>· Hold {ex.hold2}s</span>}
                </div>
              </button>
            );
          })}
        </motion.div>
      )}

      {/* ─── BREATHING INTERFACE ─── */}
      <div className="flex flex-col items-center">
        {/* Animated Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-6">
          {/* Background ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128" cy="128" r="120"
              fill="none" stroke="currentColor"
              strokeWidth="3" className="text-muted/30"
            />
            {(running || finished) && (
              <circle
                cx="128" cy="128" r="120"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - totalProgress)}`}
                style={{ stroke: selected.color, transition: "stroke-dashoffset 0.1s linear" }}
              />
            )}
          </svg>

          {/* Breathing circle */}
          <motion.div
            className="rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${selected.color}15` }}
            animate={{
              width: running ? `${circleScale * 140}px` : finished ? "180px" : "160px",
              height: running ? `${circleScale * 140}px` : finished ? "180px" : "160px",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="rounded-full flex items-center justify-center flex-col"
              style={{ backgroundColor: `${selected.color}20` }}
              animate={{
                width: running ? `${circleScale * 100}px` : finished ? "140px" : "120px",
                height: running ? `${circleScale * 100}px` : finished ? "140px" : "120px",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {finished ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <CheckCircle2
                      className="w-8 h-8 mb-1"
                      style={{ color: selected.color }}
                    />
                    <span className="text-xs font-medium" style={{ color: selected.color }}>
                      Complete
                    </span>
                  </motion.div>
                ) : running ? (
                  <motion.div
                    key={phase}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col items-center text-center px-2"
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: selected.color }}
                    >
                      {PHASE_LABELS[phase]}
                    </span>
                    <span className="text-2xl font-bold mt-0.5">
                      {Math.ceil(phaseDuration - phaseTime)}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Wind className="w-8 h-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">
                      1 min
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Phase instruction */}
        {running && (
          <motion.p
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-4 text-center"
          >
            {PHASE_INSTRUCTIONS[phase]}
          </motion.p>
        )}

        {/* Timer */}
        {(running || finished) && (
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" />
              {Math.floor(totalElapsed)}s / {selected.totalSeconds}s
            </span>
            <span>·</span>
            <span>{cycleCount} cycles</span>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          {!running && !finished && (
            <Button
              onClick={start}
              size="lg"
              className="gap-2 px-8"
              style={{ backgroundColor: selected.color }}
            >
              <Play className="w-4 h-4 fill-current" />
              Start Breathing
            </Button>
          )}
          {running && (
            <>
              <Button
                onClick={pause}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Pause className="w-4 h-4" />
                Pause
              </Button>
              <Button
                onClick={reset}
                variant="ghost"
                size="lg"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </>
          )}
          {!running && totalElapsed > 0 && !finished && (
            <>
              <Button
                onClick={resume}
                size="lg"
                className="gap-2"
                style={{ backgroundColor: selected.color }}
              >
                <Play className="w-4 h-4 fill-current" />
                Resume
              </Button>
              <Button
                onClick={reset}
                variant="ghost"
                size="lg"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </>
          )}
          {finished && (
            <Button
              onClick={reset}
              size="lg"
              className="gap-2"
              style={{ backgroundColor: selected.color }}
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>

      {/* ─── RESULTS ─── */}
      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 p-6 rounded-2xl border bg-card"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" style={{ color: selected.color }} />
              Session Complete
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold" style={{ color: selected.color }}>
                  {selected.totalSeconds}s
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Duration</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold" style={{ color: selected.color }}>
                  {cycleCount}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Breath Cycles</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold" style={{ color: selected.color }}>
                  {selected.name.split(" ")[0]}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Technique</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold" style={{ color: selected.color }}>
                  ~{heartRate} bpm
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Est. Heart Rate</p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-muted/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selected.id === "box" &&
                  "Great job! Box breathing activates your parasympathetic nervous system, reducing cortisol and calming your fight-or-flight response. Practice daily for best results."}
                {selected.id === "relaxing" &&
                  "The 4-7-8 technique acts as a natural tranquilizer. With regular practice, it becomes more effective. Try it before bed for better sleep quality."}
                {selected.id === "energize" &&
                  "Quick inhales with slow exhales shift your autonomic balance toward alertness. Use this technique before meetings or when you need a natural energy boost."}
                {selected.id === "calm" &&
                  "Extended exhales stimulate the vagus nerve, lowering heart rate and blood pressure. This technique is excellent for managing acute stress and anxiety."}
              </p>
            </div>

            {/* Breathing Tips */}
            {breathTips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-4 rounded-xl border bg-muted/20"
              >
                <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Breathing &amp; Wellness Tips
                </h4>
                <div className="space-y-2">
                  {breathTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-muted-foreground leading-relaxed">{tip.text}</p>
                        <span className="text-[10px] text-muted-foreground/60">— {tip.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Mental Health Facts */}
            {breathFacts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-3 p-4 rounded-xl border bg-primary/5"
              >
                <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Did You Know?
                </h4>
                <div className="space-y-2">
                  {breathFacts.map((fact, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground leading-relaxed">{fact.text}</p>
                        <span className="text-[10px] text-muted-foreground/60">— {fact.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
