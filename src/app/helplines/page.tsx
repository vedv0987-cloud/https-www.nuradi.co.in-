"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Phone, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HELPLINES, CATEGORY_LABELS, type HelplineCategory } from "@/data/helplines";

export default function HelplinesPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<HelplineCategory | "all">("all");

  const filtered = useMemo(() => {
    let list = HELPLINES;
    if (activeCat !== "all") list = list.filter((h) => h.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (h) => h.name.toLowerCase().includes(q) || h.display.includes(q) || h.note?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, activeCat]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof HELPLINES> = {};
    filtered.forEach((h) => {
      if (!g[h.category]) g[h.category] = [];
      g[h.category].push(h);
    });
    return g;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            🚨 Emergency Helplines
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Health Emergency Numbers — India</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
            All numbers verified. Tap to call directly. Works offline on the PWA.
          </p>
        </div>

        {/* 3 hero emergency numbers */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { num: "112", label: "Emergency", color: "from-rose-500 to-red-600" },
            { num: "108", label: "Ambulance", color: "from-orange-500 to-rose-600" },
            { num: "1098", label: "Childline", color: "from-pink-500 to-rose-600" },
          ].map((e) => (
            <a
              key={e.num}
              href={`tel:${e.num}`}
              className={`rounded-2xl bg-gradient-to-br ${e.color} p-5 text-white text-center hover:scale-105 transition-transform shadow-lg`}
            >
              <div className="text-4xl font-extrabold mb-1">{e.num}</div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-90">{e.label}</div>
            </a>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search helpline..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>

        {/* Category filter */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {(["all", ...Object.keys(CATEGORY_LABELS)] as (HelplineCategory | "all")[]).map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                  activeCat === c ? "bg-rose-600 text-white border-rose-600" : "bg-card text-foreground hover:bg-muted border-border"
                }`}
              >
                {c === "all" ? "All" : `${CATEGORY_LABELS[c as HelplineCategory].emoji} ${CATEGORY_LABELS[c as HelplineCategory].label}`}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped results */}
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">No helplines match your search.</p>
        ) : (
          <div className="space-y-6">
            {(Object.keys(grouped) as HelplineCategory[]).map((cat) => {
              const meta = CATEGORY_LABELS[cat];
              return (
                <div key={cat}>
                  {activeCat === "all" && (
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <span>{meta.emoji}</span> {meta.label}
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {grouped[cat].map((h, i) => (
                      <motion.a
                        key={h.number + i}
                        href={`tel:${h.number}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
                        className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-rose-500/40 hover:shadow-md transition-all group"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${meta.color}20` }}
                        >
                          <Phone className="h-4 w-4" style={{ color: meta.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{h.name}</p>
                          <p className="text-base font-bold" style={{ color: meta.color }}>{h.display}</p>
                          {h.note && <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{h.note}</p>}
                        </div>
                        <div className="flex-shrink-0 text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />{h.hours}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-4 text-sm">
          <p className="font-semibold text-rose-700 dark:text-rose-300 mb-1">💡 Save these numbers</p>
          <p className="text-xs text-muted-foreground">Install our app (PWA) to access this page offline when you need it most.</p>
        </div>
      </div>
    </div>
  );
}
