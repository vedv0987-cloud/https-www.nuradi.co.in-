"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";

type DrinkType = "beer" | "wine" | "whisky";

const DRINK_INFO: Record<DrinkType, { units: number; cal: number; price: number; label: string; emoji: string }> = {
  beer: { units: 2.3, cal: 200, price: 200, label: "Beer (650ml)", emoji: "🍺" },
  wine: { units: 2.1, cal: 160, price: 300, label: "Wine (175ml)", emoji: "🍷" },
  whisky: { units: 1.0, cal: 70, price: 150, label: "Whisky (30ml peg)", emoji: "🥃" },
};

export default function AlcoholImpactPage() {
  const [drinkType, setDrinkType] = useState<DrinkType>("beer");
  const [drinksPerWeek, setDrinksPerWeek] = useState(5);
  const [yearsDrinking, setYearsDrinking] = useState(5);

  const info = DRINK_INFO[drinkType];
  const weeklyUnits = Math.round(drinksPerWeek * info.units);
  const yearlyCals = Math.round(drinksPerWeek * info.cal * 52);
  const yearlyCost = drinksPerWeek * info.price * 52;
  const lifetimeCost = yearlyCost * yearsDrinking;
  const pizzaEq = Math.round(yearlyCals / 285);

  const withinLimit = weeklyUnits <= 14;
  const liverRisk = weeklyUnits <= 14 ? "Low" : weeklyUnits <= 28 ? "Moderate" : weeklyUnits <= 42 ? "High" : "Very High";
  const riskColor = weeklyUnits <= 14 ? "#10b981" : weeklyUnits <= 28 ? "#f59e0b" : weeklyUnits <= 42 ? "#f97316" : "#ef4444";
  const formatINR = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${n.toLocaleString("en-IN")}`;

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Drink Type</label>
        <RadioCards<DrinkType>
          columns={3}
          options={[
            { value: "beer", label: "Beer", icon: "🍺" },
            { value: "wine", label: "Wine", icon: "🍷" },
            { value: "whisky", label: "Whisky", icon: "🥃" },
          ]}
          value={drinkType}
          onChange={setDrinkType}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Drinks per week: <strong>{drinksPerWeek}</strong>
        </label>
        <input type="range" min={1} max={30} value={drinksPerWeek} onChange={(e) => setDrinksPerWeek(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Years drinking: <strong>{yearsDrinking}</strong>
        </label>
        <input type="range" min={1} max={40} value={yearsDrinking} onChange={(e) => setYearsDrinking(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
        💡 Per {info.label}: {info.units} units · {info.cal} cal · ~₹{info.price}
      </div>
    </div>
  );

  const resultPanel = (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Weekly units vs WHO limit */}
      <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${riskColor}10`, borderColor: `${riskColor}40` }}>
        <div className="text-5xl mb-2">{info.emoji}</div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Weekly Alcohol Units</p>
        <div className="text-6xl font-extrabold" style={{ color: riskColor }}>
          <AnimatedNumber value={weeklyUnits} />
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          WHO safe limit: <strong>14 units/week</strong> · You: {withinLimit ? "Within ✓" : "Over ⚠️"}
        </p>
        <p className="text-xl font-bold mt-3" style={{ color: riskColor }}>Liver Damage Risk: {liverRisk}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Yearly Calories</p>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{yearlyCals.toLocaleString("en-IN")}</p>
          <p className="text-xs text-muted-foreground mt-1">= {pizzaEq} pizzas 🍕</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Yearly Cost</p>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{formatINR(yearlyCost)}</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Spent in {yearsDrinking} years</p>
        <p className="text-4xl font-extrabold text-rose-700 dark:text-rose-300">{formatINR(lifetimeCost)}</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-3">What happens when you drink</h3>
        <div className="space-y-2 text-sm">
          {[
            { emoji: "🧠", fact: "Alcohol crosses blood-brain barrier in 1 minute" },
            { emoji: "💤", fact: "Fragments REM sleep — poor recovery" },
            { emoji: "🫀", fact: "Raises BP + heart rate for hours" },
            { emoji: "🍞", fact: "Empty calories — body stores as fat first" },
            { emoji: "🧪", fact: "Liver processes it first, everything else waits" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/40">
              <span className="text-lg">{f.emoji}</span>
              <p className="text-xs flex-1">{f.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <CalculatorShell
      slug="alcohol-impact"
      title="Alcohol Impact Calculator"
      description="See your weekly alcohol units, yearly calories, yearly cost & liver damage risk — all at a glance."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
