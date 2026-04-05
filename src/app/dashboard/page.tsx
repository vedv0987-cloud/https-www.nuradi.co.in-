"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Target, Activity, Edit2, ArrowRight } from "lucide-react";
import { useUserProfile, getBmi, getBmiLabel } from "@/lib/user-profile";
import { getRecommendedTools } from "@/lib/recommendations";

const GOAL_LABELS: Record<string, string> = {
  "lose-weight": "Lose Weight",
  "build-muscle": "Build Muscle",
  "better-sleep": "Better Sleep",
  "less-stress": "Less Stress",
  "eat-healthier": "Eat Healthier",
  "track-health": "Track Health",
};

const CONDITION_LABELS: Record<string, string> = {
  diabetes: "Diabetes",
  hypertension: "Hypertension",
  thyroid: "Thyroid",
  "heart-disease": "Heart Disease",
  pcos: "PCOS",
  asthma: "Asthma",
  "high-cholesterol": "High Cholesterol",
};

export default function DashboardPage() {
  const router = useRouter();
  const { profile, hydrated } = useUserProfile();

  useEffect(() => {
    if (hydrated && !profile.onboardingComplete) {
      router.push("/onboarding");
    }
  }, [hydrated, profile.onboardingComplete, router]);

  if (!hydrated || !profile.onboardingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading your dashboard...
      </div>
    );
  }

  const bmi = getBmi(profile.heightCm, profile.weightKg);
  const bmiLabel = getBmiLabel(bmi);
  const recs = getRecommendedTools(profile, 6);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Greeting + Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground mb-1">{greeting},</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{profile.name || "Friend"} 👋</h1>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 mb-8"
        >
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <h2 className="font-bold text-lg">Your Health Profile</h2>
              <p className="text-xs text-muted-foreground">Personalized to you</p>
            </div>
            <Link
              href="/onboarding"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              <Edit2 className="h-3 w-3" /> Edit
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Age" value={`${profile.age} yrs`} />
            <Stat label="BMI" value={bmi > 0 ? `${bmi} (${bmiLabel})` : "—"} />
            <Stat label="Diet" value={dietLabel(profile.diet)} />
            <Stat label="Exercise" value={exerciseLabel(profile.exercise)} />
          </div>
          {profile.goals.length > 0 && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <Target className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Goals:</span>
              {profile.goals.map((g) => (
                <span
                  key={g}
                  className="text-[10px] font-semibold bg-white dark:bg-card px-2 py-0.5 rounded-full"
                >
                  {GOAL_LABELS[g]}
                </span>
              ))}
            </div>
          )}
          {profile.conditions.length > 0 && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <Activity className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Conditions:</span>
              {profile.conditions.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full"
                >
                  {CONDITION_LABELS[c]}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recommendations */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold">Recommended for you</h2>
          </div>
          {recs.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Add goals to your profile to see recommendations.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recs.map((r, i) => (
                <motion.div
                  key={r.tool.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={`/tools/${r.tool.slug}`}
                    className="group block rounded-2xl border bg-card p-4 hover:border-emerald-500/40 hover:shadow-lg transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center text-2xl">
                        {r.tool.icon}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="font-bold text-sm leading-tight mb-1">{r.tool.name}</h3>
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-2 mb-2">
                      {r.tool.description}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      ✓ {r.reason}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-3">
          <QuickLink href="/tools" emoji="🧰" title="All Tools" desc="34 health calculators" />
          <QuickLink href="/health-news" emoji="📰" title="Health News" desc="Live updates" />
          <QuickLink href="/infographics" emoji="📊" title="Disease Guides" desc="120 infographics" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function QuickLink({ href, emoji, title, desc }: { href: string; emoji: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border bg-card p-4 hover:border-emerald-500/40 hover:shadow-md transition-all flex items-center gap-3"
    >
      <div className="text-2xl">{emoji}</div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}

function dietLabel(d: string): string {
  return { veg: "Veg", nonveg: "Non-Veg", egg: "Egg", vegan: "Vegan" }[d] || d;
}

function exerciseLabel(e: string): string {
  return {
    never: "Never",
    sometimes: "Sometimes",
    regular: "Regular",
    daily: "Daily",
  }[e] || e;
}
