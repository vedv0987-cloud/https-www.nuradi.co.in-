"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Leaf, AlertTriangle, ChevronDown, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Remedy {
  id: number; problem: string; remedy: string; emoji: string;
  ingredients: string[]; howToMake: string; evidence: string; caution: string; category: string;
}

const REMEDIES: Remedy[] = [
  { id: 1, problem: "Common Cold", remedy: "Haldi Doodh", emoji: "🥛", ingredients: ["Turmeric 1 tsp", "Milk 1 glass", "Honey 1 tsp", "Black pepper pinch"], howToMake: "Boil milk with turmeric and pepper. Add honey when warm.", evidence: "proven", caution: "Not for lactose intolerant", category: "Cold & Cough" },
  { id: 2, problem: "Sore Throat", remedy: "Ginger Honey Tea", emoji: "🍯", ingredients: ["Ginger 1 inch", "Honey 2 tsp", "Water 1 cup", "Lemon juice"], howToMake: "Boil ginger in water 5 min. Strain, add honey and lemon.", evidence: "proven", caution: "Limit honey for diabetics", category: "Cold & Cough" },
  { id: 3, problem: "Congestion", remedy: "Steam Inhalation", emoji: "💨", ingredients: ["Hot water", "Eucalyptus oil 2 drops", "Towel"], howToMake: "Boil water, add oil. Drape towel over head, inhale 10 min.", evidence: "proven", caution: "Keep face 12 inches from water", category: "Cold & Cough" },
  { id: 4, problem: "Cough", remedy: "Tulsi Kadha", emoji: "🌿", ingredients: ["Tulsi leaves 10", "Ginger", "Black pepper", "Honey"], howToMake: "Boil tulsi and ginger in water. Strain, add pepper and honey.", evidence: "traditional", caution: "Avoid during pregnancy", category: "Cold & Cough" },
  { id: 5, problem: "Throat Pain", remedy: "Honey Lemon Water", emoji: "🍋", ingredients: ["Warm water", "Honey 1 tbsp", "Lemon juice"], howToMake: "Mix honey and lemon in warm water. Sip slowly.", evidence: "proven", caution: "Not for children under 1 year", category: "Cold & Cough" },
  { id: 6, problem: "Bloating", remedy: "Jeera Water", emoji: "🫗", ingredients: ["Cumin seeds 1 tsp", "Water 1 glass"], howToMake: "Boil cumin in water 5 min. Strain and drink warm.", evidence: "proven", caution: "Safe for most people", category: "Digestion" },
  { id: 7, problem: "Gas", remedy: "Ajwain Water", emoji: "🌱", ingredients: ["Ajwain 1 tsp", "Water 1 glass", "Black salt pinch"], howToMake: "Boil ajwain in water. Add black salt. Drink warm.", evidence: "traditional", caution: "Avoid in pregnancy", category: "Digestion" },
  { id: 8, problem: "Acidity", remedy: "Cold Buttermilk", emoji: "🥛", ingredients: ["Curd 2 tbsp", "Water 1 glass", "Cumin powder", "Salt"], howToMake: "Blend curd with water. Add roasted cumin and salt.", evidence: "proven", caution: "Avoid if lactose intolerant", category: "Digestion" },
  { id: 9, problem: "Constipation", remedy: "Isabgol Water", emoji: "🌾", ingredients: ["Isabgol 2 tsp", "Warm water or milk"], howToMake: "Mix isabgol in warm water or milk. Drink before bed.", evidence: "proven", caution: "Drink plenty of water after", category: "Digestion" },
  { id: 10, problem: "Nausea", remedy: "Pudina Chai", emoji: "🍵", ingredients: ["Mint leaves 8-10", "Water 1 cup", "Honey"], howToMake: "Boil mint in water 3 min. Strain and add honey.", evidence: "proven", caution: "Safe in moderation", category: "Digestion" },
  { id: 11, problem: "Low Immunity", remedy: "Chyawanprash", emoji: "🍯", ingredients: ["Chyawanprash 1 tsp", "Warm milk"], howToMake: "Take 1 tsp with warm milk daily morning.", evidence: "proven", caution: "Check sugar for diabetics", category: "Immunity" },
  { id: 12, problem: "Weakness", remedy: "Amla Juice", emoji: "🍊", ingredients: ["Amla juice 30ml", "Water", "Honey"], howToMake: "Dilute amla juice in water. Add honey. Drink empty stomach.", evidence: "proven", caution: "May cause acidity in excess", category: "Immunity" },
  { id: 13, problem: "Fatigue", remedy: "Ashwagandha Milk", emoji: "🥛", ingredients: ["Ashwagandha 1 tsp", "Warm milk", "Honey"], howToMake: "Mix ashwagandha in warm milk. Add honey. Drink at night.", evidence: "proven", caution: "Avoid during pregnancy", category: "Immunity" },
  { id: 14, problem: "Infection", remedy: "Turmeric Pepper", emoji: "🌶️", ingredients: ["Turmeric 1 tsp", "Black pepper pinch", "Warm water"], howToMake: "Mix turmeric and pepper in warm water. Drink daily.", evidence: "proven", caution: "Pepper boosts absorption 2000%", category: "Immunity" },
  { id: 15, problem: "Dry Skin", remedy: "Aloe Vera Gel", emoji: "🪴", ingredients: ["Fresh aloe vera leaf"], howToMake: "Cut leaf, extract gel. Apply on skin 20 min. Wash off.", evidence: "proven", caution: "Do patch test first", category: "Skin & Hair" },
  { id: 16, problem: "Acne", remedy: "Neem Face Pack", emoji: "🌿", ingredients: ["Neem paste", "Turmeric pinch", "Rose water"], howToMake: "Mix neem paste with turmeric and rose water. Apply 15 min.", evidence: "traditional", caution: "May cause dryness", category: "Skin & Hair" },
  { id: 17, problem: "Hair Fall", remedy: "Coconut Oil Massage", emoji: "🥥", ingredients: ["Warm coconut oil", "Curry leaves"], howToMake: "Warm oil, massage into scalp 15 min. Leave overnight.", evidence: "traditional", caution: "Use cold-pressed oil", category: "Skin & Hair" },
  { id: 18, problem: "Tan", remedy: "Multani Mitti Pack", emoji: "🧖", ingredients: ["Multani mitti 2 tbsp", "Rose water", "Lemon drops"], howToMake: "Mix to paste. Apply 20 min. Wash with cold water.", evidence: "traditional", caution: "Avoid on very dry skin", category: "Skin & Hair" },
  { id: 19, problem: "Knee Pain", remedy: "Til Oil Massage", emoji: "🫒", ingredients: ["Warm sesame oil", "Camphor piece"], howToMake: "Dissolve camphor in warm oil. Massage joint 15 min.", evidence: "traditional", caution: "Don't apply on broken skin", category: "Joint Pain" },
  { id: 20, problem: "Arthritis", remedy: "Turmeric Milk", emoji: "🌿", ingredients: ["Turmeric 2 tsp", "Warm milk"], howToMake: "Mix turmeric in warm milk. Drink twice daily.", evidence: "proven", caution: "Curcumin is anti-inflammatory", category: "Joint Pain" },
  { id: 21, problem: "Stiff Joints", remedy: "Methi Seeds", emoji: "🌱", ingredients: ["Fenugreek seeds 1 tsp", "Water overnight"], howToMake: "Soak methi overnight. Eat seeds and drink water morning.", evidence: "traditional", caution: "May lower blood sugar", category: "Joint Pain" },
  { id: 22, problem: "Muscle Pain", remedy: "Epsom Salt Bath", emoji: "🛁", ingredients: ["Epsom salt 2 cups", "Warm bath water"], howToMake: "Add salt to warm bath. Soak for 20 minutes.", evidence: "proven", caution: "Magnesium absorbs through skin", category: "Joint Pain" },
  { id: 23, problem: "Weight Loss", remedy: "Jeera Water", emoji: "🫗", ingredients: ["Cumin seeds 1 tsp", "Water overnight"], howToMake: "Soak cumin overnight. Drink on empty stomach morning.", evidence: "traditional", caution: "Part of overall healthy diet", category: "Weight" },
  { id: 24, problem: "Metabolism", remedy: "Green Tea", emoji: "🍵", ingredients: ["Green tea bag", "Hot water", "Lemon"], howToMake: "Steep green tea 3 min in hot (not boiling) water.", evidence: "proven", caution: "Limit to 3 cups daily", category: "Weight" },
  { id: 25, problem: "Detox", remedy: "ACV Water", emoji: "🍎", ingredients: ["Apple cider vinegar 1 tbsp", "Warm water", "Honey"], howToMake: "Mix ACV in warm water. Add honey. Drink before breakfast.", evidence: "traditional", caution: "Always dilute — never drink straight", category: "Weight" },
  { id: 26, problem: "Insomnia", remedy: "Warm Nutmeg Milk", emoji: "🥛", ingredients: ["Warm milk", "Nutmeg pinch", "Honey"], howToMake: "Add tiny pinch of nutmeg to warm milk. Drink before bed.", evidence: "traditional", caution: "Use very small amount of nutmeg", category: "Sleep" },
  { id: 27, problem: "Stress", remedy: "Chamomile Tea", emoji: "🌼", ingredients: ["Chamomile tea bag", "Hot water", "Honey"], howToMake: "Steep chamomile in hot water 5 min. Add honey.", evidence: "proven", caution: "Avoid if allergic to ragweed", category: "Sleep" },
  { id: 28, problem: "Anxiety", remedy: "Brahmi Tea", emoji: "🌿", ingredients: ["Brahmi leaves 5-6", "Hot water", "Honey"], howToMake: "Steep brahmi in hot water 5 min. Add honey.", evidence: "traditional", caution: "May cause drowsiness", category: "Sleep" },
  { id: 29, problem: "Headache", remedy: "Peppermint Oil", emoji: "🌿", ingredients: ["Peppermint oil 2 drops", "Carrier oil"], howToMake: "Dilute with carrier oil. Massage on temples and forehead.", evidence: "proven", caution: "Avoid near eyes", category: "Pain" },
  { id: 30, problem: "Toothache", remedy: "Clove Oil", emoji: "🦷", ingredients: ["Clove oil 1 drop", "Cotton ball"], howToMake: "Apply clove oil on cotton. Place on affected tooth.", evidence: "proven", caution: "Temporary relief — see dentist", category: "Pain" },
];

