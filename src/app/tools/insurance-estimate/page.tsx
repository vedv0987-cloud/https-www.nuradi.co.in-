"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";

type CityTier = "metro" | "tier1" | "tier2";
type FamilySize = "self" | "couple" | "family";
type SumInsured = 300000 | 500000 | 1000000 | 2500000 | 5000000 | 10000000;

// Base premium per ₹5L @ age 25 (annual INR)
const BASE_PREMIUM_TABLE: Record<number, number> = {
  25: 5000, 30: 6000, 35: 7500, 40: 10000, 45: 14000, 50: 18000, 55: 24000, 60: 32000, 65: 42000,
};

function basePremium(age: number): number {
  const ages = Object.keys(BASE_PREMIUM_TABLE).map(Number).sort((a, b) => a - b);
  let lower = ages[0], upper = ages[ages.length - 1];
  for (const a of ages) { if (a <= age) lower = a; if (a >= age && upper > a) upper = a; }
  if (lower === upper) return BASE_PREMIUM_TABLE[lower];
  const ratio = (age - lower) / (upper - lower);
  return Math.round(BASE_PREMIUM_TABLE[lower] + (BASE_PREMIUM_TABLE[upper] - BASE_PREMIUM_TABLE[lower]) * ratio);
}

export default function InsurancePage() {
  const [age, setAge] = useState(35);
  const [city, setCity] = useState<CityTier>("metro");
  const [family, setFamily] = useState<FamilySize>("self");
  const [sum, setSum] = useState<SumInsured>(500000);
  const [preExisting, setPreExisting] = useState<"yes" | "no">("no");
  const [smoker, setSmoker] = useState<"yes" | "no">("no");

  const result = useMemo(() => {
    // Scale base premium (per 5L) to chosen sum
    const base = basePremium(age) * (sum / 500000);
    const sizeMult = { self: 1, couple: 1.7, family: 2.2 }[family];
    const cityMult = { metro: 1.1, tier1: 1.0, tier2: 0.9 }[city];
    const smokerMult = smoker === "yes" ? 1.15 : 1;
    const preExMult = preExisting === "yes" ? 1.25 : 1;
    const annualLow = Math.round(base * sizeMult * cityMult * smokerMult * preExMult * 0.85);
    const annualHigh = Math.round(base * sizeMult * cityMult * smokerMult * preExMult * 1.15);
    const daily = Math.round((annualLow + annualHigh) / 2 / 365);
    return { annualLow, annualHigh, daily };
  }, [age, city, family, sum, preExisting, smoker]);

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const sumLabel = (s: SumInsured) => s >= 10000000 ? "₹1 Cr" : s >= 100000 ? `₹${s / 100000} L` : `₹${s / 1000}K`;

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Age</label>
        <Input type="number" min={18} max={75} value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">City</label>
        <RadioCards<CityTier> columns={3} options={[
          { value: "metro", label: "Metro", description: "Mumbai, Delhi, etc." },
          { value: "tier1", label: "Tier-1" },
          { value: "tier2", label: "Tier-2/3" },
        ]} value={city} onChange={setCity} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Family Size</label>
        <RadioCards<FamilySize> columns={3} options={[
          { value: "self", label: "Self" },
          { value: "couple", label: "Couple" },
          { value: "family", label: "Family (2+2)" },
        ]} value={family} onChange={setFamily} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Sum Insured</label>
        <div className="grid grid-cols-3 gap-2">
          {([300000, 500000, 1000000, 2500000, 5000000, 10000000] as SumInsured[]).map((s) => (
            <button
              key={s}
              onClick={() => setSum(s)}
              className={`p-2.5 rounded-xl border-2 text-sm font-bold transition-colors ${sum === s ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400" : "border-border bg-card hover:border-emerald-500/40"}`}
            >
              {sumLabel(s)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Pre-existing?</label>
          <RadioCards columns={2} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={preExisting} onChange={(v) => setPreExisting(v as "yes" | "no")} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Smoker?</label>
          <RadioCards columns={2} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={smoker} onChange={(v) => setSmoker(v as "yes" | "no")} />
        </div>
      </div>
    </div>
  );

  const resultPanel = (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 text-center">
        <div className="text-4xl mb-2">🛡️</div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Estimated Annual Premium</p>
        <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {formatINR(result.annualLow)} – {formatINR(result.annualHigh)}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          ≈ <strong>{formatINR(result.daily)}/day</strong> for {sumLabel(sum)} coverage
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-3">What {sumLabel(sum)} Covers in India</h3>
        <div className="space-y-2 text-sm">
          {[
            { emoji: "🏥", fact: "Typical heart bypass: ₹3-5 L" },
            { emoji: "🩺", fact: "Cancer treatment: ₹10-50 L" },
            { emoji: "🦴", fact: "Knee replacement: ₹2-4 L" },
            { emoji: "🚑", fact: "ICU stay per day: ₹15-40K" },
            { emoji: "👶", fact: "C-section delivery: ₹50K-2 L" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/40">
              <span className="text-lg">{f.emoji}</span>
              <p className="text-xs flex-1">{f.fact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 text-xs text-muted-foreground">
        ⚠️ Estimates only. Actual premium depends on insurer, plan type, underwriting, riders & discounts. Get quotes from Star Health, HDFC Ergo, Niva Bupa, Care Health.
      </div>
    </motion.div>
  );

  return (
    <CalculatorShell
      slug="insurance-estimate"
      title="Health Insurance Estimator"
      description="Estimate your annual health insurance premium based on age, family size, coverage amount & lifestyle."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
