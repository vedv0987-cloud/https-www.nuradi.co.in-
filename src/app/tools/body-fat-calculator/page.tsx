"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateBodyFat,
  getCategory,
  getIdealBodyFat,
  MALE_RANGES,
  FEMALE_RANGES,
  type Gender,
} from "@/lib/calculators/body-fat-calculator";

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [waistCm, setWaistCm] = useState<number>(85);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [hipCm, setHipCm] = useState<number>(95);
  const [weightKg, setWeightKg] = useState<number>(70);

  const canCalc =
    gender &&
    heightCm > 0 &&
    waistCm > 0 &&
    neckCm > 0 &&
    weightKg > 0 &&
    (gender === "male" || hipCm > 0);

  const result = useMemo(() => {
    if (!canCalc) return null;
    const bf = calculateBodyFat({
      gender: gender!,
      heightCm,
      waistCm,
      neckCm,
      hipCm,
      weightKg,
    });
    const cat = getCategory(bf, gender!);
    const fatMass = +(weightKg * (bf / 100)).toFixed(1);
    const leanMass = +(weightKg - fatMass).toFixed(1);
    const ideal = getIdealBodyFat(gender!);
    const fatToLose = +(fatMass - weightKg * (ideal / 100)).toFixed(1);
    return { bf, cat, fatMass, leanMass, ideal, fatToLose };
  }, [canCalc, gender, heightCm, waistCm, neckCm, hipCm, weightKg]);

  const ranges = gender === "female" ? FEMALE_RANGES : MALE_RANGES;

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
      <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground block mb-1">📏 Measuring Guide</strong>
        • <strong>Waist:</strong> at navel level, relaxed
        <br />
        • <strong>Neck:</strong> just below Adam&apos;s apple
        {gender === "female" && (
          <>
            <br />• <strong>Hip:</strong> at the widest point
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Height (cm)</label>
          <Input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Weight (kg)</label>
          <Input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Waist (cm)</label>
          <Input type="number" value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Neck (cm)</label>
          <Input type="number" value={neckCm} onChange={(e) => setNeckCm(Number(e.target.value))} />
        </div>
        {gender === "female" && (
          <div className="col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Hip (cm)</label>
            <Input type="number" value={hipCm} onChange={(e) => setHipCm(Number(e.target.value))} />
          </div>
        )}
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
          <div className="text-5xl mb-3">💪</div>
          <p className="text-muted-foreground">Enter your measurements to calculate body fat %.</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Big number */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ backgroundColor: `${result.cat.color}10`, borderColor: `${result.cat.color}40` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Body Fat</p>
            <div className="text-6xl sm:text-7xl font-extrabold" style={{ color: result.cat.color }}>
              <AnimatedNumber value={result.bf} format={(n) => n.toFixed(1)} />
              <span className="text-2xl">%</span>
            </div>
            <p className="mt-3 text-base font-semibold" style={{ color: result.cat.color }}>
              {result.cat.name}
            </p>
          </div>

          {/* Range bar */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">Where You Fall</h3>
            <div className="relative">
              <div className="flex h-8 rounded-full overflow-hidden">
                {ranges.map((r, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: r.color, flex: r.name === "Above Average" ? 1 : r.max - r.min + 1 }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ left: "0%" }}
                animate={{
                  left: `${Math.min(95, (result.bf / (gender === "female" ? 45 : 35)) * 100)}%`,
                }}
                transition={{ duration: 1.2, type: "spring" }}
                className="absolute -top-2 -translate-x-1/2"
              >
                <div className="w-0.5 h-12 bg-foreground" />
                <div className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded mt-1 whitespace-nowrap -translate-x-1/2 ml-px">
                  YOU
                </div>
              </motion.div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1 text-[10px] text-muted-foreground font-medium text-center">
              {ranges.map((r) => (
                <div key={r.name} className="truncate">{r.name}</div>
              ))}
            </div>
          </div>

          {/* Body composition */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">Body Composition</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-rose-50 dark:bg-rose-950/20">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">Fat Mass</div>
                <div className="text-3xl font-extrabold text-rose-700 dark:text-rose-300">
                  <AnimatedNumber value={result.fatMass} format={(n) => n.toFixed(1)} /> <span className="text-base">kg</span>
                </div>
              </div>
              <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-950/20">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Lean Mass</div>
                <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
                  <AnimatedNumber value={result.leanMass} format={(n) => n.toFixed(1)} /> <span className="text-base">kg</span>
                </div>
              </div>
            </div>
            {result.fatToLose > 0 && (
              <p className="text-sm text-center mt-4 text-muted-foreground">
                To reach <strong>{result.ideal}%</strong> body fat, lose approximately{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">{result.fatToLose} kg</strong> of fat.
              </p>
            )}
            {result.fatToLose <= 0 && (
              <p className="text-sm text-center mt-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                ✓ You&apos;re already at or below ideal body fat!
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="body-fat-calculator"
      title="Body Fat % Calculator"
      description="Estimate your body fat percentage using the U.S. Navy tape-measure method. All you need is a measuring tape."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
