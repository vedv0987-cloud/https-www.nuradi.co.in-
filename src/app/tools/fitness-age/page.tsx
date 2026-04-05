"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateFitnessAge,
  type Gender,
} from "@/lib/calculators/fitness-age";

export default function FitnessAgePage() {
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState<Gender | null>(null);
  const [restingHR, setRestingHR] = useState(70);
  const [pushups, setPushups] = useState(15);
  const [flex, setFlex] = useState<"yes" | "no" | null>(null);
  const [walkMin, setWalkMin] = useState(12);
  const [exerciseHrs, setExerciseHrs] = useState(3);

  const canCalc = gender && flex;

  const result = useMemo(
    () =>
      canCalc
        ? calculateFitnessAge({
            age, gender: gender!, restingHR, pushupsPerMin: pushups,
            canTouchToes: flex!, kmWalkMinutes: walkMin, exerciseHoursPerWeek: exerciseHrs,
          })
        : null,
    [canCalc, age, gender, restingHR, pushups, flex, walkMin, exerciseHrs]
  );

  const inputs = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age</label>
          <Input type="number" min={15} max={90} value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Resting HR (BPM)</label>
          <Input type="number" min={40} max={120} value={restingHR} onChange={(e) => setRestingHR(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Gender</label>
        <RadioCards<Gender>
          columns={2}
          options={[
            { value: "male", label: "Male", icon: "👨" },
            { value: "female", label: "Female", icon: "👩" },
          ]}
          value={gender}
          onChange={setGender}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Pushups in 1 minute: <strong className="text-foreground text-base">{pushups}</strong>
        </label>
        <input type="range" min={0} max={60} value={pushups} onChange={(e) => setPushups(Number(e.target.value))} className="w-full accent-emerald-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Can you touch your toes?</label>
        <RadioCards
          columns={2}
          options={[
            { value: "yes", label: "Yes", icon: "🧘" },
            { value: "no", label: "No", icon: "🪑" },
          ]}
          value={flex}
          onChange={(v) => setFlex(v as "yes" | "no")}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          1 km walk time: <strong className="text-foreground text-base">{walkMin} min</strong>
        </label>
        <input type="range" min={6} max={25} value={walkMin} onChange={(e) => setWalkMin(Number(e.target.value))} className="w-full accent-emerald-500" />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>6</span><span>12 (avg)</span><span>25</span></div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Weekly exercise: <strong className="text-foreground text-base">{exerciseHrs} hrs</strong>
        </label>
        <input type="range" min={0} max={15} value={exerciseHrs} onChange={(e) => setExerciseHrs(Number(e.target.value))} className="w-full accent-emerald-500" />
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">🏃</div>
          <p className="text-muted-foreground">Fill in your fitness metrics to reveal your fitness age.</p>
        </motion.div>
      ) : (
        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className={`rounded-2xl border p-8 text-center ${result.diff < 0 ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-500/40" : result.diff > 0 ? "bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 border-rose-500/40" : "bg-card"}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Fitness Age</p>
            <div className={`text-7xl font-extrabold ${result.diff < 0 ? "text-emerald-600 dark:text-emerald-400" : result.diff > 0 ? "text-rose-600 dark:text-rose-400" : "text-foreground"}`}>
              <AnimatedNumber value={result.fitnessAge} />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Your actual age: <strong>{result.actualAge}</strong></p>
            <p className={`mt-2 text-lg font-bold ${result.diff < 0 ? "text-emerald-700 dark:text-emerald-300" : result.diff > 0 ? "text-rose-700 dark:text-rose-300" : ""}`}>
              {result.diff === 0 ? "You're right on track!" :
                result.diff < 0 ? `🎉 You're ${-result.diff} years younger!` :
                `You're ${result.diff} years older than your age`}
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">How Each Factor Scores</h3>
            <div className="space-y-2">
              {result.breakdown.map((b) => (
                <div key={b.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  {b.good ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  )}
                  <span className="text-sm flex-1">{b.name}</span>
                  <span className={`text-sm font-bold flex-shrink-0 ${b.points < 0 ? "text-emerald-600 dark:text-emerald-400" : b.points > 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                    {b.points > 0 ? "+" : ""}{b.points} yrs
                  </span>
                </div>
              ))}
            </div>
          </div>

          {result.diff > 0 && (
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 text-sm">
              <strong className="text-emerald-700 dark:text-emerald-300">Good news:</strong>{" "}
              Fitness age can improve quickly. Just 30 min of daily exercise can drop your fitness age by 5+ years in 6 months.
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="fitness-age"
      title="Fitness Age Calculator"
      description="Your actual age vs your body's fitness age. Score 5 metrics against benchmarks — see if you're younger or older than your years."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
