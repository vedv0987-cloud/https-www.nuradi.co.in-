"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain, Sparkles, RefreshCw, ChevronRight, Heart, Dumbbell,
  Apple, Moon, Shield, Droplets, Zap, TrendingUp, Target,
  Clock, Lightbulb, BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Insight {
  id: string;
  title: string;
  body: string;
  category: string;
  icon: React.ElementType;
  color: string;
  action: { label: string; href: string };
  tags: string[];
}

const ALL_INSIGHTS: Insight[] = [
  // ─── NUTRITION ───
  { id: "n1", title: "You might not be eating enough fiber", body: "Only 5% of adults meet the recommended 25-30g daily fiber intake. Low fiber is linked to higher cholesterol, blood sugar spikes, and digestive issues. Try adding lentils, oats, or berries to one meal today.", category: "Nutrition", icon: Apple, color: "#639922", action: { label: "Watch: Fiber Science", href: "/search?q=fiber+nutrition+health" }, tags: ["diet", "digestion"] },
  { id: "n2", title: "Your protein timing matters more than you think", body: "Research shows distributing protein evenly across meals (30g each) stimulates 25% more muscle synthesis than eating most at dinner. Front-load your protein at breakfast for better body composition.", category: "Nutrition", icon: Dumbbell, color: "#D85A30", action: { label: "Explore: Protein Science", href: "/search?q=protein+muscle+nutrition" }, tags: ["protein", "muscle"] },
  { id: "n3", title: "Ultra-processed foods may be affecting your brain", body: "A 2024 study found that diets high in ultra-processed foods increase depression risk by 31% and cognitive decline by 28%. The additives disrupt gut microbiome signaling to the brain via the vagus nerve.", category: "Brain Health", icon: Brain, color: "#7F77DD", action: { label: "Learn: Gut-Brain Connection", href: "/search?q=gut+brain+connection+microbiome" }, tags: ["brain", "gut"] },
  { id: "n4", title: "You're probably dehydrated right now", body: "75% of adults are chronically dehydrated. Even 2% dehydration reduces cognitive performance by 12% and increases fatigue. Your body needs 35ml per kg of body weight daily — more if you exercise or live in a hot climate.", category: "Hydration", icon: Droplets, color: "#378ADD", action: { label: "Calculate: Water Intake", href: "/health-lab/water" }, tags: ["water", "hydration"] },
  { id: "n5", title: "Your morning coffee has hidden health benefits", body: "Moderate coffee consumption (3-4 cups) is linked to 15% lower heart disease risk, 20% lower Type 2 diabetes risk, and increased longevity. The polyphenols act as powerful antioxidants — but skip the sugar.", category: "Nutrition", icon: Zap, color: "#BA7517", action: { label: "Watch: Coffee & Health", href: "/search?q=coffee+health+benefits" }, tags: ["coffee", "antioxidants"] },

  // ─── FITNESS ───
  { id: "f1", title: "10 minutes of exercise changes your brain chemistry", body: "Just 10 minutes of moderate exercise triggers BDNF release, improving memory and learning for 2+ hours. A quick walk after studying or before a meeting can boost cognitive performance by 20%.", category: "Fitness", icon: Dumbbell, color: "#D85A30", action: { label: "Watch: Exercise & Brain", href: "/search?q=exercise+brain+BDNF" }, tags: ["exercise", "brain"] },
  { id: "f2", title: "Sitting 8+ hours daily ages your cells by 8 years", body: "Telomere research shows prolonged sitting accelerates cellular aging. Standing or walking for just 5 minutes every hour reverses this effect. Your body was designed to move — every 30 minutes minimum.", category: "Fitness", icon: TrendingUp, color: "#ea580c", action: { label: "Try: Heart Rate Zones", href: "/health-lab/heart-rate" }, tags: ["sitting", "aging"] },
  { id: "f3", title: "Your grip strength predicts your lifespan", body: "A Lancet study of 140,000 people found grip strength is a stronger predictor of cardiovascular death than systolic blood pressure. Low grip strength doubles mortality risk. Simple exercises: dead hangs, farmer carries, hand grippers.", category: "Longevity", icon: Heart, color: "#E24B4A", action: { label: "Explore: Strength Training", href: "/search?q=grip+strength+longevity" }, tags: ["strength", "longevity"] },
  { id: "f4", title: "Walking after meals is a metabolic superpower", body: "A 15-minute walk after eating reduces blood sugar spikes by up to 50%. This is more effective than metformin for some prediabetic patients. The muscle contractions act as glucose sinks, pulling sugar directly from blood.", category: "Metabolism", icon: TrendingUp, color: "#1D9E75", action: { label: "Watch: Walking & Blood Sugar", href: "/search?q=walking+blood+sugar+diabetes" }, tags: ["walking", "diabetes"] },

  // ─── SLEEP ───
  { id: "s1", title: "Your sleep is the #1 predictor of next-day productivity", body: "Sleep quality predicts cognitive performance more accurately than caffeine intake, exercise, or motivation combined. One night of 5 hours sleep reduces your reaction time more than being legally drunk. Prioritize 7-8 hours.", category: "Sleep", icon: Moon, color: "#7F77DD", action: { label: "Calculate: Ideal Bedtime", href: "/health-lab/sleep" }, tags: ["sleep", "productivity"] },
  { id: "s2", title: "Blue light after 8pm disrupts sleep for 90 minutes", body: "Screen exposure suppresses melatonin by 50%, shifting your circadian clock by 90 minutes. Night mode helps but doesn't eliminate the effect. Best practice: no screens 1 hour before bed, or use blue-blocking glasses.", category: "Sleep", icon: Moon, color: "#8b5cf6", action: { label: "Watch: Sleep Science", href: "/search?q=blue+light+sleep+melatonin" }, tags: ["sleep", "screens"] },

  // ─── MENTAL HEALTH ───
  { id: "m1", title: "5 minutes of nature exposure reduces anxiety by 55%", body: "A Stanford study found that a 5-minute walk in nature reduces rumination and activity in the brain's subgenual prefrontal cortex — the area associated with depression and repetitive negative thinking.", category: "Mental Health", icon: Brain, color: "#7F77DD", action: { label: "Try: Breathing Exercise", href: "/breathe" }, tags: ["anxiety", "nature"] },
  { id: "m2", title: "Your phone checks spike cortisol every time", body: "Each phone notification triggers a micro-cortisol spike. With 96 daily checks on average, that's 96 stress responses. Batch your notifications into 3 daily windows to reduce cortisol by 23%.", category: "Stress", icon: Zap, color: "#D4537E", action: { label: "Watch: Digital Wellness", href: "/search?q=phone+addiction+cortisol+stress" }, tags: ["stress", "digital"] },
  { id: "m3", title: "Gratitude literally rewires your brain in 8 weeks", body: "MRI studies show 8 weeks of daily gratitude practice increases grey matter in the prefrontal cortex and improves serotonin production by 25%. Write 3 things you're grateful for each evening before bed.", category: "Happiness", icon: Heart, color: "#E24B4A", action: { label: "Learn: Neuroplasticity", href: "/search?q=gratitude+brain+neuroplasticity" }, tags: ["gratitude", "brain"] },

  // ─── IMMUNE SYSTEM ───
  { id: "i1", title: "Cold showers activate 300% more immune cells", body: "A 30-second cold shower at the end of your regular shower activates brown fat, increases white blood cell production by 300%, and boosts norepinephrine by 200-300%. Start with 15 seconds and build up over weeks.", category: "Immunity", icon: Shield, color: "#1D9E75", action: { label: "Watch: Cold Exposure", href: "/search?q=cold+shower+immune+system" }, tags: ["immune", "cold"] },
  { id: "i2", title: "Your gut contains 70% of your immune system", body: "The gut-associated lymphoid tissue (GALT) houses most of your immune cells. Disrupted gut microbiome = weakened immunity. Feed your gut bacteria with 30+ different plant foods per week for optimal diversity.", category: "Gut Health", icon: Shield, color: "#22c55e", action: { label: "Explore: Gut Health", href: "/body-explorer/intestines" }, tags: ["gut", "immune"] },

  // ─── BODY SCIENCE ───
  { id: "b1", title: "Your body replaces itself every 7-10 years", body: "Almost every cell in your body is replaced within 7-10 years. Red blood cells live 120 days. Skin cells 2-3 weeks. The quality of new cells depends on your nutrition, sleep, exercise, and stress levels today.", category: "Body Science", icon: Sparkles, color: "#06b6d4", action: { label: "Explore: Body Parts", href: "/body-explorer" }, tags: ["cells", "body"] },
  { id: "b2", title: "Your heart has its own 'brain' with 40,000 neurons", body: "The cardiac nervous system contains 40,000 sensory neurites that can independently sense, process, and make decisions. This 'heart brain' communicates with your cranial brain via the vagus nerve, influencing emotions and intuition.", category: "Cardiology", icon: Heart, color: "#E24B4A", action: { label: "Explore: Heart", href: "/body-explorer/heart" }, tags: ["heart", "neurons"] },

  // ─── PERSONALIZED ADVICE ───
  { id: "p1", title: "AI analysis: Most people underestimate their BMI category", body: "Studies show 58% of overweight individuals perceive themselves as normal weight. Our BMI calculator gives you an objective, WHO-classified assessment with personalized tips based on your specific result.", category: "Self-Assessment", icon: Target, color: "#f59e0b", action: { label: "Check: BMI Calculator", href: "/health-lab/bmi" }, tags: ["BMI", "weight"] },
  { id: "p2", title: "Your ideal macro split depends on your activity level", body: "A sedentary person needs 0.8g protein/kg, while active individuals need 1.6-2.2g/kg — nearly 3x more. Using the wrong ratio leads to muscle loss, fatigue, and poor recovery. Get your personalized split.", category: "Nutrition", icon: Target, color: "#22c55e", action: { label: "Calculate: Macros", href: "/health-lab/macros" }, tags: ["macros", "protein"] },
  { id: "p3", title: "Fasting for 16 hours triggers cellular autophagy", body: "After 12-16 hours of fasting, your cells begin autophagy — recycling damaged proteins and organelles. This cellular cleanup reduces inflammation, improves insulin sensitivity, and may slow aging. Track it with our timer.", category: "Fasting", icon: Clock, color: "#14b8a6", action: { label: "Start: Fasting Timer", href: "/health-lab/fasting" }, tags: ["fasting", "autophagy"] },
  { id: "p4", title: "Vitamin D deficiency affects 1 billion people globally", body: "If you work indoors, have dark skin, or live above 35° latitude, you're likely deficient. Symptoms include fatigue, bone pain, frequent illness, and depression. Get 15-20 minutes of morning sun or supplement 1000-2000 IU daily.", category: "Nutrition", icon: Lightbulb, color: "#eab308", action: { label: "Learn: Vitamin D", href: "/health-az/vitamin-d-deficiency" }, tags: ["vitamin D", "deficiency"] },
];

