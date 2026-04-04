"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Apple,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Check,
  Flame,
  Beef,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FoodItem {
  name: string;
  emoji: string;
  category: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  score: string;
  scoreNum: number;
}

const FOODS: FoodItem[] = [
  // HOMEMADE
  { name: "Rice (steamed)", emoji: "🍚", category: "Homemade", serving: "1 cup (150g)", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0, sodium: 1, score: "B", scoreNum: 65 },
  { name: "Dal Toor", emoji: "🍲", category: "Homemade", serving: "1 cup (200ml)", calories: 120, protein: 8, carbs: 15, fat: 2.5, fiber: 4, sugar: 1.5, sodium: 300, score: "A", scoreNum: 88 },
  { name: "Roti (wheat)", emoji: "🫓", category: "Homemade", serving: "1 piece (30g)", calories: 70, protein: 2.5, carbs: 13, fat: 0.9, fiber: 1.5, sugar: 0.3, sodium: 120, score: "A", scoreNum: 85 },
  { name: "Chicken Curry", emoji: "🍛", category: "Homemade", serving: "1 cup (250ml)", calories: 240, protein: 22, carbs: 8, fat: 14, fiber: 1.5, sugar: 2, sodium: 580, score: "B", scoreNum: 68 },
  { name: "Aloo Gobi", emoji: "🥦", category: "Homemade", serving: "1 cup (200g)", calories: 150, protein: 4, carbs: 18, fat: 7, fiber: 3.5, sugar: 3, sodium: 400, score: "B", scoreNum: 72 },
  { name: "Paneer Butter Masala", emoji: "🧀", category: "Homemade", serving: "1 cup (250ml)", calories: 350, protein: 14, carbs: 12, fat: 28, fiber: 1, sugar: 4, sodium: 650, score: "C", scoreNum: 42 },
  { name: "Biryani (chicken)", emoji: "🍛", category: "Homemade", serving: "1 plate (300g)", calories: 500, protein: 24, carbs: 58, fat: 18, fiber: 2, sugar: 3, sodium: 780, score: "C", scoreNum: 48 },
  { name: "Dosa (plain)", emoji: "🥞", category: "Homemade", serving: "1 piece (100g)", calories: 120, protein: 3.5, carbs: 20, fat: 3, fiber: 1, sugar: 0.5, sodium: 200, score: "B", scoreNum: 75 },
  { name: "Idli (2 pc)", emoji: "🥟", category: "Homemade", serving: "2 pieces (80g)", calories: 100, protein: 3.5, carbs: 18, fat: 0.5, fiber: 1.2, sugar: 0.3, sodium: 280, score: "A", scoreNum: 90 },
  { name: "Samosa", emoji: "🥟", category: "Homemade", serving: "1 piece (100g)", calories: 260, protein: 4, carbs: 28, fat: 15, fiber: 2, sugar: 1.5, sodium: 420, score: "D", scoreNum: 30 },
  { name: "Vada Pav", emoji: "🍔", category: "Homemade", serving: "1 piece (150g)", calories: 290, protein: 5, carbs: 38, fat: 14, fiber: 2.5, sugar: 3, sodium: 520, score: "D", scoreNum: 28 },
  { name: "Poha", emoji: "🍚", category: "Homemade", serving: "1 plate (200g)", calories: 250, protein: 5, carbs: 40, fat: 8, fiber: 2, sugar: 2, sodium: 350, score: "B", scoreNum: 64 },
  { name: "Upma", emoji: "🍚", category: "Homemade", serving: "1 cup (200g)", calories: 200, protein: 5, carbs: 30, fat: 7, fiber: 2.5, sugar: 1, sodium: 400, score: "B", scoreNum: 66 },
  { name: "Chole Bhature", emoji: "🍛", category: "Homemade", serving: "1 plate (350g)", calories: 450, protein: 12, carbs: 52, fat: 22, fiber: 5, sugar: 4, sodium: 750, score: "D", scoreNum: 25 },
  { name: "Pav Bhaji", emoji: "🍛", category: "Homemade", serving: "1 plate (300g)", calories: 400, protein: 10, carbs: 48, fat: 20, fiber: 5, sugar: 6, sodium: 680, score: "C", scoreNum: 40 },
  { name: "Butter Naan", emoji: "🫓", category: "Homemade", serving: "1 piece (80g)", calories: 260, protein: 5, carbs: 36, fat: 10, fiber: 1.5, sugar: 2, sodium: 480, score: "C", scoreNum: 42 },
  { name: "Tandoori Chicken", emoji: "🍗", category: "Homemade", serving: "1 leg (150g)", calories: 180, protein: 26, carbs: 4, fat: 7, fiber: 0.5, sugar: 1, sodium: 550, score: "A", scoreNum: 82 },
  { name: "Raita", emoji: "🥣", category: "Homemade", serving: "1 cup (150ml)", calories: 80, protein: 4, carbs: 6, fat: 4, fiber: 0.5, sugar: 4, sodium: 200, score: "A", scoreNum: 85 },
  { name: "Salad (mixed)", emoji: "🥗", category: "Homemade", serving: "1 bowl (150g)", calories: 40, protein: 2, carbs: 7, fat: 0.5, fiber: 3, sugar: 3, sodium: 30, score: "A", scoreNum: 98 },
  { name: "Lassi (sweet)", emoji: "🥛", category: "Homemade", serving: "1 glass (250ml)", calories: 180, protein: 6, carbs: 28, fat: 5, fiber: 0, sugar: 22, sodium: 100, score: "C", scoreNum: 50 },
  { name: "Chai (with sugar)", emoji: "☕", category: "Homemade", serving: "1 cup (150ml)", calories: 80, protein: 2, carbs: 12, fat: 2.5, fiber: 0, sugar: 10, sodium: 30, score: "C", scoreNum: 55 },
  { name: "Black Coffee", emoji: "☕", category: "Homemade", serving: "1 cup (150ml)", calories: 5, protein: 0.3, carbs: 0.5, fat: 0, fiber: 0, sugar: 0, sodium: 2, score: "A", scoreNum: 97 },
  { name: "Coconut Water", emoji: "🥥", category: "Homemade", serving: "1 glass (200ml)", calories: 45, protein: 0.7, carbs: 9, fat: 0.2, fiber: 1, sugar: 6, sodium: 105, score: "A", scoreNum: 92 },
  { name: "Nimbu Pani", emoji: "🍋", category: "Homemade", serving: "1 glass (250ml)", calories: 50, protein: 0.3, carbs: 12, fat: 0, fiber: 0.2, sugar: 10, sodium: 200, score: "A", scoreNum: 82 },
  { name: "Rajma Chawal", emoji: "🍛", category: "Homemade", serving: "1 plate (350g)", calories: 350, protein: 14, carbs: 52, fat: 8, fiber: 8, sugar: 3, sodium: 600, score: "B", scoreNum: 65 },
  { name: "Palak Paneer", emoji: "🥬", category: "Homemade", serving: "1 cup (250ml)", calories: 280, protein: 14, carbs: 10, fat: 20, fiber: 3, sugar: 2, sodium: 550, score: "B", scoreNum: 62 },
  { name: "Dal Makhani", emoji: "🍲", category: "Homemade", serving: "1 cup (250ml)", calories: 300, protein: 12, carbs: 28, fat: 16, fiber: 6, sugar: 3, sodium: 600, score: "C", scoreNum: 52 },
  { name: "Moong Dal", emoji: "🍲", category: "Homemade", serving: "1 cup (200ml)", calories: 100, protein: 7, carbs: 14, fat: 1.5, fiber: 3.5, sugar: 1, sodium: 250, score: "A", scoreNum: 90 },
  { name: "Khichdi", emoji: "🍚", category: "Homemade", serving: "1 cup (250g)", calories: 220, protein: 8, carbs: 35, fat: 5, fiber: 3, sugar: 1, sodium: 350, score: "A", scoreNum: 82 },
  { name: "Dahi / Curd", emoji: "🥣", category: "Homemade", serving: "1 cup (200g)", calories: 60, protein: 5, carbs: 5, fat: 3, fiber: 0, sugar: 4.5, sodium: 70, score: "A", scoreNum: 92 },
  { name: "Paratha (aloo)", emoji: "🫓", category: "Homemade", serving: "1 piece (120g)", calories: 300, protein: 5, carbs: 38, fat: 14, fiber: 2, sugar: 1.5, sodium: 420, score: "C", scoreNum: 40 },
  { name: "Puri", emoji: "🫓", category: "Homemade", serving: "2 pieces (60g)", calories: 150, protein: 3, carbs: 18, fat: 8, fiber: 1, sugar: 0.5, sodium: 200, score: "C", scoreNum: 45 },
  { name: "Egg Bhurji", emoji: "🍳", category: "Homemade", serving: "2 eggs (150g)", calories: 180, protein: 14, carbs: 3, fat: 13, fiber: 0.5, sugar: 1, sodium: 380, score: "B", scoreNum: 74 },
  { name: "Fish Curry", emoji: "🐟", category: "Homemade", serving: "1 cup (250ml)", calories: 200, protein: 22, carbs: 6, fat: 10, fiber: 1, sugar: 1.5, sodium: 520, score: "A", scoreNum: 81 },
  { name: "Mutton Curry", emoji: "🍖", category: "Homemade", serving: "1 cup (250ml)", calories: 350, protein: 28, carbs: 8, fat: 24, fiber: 1.5, sugar: 2, sodium: 620, score: "C", scoreNum: 50 },
  { name: "Dhokla", emoji: "🟡", category: "Homemade", serving: "3 pieces (100g)", calories: 160, protein: 6, carbs: 22, fat: 5, fiber: 2, sugar: 3, sodium: 380, score: "B", scoreNum: 72 },
  { name: "Uttapam", emoji: "🥞", category: "Homemade", serving: "1 piece (150g)", calories: 180, protein: 5, carbs: 28, fat: 5, fiber: 2, sugar: 2, sodium: 320, score: "B", scoreNum: 70 },
  { name: "Medu Vada", emoji: "🍩", category: "Homemade", serving: "2 pieces (100g)", calories: 150, protein: 6, carbs: 16, fat: 8, fiber: 2, sugar: 1, sodium: 280, score: "C", scoreNum: 55 },

  // PACKAGED
  { name: "Maggi Noodles", emoji: "🍜", category: "Packaged", serving: "1 pack (70g)", calories: 205, protein: 4.5, carbs: 28, fat: 8.5, fiber: 1, sugar: 1, sodium: 900, score: "D", scoreNum: 25 },
  { name: "Bournvita", emoji: "🥤", category: "Packaged", serving: "2 tbsp (20g)", calories: 90, protein: 1.5, carbs: 17, fat: 1.5, fiber: 0.5, sugar: 14, sodium: 40, score: "C", scoreNum: 42 },
  { name: "Real Juice Mango", emoji: "🥭", category: "Packaged", serving: "200ml", calories: 130, protein: 0.2, carbs: 32, fat: 0, fiber: 0, sugar: 28, sodium: 20, score: "D", scoreNum: 22 },
  { name: "Parle-G Biscuits", emoji: "🍪", category: "Packaged", serving: "4 biscuits (28g)", calories: 120, protein: 1.5, carbs: 21, fat: 3.5, fiber: 0.3, sugar: 8, sodium: 110, score: "D", scoreNum: 30 },
  { name: "Kurkure", emoji: "🌶️", category: "Packaged", serving: "1 pack (30g)", calories: 155, protein: 2, carbs: 18, fat: 9, fiber: 1, sugar: 1.5, sodium: 350, score: "E", scoreNum: 15 },
  { name: "Lay's Chips", emoji: "🥔", category: "Packaged", serving: "1 pack (28g)", calories: 140, protein: 2, carbs: 15, fat: 8, fiber: 1, sugar: 0.5, sodium: 180, score: "E", scoreNum: 18 },
  { name: "Amul Butter (10g)", emoji: "🧈", category: "Packaged", serving: "1 tbsp (10g)", calories: 72, protein: 0.1, carbs: 0, fat: 8, fiber: 0, sugar: 0, sodium: 80, score: "C", scoreNum: 45 },
  { name: "Amul Milk (toned)", emoji: "🥛", category: "Packaged", serving: "1 glass (200ml)", calories: 120, protein: 6, carbs: 10, fat: 6, fiber: 0, sugar: 9, sodium: 100, score: "B", scoreNum: 75 },
  { name: "Britannia Bread (white)", emoji: "🍞", category: "Packaged", serving: "2 slices (50g)", calories: 65, protein: 2, carbs: 12, fat: 0.8, fiber: 0.5, sugar: 1.5, sodium: 140, score: "C", scoreNum: 52 },
  { name: "Haldiram Aloo Bhujia", emoji: "🌰", category: "Packaged", serving: "1 pack (30g)", calories: 170, protein: 3, carbs: 17, fat: 10, fiber: 1.5, sugar: 1, sodium: 420, score: "E", scoreNum: 12 },
  { name: "Tropicana Orange", emoji: "🍊", category: "Packaged", serving: "200ml", calories: 90, protein: 0.5, carbs: 20, fat: 0, fiber: 0.2, sugar: 18, sodium: 10, score: "C", scoreNum: 48 },
  { name: "MTR Ready Dal", emoji: "🍲", category: "Packaged", serving: "1 pack (300g)", calories: 180, protein: 8, carbs: 22, fat: 6, fiber: 4, sugar: 2, sodium: 720, score: "C", scoreNum: 45 },
  { name: "NutriChoice Biscuits", emoji: "🍪", category: "Packaged", serving: "4 biscuits (30g)", calories: 130, protein: 2, carbs: 20, fat: 4.5, fiber: 2, sugar: 5, sodium: 150, score: "C", scoreNum: 42 },
  { name: "Thums Up (200ml)", emoji: "🥤", category: "Packaged", serving: "200ml", calories: 86, protein: 0, carbs: 22, fat: 0, fiber: 0, sugar: 22, sodium: 15, score: "E", scoreNum: 10 },
  { name: "Frooti (200ml)", emoji: "🧃", category: "Packaged", serving: "200ml", calories: 90, protein: 0, carbs: 22, fat: 0, fiber: 0, sugar: 20, sodium: 20, score: "D", scoreNum: 20 },
  { name: "Mother Dairy Curd", emoji: "🥣", category: "Packaged", serving: "1 cup (200g)", calories: 60, protein: 5, carbs: 5, fat: 3, fiber: 0, sugar: 4.5, sodium: 65, score: "A", scoreNum: 88 },
  { name: "Bingo Chips", emoji: "🥔", category: "Packaged", serving: "1 pack (28g)", calories: 140, protein: 1.5, carbs: 16, fat: 8, fiber: 0.8, sugar: 1, sodium: 200, score: "E", scoreNum: 16 },
  { name: "Bourbon Biscuits", emoji: "🍪", category: "Packaged", serving: "4 biscuits (30g)", calories: 140, protein: 1.5, carbs: 22, fat: 5, fiber: 0.5, sugar: 10, sodium: 100, score: "D", scoreNum: 28 },
  { name: "Good Day Biscuits", emoji: "🍪", category: "Packaged", serving: "4 biscuits (33g)", calories: 130, protein: 1.5, carbs: 20, fat: 5, fiber: 0.3, sugar: 8, sodium: 95, score: "D", scoreNum: 30 },
  { name: "Hide & Seek", emoji: "🍪", category: "Packaged", serving: "4 biscuits (33g)", calories: 150, protein: 2, carbs: 21, fat: 7, fiber: 0.5, sugar: 9, sodium: 80, score: "D", scoreNum: 26 },
];

