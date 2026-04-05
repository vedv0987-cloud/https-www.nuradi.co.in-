"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ABBREVIATIONS,
  CATEGORY_LABELS,
  type AbbrCategory,
} from "@/data/prescription-abbreviations";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrescriptionDecoderPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<AbbrCategory | "all">("all");

  const filtered = useMemo(() => {
    let list = ABBREVIATIONS;
    if (activeCat !== "all") list = list.filter((a) => a.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.abbr.toLowerCase().includes(q) ||
          a.full.toLowerCase().includes(q) ||
          a.meaning.toLowerCase().includes(q) ||
          a.hindi.includes(q)
      );
    }
    return list;
  }, [query, activeCat]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof ABBREVIATIONS> = {};
    filtered.forEach((a) => {
      if (!groups[a.category]) groups[a.category] = [];
      groups[a.category].push(a);
    });
    return groups;
  }, [filtered]);

  const categories: (AbbrCategory | "all")[] = ["all", "frequency", "timing", "route", "form", "medical", "misc"];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> All tools
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">📝</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Prescription Decoder</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Can&apos;t read your doctor&apos;s handwriting? Search any medical abbreviation — see what it means in English + Hindi.
          </p>
        </div>

        {/* Sample decoded */}
        <div className="rounded-2xl border bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/40 p-5 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-2">Example</p>
          <div className="font-mono text-sm bg-white dark:bg-background rounded-lg p-3 mb-3 border border-border">
            Tab Dolo 650 — 1 TDS × 5 days PC
          </div>
          <p className="text-sm leading-relaxed">
            <strong>Translation:</strong> Dolo 650 tablet — Take 1 tablet, <strong>3 times a day</strong>,
            for 5 days, <strong>after food</strong>.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            (डोलो 650 गोली — 1 गोली, दिन में 3 बार, 5 दिन तक, खाने के बाद)
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search abbreviation (e.g. BD, PC, OD)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>

        {/* Category pills */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                  activeCat === c ? "bg-indigo-600 text-white border-indigo-600" : "bg-card text-foreground hover:bg-muted border-border"
                }`}
              >
                {c === "all" ? `All (${ABBREVIATIONS.length})` : CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">No abbreviations match your search.</p>
        ) : (
          <div className="space-y-6">
            {(Object.keys(grouped) as AbbrCategory[]).map((cat) => (
              <div key={cat}>
                {activeCat === "all" && (
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {grouped[cat].map((a, i) => (
                    <motion.div
                      key={a.abbr + i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
                      className="rounded-xl border bg-card p-3 hover:border-indigo-500/40 transition-colors"
                    >
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-base">{a.abbr}</span>
                        <span className="text-[10px] text-muted-foreground">{a.full}</span>
                      </div>
                      <p className="text-xs font-semibold">{a.meaning}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{a.hindi}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 text-sm text-muted-foreground">
          ⚠️ Always confirm medication instructions with your pharmacist or doctor. This is a reference guide only.
        </div>
      </div>
    </div>
  );
}
