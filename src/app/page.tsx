"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Play,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Heart,
  Dumbbell,
  Apple,
  Brain,
  Stethoscope,
  Atom,
  Lightbulb,
  ChevronLeft,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { VideoCard } from "@/components/video-card";
import { Category, CATEGORY_META } from "@/types";
import { cn, formatViews } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { bodyParts } from "@/data/body-parts";
import { BodyPartGrid } from "@/components/body-part-grid";
import { BreathingExercise } from "@/components/breathing-exercise";
import { BMICalculator } from "@/components/bmi-calculator";
import { AIInsights } from "@/components/ai-insights";
import { TrustBar } from "@/components/trust-bar";
import { WhyTrustUs } from "@/components/why-trust-us";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { RecommendedReads } from "@/components/recommended-reads";
import { Wind, Calculator, FlaskConical, BookOpen, Sunrise } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Dumbbell, Apple, Brain, Stethoscope, Atom, Lightbulb,
};

// Top 8 most-viewed videos for hero rotation
const heroVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 8);
const heroIds = new Set(heroVideos.map((v) => v.id));
const trendingVideos = [...videos]
  .sort((a, b) => b.views - a.views)
  .filter((v) => !heroIds.has(v.id))
  .slice(0, 8);
const editorsPicks = videos.filter((v) => v.featured).slice(0, 6);
const latestVideos = [...videos]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  .slice(0, 6);

