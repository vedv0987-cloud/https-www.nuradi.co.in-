"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Pill, TrendingDown, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alternative {
  brand: string;
  company: string;
  price: string;
  priceNum: number;
}

interface Medicine {
  brand: string;
  generic: string;
  company: string;
  price: string;
  priceNum: number;
  category: string;
  usedFor: string[];
  alternatives: Alternative[];
}

const MEDICINES: Medicine[] = [
  { brand: "Dolo 650", generic: "Paracetamol 650mg", company: "Micro Labs", price: "₹30", priceNum: 30, category: "Painkiller", usedFor: ["Fever", "Headache", "Body Pain"],
    alternatives: [{ brand: "Crocin 650", company: "GSK", price: "₹28", priceNum: 28 }, { brand: "Calpol 650", company: "GSK", price: "₹25", priceNum: 25 }, { brand: "P-650", company: "Cipla", price: "₹12", priceNum: 12 }] },
  { brand: "Combiflam", generic: "Ibuprofen + Paracetamol", company: "Sanofi", price: "₹42", priceNum: 42, category: "Painkiller", usedFor: ["Pain", "Inflammation", "Fever"],
    alternatives: [{ brand: "Brufen Plus", company: "Abbott", price: "₹35", priceNum: 35 }, { brand: "Imol Plus", company: "Cipla", price: "₹18", priceNum: 18 }, { brand: "Flexon", company: "Aristo", price: "₹28", priceNum: 28 }] },
  { brand: "Azee 500", generic: "Azithromycin 500mg", company: "Cipla", price: "₹98", priceNum: 98, category: "Antibiotic", usedFor: ["Bacterial Infections", "Throat Infection", "Pneumonia"],
    alternatives: [{ brand: "Azithral 500", company: "Alembic", price: "₹85", priceNum: 85 }, { brand: "Zithromax", company: "Pfizer", price: "₹120", priceNum: 120 }, { brand: "ATM 500", company: "Mankind", price: "₹45", priceNum: 45 }] },
  { brand: "Mox 500", generic: "Amoxicillin 500mg", company: "GSK", price: "₹75", priceNum: 75, category: "Antibiotic", usedFor: ["Bacterial Infections", "UTI", "Ear Infection"],
    alternatives: [{ brand: "Amoxil", company: "Cipla", price: "₹60", priceNum: 60 }, { brand: "Novamox", company: "Cipla", price: "₹42", priceNum: 42 }, { brand: "SyMoxyl", company: "Systopic", price: "₹35", priceNum: 35 }] },
  { brand: "Cetzine", generic: "Cetirizine 10mg", company: "GSK", price: "₹45", priceNum: 45, category: "Antiallergic", usedFor: ["Allergies", "Sneezing", "Runny Nose", "Itching"],
    alternatives: [{ brand: "Okacet", company: "Cipla", price: "₹32", priceNum: 32 }, { brand: "Alerid", company: "Cipla", price: "₹28", priceNum: 28 }, { brand: "CTZ", company: "Mankind", price: "₹15", priceNum: 15 }] },
  { brand: "Pan-D", generic: "Pantoprazole + Domperidone", company: "Alkem", price: "₹125", priceNum: 125, category: "Antacid", usedFor: ["Acidity", "GERD", "Gastric Ulcer"],
    alternatives: [{ brand: "Pantocid-D", company: "Sun Pharma", price: "₹110", priceNum: 110 }, { brand: "P2", company: "Cipla", price: "₹65", priceNum: 65 }, { brand: "Pantop-D", company: "Aristo", price: "₹72", priceNum: 72 }] },
  { brand: "Glycomet GP 2", generic: "Metformin + Glimepiride", company: "USV", price: "₹165", priceNum: 165, category: "Diabetes", usedFor: ["Type 2 Diabetes", "Blood Sugar Control"],
    alternatives: [{ brand: "Gluconorm-G", company: "Lupin", price: "₹120", priceNum: 120 }, { brand: "Glimy-M", company: "Mankind", price: "₹85", priceNum: 85 }, { brand: "Zoryl-M", company: "Intas", price: "₹95", priceNum: 95 }] },
  { brand: "Atorva 10", generic: "Atorvastatin 10mg", company: "Zydus", price: "₹120", priceNum: 120, category: "Cholesterol", usedFor: ["High Cholesterol", "Heart Disease Prevention"],
    alternatives: [{ brand: "Lipitor", company: "Pfizer", price: "₹180", priceNum: 180 }, { brand: "Atorlip", company: "Cipla", price: "₹75", priceNum: 75 }, { brand: "Storvas", company: "Sun Pharma", price: "₹68", priceNum: 68 }] },
  { brand: "Amlong 5", generic: "Amlodipine 5mg", company: "Micro Labs", price: "₹52", priceNum: 52, category: "Blood Pressure", usedFor: ["Hypertension", "Angina"],
    alternatives: [{ brand: "Stamlo", company: "Dr. Reddy's", price: "₹45", priceNum: 45 }, { brand: "Amlopin", company: "Cipla", price: "₹30", priceNum: 30 }, { brand: "Amlokind", company: "Mankind", price: "₹22", priceNum: 22 }] },
  { brand: "Thyronorm 50", generic: "Levothyroxine 50mcg", company: "Abbott", price: "₹115", priceNum: 115, category: "Thyroid", usedFor: ["Hypothyroidism", "Thyroid Hormone Replacement"],
    alternatives: [{ brand: "Eltroxin", company: "GSK", price: "₹110", priceNum: 110 }, { brand: "Thyrox", company: "Macleods", price: "₹55", priceNum: 55 }, { brand: "Lethyrox", company: "Sun Pharma", price: "₹60", priceNum: 60 }] },
  { brand: "Ecosprin 75", generic: "Aspirin 75mg", company: "USV", price: "₹18", priceNum: 18, category: "Blood Thinner", usedFor: ["Heart Attack Prevention", "Blood Clot Prevention"],
    alternatives: [{ brand: "Disprin", company: "Reckitt", price: "₹22", priceNum: 22 }, { brand: "Loprin", company: "GSK", price: "₹15", priceNum: 15 }, { brand: "Ecosprin AV", company: "USV", price: "₹52", priceNum: 52 }] },
  { brand: "Montair LC", generic: "Montelukast + Levocetirizine", company: "Cipla", price: "₹185", priceNum: 185, category: "Anti-Allergy", usedFor: ["Asthma", "Allergic Rhinitis", "Sneezing"],
    alternatives: [{ brand: "Montek LC", company: "Sun Pharma", price: "₹145", priceNum: 145 }, { brand: "Romilast-L", company: "Mankind", price: "₹72", priceNum: 72 }, { brand: "Monte-Air LC", company: "Zydus", price: "₹95", priceNum: 95 }] },
  { brand: "Voveran SR", generic: "Diclofenac 100mg", company: "Novartis", price: "₹55", priceNum: 55, category: "Painkiller", usedFor: ["Joint Pain", "Back Pain", "Arthritis", "Inflammation"],
    alternatives: [{ brand: "Dynapar", company: "Troikaa", price: "₹45", priceNum: 45 }, { brand: "Reactin SR", company: "Sun Pharma", price: "₹32", priceNum: 32 }, { brand: "Diclogesic", company: "Mankind", price: "₹20", priceNum: 20 }] },
  { brand: "Nexito 10", generic: "Escitalopram 10mg", company: "Sun Pharma", price: "₹120", priceNum: 120, category: "Antidepressant", usedFor: ["Depression", "Anxiety", "Panic Disorder"],
    alternatives: [{ brand: "Stalopam", company: "Lupin", price: "₹85", priceNum: 85 }, { brand: "Cipralex", company: "Lundbeck", price: "₹200", priceNum: 200 }, { brand: "S-Citadep", company: "Cipla", price: "₹65", priceNum: 65 }] },
  { brand: "Ciplox 500", generic: "Ciprofloxacin 500mg", company: "Cipla", price: "₹65", priceNum: 65, category: "Antibiotic", usedFor: ["UTI", "Diarrhea", "Bacterial Infections"],
    alternatives: [{ brand: "Cifran 500", company: "Sun Pharma", price: "₹72", priceNum: 72 }, { brand: "Ciprobid", company: "Zydus", price: "₹45", priceNum: 45 }, { brand: "Quintor", company: "Torrent", price: "₹35", priceNum: 35 }] },
  { brand: "Shelcal 500", generic: "Calcium + Vitamin D3", company: "Torrent", price: "₹155", priceNum: 155, category: "Supplement", usedFor: ["Calcium Deficiency", "Bone Health", "Osteoporosis"],
    alternatives: [{ brand: "Calcimax", company: "Meyer", price: "₹130", priceNum: 130 }, { brand: "Gemcal", company: "Micro Labs", price: "₹85", priceNum: 85 }, { brand: "Tata 1mg Calcium", company: "Tata", price: "₹199", priceNum: 199 }] },
  { brand: "Allegra 120", generic: "Fexofenadine 120mg", company: "Sanofi", price: "₹175", priceNum: 175, category: "Antiallergic", usedFor: ["Seasonal Allergies", "Hives", "Sneezing"],
    alternatives: [{ brand: "Fexova", company: "Zydus", price: "₹95", priceNum: 95 }, { brand: "Altiva", company: "Cipla", price: "₹85", priceNum: 85 }, { brand: "Fexorich", company: "Alkem", price: "₹70", priceNum: 70 }] },
  { brand: "Telma 40", generic: "Telmisartan 40mg", company: "Glenmark", price: "₹110", priceNum: 110, category: "Blood Pressure", usedFor: ["Hypertension", "Heart Failure"],
    alternatives: [{ brand: "Telmikind", company: "Mankind", price: "₹55", priceNum: 55 }, { brand: "Telsar", company: "Unichem", price: "₹48", priceNum: 48 }, { brand: "Sartel", company: "Zydus", price: "₹52", priceNum: 52 }] },
  { brand: "Rosulip 10", generic: "Rosuvastatin 10mg", company: "Cipla", price: "₹140", priceNum: 140, category: "Cholesterol", usedFor: ["High Cholesterol", "Cardiovascular Risk"],
    alternatives: [{ brand: "Rosuvas", company: "Sun Pharma", price: "₹120", priceNum: 120 }, { brand: "Crestor", company: "AstraZeneca", price: "₹250", priceNum: 250 }, { brand: "Rozavel", company: "Sun Pharma", price: "₹95", priceNum: 95 }] },
  { brand: "Lasix 40", generic: "Furosemide 40mg", company: "Sanofi", price: "₹18", priceNum: 18, category: "Diuretic", usedFor: ["Edema", "Heart Failure", "Fluid Retention"],
    alternatives: [{ brand: "Frusenex", company: "Geno", price: "₹12", priceNum: 12 }, { brand: "Frusemide", company: "Cipla", price: "₹8", priceNum: 8 }] },
  { brand: "Flagyl 400", generic: "Metronidazole 400mg", company: "Abbott", price: "₹22", priceNum: 22, category: "Antibiotic", usedFor: ["Amoebiasis", "Giardia", "Dental Infection"],
    alternatives: [{ brand: "Metrogyl", company: "J&J", price: "₹18", priceNum: 18 }, { brand: "Metron", company: "Mankind", price: "₹10", priceNum: 10 }] },
  { brand: "Becosules", generic: "B-Complex + Vitamin C", company: "Pfizer", price: "₹35", priceNum: 35, category: "Supplement", usedFor: ["Vitamin B Deficiency", "Energy", "Mouth Ulcers"],
    alternatives: [{ brand: "Cobadex CZS", company: "GSK", price: "₹45", priceNum: 45 }, { brand: "Beplex Forte", company: "Anglo-French", price: "₹25", priceNum: 25 }, { brand: "Polybion", company: "Merck", price: "₹22", priceNum: 22 }] },
  { brand: "D-Rise 60K", generic: "Cholecalciferol 60000 IU", company: "USV", price: "₹120", priceNum: 120, category: "Supplement", usedFor: ["Vitamin D Deficiency", "Bone Health"],
    alternatives: [{ brand: "Arachitol", company: "Abbott", price: "₹95", priceNum: 95 }, { brand: "Calcirol", company: "Cadila", price: "₹72", priceNum: 72 }, { brand: "Uprise D3", company: "Alkem", price: "₹82", priceNum: 82 }] },
  { brand: "Digene", generic: "Dried Aluminium Hydroxide Gel", company: "Abbott", price: "₹82", priceNum: 82, category: "Antacid", usedFor: ["Acidity", "Gas", "Indigestion"],
    alternatives: [{ brand: "Gelusil MPS", company: "Pfizer", price: "₹75", priceNum: 75 }, { brand: "Mucaine", company: "Abbott", price: "₹98", priceNum: 98 }, { brand: "ENO", company: "GSK", price: "₹10/sachet", priceNum: 10 }] },
  { brand: "Meftal Spas", generic: "Mefenamic Acid + Dicyclomine", company: "Blue Cross", price: "₹55", priceNum: 55, category: "Painkiller", usedFor: ["Period Pain", "Abdominal Cramps", "Spasms"],
    alternatives: [{ brand: "Spasmonil", company: "Sanofi", price: "₹48", priceNum: 48 }, { brand: "Drotin", company: "Walter Bushnell", price: "₹65", priceNum: 65 }, { brand: "Cyclopam", company: "Indoco", price: "₹42", priceNum: 42 }] },
];

