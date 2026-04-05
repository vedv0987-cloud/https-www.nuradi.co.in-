"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";

const COLORS = [
  { id: 1, hex: "#F9FCFA", name: "Clear / Transparent", status: "Overhydrated", advice: "Back off a bit — you may be drinking too much water.", color: "#3b82f6" },
  { id: 2, hex: "#FEFBD0", name: "Pale Yellow", status: "Well Hydrated", advice: "Perfect! Keep it up.", color: "#10b981" },
  { id: 3, hex: "#FEF7A8", name: "Light Yellow", status: "Normal", advice: "Good hydration. Keep drinking regularly.", color: "#10b981" },
  { id: 4, hex: "#FDE980", name: "Yellow", status: "Slightly Dehydrated", advice: "Drink 1-2 glasses of water now.", color: "#f59e0b" },
  { id: 5, hex: "#F5C85F", name: "Dark Yellow", status: "Dehydrated", advice: "Drink 2-3 glasses immediately.", color: "#f97316" },
  { id: 6, hex: "#CA8A17", name: "Amber / Honey", status: "Significantly Dehydrated", advice: "Drink water urgently. Increase daily intake.", color: "#ef4444" },
  { id: 7, hex: "#8E4D08", name: "Brown / Cola", status: "Severe Dehydration or Liver Issue", advice: "See a doctor if persistent.", color: "#991b1b" },
  { id: 8, hex: "#C53030", name: "Red / Pink", status: "Possible Blood", advice: "See a doctor immediately.", color: "#dc2626" },
];

export default function UrineColorPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const match = COLORS.find((c) => c.id === selected);

  const inputs = (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Tap the color that best matches your urine.</p>
      <div className="grid grid-cols-2 gap-3">
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`rounded-xl p-3 text-left border-2 transition-all ${selected === c.id ? "border-cyan-500 ring-2 ring-cyan-500/30" : "border-border hover:border-cyan-500/40"}`}
          >
            <div className="w-full h-12 rounded-lg mb-2 border" style={{ backgroundColor: c.hex }} />
            <p className="text-xs font-semibold">{c.id}. {c.name}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const resultPanel = (
    <>
      {!match ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">💧</div>
          <p className="text-muted-foreground">Select a color to assess your hydration.</p>
        </div>
      ) : (
        <motion.div key={match.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Test tube */}
          <div className="rounded-2xl border bg-card p-8 text-center">
            <div className="relative mx-auto w-24 h-48 border-4 border-muted-foreground/20 rounded-b-full rounded-t-md overflow-hidden bg-muted/30">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "85%" }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-0 right-0"
                style={{ backgroundColor: match.hex }}
              />
            </div>
            <p className="text-sm font-semibold mt-3">{match.name}</p>
          </div>

          <div className="rounded-2xl border p-6" style={{ backgroundColor: `${match.color}10`, borderColor: `${match.color}40` }}>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Hydration Status</p>
            <p className="text-2xl font-extrabold" style={{ color: match.color }}>{match.status}</p>
            <p className="text-sm mt-3">{match.advice}</p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3">What can affect color?</h3>
            <div className="space-y-2 text-xs">
              {[
                { emoji: "🥗", fact: "Beetroot, carrots, blackberries can tint urine" },
                { emoji: "💊", fact: "B vitamins turn it bright yellow" },
                { emoji: "🥤", fact: "Dehydration makes it darker" },
                { emoji: "🩸", fact: "Red/pink could be blood — see a doctor" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40">
                  <span>{f.emoji}</span>
                  <p className="flex-1">{f.fact}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );

  return (
    <CalculatorShell
      slug="urine-color"
      title="Urine Color Hydration Check"
      description="Instant hydration status from your urine color. Based on the medical-grade urine color chart."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
