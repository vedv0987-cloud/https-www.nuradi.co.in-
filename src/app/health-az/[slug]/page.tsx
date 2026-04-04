"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, AlertTriangle, CheckCircle2, Lightbulb, BookOpen, ChevronRight,
  Heart, Eye, Shield, Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoCard } from "@/components/video-card";
import { searchRelatedVideos } from "@/lib/health-lab-utils";
import diseasesData from "@/data/diseases.json";

interface Symptom { name: string; stage: string }
interface Disease {
  id: string; name: string; slug: string; aliases: string[];
  icon: string; organ: string; category: string; categoryLabel: string;
  color: string; severity: string; prevalence: string;
  preventable: boolean; curable: boolean; overview: string;
  atRisk: string[];
  symptoms: Symptom[];
  quickFacts: Record<string, string>;
  facts: string[];
  tips: { prevention: string[]; management: string[]; emergency: string[] };
  searchTerms: string[];
  relatedConditions: string[];
  relatedOrgans: string[];
}

const diseases = diseasesData as Disease[];
const TABS = ["Overview", "Symptoms", "Facts", "Tips", "Videos"] as const;
type Tab = (typeof TABS)[number];

export default function DiseasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [tab, setTab] = useState<Tab>("Overview");
  const disease = diseases.find((d) => d.slug === slug);

  const relatedVideos = useMemo(
    () => disease ? searchRelatedVideos(disease.searchTerms.join(" "), 8) : [],
    [disease]
  );

  const related = useMemo(
    () => disease ? diseases.filter((d) => disease.relatedConditions.includes(d.slug)) : [],
    [disease]
  );

  if (!disease) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Condition not found</h1>
        <Link href="/health-az" className={cn(buttonVariants(), "mt-4")}>Back to Health A-Z</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/health-az" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Health A-Z
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${disease.color}15` }}>
            <Heart className="w-7 h-7" style={{ color: disease.color }} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{disease.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge style={{ backgroundColor: `${disease.color}15`, color: disease.color, borderColor: `${disease.color}30` }}>{disease.categoryLabel}</Badge>
              <Badge variant="secondary">{disease.severity}</Badge>
              <Badge variant="secondary">{disease.prevalence === "very-common" ? "Very Common" : disease.prevalence === "common" ? "Common" : disease.prevalence}</Badge>
              {disease.preventable && <Badge variant="secondary" className="text-green-600">Preventable</Badge>}
            </div>
            {disease.aliases.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">Also known as: {disease.aliases.join(", ")}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Facts */}
      {disease.quickFacts && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-3 overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4">
          {Object.entries(disease.quickFacts).map(([key, val]) => (
            <div key={key} className="flex-shrink-0 p-3 rounded-xl border bg-card text-center min-w-[120px]">
              <p className="text-sm font-bold" style={{ color: disease.color }}>{val}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b mb-6 overflow-x-auto scrollbar-hide">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap", tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {t}
            {tab === t && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: disease.color }} />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          {tab === "Overview" && (
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">{disease.overview}</p>
              {disease.atRisk.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Who&apos;s at Risk?</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {disease.atRisk.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: disease.color }} />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "Symptoms" && (
            <div className="grid sm:grid-cols-2 gap-3">
              {disease.symptoms.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-3 rounded-xl border">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.stage === "emergency" ? "#ef444415" : s.stage === "progressive" ? "#f59e0b15" : `${disease.color}15` }}>
                    <Eye className="w-4 h-4" style={{ color: s.stage === "emergency" ? "#ef4444" : s.stage === "progressive" ? "#f59e0b" : disease.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <Badge variant="secondary" className="text-[9px] mt-0.5">{s.stage}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "Facts" && (
            <div className="space-y-3">
              {disease.facts.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: disease.color }}>{i + 1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f}</p>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "Tips" && (
            <div className="space-y-6">
              {[
                { key: "prevention" as const, title: "Prevention", icon: Shield, color: "#22c55e" },
                { key: "management" as const, title: "Management", icon: CheckCircle2, color: "#3b82f6" },
                { key: "emergency" as const, title: "When to Seek Help", icon: AlertTriangle, color: "#ef4444" },
              ].map(({ key, title, icon: TipIcon, color }) => (
                disease.tips[key]?.length > 0 && (
                  <div key={key}>
                    <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-3">
                      <TipIcon className="w-4 h-4" style={{ color }} /> {title}
                    </h3>
                    <div className="space-y-2">
                      {disease.tips[key].map((t, i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
                          {t}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {tab === "Videos" && (
            <div>
              {relatedVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedVideos.map((v, i) => (
                    <VideoCard key={v.id} video={v} index={i} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10">No related videos found for this condition.</p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Disclaimer */}
      <div className="mt-10 p-4 rounded-xl border bg-amber-500/5 border-amber-500/20">
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          This information is for educational purposes only. It is not medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
        </p>
      </div>

      {/* Related Conditions */}
      {related.length > 0 && (
        <div className="mt-8 border-t pt-8">
          <h3 className="font-bold mb-3">Related Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.id} href={`/health-az/${r.slug}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")}>
                {r.name} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
