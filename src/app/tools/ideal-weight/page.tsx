"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateIdealWeight,
  weeksToReach,
  type Gender,
} from "@/lib/calculators/ideal-weight";

export default function IdealWeightPage() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [currentKg, setCurrentKg] = useState<number>(70);

  const result = useMemo(
    () => (gender && heightCm > 0 ? calculateIdealWeight(heightCm, gender) : null),
    [gender, heightCm]
  );

  const diff = result ? +(currentKg - result.average).toFixed(1) : 0;
  const weeks = result ? weeksToReach(currentKg, result.average) : 0;

  const inputs = (
    <div className="space-y-6">
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Height (cm)</label>
          <Input type="number" min={120} max={220} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Current Weight (kg)</label>
          <Input type="number" min={30} max={250} value={currentKg} onChange={(e) => setCurrentKg(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );

  // Build range scale 0-100 mapping kg 40 to 120
  const scaleMin = 40;
  const scaleMax = 120;
  const toPct = (kg: number) => ((kg - scaleMin) / (scaleMax - scaleMin)) * 100;

  const formulas = result
    ? [
        { name: "Devine (1974)", value: result.devine, color: "#3b82f6" },
        { name: "Robinson (1983)", value: result.robinson, color: "#8b5cf6" },
        { name: "Miller (1983)", value: result.miller, color: "#f59e0b" },
        { name: "Hamwi (1964)", value: result.hamwi, color: "#ef4444" },
      ]
    : [];

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
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-muted-foreground">Enter height & gender to see your ideal weight range.</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Big range */}
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Ideal Weight Range</p>
            <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              <AnimatedNumber value={result.min} format={(n) => n.toFixed(1)} /> – <AnimatedNumber value={result.max} format={(n) => n.toFixed(1)} /><span className="text-2xl"> kg</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Average: <strong>{result.average} kg</strong>
            </p>
          </div>

          {/* Range scale */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">4 Formulas + Your Position</h3>
            <div className="relative h-20 mb-2">
              {/* Scale track */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted rounded-full -translate-y-1/2" />
              {/* Green zone (ideal range) */}
              <div
                className="absolute top-1/2 h-3 bg-emerald-500/40 rounded-full -translate-y-1/2"
                style={{
                  left: `${toPct(result.min)}%`,
                  width: `${toPct(result.max) - toPct(result.min)}%`,
                }}
              />
              {/* Formula dots */}
              {formulas.map((f) => (
                <motion.div
                  key={f.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2 -translate-x-1/2 ring-2 ring-background"
                  style={{ left: `${toPct(f.value)}%`, backgroundColor: f.color }}
                  title={`${f.name}: ${f.value} kg`}
                />
              ))}
              {/* Current weight marker */}
              <motion.div
                initial={{ top: "-40px", opacity: 0 }}
                animate={{ top: "auto", opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -translate-x-1/2"
                style={{ left: `${Math.max(0, Math.min(100, toPct(currentKg)))}%`, bottom: "0" }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                    YOU: {currentKg}kg
                  </div>
                  <div className="w-0.5 h-5 bg-foreground" />
                </div>
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{scaleMin} kg</span>
              <span>{scaleMax} kg</span>
            </div>
          </div>

          {/* Formula breakdown */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3">By Each Formula</h3>
            <div className="space-y-2">
              {formulas.map((f) => (
                <div key={f.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                    <span className="text-sm">{f.name}</span>
                  </div>
                  <strong className="text-sm">{f.value} kg</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Action plan */}
          {Math.abs(diff) > 1 && (
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-3">Your Path to Ideal Weight</h3>
              <p className="text-sm mb-3">
                You need to{" "}
                <strong className={diff > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}>
                  {diff > 0 ? "lose" : "gain"} {Math.abs(diff)} kg
                </strong>{" "}
                to reach the average ideal weight of <strong>{result.average} kg</strong>.
              </p>
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-4 text-sm">
                At a healthy pace of <strong>0.5 kg/week</strong>, you&apos;ll reach your goal in{" "}
                <strong className="text-emerald-700 dark:text-emerald-300">{weeks} weeks</strong>{" "}
                (~{Math.ceil(weeks / 4)} months).
              </div>
            </div>
          )}
          {Math.abs(diff) <= 1 && (
            <div className="rounded-2xl border bg-emerald-50 dark:bg-emerald-950/20 p-6 text-center">
              <p className="text-2xl mb-1">🎉</p>
              <p className="font-bold text-emerald-700 dark:text-emerald-300">
                You&apos;re already at your ideal weight!
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="ideal-weight"
      title="Ideal Weight Calculator"
      description="Your healthy weight range from 4 classic formulas (Devine, Robinson, Miller, Hamwi). See where you fall and how long to reach your target."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