export default function HomePage() {
  const trendingRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<HTMLDivElement>(null);
  const [heroIdx, setHeroIdx] = useState(0);

  // Auto-rotate hero video every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((i) => (i + 1) % heroVideos.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const currentVideo = heroVideos[heroIdx];
  const currentChannel = channels.find((c) => c.id === currentVideo.channelId);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: "left" | "right"
  ) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-20 pb-20">
      {/* ═══════ HERO — FUTURISTIC MEDICAL ═══════ */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-cyan-500/[0.03]" />
          <div className="absolute top-20 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm border border-primary/20"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI-Curated Health Platform
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold tracking-[-0.03em] leading-[1.1]">
                <span className="block text-foreground">The Future of</span>
                <span className="block bg-gradient-to-r from-emerald-500 via-primary to-cyan-500 bg-clip-text text-transparent pb-1">
                  Health Education
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed tracking-[-0.01em]">
                {videos.length.toLocaleString()}+ expert videos from{" "}{channels.length} verified doctors, scientists &amp; therapists.{" "}Zero misinformation. Pure knowledge.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/explore"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 text-base px-8 h-12 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                  )}
                >
                  Start Exploring
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/health-az"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "text-base px-8 h-12 rounded-xl backdrop-blur-sm"
                  )}
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Health A-Z
                </Link>
                <Link
                  href="/health-lab"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "text-base px-8 h-12 rounded-xl backdrop-blur-sm"
                  )}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Health Lab
                </Link>
              </div>

              {/* Stats with glassmorphism */}
              <div className="flex gap-4 pt-4">
                {[
                  { value: `${videos.length.toLocaleString()}+`, label: "Expert Videos" },
                  { value: `${channels.length}`, label: "Verified Channels" },
                  { value: "60+", label: "Health Conditions" },
                  { value: "8", label: "Health Tools" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center px-3"
                  >
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Auto-Rotating Video Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Glow effect behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50 dark:opacity-30" />

              <div className="relative">
                {/* Main video card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/video/${currentVideo.id}`}
                      className="group block relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                    >
                      <Image
                        src={currentVideo.thumbnail}
                        alt={currentVideo.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl backdrop-blur-sm"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Play className="w-7 h-7 text-black fill-black ml-1" />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Now Playing
                          </span>
                          <span className="text-white/50 text-xs">
                            {formatViews(currentVideo.views)}
                          </span>
                        </div>
                        <h2 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg">
                          {currentVideo.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                          {currentChannel && (
                            <Image
                              src={currentChannel.avatar}
                              alt={currentChannel.name}
                              width={20}
                              height={20}
                              className="w-5 h-5 rounded-full ring-1 ring-white/20"
                            />
                          )}
                          <span className="text-white/70 text-sm">
                            {currentChannel?.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {heroVideos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroIdx(i)}
                      className="relative h-1.5 rounded-full overflow-hidden transition-all"
                      style={{ width: i === heroIdx ? 32 : 8 }}
                    >
                      <div className="absolute inset-0 bg-muted-foreground/20 rounded-full" />
                      {i === heroIdx && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 10, ease: "linear" }}
                          key={`progress-${heroIdx}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ TRUST BAR ═══════ */}
      <TrustBar />

      {/* ═══════ TRENDING NOW — HORIZONTAL SCROLL ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => scroll(trendingRef, "left")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => scroll(trendingRef, "right")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link
                href="/explore"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                View all
              </Link>
            </div>
          </div>
          <div
            ref={trendingRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          >
            {trendingVideos.map((video, i) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-[300px] snap-start"
              >
                <VideoCard video={video} index={i} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ CATEGORIES ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(
              Object.entries(CATEGORY_META) as [
                Category,
                (typeof CATEGORY_META)[Category],
              ][]
            ).map(([slug, meta], i) => {
              const Icon = ICON_MAP[meta.icon];
              const count = videos.filter((v) => v.category === slug).length;
              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <Link
                    href={`/category/${slug}`}
                    className="group block p-5 rounded-xl border bg-card hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: meta.color }}
                    />
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${meta.color}15` }}
                    >
                      {Icon && (
                        <Icon
                          className="w-5 h-5"
                          style={{ color: meta.color }}
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {meta.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {count} videos
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════ EXPLORE BY BODY PART ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Explore by Body Part</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Find videos about specific organs and body systems
              </p>
            </div>
            <Link
              href="/body-explorer"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <BodyPartGrid parts={bodyParts.slice(0, 10)} compact />
        </motion.div>
      </section>

      {/* ═══════ EDITOR'S PICKS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Editor&apos;s Picks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorsPicks.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ AI-POWERED INSIGHTS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1fr_380px] gap-6"
        >
          <div className="p-6 rounded-2xl border bg-card">
            <AIInsights count={3} />
          </div>
          <div className="space-y-4">
            <Link href="/daily-dose" className="group block p-5 rounded-2xl border bg-card hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sunrise className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Daily Dose</h3>
                  <p className="text-[10px] text-muted-foreground">Your 5-min health lesson</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Learn something new every day. Facts, videos, and tips from 28 expert channels.</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 group-hover:gap-1.5 transition-all">Start today <ChevronRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/learning-paths" className="group block p-5 rounded-2xl border bg-card hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Learning Paths</h3>
                  <p className="text-[10px] text-muted-foreground">6 structured courses</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Diabetes 101, Yoga for Beginners, Anxiety Guide, and more. Track your progress.</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 group-hover:gap-1.5 transition-all">Explore paths <ChevronRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════ LATEST VIDEOS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recently Added</h2>
            <Link
              href="/explore"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ TOP CHANNELS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Top Channels</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => scroll(channelRef, "left")}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => scroll(channelRef, "right")}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link
                href="/channels"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                View all
              </Link>
            </div>
          </div>
          <div
            ref={channelRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x"
          >
            {channels.map((channel, i) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex-shrink-0 snap-start"
              >
                <Link
                  href={`/channel/${channel.id}`}
                  className="group flex flex-col items-center gap-2 w-24"
                >
                  <Image
                    src={channel.avatar}
                    alt={channel.name}
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded-full border-2 border-transparent group-hover:border-primary transition-all shadow-sm"
                  />
                  <span className="text-xs font-medium text-center line-clamp-2 group-hover:text-primary transition-colors">
                    {channel.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ HEALTH TOOLS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <FlaskConical className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl sm:text-3xl font-bold">Health Tools</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Main Tool Card — Breathing */}
            <div className="lg:col-span-2 lg:row-span-2 rounded-3xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20 p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Breathe better, live better</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Reduce stress with guided breathing exercises. Box breathing, 4-7-8, and more techniques.
              </p>
              <div className="flex-1 min-h-0">
                <BreathingExercise />
              </div>
              <Link
                href="/breathe"
                className={cn(buttonVariants({ size: "lg" }), "mt-6 self-start rounded-full bg-teal-700 hover:bg-teal-800 text-white")}
              >
                Explore Breathing
              </Link>
            </div>

            {/* Small Tool Cards */}
            {[
              { href: "/health-lab/bmi", label: "BMI Calculator", desc: "Check your Body Mass Index", icon: Calculator, color: "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20" },
              { href: "/health-lab/calories", label: "Calorie Calculator", desc: "Calculate daily calorie needs", icon: Sunrise, color: "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20" },
              { href: "/health-lab/macros", label: "Macro Calculator", desc: "Daily carb, protein & fat goals", icon: FlaskConical, color: "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20" },
              { href: "/body-explorer", label: "Body Explorer", desc: "Learn about every organ", icon: Stethoscope, color: "from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={cn(
                    "group rounded-2xl bg-gradient-to-br p-5 flex items-start justify-between gap-3 transition-shadow hover:shadow-lg",
                    tool.color
                  )}
                >
                  <div>
                    <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mb-1">{tool.label}</p>
                    <p className="text-sm font-medium text-foreground">{tool.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </div>
                </Link>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-emerald-500 p-8 sm:p-12 text-white text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10 pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-bold">
            Discover Trusted Knowledge
          </h2>
          <p className="text-white/80 mt-3 max-w-lg mx-auto">
            Every video is hand-picked from verified health and education
            creators. Start exploring now.
          </p>
          <Link
            href="/explore"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 bg-white text-primary hover:bg-white/90 gap-2 text-base px-8 relative z-10"
            )}
          >
            Start Exploring
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