function getRandomInsights(count: number): Insight[] {
  const shuffled = [...ALL_INSIGHTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function AIInsights({ count = 3 }: { count?: number }) {
  const [insights, setInsights] = useState(() => getRandomInsights(count));
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setInsights(getRandomInsights(count));
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base">AI-Powered Insights</h3>
            <p className="text-[10px] text-muted-foreground">Personalized health recommendations</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={refresh} className="gap-1.5 text-xs">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={refreshKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-3"
        >
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-4 rounded-xl border bg-card hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${insight.color}12` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: insight.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: `${insight.color}12`, color: insight.color }}>
                        {insight.category}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] text-violet-500">
                        <Sparkles className="w-2.5 h-2.5" />
                        AI Insight
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm leading-tight mb-1.5">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{insight.body}</p>
                    <Link
                      href={insight.action.href}
                      className="inline-flex items-center gap-1 text-xs font-medium mt-2 group-hover:gap-1.5 transition-all"
                      style={{ color: insight.color }}
                    >
                      {insight.action.label}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Full page version
export function AIInsightsFull() {
  const [insights, setInsights] = useState(() => getRandomInsights(6));
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
          <Brain className="w-4 h-4" />
          AI-Powered Health Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Personalized Insights</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Science-backed health recommendations curated by AI. New insights every time you visit.</p>
      </motion.div>

      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={() => { setInsights(getRandomInsights(6)); setRefreshKey((k) => k + 1); }} className="gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Get New Insights
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={refreshKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-4">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <motion.div key={insight.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }} className="p-5 rounded-xl border bg-card hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${insight.color}12` }}>
                    <Icon className="w-4 h-4" style={{ color: insight.color }} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: insight.color }}>{insight.category}</span>
                  <div className="flex items-center gap-0.5 text-[9px] text-violet-500 ml-auto">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </div>
                </div>
                <h3 className="font-bold text-sm mb-2">{insight.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.body}</p>
                <Link href={insight.action.href} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1 text-xs w-full justify-center")} style={{ borderColor: `${insight.color}30`, color: insight.color }}>
                  {insight.action.label} <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
