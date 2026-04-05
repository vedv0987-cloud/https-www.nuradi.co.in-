"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { COMPARISONS, type CompareCategory } from "@/data/comparisons";

const CAT_LABELS: Record<CompareCategory, string> = {
  food: "🍽️ Food",
  exercise: "🏃 Exercise",
  lifestyle: "🧘 Lifestyle",
  product: "📦 Products",
};

export default function ComparePage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<CompareCategory | "all">("all");

  const filtered = useMemo(() => {
    let list = COMPARISONS;
    if (activeCat !== "all") list = list.filter((c) => c.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) => c.a.toLowerCase().includes(q) || c.b.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, activeCat]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">🥊 Health Face-Off</h1>
          <p className="text-muted-foreground mt-2 text-sm">Compare foods, exercises, lifestyle choices & products side-by-side.</p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search (e.g. rice, yoga, paracetamol)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {(["all", "food", "exercise", "lifestyle", "product"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                activeCat === c ? "bg-rose-600 text-white border-rose-600" : "bg-card hover:bg-muted border-border"
              }`}
            >
              {c === "all" ? `All (${COMPARISONS.length})` : CAT_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((comp, i) => (
            <motion.div
              key={comp.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
            >
              <Link
                href={`/compare/${comp.slug}`}
                className="group block rounded-2xl border bg-card p-5 hover:border-rose-500/40 hover:shadow-lg transition-all h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {CAT_LABELS[comp.category]}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-center flex-1">
                    <div className="text-3xl mb-1">{comp.emoji_a}</div>
                    <p className="text-sm font-bold leading-tight">{comp.a}</p>
                  </div>
                  <div className="text-xl font-extrabold text-rose-600">VS</div>
                  <div className="text-center flex-1">
                    <div className="text-3xl mb-1">{comp.emoji_b}</div>
                    <p className="text-sm font-bold leading-tight">{comp.b}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
