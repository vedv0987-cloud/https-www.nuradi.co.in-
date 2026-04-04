"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Calculator,
  Droplets,
  Moon,
  Pill,
  Apple,
  QrCode,
  Smile,
  TrendingUp,
  Shield,
  Sparkles,
  BookOpen,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { WhyTrustUs } from "@/components/why-trust-us";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { RecommendedReads } from "@/components/recommended-reads";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";

const HEALTH_TOOLS = [
  { href: "/tools/bmi", label: "BMI & Body Metrics", desc: "Calculate BMI, ideal weight & daily calories", icon: Calculator, color: "#6366F1", bg: "#EEF2FF" },
  { href: "/tools/biological-age", label: "Biological Age", desc: "How old is your body really?", icon: Activity, color: "#8B5CF6", bg: "#F5F3FF" },
  { href: "/tools/sleep-score", label: "Sleep Score", desc: "Rate your sleep quality out of 100", icon: Moon, color: "#4338CA", bg: "#EEF2FF" },
  { href: "/tools/gut-health", label: "Gut Health Score", desc: "Assess your digestive health", icon: Apple, color: "#059669", bg: "#ECFDF5" },
  { href: "/tools/water-tracker", label: "Water Tracker", desc: "Track daily water intake", icon: Droplets, color: "#0EA5E9", bg: "#F0F9FF" },
  { href: "/tools/mood-tracker", label: "Mood Tracker", desc: "Track stress, mood & energy daily", icon: Smile, color: "#8B5CF6", bg: "#FAF5FF" },
  { href: "/tools/emergency-qr", label: "Emergency QR Card", desc: "Generate a health emergency QR card", icon: QrCode, color: "#DC2626", bg: "#FEF2F2" },
  { href: "/tools/generic-medicine", label: "Generic Medicine", desc: "Find cheaper generic alternatives", icon: Pill, color: "#16A34A", bg: "#F0FDF4" },
  { href: "/tools/food-nutrition", label: "Food Nutrition", desc: "Indian food nutrition database", icon: Apple, color: "#EA580C", bg: "#FFF7ED" },
  { href: "/symptom-checker", label: "Symptom Checker", desc: "Find the right doctor for your symptoms", icon: Stethoscope, color: "#0EA5E9", bg: "#F0F9FF" },
];

const CATEGORIES = Object.values(DISEASE_CATEGORIES).slice(0, 8);

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-sky-50/50 dark:from-teal-950/20 dark:to-sky-950/20" />
          <div className="absolute top-20 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              India&apos;s Free Health Tools Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              <span className="block">Your Health,</span>
              <span className="block bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-lg mx-auto"
            >
              10+ free health tools, 120+ disease guides, 1000+ expert videos — all in one place. No login required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/tools/bmi"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 text-base px-8 h-12 rounded-xl bg-teal-700 hover:bg-teal-800 shadow-lg shadow-teal-700/25"
                )}
              >
                Try a Health Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/health-az"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "text-base px-8 h-12 rounded-xl"
                )}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Health A-Z
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-4 text-sm text-muted-foreground"
            >
              {[
                { value: "10+", label: "Health Tools" },
                { value: "120+", label: "Disease Guides" },
                { value: "1,000+", label: "Expert Videos" },
                { value: "28", label: "Verified Creators" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
                  <div className="text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ HEALTH TOOLS GRID ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Health Tools</h2>
              <p className="text-muted-foreground text-sm mt-1">Free, instant, no login required</p>
            </div>
            <Link
              href="/health-lab"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {HEALTH_TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={tool.href}
                    className="group block p-5 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: tool.bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tool.color }} />
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {tool.desc}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════ HEALTH CONDITIONS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Health Conditions</h2>
              <p className="text-muted-foreground text-sm mt-1">120+ conditions explained with expert videos</p>
            </div>
            <Link
              href="/health-az"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/health-az/category/${cat.id}`}
                  className="group block p-4 rounded-2xl transition-all duration-300 hover:shadow-md"
                  style={{ backgroundColor: cat.bg }}
                >
                  <h3
                    className="font-bold text-sm"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
                    Browse conditions &rarr;
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ QUICK LINKS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/explore"
            className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20 hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Health Videos</h3>
              <p className="text-xs text-muted-foreground mt-0.5">1,000+ expert videos from verified creators</p>
            </div>
          </Link>
          <Link
            href="/infographics"
            className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Health Infographics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">120 disease tip cards with actionable advice</p>
            </div>
          </Link>
          <Link
            href="/symptom-checker"
            className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/20 hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-xl bg-sky-600 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Symptom Checker</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Find the right doctor for your symptoms</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════ RECOMMENDED READS ═══════ */}
      <RecommendedReads />

      {/* ═══════ WHY TRUST US ═══════ */}
      <WhyTrustUs />

      {/* ═══════ NEWSLETTER ═══════ */}
      <NewsletterSignup />

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 to-sky-700 p-8 sm:p-12 text-white text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Your Health Journey Starts Here
          </h2>
          <p className="text-white/80 mt-3 max-w-md mx-auto">
            Free health tools, expert videos, and disease guides — all backed by science and verified creators.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link
              href="/tools/biological-age"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-teal-800 hover:bg-white/90 rounded-xl h-12 px-8"
              )}
            >
              Check Your Bio Age <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
