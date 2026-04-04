"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, BookHeart, TrendingUp, ChevronRight, Stethoscope,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";

// Dynamic import of diseases - will be loaded at runtime
import diseasesData from "@/data/diseases.json";

interface Disease {
  id: string; name: string; slug: string; aliases: string[];
  category: string; categoryLabel: string; color: string;
  prevalence: string; symptoms: { name: string }[];
  searchTerms: string[]; organ: string;
}

const diseases = diseasesData as Disease[];

const TRENDING = ["Diabetes", "Anxiety", "PCOS", "Back Pain", "Thyroid", "Migraine", "Acne", "Insomnia"];

export default function HealthAZPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("healthaz_recent");
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch {}
  }, []);

  const suggestions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: { type: string; text: string; slug: string; subtitle: string }[] = [];

    // Disease name + alias match
    diseases.forEach((d) => {
      const nameMatch = d.name.toLowerCase().includes(q);
      const aliasMatch = d.aliases?.some((a) => a.toLowerCase().includes(q));
      if (nameMatch || aliasMatch) {
        results.push({ type: "disease", text: d.name, slug: d.slug, subtitle: d.categoryLabel });
      }
    });

    // Symptom match
    diseases.forEach((d) => {
      if (results.find((r) => r.slug === d.slug)) return;
      const match = d.symptoms?.find((s) => s.name.toLowerCase().includes(q));
      if (match) {
        results.push({ type: "symptom", text: d.name, slug: d.slug, subtitle: `Symptom: ${match.name}` });
      }
    });

    // Category match
    Object.values(DISEASE_CATEGORIES).forEach((cat) => {
      if (cat.label.toLowerCase().includes(q)) {
        results.push({ type: "category", text: cat.label, slug: `category/${cat.id}`, subtitle: `Body system` });
      }
    });

    return results.slice(0, 8);
  }, [query]);

  const navigate = (slug: string, text: string) => {
    const newRecent = [text, ...recentSearches.filter((r) => r !== text)].slice(0, 5);
    setRecentSearches(newRecent);
    try { localStorage.setItem("healthaz_recent", JSON.stringify(newRecent)); } catch {}
    setQuery("");
    setFocused(false);
    router.push(`/health-az/${slug}`);
  };

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    diseases.forEach((d) => { counts[d.category] = (counts[d.category] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <BookHeart className="w-4 h-4" />
          Health Encyclopedia
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold">
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Health A-Z</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Understand any health condition in minutes. Symptoms, facts, expert videos — all in one place.
        </p>
        <p className="text-sm text-muted-foreground mt-2">{diseases.length}+ Conditions · {Object.keys(DISEASE_CATEGORIES).length} Body Systems · 1,000+ Expert Videos</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search any disease, symptom, or condition..."
            className="pl-12 h-14 text-lg rounded-xl"
          />
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {focused && (query || recentSearches.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-full mt-2 w-full bg-popover border rounded-xl shadow-xl z-50 p-2 max-h-[400px] overflow-y-auto"
            >
              {/* Suggestions */}
              {suggestions.length > 0 ? (
                suggestions.map((s, i) => (
                  <motion.button
                    key={s.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => navigate(s.slug, s.text)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-xs">{s.type === "disease" ? "💊" : s.type === "symptom" ? "🔍" : "🏷️"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.text}</p>
                      <p className="text-[11px] text-muted-foreground">{s.subtitle}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </motion.button>
                ))
              ) : query ? (
                <p className="text-sm text-muted-foreground p-3 text-center">No results for &ldquo;{query}&rdquo;</p>
              ) : null}

              {/* Trending + Recent when empty */}
              {!query && (
                <>
                  <div className="px-2 pt-2 pb-1">
                    <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trending</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                    {TRENDING.map((t) => {
                      const d = diseases.find((d) => d.name.toLowerCase().includes(t.toLowerCase()));
                      return (
                        <button
                          key={t}
                          onClick={() => d && navigate(d.slug, d.name)}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {recentSearches.length > 0 && (
                    <>
                      <div className="px-2 pt-2 pb-1 border-t">
                        <p className="text-[11px] font-medium text-muted-foreground">Recent</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                        {recentSearches.map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              const d = diseases.find((d) => d.name === r);
                              if (d) navigate(d.slug, d.name);
                            }}
                            className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Category Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Browse by Body System</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {Object.values(DISEASE_CATEGORIES).map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} whileHover={{ scale: 1.03 }}>
              <Link href={`/health-az/category/${cat.id}`} className="group flex flex-col items-center gap-1.5 p-3 rounded-xl border hover:shadow-md transition-all text-center" style={{ borderColor: `${cat.color}30` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: cat.bg }}>
                  <Stethoscope className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <span className="text-xs font-medium leading-tight">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground">{catCounts[cat.id] || 0}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Diseases A-Z */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Conditions A-Z</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...diseases].sort((a, b) => a.name.localeCompare(b.name)).map((d, i) => {
            const cat = DISEASE_CATEGORIES[d.category];
            return (
              <motion.div key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.01, 0.5) }}>
                <Link href={`/health-az/${d.slug}`} className="group flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm hover:border-muted-foreground/20 transition-all">
                  <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{d.name}</p>
                    <p className="text-[10px] text-muted-foreground">{d.categoryLabel}</p>
                  </div>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 flex-shrink-0">
                    {d.prevalence === "very-common" ? "●●●" : d.prevalence === "common" ? "●●" : "●"}
                  </Badge>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
