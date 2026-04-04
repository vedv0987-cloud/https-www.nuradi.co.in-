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
      {/* ═══════ HERO — PREMIUM INTERACTIVE ═══════ */}
      <section className="relative overflow-hidden bg-[#050505] text-white min-h-[100vh] flex items-center">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Moving gradient orbs */}
          <motion.div
            animate={{ x: [0, 100, -50, 0], y: [0, -80, 40, 0], scale: [1, 1.3, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-white/[0.04] to-transparent rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0], scale: [1.2, 0.8, 1.1, 1.2] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-white/[0.03] to-transparent rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, 40, -30, 0], y: [0, -50, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[60%] left-[50%] w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px]"
          />
          {/* Subtle grid lines */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-20 sm:py-28 w-full relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
            {/* Left — Copy */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-sm font-medium"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-emerald-400"
                />
                <span className="text-white/70">India&apos;s #1 Free Health Platform</span>
                <span className="h-4 w-px bg-white/20" />
                <span className="text-white/40 text-xs">Trusted by thousands</span>
              </motion.div>

              <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-black tracking-[-0.05em] leading-[0.9]">
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="block"
                >
                  Your Health.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 0.25, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="block"
                >
                  Your Data.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="block"
                >
                  Your Power.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg sm:text-xl text-white/40 max-w-lg leading-relaxed font-light"
              >
                AI-powered health tools, expert disease guides, and curated medical videos — everything to take control of your health.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href="/tools/bmi">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-10 h-[56px] bg-white text-black font-bold text-[15px] rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-shadow"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
                <Link href="/health-az">
                  <motion.div
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-10 h-[56px] border border-white/15 text-white/80 font-bold text-[15px] rounded-2xl transition-all"
                  >
                    <Stethoscope className="w-5 h-5" />
                    Explore Health A-Z
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right — Interactive Animated Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="hidden lg:block relative"
            >
              {/* Animated ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-[420px] h-[420px] rounded-full border border-white/[0.04]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[340px] h-[340px] rounded-full border border-white/[0.06] border-dashed"
                />
              </div>

              {/* Stats grid with glass cards */}
              <div className="relative grid grid-cols-2 gap-5">
                {[
                  { value: "10+", label: "Health Tools", desc: "BMI, Bio Age, Sleep, Gut Health & more", icon: Activity },
                  { value: "120+", label: "Disease Guides", desc: "Conditions A-Z with expert tips", icon: BookOpen },
                  { value: "1,000+", label: "Expert Videos", desc: "From 28 verified medical creators", icon: Play },
                  { value: "Free", label: "Forever", desc: "No login, no ads, no data selling", icon: Shield },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                      whileHover={{ y: -6, scale: 1.03, borderColor: "rgba(255,255,255,0.2)" }}
                      className="group p-7 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl hover:from-white/[0.07] hover:to-white/[0.03] transition-all duration-500 cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] group-hover:bg-white/[0.1] flex items-center justify-center mb-4 transition-colors">
                        <Icon className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
                      </div>
                      <motion.div
                        className="text-4xl font-black tracking-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + i * 0.15 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm font-semibold text-white/60 mt-1.5">{stat.label}</div>
                      <div className="text-xs text-white/25 mt-2 leading-relaxed">{stat.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Mobile stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-white/[0.06] mt-16"
          >
            {[
              { value: "10+", label: "Health Tools", icon: Activity },
              { value: "120+", label: "Disease Guides", icon: BookOpen },
              { value: "1,000+", label: "Expert Videos", icon: Play },
              { value: "Free", label: "Forever", icon: Shield },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-4">
                  <Icon className="w-5 h-5 text-white/30 mx-auto mb-2" />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-xs text-white/30 mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2.5 rounded-full bg-white/40"
              />
            </motion.div>
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