type SortOption = "calories-asc" | "score-desc" | "protein-desc";
type FilterOption = "All" | "Homemade" | "Packaged" | "Healthy" | "Unhealthy";

function getScoreColor(score: string) {
  switch (score) {
    case "A": return { bg: "bg-green-500", text: "text-green-500", border: "border-green-500/30", light: "bg-green-500/10" };
    case "B": return { bg: "bg-lime-500", text: "text-lime-500", border: "border-lime-500/30", light: "bg-lime-500/10" };
    case "C": return { bg: "bg-yellow-500", text: "text-yellow-500", border: "border-yellow-500/30", light: "bg-yellow-500/10" };
    case "D": return { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500/30", light: "bg-orange-500/10" };
    case "E": return { bg: "bg-red-500", text: "text-red-500", border: "border-red-500/30", light: "bg-red-500/10" };
    default: return { bg: "bg-gray-500", text: "text-gray-500", border: "border-gray-500/30", light: "bg-gray-500/10" };
  }
}

function MacroDonut({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  const total = protein + carbs + fat;
  if (total === 0) return null;
  const pPct = (protein / total) * 100;
  const cPct = (carbs / total) * 100;
  const fPct = (fat / total) * 100;

  return (
    <div className="relative w-16 h-16 mx-auto">
      <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
        <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" className="dark:stroke-zinc-700" />
        <circle
          cx="18" cy="18" r="14" fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeDasharray={`${pPct * 0.88} ${88 - pPct * 0.88}`}
          strokeDashoffset="0"
        />
        <circle
          cx="18" cy="18" r="14" fill="none"
          stroke="#f59e0b"
          strokeWidth="4"
          strokeDasharray={`${cPct * 0.88} ${88 - cPct * 0.88}`}
          strokeDashoffset={`${-(pPct * 0.88)}`}
        />
        <circle
          cx="18" cy="18" r="14" fill="none"
          stroke="#ef4444"
          strokeWidth="4"
          strokeDasharray={`${fPct * 0.88} ${88 - fPct * 0.88}`}
          strokeDashoffset={`${-((pPct + cPct) * 0.88)}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300">{total.toFixed(0)}g</span>
      </div>
    </div>
  );
}

function NutrientBar({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{value}{unit}</span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function FoodNutritionPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterOption>("All");
  const [sort, setSort] = useState<SortOption>("score-desc");
  const [mealItems, setMealItems] = useState<Set<number>>(new Set());
  const [showMealBuilder, setShowMealBuilder] = useState(false);

  const filtered = useMemo(() => {
    let result = FOODS.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (filter) {
      case "Homemade":
        result = result.filter((f) => f.category === "Homemade");
        break;
      case "Packaged":
        result = result.filter((f) => f.category === "Packaged");
        break;
      case "Healthy":
        result = result.filter((f) => f.score === "A" || f.score === "B");
        break;
      case "Unhealthy":
        result = result.filter((f) => f.score === "D" || f.score === "E");
        break;
    }

    switch (sort) {
      case "calories-asc":
        result.sort((a, b) => a.calories - b.calories);
        break;
      case "score-desc":
        result.sort((a, b) => b.scoreNum - a.scoreNum);
        break;
      case "protein-desc":
        result.sort((a, b) => b.protein - a.protein);
        break;
    }

    return result;
  }, [search, filter, sort]);

  const mealTotals = useMemo(() => {
    let cal = 0, pro = 0, car = 0, fa = 0;
    mealItems.forEach((i) => {
      const f = FOODS[i];
      cal += f.calories;
      pro += f.protein;
      car += f.carbs;
      fa += f.fat;
    });
    return { calories: cal, protein: pro, carbs: car, fat: fa };
  }, [mealItems]);

  const toggleMealItem = (idx: number) => {
    setMealItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const filters: FilterOption[] = ["All", "Homemade", "Packaged", "Healthy", "Unhealthy"];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "score-desc", label: "Score (Best)" },
    { value: "calories-asc", label: "Calories (Low)" },
    { value: "protein-desc", label: "Protein (High)" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white"
      >
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Apple className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Indian Food Nutrition Database</h1>
          </div>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl">
            Search {FOODS.length}+ Indian foods. Compare calories, macros, and health scores for homemade meals and packaged snacks.
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
            <Input
              placeholder="Search foods... (e.g. paneer, maggi, chai)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/15 border-white/20 text-white placeholder:text-orange-200 focus-visible:ring-white/30 h-11"
            />
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-zinc-400" />
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={cn(
                  "text-xs h-8",
                  filter === f && "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                )}
              >
                {f}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-zinc-400" />
            {sortOptions.map((s) => (
              <Button
                key={s.value}
                variant={sort === s.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSort(s.value)}
                className={cn(
                  "text-xs h-8",
                  sort === s.value && "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                )}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
          Showing {filtered.length} of {FOODS.length} foods
        </p>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((food) => {
            const globalIdx = FOODS.indexOf(food);
            const sc = getScoreColor(food.score);
            const inMeal = mealItems.has(globalIdx);

            return (
              <motion.div
                key={food.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                layout
                className={cn(
                  "rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm hover:shadow-md transition-shadow",
                  inMeal && "ring-2 ring-orange-500/50"
                )}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl flex-shrink-0">{food.emoji}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{food.name}</h3>
                      <p className="text-xs text-zinc-400">{food.serving}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs font-bold px-2 py-0.5 flex-shrink-0", sc.light, sc.text, sc.border)}>
                    {food.score}
                  </Badge>
                </div>

                {/* Calories + Donut */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{food.calories}</span>
                      <span className="text-xs text-zinc-400">kcal</span>
                    </div>
                    <div className="flex gap-3 mt-1.5">
                      <span className="text-xs"><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1" />P {food.protein}g</span>
                      <span className="text-xs"><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />C {food.carbs}g</span>
                      <span className="text-xs"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />F {food.fat}g</span>
                    </div>
                  </div>
                  <MacroDonut protein={food.protein} carbs={food.carbs} fat={food.fat} />
                </div>

                {/* Nutrient bars */}
                <div className="space-y-1.5">
                  <NutrientBar label="Protein" value={food.protein} max={30} unit="g" color="bg-blue-500" />
                  <NutrientBar label="Carbs" value={food.carbs} max={60} unit="g" color="bg-amber-500" />
                  <NutrientBar label="Fat" value={food.fat} max={30} unit="g" color="bg-red-500" />
                  <NutrientBar label="Fiber" value={food.fiber} max={10} unit="g" color="bg-green-500" />
                  <NutrientBar label="Sugar" value={food.sugar} max={30} unit="g" color="bg-pink-500" />
                  <NutrientBar label="Sodium" value={food.sodium} max={1000} unit="mg" color="bg-violet-500" />
                </div>

                {/* Add to meal */}
                <button
                  onClick={() => toggleMealItem(globalIdx)}
                  className={cn(
                    "mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg transition-colors",
                    inMeal
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  {inMeal ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {inMeal ? "Added to Meal" : "Add to Meal"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No foods found matching &quot;{search}&quot;</p>
            <p className="text-zinc-400 text-sm mt-1">Try a different search term or filter</p>
          </div>
        )}

        {/* Meal Builder */}
        {mealItems.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t shadow-2xl"
          >
            <div className="max-w-6xl mx-auto px-4 py-3">
              <button
                onClick={() => setShowMealBuilder(!showMealBuilder)}
                className="w-full flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-2">
                  <Beef className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Meal Builder ({mealItems.size} items)
                  </span>
                </div>
                <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                  {mealTotals.calories} kcal
                </Badge>
              </button>

              {showMealBuilder && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                >
                  <div className="border-t pt-3 space-y-2 max-h-48 overflow-y-auto">
                    {Array.from(mealItems).map((idx) => {
                      const f = FOODS[idx];
                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {f.emoji} {f.name}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-400 text-xs">{f.calories} kcal</span>
                            <button
                              onClick={() => toggleMealItem(idx)}
                              className="text-red-400 hover:text-red-500 text-xs font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t mt-3 pt-3 grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-orange-500">{mealTotals.calories}</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Calories</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-500">{mealTotals.protein.toFixed(1)}g</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Protein</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-amber-500">{mealTotals.carbs.toFixed(1)}g</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Carbs</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-red-500">{mealTotals.fat.toFixed(1)}g</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Fat</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bottom spacer when meal builder is visible */}
        {mealItems.size > 0 && <div className="h-24" />}
      </div>
    </div>
  );
}
