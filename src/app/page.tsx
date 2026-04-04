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
      {/* ═══════ HERO — PREMIUM ═══════ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        {/* Animated grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-24 sm:py-32 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Copy */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/80 text-sm font-medium mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  India&apos;s #1 Free Health Platform
                </motion.div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="block"
                  >
                    Your Health.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="block text-white/40"
                  >
                    Your Data.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="block"
                  >
                    Your Power.
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-white/50 max-w-md leading-relaxed"
              >
                10+ AI-powered health tools. 120+ disease guides. 1,000+ expert videos. Everything you need to take control of your health — completely free.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/tools/bmi"
                  className="inline-flex items-center gap-2 px-8 h-14 bg-white text-black font-bold text-base rounded-2xl hover:bg-gray-100 transition-colors shadow-2xl shadow-white/10"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/health-az"
                  className="inline-flex items-center gap-2 px-8 h-14 border border-white/20 text-white font-bold text-base rounded-2xl hover:bg-white/5 transition-colors"
                >
                  <Stethoscope className="w-5 h-5" />
                  Explore Health A-Z
                </Link>
              </motion.div>
            </div>

            {/* Right — Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { value: "10+", label: "Health Tools", desc: "BMI, Bio Age, Sleep, Gut Health & more", emoji: "🔬" },
                { value: "120+", label: "Disease Guides", desc: "Conditions A-Z with expert tips", emoji: "📋" },
                { value: "1,000+", label: "Expert Videos", desc: "From 28 verified medical creators", emoji: "🎬" },
                { value: "Free", label: "Forever", desc: "No login, no ads, no data selling", emoji: "✨" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all cursor-default"
                >
                  <span className="text-2xl block mb-3">{stat.emoji}</span>
                  <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-sm font-semibold text-white/70 mt-1">{stat.label}</div>
                  <div className="text-xs text-white/30 mt-2">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="lg:hidden flex flex-wrap justify-center gap-8 pt-12 border-t border-white/10 mt-12"
          >
            {[
              { value: "10+", label: "Health Tools" },
              { value: "120+", label: "Disease Guides" },
              { value: "1,000+", label: "Expert Videos" },
              { value: "Free", label: "Forever" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ HEALTH TOOLS GRID ═══════ */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
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
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
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
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
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
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
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