const POPULAR = ["Dolo 650", "Combiflam", "Cetzine", "Pan-D", "Thyronorm 50", "Glycomet GP 2", "Azee 500"];

export default function GenericMedicinePage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MEDICINES.filter(
      (m) =>
        m.brand.toLowerCase().includes(q) ||
        m.generic.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.usedFor.some((u) => u.toLowerCase().includes(q))
    );
  }, [query]);

  const showPopular = !query.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/10">
      {/* Header */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            <Pill className="w-4 h-4" />
            Generic Medicine Finder
          </div>
          <h1 className="text-3xl font-bold mb-2">Find Cheaper Alternatives</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Search any branded medicine to find its generic alternatives and save money
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand name, generic name, or condition..."
            className="pl-12 h-14 text-base rounded-2xl border-2 focus-visible:ring-green-500 focus-visible:border-green-500"
          />
        </motion.div>

        {/* Popular searches */}
        {showPopular && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xs font-semibold text-muted-foreground mb-2">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((name) => (
                <button
                  key={name}
                  onClick={() => setQuery(name)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-card border hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-20">
        {query.trim() && results.length === 0 && (
          <div className="text-center py-16">
            <Pill className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No medicines found for &ldquo;{query}&rdquo;</p>
            <p className="text-xs text-muted-foreground mt-1">Try searching by brand name or generic name</p>
          </div>
        )}

        <div className="space-y-6">
          {(showPopular ? MEDICINES.slice(0, 6) : results).map((med, i) => {
            const cheapest = med.alternatives.reduce((min, alt) => alt.priceNum < min.priceNum ? alt : min, med.alternatives[0]);
            const savings = cheapest ? med.priceNum - cheapest.priceNum : 0;
            const savingsPct = cheapest && med.priceNum > 0 ? Math.round((savings / med.priceNum) * 100) : 0;

            return (
              <motion.div
                key={med.brand}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow p-6"
              >
                {/* Medicine Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{med.brand}</h3>
                    <p className="text-sm text-muted-foreground">{med.generic}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{med.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{med.price}</p>
                    <Badge variant="secondary" className="text-[10px]">{med.category}</Badge>
                  </div>
                </div>

                {/* Used For */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {med.usedFor.map((use) => (
                    <Badge key={use} variant="outline" className="text-[10px] font-normal">{use}</Badge>
                  ))}
                </div>

                {/* Alternatives Table */}
                <div className="bg-green-50/50 dark:bg-green-900/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      Cheaper Alternatives
                    </h4>
                    {savings > 0 && (
                      <Badge className="bg-green-600 text-white text-[10px]">
                        Save up to ₹{savings} ({savingsPct}%)
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    {med.alternatives.map((alt) => {
                      const altSavings = med.priceNum - alt.priceNum;
                      return (
                        <div
                          key={alt.brand}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/60 dark:bg-black/10"
                        >
                          <div>
                            <span className="text-sm font-medium">{alt.brand}</span>
                            <span className="text-xs text-muted-foreground ml-2">{alt.company}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold">{alt.price}</span>
                            {altSavings > 0 && (
                              <span className="text-xs font-semibold text-green-600">-₹{altSavings}</span>
                            )}
                            {altSavings < 0 && (
                              <span className="text-xs font-semibold text-red-500">+₹{Math.abs(altSavings)}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showPopular && (
          <p className="text-center text-xs text-muted-foreground mt-8">
            Showing 6 popular medicines. Search above to find any medicine.
          </p>
        )}

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300">
            <strong>Disclaimer:</strong> Always consult your doctor before switching medicines. Generic medicines contain the same active ingredient but may differ in inactive ingredients. Prices are approximate MRP and may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
