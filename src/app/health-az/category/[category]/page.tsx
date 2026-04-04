"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";
import diseasesData from "@/data/diseases.json";

interface Disease {
  id: string; name: string; slug: string; category: string;
  categoryLabel: string; color: string; prevalence: string;
  overview: string; severity: string;
}

const diseases = diseasesData as Disease[];

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const cat = DISEASE_CATEGORIES[category];
  const catDiseases = diseases.filter((d) => d.category === category).sort((a, b) => a.name.localeCompare(b.name));

  if (!cat) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link href="/health-az" className={cn(buttonVariants(), "mt-4")}>Back to Health A-Z</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/health-az" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Health A-Z
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: cat.bg }}>
        <h1 className="text-3xl font-bold" style={{ color: cat.color }}>{cat.label}</h1>
        <p className="text-muted-foreground mt-1">{catDiseases.length} conditions in this category</p>
      </motion.div>

      <div className="space-y-3">
        {catDiseases.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link href={`/health-az/${d.slug}`} className="group flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-all">
              <div className="w-2 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold group-hover:text-primary transition-colors">{d.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{d.overview}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="secondary" className="text-[10px]">{d.severity}</Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {catDiseases.length === 0 && (
        <p className="text-center text-muted-foreground py-16">No conditions found in this category yet.</p>
      )}
    </div>
  );
}