const CATEGORIES = ["All", "Cold & Cough", "Digestion", "Immunity", "Skin & Hair", "Joint Pain", "Weight", "Sleep", "Pain"];

export default function HomeRemediesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = REMEDIES.filter((r) => {
    const matchCat = category === "All" || r.category === category;
    const matchSearch = !search.trim() || r.problem.toLowerCase().includes(search.toLowerCase()) || r.remedy.toLowerCase().includes(search.toLowerCase()) || r.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" /> Gharelu Nuskhe
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Indian Home Remedies</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Traditional remedies backed by generations of wisdom</p>
        </div>

        <div className="max-w-xl mx-auto mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by problem, remedy, or ingredient..." className="pl-11 h-11 rounded-full" />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={cn("px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border", category === cat ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "bg-card text-foreground hover:bg-muted border-transparent")}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <button onClick={() => toggle(r.id)} className="w-full p-5 text-left flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{r.emoji}</span>
                  <div>
                    <p className="text-xs text-muted-foreground">{r.problem}</p>
                    <h3 className="font-bold text-sm">{r.remedy}</h3>
                    <Badge variant="outline" className={cn("text-[10px] mt-1", r.evidence === "proven" ? "text-green-600 border-green-200" : "text-amber-600 border-amber-200")}>
                      {r.evidence === "proven" ? "Scientifically Backed" : "Traditional"}
                    </Badge>
                  </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform flex-shrink-0", expanded.has(r.id) && "rotate-180")} />
              </button>

              {expanded.has(r.id) && (
                <div className="px-5 pb-5 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Ingredients</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {r.ingredients.map((ing) => (<Badge key={ing} variant="secondary" className="text-[10px]">{ing}</Badge>))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">How to Make</h4>
                    <p className="text-sm text-muted-foreground">{r.howToMake}</p>
                  </div>
                  <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-2.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">{r.caution}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 border rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> Home remedies complement medical treatment — they don&apos;t replace it. Always consult a doctor for persistent or serious symptoms.
          </p>
        </div>
      </div>
    </div>
  );
}
