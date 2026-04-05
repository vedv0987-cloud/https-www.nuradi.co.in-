"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  ArrowRight,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Droplets,
  Moon,
  Pill,
  Shield,
  Sparkles,
  BookOpen,
  Play,
  Scale,
  Hourglass,
  Salad,
  GlassWater,
  HeartPulse,
  ShieldAlert,
  Utensils,
  Bone,
  Wind,
  Flame,
  Microscope,
  Baby,
  Eye,
  Smile as SmileIcon,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { WhyTrustUs } from "@/components/why-trust-us";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { RecommendedReads } from "@/components/recommended-reads";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";

// Rotating hero text with smooth word cycling
const HERO_WORDS = [
  { line1: "Your Health.", line2: "Your Data.", line3: "Your Power." },
  { line1: "Your Body.", line2: "Your Mind.", line3: "Your Life." },
  { line1: "Know More.", line2: "Live Better.", line3: "Stay Strong." },
  { line1: "Check Now.", line2: "Act Smart.", line3: "Feel Great." },
  { line1: "Free Tools.", line2: "Real Science.", line3: "Zero BS." },
];

function RotatingHeroText() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % HERO_WORDS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const words = HERO_WORDS[idx];
  return (
    <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-black tracking-[-0.05em] leading-[0.9] relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(5px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {words.line1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 0.25, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(5px)" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {words.line2}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(5px)" }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {words.line3}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {HERO_WORDS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIdx(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === idx ? "w-8 bg-white/60" : "w-1.5 bg-white/15 hover:bg-white/25"
            )}
          />
        ))}
      </div>
    </h1>
  );
}

