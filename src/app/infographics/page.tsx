"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, BookOpen, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { InfographicCard } from "@/components/infographic-card";
import { INFOGRAPHICS } from "@/data/infographics-data";
import { PremiumGate } from "@/components/premium-gate";

const CATEGORIES = [
  { key: "all", label: "All", color: "#1a1a1a" },
  { key: "Cardiovascular", label: "Heart", color: "#E53E3E" },
  { key: "Cancer", label: "Cancer", color: "#6B46C1" },
  { key: "Respiratory", label: "Lungs", color: "#2B6CB0" },
  { key: "Metabolic", label: "Metabolic", color: "#D69E2E" },
  { key: "Infectious", label: "Infectious", color: "#38A169" },
  { key: "Neurological", label: "Brain", color: "#553C9A" },
  { key: "Mental Health", label: "Mental", color: "#4A5568" },
  { key: "Liver/Kidney", label: "Liver/Kidney", color: "#2F855A" },
  { key: "Autoimmune", label: "Autoimmune", color: "#DD6B20" },
  { key: "Musculoskeletal", label: "Bones", color: "#718096" },
  { key: "Gastrointestinal", label: "Digestive", color: "#38A169" },
  { key: "Skin", label: "Skin", color: "#D53F8C" },
  { key: "Eye", label: "Eye", color: "#2C5282" },
  { key: "Dental", label: "Dental", color: "#4A5568" },
  { key: "Reproductive", label: "Reproductive", color: "#D53F8C" },
  { key: "Blood", label: "Blood", color: "#C53030" },
  { key: "Allergies", label: "Allergies", color: "#DD6B20" },
  { key: "Other", label: "Other", color: "#4C51BF" },
];

export default function InfographicsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = INFOGRAPHICS;
    if (activeCategory !== "all") {
      result = result.filter((d) => d.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (d) =>
          d.disease.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.categoryLabel.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, query]);

  return (
    <PremiumGate
      feature="120 Disease Infographics"
      description="Access all 120 beautifully designed disease tip cards covering every major condition. Save them, share them, learn from them."
      showPreview={true}
    >
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-background dark:from-purple-950/10">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Health Tips Infographics
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            120 Disease Tip Cards
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Visual health tips for 120 conditions. Each card has 6 actionable
            tips backed by medical guidelines.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search diseases..."
              className="pl-11 h-11 rounded-full"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setQuery("");
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                activeCategory === cat.key
                  ? "text-white shadow-md"
                  : "bg-card text-foreground hover:bg-muted"
              )}
              style={
                activeCategory === cat.key
                  ? { backgroundColor: cat.color, borderColor: cat.color }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {INFOGRAPHICS.length} disease cards
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((data, i) => (
              <InfographicCard key={data.id} data={data} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No disease cards found</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
            >
              Show All
            </Button>
          </div>
        )}
      </div>
    </div>
    </PremiumGate>
  );
}
