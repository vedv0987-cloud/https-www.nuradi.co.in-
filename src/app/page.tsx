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
  { href: "/tools/bmi", label: "BMI & Body Metrics", desc: "Calculate BMI, ideal weight & daily calories", icon: Calculator, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/biological-age", label: "Biological Age", desc: "How old is your body really?", icon: Activity, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/sleep-score", label: "Sleep Score", desc: "Rate your sleep quality out of 100", icon: Moon, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/gut-health", label: "Gut Health Score", desc: "Assess your digestive health", icon: Apple, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/water-tracker", label: "Water Tracker", desc: "Track daily water intake", icon: Droplets, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/mood-tracker", label: "Mood Tracker", desc: "Track stress, mood & energy daily", icon: Smile, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/emergency-qr", label: "Emergency QR Card", desc: "Generate a health emergency QR card", icon: QrCode, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/generic-medicine", label: "Generic Medicine", desc: "Find cheaper generic alternatives", icon: Pill, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/tools/food-nutrition", label: "Food Nutrition", desc: "Indian food nutrition database", icon: Apple, color: "#1a1a1a", bg: "#f5f5f5" },
  { href: "/symptom-checker", label: "Symptom Checker", desc: "Find the right doctor for your symptoms", icon: Stethoscope, color: "#1a1a1a", bg: "#f5f5f5" },
];

const CATEGORIES = Object.values(DISEASE_CATEGORIES).slice(0, 8);

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-gray-50/50" />
          <div className="absolute top-20 -left-40 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
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
              <span className="block text-[#1a1a1a] italic">
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
                  "gap-2 text-base px-8 h-12 rounded-xl bg-[#1a1a1a] hover:bg-black shadow-lg shadow-black/15"
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6">
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
                    <h3 className="font-bold text-sm group-hover:text-black transition-colors">
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6">
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/explore"
            className="group flex items-center gap-4 p-6 rounded-2xl bg-[#f5f5f5] hover:shadow-lg transition-shadow border"
          >
            <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Health Videos</h3>
              <p className="text-xs text-muted-foreground mt-0.5">1,000+ expert videos from verified creators</p>
            </div>
          </Link>
          <Link
            href="/infographics"
            className="group flex items-center gap-4 p-6 rounded-2xl bg-[#f5f5f5] hover:shadow-lg transition-shadow border"
          >
            <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Health Infographics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">120 disease tip cards with actionable advice</p>
            </div>
          </Link>
          <Link
            href="/symptom-checker"
            className="group flex items-center gap-4 p-6 rounded-2xl bg-[#f5f5f5] hover:shadow-lg transition-shadow border"
          >
            <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 sm:p-12 text-white text-center"
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
                "bg-white text-[#1a1a1a] hover:bg-gray-100 rounded-xl h-12 px-8"
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
