"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";
import { AnimatedNumber } from "@/components/tools/AnimatedNumber";

export default function EyeStrainPage() {
  const [phoneHrs, setPhoneHrs] = useState(4);
  const [laptopHrs, setLaptopHrs] = useState(6);
  const [tvHrs, setTvHrs] = useState(2);
  const [breaks, setBreaks] = useState<"often" | "sometimes" | "never" | null>(null);
  const [brightness, setBrightness] = useState<"low" | "medium" | "high" | null>(null);
  const [dryness, setDryness] = useState<"yes" | "no" | null>(null);

  const result = useMemo(() => {
    if (!breaks || !brightness || !dryness) return null;
    // Weight by distance (phone is close = more strain)
    const weighted = phoneHrs * 1.3 + laptopHrs * 1.0 + tvHrs * 0.5;
    const breakPenalty = { often: 0, sometimes: 10, never: 20 }[breaks];
    const brightPenalty = { low: 5, medium: 0, high: 10 }[brightness];
    const drynessPenalty = dryness === "yes" ? 15 : 0;
    const score = Math.min(100, Math.round(weighted * 4 + breakPenalty + brightPenalty + drynessPenalty));

    let level: string, color: string, advice: string;
    if (score < 30) { level = "Healthy"; color = "#10b981"; advice = "Your eye habits are solid. Keep it up!"; }
    else if (score < 60) { level = "Mild Strain"; color = "#f59e0b"; advice = "Adopt the 20-20-20 rule daily."; }
    else if (score < 80) { level = "Moderate Strain"; color = "#f97316"; advice = "Reduce screen time + take regular breaks."; }
    else { level = "Severe Strain"; color = "#ef4444"; advice = "See an optometrist. Screen habits need major overhaul."; }

    return { score, level, color, advice, totalHrs: phoneHrs + laptopHrs + tvHrs };
  }, [phoneHrs, laptopHrs, tvHrs, breaks, brightness, dryness]);

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Phone hours: <strong>{phoneHrs}h</strong>
        </label>
        <input type="range" min={0} max={12} value={phoneHrs} onChange={(e) => setPhoneHrs(Number(e.target.value))} className="w-full accent-rose-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Laptop/desktop hours: <strong>{laptopHrs}h</strong>
        </label>
        <input type="range" min={0} max={14} value={laptopHrs} onChange={(e) => setLaptopHrs(Number(e.target.value))} className="w-full accent-rose-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          TV hours: <strong>{tvHrs}h</strong>
        </label>
        <input type="range" min={0} max={8} value={tvHrs} onChange={(e) => setTvHrs(Number(e.target.value))} className="w-full accent-rose-500" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Take screen breaks?</label>
        <RadioCards columns={3} options={[
          { value: "often", label: "Often" },
          { value: "sometimes", label: "Sometimes" },
          { value: "never", label: "Never" },
        ]} value={breaks} onChange={(v) => setBreaks(v as "often" | "sometimes" | "never")} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Screen brightness</label>
        <RadioCards columns={3} options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]} value={brightness} onChange={(v) => setBrightness(v as "low" | "medium" | "high")} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Dry / tired eyes?</label>
        <RadioCards columns={2} options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]} value={dryness} onChange={(v) => setDryness(v as "yes" | "no")} />
      </div>
    </div>
  );

  const resultPanel = (
    <>
      {!result ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">👁️</div>
          <p className="text-muted-foreground">Answer all questions to score your eye strain.</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${result.color}10`, borderColor: `${result.color}40` }}>
            <div className="text-6xl mb-3">👁️</div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Eye Strain Score</p>
            <div className="text-6xl font-extrabold" style={{ color: result.color }}>
              <AnimatedNumber value={result.score} />/100
            </div>
            <p className="text-xl font-bold mt-3" style={{ color: result.color }}>{result.level}</p>
            <p className="text-sm text-muted-foreground mt-2">{result.advice}</p>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Your Daily Screen Time</p>
            <div className="text-4xl font-extrabold">{result.totalHrs}h</div>
            <p className="text-xs text-muted-foreground mt-2">
              That&apos;s <strong>{Math.round((result.totalHrs / 16) * 100)}%</strong> of your waking hours.
            </p>
          </div>
          <div className="rounded-2xl border bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 p-5">
            <h3 className="font-bold mb-2 text-emerald-700 dark:text-emerald-300">💡 20-20-20 Rule</h3>
            <p className="text-sm text-muted-foreground">
              Every <strong>20 minutes</strong>, look at something <strong>20 feet</strong> away for <strong>20 seconds</strong>. Single most effective eye-strain fix.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );

  return (
    <CalculatorShell
      slug="eye-strain"
      title="Eye Strain Score"
      description="Score your digital eye strain from screen habits. Get a personalized action plan to save your eyes."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
