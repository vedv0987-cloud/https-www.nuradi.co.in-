"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import { calculateHydration, type Activity, type Climate } from "@/lib/calculators/hydration";

export default function HydrationPage() {
  const [weightKg, setWeightKg] = useState(70);
  const [activity, setActivity] = useState<Activity>("moderate");
  const [climate, setClimate] = useState<Climate>("moderate");
  const [exerciseMin, setExerciseMin] = useState(30);
  const [caffeineCups, setCaffeineCups] = useState(2);
  const [pregnant, setPregnant] = useState(false);
  const [breastfeeding, setBreastfeeding] = useState(false);

  const target = useMemo(
    () => calculateHydration({ weightKg, activity, climate, exerciseMinutes: exerciseMin, caffeineCups, pregnant, breastfeeding }),
    [weightKg, activity, climate, exerciseMin, caffeineCups, pregnant, breastfeeding]
  );
  const glasses = Math.round(target / 250);

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Weight (kg)</label>
        <Input type="number" min={30} max={200} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Activity Level</label>
        <RadioCards<Activity>
          columns={3}
          options={[
            { value: "low", label: "Low" },
            { value: "moderate", label: "Moderate" },
            { value: "high", label: "High" },
          ]}
          value={activity}
          onChange={setActivity}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Climate</label>
        <RadioCards<Climate>
          columns={3}
          options={[
            { value: "cool", label: "Cool", icon: "❄️" },
            { value: "moderate", label: "Moderate", icon: "🌤️" },
            { value: "hot", label: "Hot", icon: "🌞" },
          ]}
          value={climate}
          onChange={setClimate}
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Exercise today: <strong>{exerciseMin} min</strong>
        </label>
        <input type="range" min={0} max={120} value={exerciseMin} onChange={(e) => setExerciseMin(Number(e.target.value))} className="w-full accent-cyan-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Tea/coffee cups: <strong>{caffeineCups}</strong>
        </label>
        <input type="range" min={0} max={8} value={caffeineCups} onChange={(e) => setCaffeineCups(Number(e.target.value))} className="w-full accent-cyan-500" />
      </div>
      <div className="flex gap-3">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={pregnant} onChange={(e) => setPregnant(e.target.checked)} className="accent-cyan-500" />
          Pregnant
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={breastfeeding} onChange={(e) => setBreastfeeding(e.target.checked)} className="accent-cyan-500" />
          Breastfeeding
        </label>
      </div>
    </div>
  );

  const resultPanel = (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Daily Water Target</p>
        <div className="text-6xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          <AnimatedNumber value={target / 1000} format={(n) => n.toFixed(2)} /><span className="text-2xl"> L</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          ≈ <strong>{glasses} glasses</strong> (250 ml each)
        </p>
      </div>

      {/* Water bottle animation */}
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-4 text-center">Your Bottle</h3>
        <div className="relative mx-auto w-28 h-56 border-4 border-cyan-300 dark:border-cyan-700 rounded-b-[2rem] rounded-t-xl overflow-hidden bg-cyan-50 dark:bg-cyan-950/30">
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-extrabold text-white drop-shadow-lg">{(target / 1000).toFixed(1)} L</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-bold mb-3">Suggested Schedule</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            { time: "Wake up", glasses: 2, emoji: "🌅" },
            { time: "Morning", glasses: 2, emoji: "☀️" },
            { time: "Pre-lunch", glasses: 1, emoji: "🕛" },
            { time: "Afternoon", glasses: 2, emoji: "🌤️" },
            { time: "Pre-dinner", glasses: 1, emoji: "🌆" },
            { time: "Evening", glasses: 1, emoji: "🌙" },
          ].slice(0, Math.min(6, Math.ceil(glasses / 1.5))).map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/20">
              <span className="text-lg">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs">{s.time}</p>
                <p className="text-[10px] text-muted-foreground">{s.glasses} glass{s.glasses > 1 ? "es" : ""}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      slug="hydration"
      title="Hydration Calculator"
      description="Your personalized daily water target based on weight, activity, climate, exercise & pregnancy. Includes hourly schedule."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
