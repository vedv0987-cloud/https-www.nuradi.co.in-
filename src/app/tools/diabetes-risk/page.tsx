"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { ResultGauge } from "@/components/tools/ResultGauge";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import {
  calculateDiabetesRisk,
  type DiabetesInputs,
} from "@/lib/calculators/diabetes-risk";

type Inputs = Partial<DiabetesInputs>;

export default function DiabetesRiskPage() {
  const [inputs, setInputs] = useState<Inputs>({});
  const set = <K extends keyof DiabetesInputs>(k: K, v: DiabetesInputs[K]) =>
    setInputs((s) => ({ ...s, [k]: v }));

  const required: (keyof DiabetesInputs)[] = [
    "ageGroup", "gender", "familyHistory", "bmi", "waistHigh",
    "activity", "diet", "bp",
  ];
  if (inputs.gender === "female") required.push("gestational", "pcos");

  const canCalc = required.every((k) => inputs[k] !== undefined);

  const result = useMemo(
    () => (canCalc ? calculateDiabetesRisk(inputs as DiabetesInputs) : null),
    [canCalc, inputs]
  );

  const inputPanel = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age Group</label>
        <RadioCards
          columns={3}
          options={[
            { value: "<35", label: "<35" },
            { value: "35-44", label: "35–44" },
            { value: "45-54", label: "45–54" },
            { value: "55-64", label: "55–64" },
            { value: "65+", label: "65+" },
          ]}
          value={inputs.ageGroup || null}
          onChange={(v) => set("ageGroup", v as DiabetesInputs["ageGroup"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Gender</label>
        <RadioCards
          columns={2}
          options={[
            { value: "male", label: "Male", icon: "👨" },
            { value: "female", label: "Female", icon: "👩" },
          ]}
          value={inputs.gender || null}
          onChange={(v) => set("gender", v as DiabetesInputs["gender"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Family History of Diabetes</label>
        <RadioCards
          columns={2}
          options={[
            { value: "yes", label: "Yes", description: "Parent / sibling" },
            { value: "no", label: "No" },
          ]}
          value={inputs.familyHistory || null}
          onChange={(v) => set("familyHistory", v as DiabetesInputs["familyHistory"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">BMI Category</label>
        <RadioCards
          columns={3}
          options={[
            { value: "normal", label: "Normal", description: "<23" },
            { value: "overweight", label: "Overweight", description: "23-25" },
            { value: "obese", label: "Obese", description: ">25" },
          ]}
          value={inputs.bmi || null}
          onChange={(v) => set("bmi", v as DiabetesInputs["bmi"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Waist: M &gt;90cm / F &gt;80cm?</label>
        <RadioCards
          columns={2}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          value={inputs.waistHigh || null}
          onChange={(v) => set("waistHigh", v as DiabetesInputs["waistHigh"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Physical Activity</label>
        <RadioCards
          columns={3}
          options={[
            { value: "low", label: "Low", description: "<30 min/day" },
            { value: "moderate", label: "Moderate", description: "30+ min some days" },
            { value: "high", label: "High", description: "30+ min daily" },
          ]}
          value={inputs.activity || null}
          onChange={(v) => set("activity", v as DiabetesInputs["activity"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Diet</label>
        <RadioCards
          columns={3}
          options={[
            { value: "poor", label: "Poor", description: "High sugar/processed" },
            { value: "mixed", label: "Mixed" },
            { value: "good", label: "Good", description: "Whole foods" },
          ]}
          value={inputs.diet || null}
          onChange={(v) => set("diet", v as DiabetesInputs["diet"])}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Blood Pressure</label>
        <RadioCards
          columns={3}
          options={[
            { value: "normal", label: "Normal" },
            { value: "high", label: "High" },
            { value: "medication", label: "On Meds" },
          ]}
          value={inputs.bp || null}
          onChange={(v) => set("bp", v as DiabetesInputs["bp"])}
        />
      </div>
      {inputs.gender === "female" && (
        <>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Gestational Diabetes History?</label>
            <RadioCards
              columns={2}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={inputs.gestational || null}
              onChange={(v) => set("gestational", v as DiabetesInputs["gestational"])}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">PCOS / PCOD?</label>
            <RadioCards
              columns={2}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={inputs.pcos || null}
              onChange={(v) => set("pcos", v as DiabetesInputs["pcos"])}
            />
          </div>
        </>
      )}
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border bg-card p-10 text-center"
        >
          <div className="text-5xl mb-3">🩸</div>
          <p className="text-muted-foreground">Answer all questions to see your diabetes risk.</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Gauge */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ backgroundColor: `${result.color}10`, borderColor: `${result.color}40` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Your Diabetes Risk</p>
            <div className="flex justify-center mb-3">
              <ResultGauge
                value={result.percent}
                size={180}
                gradientFrom={result.color}
                gradientTo={result.color}
                centerContent={
                  <div>
                    <div className="text-4xl font-extrabold" style={{ color: result.color }}>
                      <AnimatedNumber value={result.percent} />%
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">risk level</div>
                  </div>
                }
              />
            </div>
            <p className="text-xl font-extrabold" style={{ color: result.color }}>
              {result.category} Risk
            </p>
            <p className="text-xs text-muted-foreground mt-1">Score: {result.score}/{result.maxScore}</p>
          </div>

          {/* Factor breakdown */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-4">Your Risk Factors</h3>
            <div className="space-y-2">
              {result.factors.map((f) => {
                const good = f.points === 0;
                return (
                  <div key={f.name} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                    {good ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-semibold text-sm">{f.name}</p>
                        <p className="text-xs text-muted-foreground flex-shrink-0">
                          {f.points}/{f.max}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{f.action}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4">
            <p className="text-sm">
              <strong className="text-emerald-700 dark:text-emerald-300">Next step:</strong>{" "}
              Get a fasting blood sugar test + HbA1c. If fasting &gt;100 mg/dL or HbA1c ≥5.7%, consult a doctor immediately.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="diabetes-risk"
      title="Diabetes Risk Score"
      description="Indian-specific 8-question risk assessment covering age, BMI, waist, activity, diet, family history, BP & more."
      inputs={inputPanel}
      result={resultPanel}
    />
  );
}
