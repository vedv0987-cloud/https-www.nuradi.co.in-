"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { ResultGauge } from "@/components/tools/ResultGauge";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import { calculateHeartRisk, type Gender } from "@/lib/calculators/heart-risk";

export default function HeartRiskPage() {
  const [age, setAge] = useState(45);
  const [gender, setGender] = useState<Gender | null>(null);
  const [totalChol, setTotalChol] = useState(190);
  const [hdl, setHdl] = useState(45);
  const [sbp, setSbp] = useState(125);
  const [onBPMeds, setOnBPMeds] = useState<"yes" | "no" | null>(null);
  const [smoker, setSmoker] = useState<"yes" | "no" | null>(null);
  const [diabetic, setDiabetic] = useState<"yes" | "no" | null>(null);

  const canCalc = gender && onBPMeds && smoker && diabetic;
  const result = useMemo(
    () => canCalc ? calculateHeartRisk({ age, gender: gender!, totalChol, hdl, systolicBP: sbp, onBPMeds: onBPMeds!, smoker: smoker!, diabetic: diabetic! }) : null,
    [canCalc, age, gender, totalChol, hdl, sbp, onBPMeds, smoker, diabetic]
  );

  const inputs = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age</label>
          <Input type="number" min={20} max={79} value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Systolic BP</label>
          <Input type="number" min={90} max={200} value={sbp} onChange={(e) => setSbp(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Gender</label>
        <RadioCards<Gender> columns={2} options={[{ value: "male", label: "Male", icon: "👨" }, { value: "female", label: "Female", icon: "👩" }]} value={gender} onChange={setGender} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Total Chol. (mg/dL)</label>
          <Input type="number" min={100} max={400} value={totalChol} onChange={(e) => setTotalChol(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">HDL (mg/dL)</label>
          <Input type="number" min={20} max={100} value={hdl} onChange={(e) => setHdl(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">On BP medication?</label>
        <RadioCards columns={2} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={onBPMeds} onChange={(v) => setOnBPMeds(v as "yes" | "no")} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Do you smoke?</label>
        <RadioCards columns={2} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={smoker} onChange={(v) => setSmoker(v as "yes" | "no")} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Diabetic?</label>
        <RadioCards columns={2} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={diabetic} onChange={(v) => setDiabetic(v as "yes" | "no")} />
      </div>
      <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
        💡 If you don&apos;t know your cholesterol/HDL, defaults are Indian averages. Get a lipid profile for accuracy.
      </div>
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">❤️</div>
          <p className="text-muted-foreground">Fill in all fields to calculate your heart risk.</p>
        </motion.div>
      ) : (
        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${result.color}10`, borderColor: `${result.color}40` }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1 / (result.riskPercent / 30 + 1), repeat: Infinity }} className="text-5xl mb-2">❤️</motion.div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">10-Year Heart Attack Risk</p>
            <div className="flex justify-center mb-3">
              <ResultGauge value={result.riskPercent} size={180} gradientFrom={result.color} gradientTo={result.color}
                centerContent={
                  <div>
                    <div className="text-4xl font-extrabold" style={{ color: result.color }}>
                      <AnimatedNumber value={result.riskPercent} />%
                    </div>
                  </div>
                }
              />
            </div>
            <p className="text-xl font-extrabold" style={{ color: result.color }}>{result.category} Risk</p>
          </div>

          <div className="rounded-2xl border bg-card p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Your Heart Age</p>
            <p className="text-4xl font-extrabold">{result.heartAge}</p>
            {result.heartAge > age && (
              <p className="text-sm text-rose-600 dark:text-rose-400 mt-2">
                Your heart is {result.heartAge - age} years older than you 😟
              </p>
            )}
            {result.heartAge === age && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">Your heart matches your age ✓</p>
            )}
          </div>

          {result.modifiable.length > 0 && (
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-3">What You Can Change</h3>
              <div className="space-y-2">
                {result.modifiable.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
                    <span className="text-lg flex-shrink-0">✓</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{m.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="heart-risk"
      title="Heart Attack Risk"
      description="10-year heart attack risk using a simplified Framingham score. See your heart age + the factors you can change."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