// Animated counter that counts up on mount
function AnimCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1500;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setCount(Math.round(target * (p * (2 - p))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Floating particles for hero background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1 + Math.random(), 0],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const HEALTH_TOOLS = [
  { href: "/tools/bmi", label: "BMI & Body Metrics", desc: "Calculate BMI, ideal weight & daily calories", icon: Scale, img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop" },
  { href: "/tools/biological-age", label: "Biological Age", desc: "How old is your body really?", icon: Hourglass, img: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&h=300&fit=crop" },
  { href: "/tools/sleep-score", label: "Sleep Score", desc: "Rate your sleep quality out of 100", icon: Moon, img: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=400&h=300&fit=crop" },
  { href: "/tools/gut-health", label: "Gut Health Score", desc: "Assess your digestive health", icon: Salad, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
  { href: "/tools/water-tracker", label: "Water Tracker", desc: "Track daily water intake", icon: GlassWater, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop" },
  { href: "/tools/mood-tracker", label: "Mood Tracker", desc: "Track stress, mood & energy daily", icon: HeartPulse, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop" },
  { href: "/tools/emergency-qr", label: "Emergency QR Card", desc: "Generate a health emergency QR card", icon: ShieldAlert, img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop" },
  { href: "/tools/generic-medicine", label: "Generic Medicine", desc: "Find cheaper generic alternatives", icon: Pill, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop" },
  { href: "/tools/food-nutrition", label: "Food Nutrition", desc: "Indian food nutrition database", icon: Utensils, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop" },
  { href: "/symptom-checker", label: "Symptom Checker", desc: "Find the right doctor for your symptoms", icon: Stethoscope, img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=300&fit=crop" },
];

const CATEGORY_ICON_MAP: Record<string, { icon: React.ElementType; count: number }> = {
  cardiovascular: { icon: Heart, count: 8 },
  endocrine: { icon: Flame, count: 10 },
  respiratory: { icon: Wind, count: 8 },
  digestive: { icon: Utensils, count: 8 },
  neurological: { icon: Brain, count: 7 },
  "mental-health": { icon: Sparkles, count: 8 },
  musculoskeletal: { icon: Bone, count: 6 },
  skin: { icon: Zap, count: 4 },
  renal: { icon: Droplets, count: 5 },
  reproductive: { icon: Baby, count: 4 },
  immune: { icon: Shield, count: 3 },
  eye: { icon: Eye, count: 4 },
  ear: { icon: Activity, count: 2 },
  dental: { icon: SmileIcon, count: 2 },
  nutritional: { icon: Salad, count: 8 },
};

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
          {/* Floating particles */}
          <FloatingParticles />
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

              <RotatingHeroText />

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
              {/* Animated orbital rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-[480px] h-[480px] rounded-full border border-white/[0.03]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40"
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/[0.04]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400/60"
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[250px] h-[250px] rounded-full border border-white/[0.02]"
                />
              </div>

              {/* Stats grid with interactive glass cards */}
              <div className="relative grid grid-cols-2 gap-5">
                {[
                  { value: 10, suffix: "+", label: "Health Tools", desc: "BMI, Bio Age, Sleep, Gut Health & more", icon: Activity, glowColor: "from-blue-500/10" },
                  { value: 120, suffix: "+", label: "Disease Guides", desc: "Conditions A-Z with expert tips", icon: BookOpen, glowColor: "from-purple-500/10" },
                  { value: 1000, suffix: "+", label: "Expert Videos", desc: "From 28 verified medical creators", icon: Play, glowColor: "from-emerald-500/10" },
                  { value: 0, suffix: "", label: "Forever Free", desc: "No login, no ads, no data selling", icon: Shield, glowColor: "from-amber-500/10", isText: true, textValue: "Free" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 40, rotateX: 15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.7, type: "spring", damping: 20 }}
                      whileHover={{ y: -8, scale: 1.04, borderColor: "rgba(255,255,255,0.15)" }}
                      className={`group relative p-7 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden transition-all duration-500 cursor-default`}
                    >
                      {/* Hover glow effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                      />

                      {/* Animated icon */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-12 h-12 rounded-2xl bg-white/[0.05] group-hover:bg-white/[0.08] flex items-center justify-center mb-5 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors duration-300" />
                        {/* Icon ring animation */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border border-white/[0.08]"
                          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        />
                      </motion.div>

                      {/* Animated counter */}
                      <div className="relative text-4xl font-black tracking-tight">
                        {stat.isText ? stat.textValue : <AnimCounter target={stat.value} suffix={stat.suffix} />}
                      </div>
                      <div className="relative text-sm font-semibold text-white/60 mt-1.5 group-hover:text-white/80 transition-colors">{stat.label}</div>
                      <div className="relative text-xs text-white/25 mt-2.5 leading-relaxed group-hover:text-white/40 transition-colors">{stat.desc}</div>

                      {/* Corner accent line */}
                      <motion.div
                        className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <motion.div
                        className="absolute top-0 right-0 h-16 w-px bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {HEALTH_TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={tool.href}
                    className="group block rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={tool.img}
                        alt={tool.label}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                          <Icon className="w-4.5 h-4.5 text-[#1a1a1a]" />
                        </div>
                      </div>
                    </div>
                    {/* Text */}
                    <div className="p-4">
                      <h3 className="font-bold text-sm group-hover:text-black transition-colors">
                        {tool.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {tool.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════ HEALTH CONDITIONS — PREMIUM ═══════ */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
                <Stethoscope className="w-3 h-3" />
                Browse by System
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Health Conditions</h2>
              <p className="text-muted-foreground text-sm mt-2">120+ conditions across 15 body systems, explained by verified experts</p>
            </div>
            <Link
              href="/health-az"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] text-white text-sm font-semibold hover:bg-black transition-all hover:gap-3"
            >
              View All 120+
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => {
              const meta = CATEGORY_ICON_MAP[cat.id] || { icon: Heart, count: 5 };
              const Icon = meta.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/health-az/category/${cat.id}`}
                    className="group relative block h-full p-6 rounded-3xl bg-white border-2 border-gray-100 hover:border-[#1a1a1a] transition-all duration-300 overflow-hidden"
                  >
                    {/* Colored accent blob */}
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500 blur-2xl"
                      style={{ backgroundColor: cat.color }}
                    />

                    {/* Icon */}
                    <div
                      className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: cat.bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: cat.color }} strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-bold text-base text-[#1a1a1a] leading-tight group-hover:translate-x-0.5 transition-transform duration-300">
                        {cat.label}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-semibold text-gray-500">
                          {meta.count} conditions
                        </span>
                        <ArrowRight
                          className="w-4 h-4 text-gray-400 group-hover:text-[#1a1a1a] group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ backgroundColor: cat.color }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════ EXPLORE MORE — QUICK LINKS ═══════ */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
                <Sparkles className="w-3 h-3" />
                Explore More
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Everything You Need</h2>
              <p className="text-muted-foreground text-sm mt-2">Videos, guides, exercises, and tools — all in one place</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/explore", icon: Play, title: "Health Videos", desc: "1,000+ expert videos from verified creators" },
              { href: "/infographics", icon: BookOpen, title: "Health Infographics", desc: "120 disease tip cards with actionable advice" },
              { href: "/symptom-checker", icon: Stethoscope, title: "Symptom Checker", desc: "Find the right doctor for your symptoms" },
              { href: "/exercises", icon: HeartPulse, title: "Exercise Library", desc: "40 workouts: strength, cardio, yoga & more" },
              { href: "/blog", icon: BookOpen, title: "Health Blog", desc: "20+ articles on wellness, nutrition, fitness" },
              { href: "/journal", icon: Heart, title: "Symptom Diary", desc: "Track symptoms, mood, and daily health" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#1a1a1a] transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#1a1a1a] group-hover:translate-x-0.5 transition-transform">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1a1a1a] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
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
