"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import { RadioCards } from "@/components/tools/RadioCards";

const TYPES = [
  { id: 1, emoji: "💊", name: "Type 1", desc: "Hard lumps, nut-like", verdict: "Severe constipation", color: "#ef4444", advice: "Increase fiber (fruits, veg, whole grains). Drink 2+ L water. See doctor if persistent." },
  { id: 2, emoji: "🍠", name: "Type 2", desc: "Sausage, lumpy", verdict: "Mild constipation", color: "#f97316", advice: "Add more fiber and water. Walk after meals." },
  { id: 3, emoji: "🌭", name: "Type 3", desc: "Sausage with cracks", verdict: "Normal", color: "#22c55e", advice: "Slightly dry — drink a bit more water." },
  { id: 4, emoji: "🥒", name: "Type 4", desc: "Smooth, soft sausage", verdict: "IDEAL ✓", color: "#10b981", advice: "Perfect gut health. Keep doing what you're doing." },
  { id: 5, emoji: "🪨", name: "Type 5", desc: "Soft blobs, clear edges", verdict: "Lacking fiber", color: "#f59e0b", advice: "Add more fiber — oats, flax, fruits, veg." },
  { id: 6, emoji: "💧", name: "Type 6", desc: "Mushy, ragged edges", verdict: "Mild diarrhea", color: "#f97316", advice: "BRAT diet (bananas, rice, applesauce, toast). Hydrate." },
  { id: 7, emoji: "🌊", name: "Type 7", desc: "Watery, liquid", verdict: "Severe diarrhea", color: "#ef4444", advice: "Hydrate with ORS. See doctor if >2 days or blood/mucus." },
];

type Frequency = "multiple-daily" | "daily" | "every-other" | "less-often";
type Floating = "floats" | "sinks";

export default function PoopCheckPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [floating, setFloating] = useState<Floating | null>(null);

  const match = TYPES.find((t) => t.id === selected);

  const inputs = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Bristol Stool Type (tap one)
        </label>
        <div className="grid grid-cols-1 gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${selected === t.id ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30" : "border-border bg-card hover:border-amber-500/40"}`}
            >
              <span className="text-2xl flex-shrink-0">{t.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Frequency</label>
        <RadioCards<Frequency> columns={2} options={[
          { value: "multiple-daily", label: "2-3x / day" },
          { value: "daily", label: "Once daily" },
          { value: "every-other", label: "Every other day" },
          { value: "less-often", label: "Less often" },
        ]} value={frequency} onChange={setFrequency} />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Float or Sink?</label>
        <RadioCards<Floating> columns={2} options={[
          { value: "sinks", label: "Sinks" },
          { value: "floats", label: "Floats" },
        ]} value={floating} onChange={setFloating} />
      </div>
    </div>
  );

  const floatingNote = floating === "floats" ? "Floating stool can indicate high fat content (malabsorption) — monitor if persistent." : null;
  const frequencyNote =
    frequency === "less-often" ? "Going less than every other day suggests constipation." :
    frequency === "multiple-daily" ? "More than 3x/day could indicate IBS or infection if watery." : null;

  const resultPanel = (
    <>
      {!match ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">🚽</div>
          <p className="text-muted-foreground">Select your type to get gut health feedback.</p>
        </div>
      ) : (
        <motion.div key={match.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: `${match.color}10`, borderColor: `${match.color}40` }}>
            <div className="text-6xl mb-2">{match.emoji}</div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Your Gut Assessment</p>
            <p className="text-2xl font-extrabold mb-2" style={{ color: match.color }}>{match.verdict}</p>
            <p className="text-sm text-muted-foreground">{match.advice}</p>
          </div>

          {(floatingNote || frequencyNote) && (
            <div className="rounded-2xl border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 p-4 text-sm space-y-2">
              {frequencyNote && <p>⚠️ {frequencyNote}</p>}
              {floatingNote && <p>⚠️ {floatingNote}</p>}
            </div>
          )}

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3">Red Flags — See a Doctor If:</h3>
            <div className="space-y-2 text-sm">
              {[
                "Blood or black tarry stool",
                "Persistent change in bowel habits (>2 weeks)",
                "Unexplained weight loss",
                "Severe abdominal pain",
                "Diarrhea lasting more than 3 days",
                "Pencil-thin stool persistently",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 flex-shrink-0">⚠</span>
                  <p>{r}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 text-sm">
            <p><strong className="text-emerald-700 dark:text-emerald-300">Aim for Type 3-4.</strong> These are easy to pass, not too hard/soft, and indicate balanced fiber + hydration.</p>
          </div>
        </motion.div>
      )}
    </>
  );

  return (
    <CalculatorShell
      slug="poop-check"
      title="Bristol Stool Checker"
      description="Assess your gut health using the medical-grade Bristol Stool Chart. Get personalized diet advice + red flags to watch."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
