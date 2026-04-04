"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Moon,
  Sun,
  ArrowRight,
  ArrowLeft,
  Clock,
  Bed,
  Coffee,
  Smartphone,
  Wind,
  Thermometer,
  CheckCircle2,
  AlertTriangle,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5;

interface Answers {
  bedtime: string;
  wakeTime: string;
  sleepLatency: string;
  nightWakings: string;
  sleepQuality: string;
  snoring: string;
  dreams: string;
  roomTemp: string;
  darkness: string;
  noise: string;
  mattress: string;
  screenBefore: string;
  caffeine: string;
  exercise: string;
  naps: string;
  consistency: string;
}

const DEFAULT: Answers = {
  bedtime: "",
  wakeTime: "",
  sleepLatency: "",
  nightWakings: "",
  sleepQuality: "",
  snoring: "",
  dreams: "",
  roomTemp: "",
  darkness: "",
  noise: "",
  mattress: "",
  screenBefore: "",
  caffeine: "",
  exercise: "",
  naps: "",
  consistency: "",
};

const STEPS = [
  { n: 1, label: "Timing", icon: Clock },
  { n: 2, label: "Quality", icon: Star },
  { n: 3, label: "Environment", icon: Thermometer },
  { n: 4, label: "Habits", icon: Coffee },
  { n: 5, label: "Result", icon: Moon },
];

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
        selected
          ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400"
          : "border-muted bg-card hover:border-indigo-300"
      )}
    >
      {label}
    </button>
  );
}

function Question({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold block">{label}</label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function calculateScore(a: Answers): {
  total: number;
  timing: number;
  quality: number;
  environment: number;
  habits: number;
  tips: string[];
} {
  let timing = 25;
  let quality = 25;
  let environment = 25;
  let habits = 25;
  const tips: string[] = [];

  // Timing
  if (a.bedtime === "before-10") timing += 0;
  else if (a.bedtime === "10-11") timing -= 2;
  else if (a.bedtime === "11-12") timing -= 5;
  else if (a.bedtime === "after-12") { timing -= 10; tips.push("Try going to bed before 11 PM for better sleep quality"); }

  if (a.wakeTime === "before-6") timing -= 2;
  else if (a.wakeTime === "6-7") timing += 0;
  else if (a.wakeTime === "7-8") timing -= 1;
  else if (a.wakeTime === "after-8") { timing -= 3; tips.push("Waking up consistently before 7 AM helps regulate your circadian rhythm"); }

  if (a.sleepLatency === "under-15") timing += 0;
  else if (a.sleepLatency === "15-30") timing -= 3;
  else if (a.sleepLatency === "30-60") { timing -= 6; tips.push("Taking more than 30 min to fall asleep? Try a wind-down routine"); }
  else if (a.sleepLatency === "over-60") { timing -= 10; tips.push("Difficulty falling asleep may indicate insomnia — consider consulting a doctor"); }

  // Quality
  if (a.nightWakings === "none") quality += 0;
  else if (a.nightWakings === "once") quality -= 3;
  else if (a.nightWakings === "2-3") { quality -= 7; tips.push("Waking up multiple times disrupts deep sleep — avoid liquids 2 hours before bed"); }
  else if (a.nightWakings === "4+") { quality -= 12; tips.push("Frequent night waking is a red flag — talk to a sleep specialist"); }

  if (a.sleepQuality === "excellent") quality += 0;
  else if (a.sleepQuality === "good") quality -= 2;
  else if (a.sleepQuality === "fair") quality -= 5;
  else if (a.sleepQuality === "poor") { quality -= 10; tips.push("Poor sleep quality affects immunity, mood, and focus — prioritize sleep hygiene"); }

  if (a.snoring === "no") quality += 0;
  else if (a.snoring === "sometimes") quality -= 3;
  else if (a.snoring === "often") { quality -= 7; tips.push("Regular snoring may indicate sleep apnea — get a sleep study done"); }

  if (a.dreams === "pleasant") quality += 0;
  else if (a.dreams === "none") quality -= 1;
  else if (a.dreams === "vivid") quality -= 2;
  else if (a.dreams === "nightmares") { quality -= 5; tips.push("Frequent nightmares can indicate stress — try relaxation techniques before bed"); }

  // Environment
  if (a.roomTemp === "cool") environment += 0;
  else if (a.roomTemp === "moderate") environment -= 2;
  else if (a.roomTemp === "warm") { environment -= 5; tips.push("Keep your bedroom at 18-22°C (65-72°F) for optimal sleep"); }
  else if (a.roomTemp === "hot") { environment -= 8; tips.push("A hot room significantly disrupts sleep — use a fan or AC"); }

  if (a.darkness === "very-dark") environment += 0;
  else if (a.darkness === "mostly-dark") environment -= 2;
  else if (a.darkness === "some-light") { environment -= 5; tips.push("Use blackout curtains or a sleep mask for deeper sleep"); }
  else if (a.darkness === "bright") { environment -= 10; tips.push("Light exposure at night suppresses melatonin — make your room as dark as possible"); }

  if (a.noise === "silent") environment += 0;
  else if (a.noise === "some") environment -= 3;
  else if (a.noise === "noisy") { environment -= 7; tips.push("Use white noise or earplugs if your environment is noisy"); }

  if (a.mattress === "excellent") environment += 0;
  else if (a.mattress === "good") environment -= 2;
  else if (a.mattress === "okay") environment -= 4;
  else if (a.mattress === "bad") { environment -= 8; tips.push("An uncomfortable mattress is one of the top causes of poor sleep — consider upgrading"); }

  // Habits
  if (a.screenBefore === "no-screens") habits += 0;
  else if (a.screenBefore === "30-min") habits -= 2;
  else if (a.screenBefore === "1-hour") { habits -= 5; tips.push("Blue light from screens suppresses melatonin — stop screens 1 hour before bed"); }
  else if (a.screenBefore === "in-bed") { habits -= 10; tips.push("Using your phone in bed is the #1 sleep killer — charge it outside the bedroom"); }

  if (a.caffeine === "none") habits += 0;
  else if (a.caffeine === "morning-only") habits -= 1;
  else if (a.caffeine === "afternoon") { habits -= 5; tips.push("Avoid caffeine after 2 PM — it stays in your system for 8+ hours"); }
  else if (a.caffeine === "evening") { habits -= 10; tips.push("Evening caffeine is destroying your sleep — switch to herbal tea"); }

  if (a.exercise === "daily") habits += 2;
  else if (a.exercise === "3-4x") habits += 0;
  else if (a.exercise === "1-2x") habits -= 2;
  else if (a.exercise === "none") { habits -= 5; tips.push("Regular exercise improves sleep quality — even a 20-minute walk helps"); }

  if (a.naps === "none") habits += 0;
  else if (a.naps === "short") habits -= 1;
  else if (a.naps === "long") { habits -= 5; tips.push("Long naps (>30 min) can make it harder to fall asleep at night"); }

  if (a.consistency === "very") habits += 2;
  else if (a.consistency === "mostly") habits += 0;
  else if (a.consistency === "somewhat") habits -= 3;
  else if (a.consistency === "irregular") { habits -= 7; tips.push("Irregular sleep schedule confuses your body clock — try to sleep and wake at the same time"); }

  timing = Math.max(0, Math.min(25, timing));
  quality = Math.max(0, Math.min(25, quality));
  environment = Math.max(0, Math.min(25, environment));
  habits = Math.max(0, Math.min(25, habits));

  return {
    total: timing + quality + environment + habits,
    timing,
    quality,
    environment,
    habits,
    tips: tips.slice(0, 5),
  };
}

export default function SleepScorePage() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>(DEFAULT);

  const set = (key: keyof Answers, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const canProceed = () => {
    switch (step) {
      case 1:
        return answers.bedtime && answers.wakeTime && answers.sleepLatency;
      case 2:
        return answers.nightWakings && answers.sleepQuality;
      case 3:
        return answers.roomTemp && answers.darkness;
      case 4:
        return answers.screenBefore && answers.caffeine && answers.consistency;
      default:
        return false;
    }
  };

  const result = step === 5 ? calculateScore(answers) : null;

  const getGrade = (score: number) => {
    if (score >= 90) return { label: "Excellent", emoji: "🌟", color: "text-emerald-500" };
    if (score >= 75) return { label: "Good", emoji: "😊", color: "text-green-500" };
    if (score >= 60) return { label: "Fair", emoji: "😐", color: "text-amber-500" };
    if (score >= 40) return { label: "Poor", emoji: "😟", color: "text-orange-500" };
    return { label: "Very Poor", emoji: "😴", color: "text-red-500" };
  };

  const getCatColor = (val: number) => {
    const pct = (val / 25) * 100;
    if (pct >= 80) return "bg-emerald-500";
    if (pct >= 60) return "bg-green-500";
    if (pct >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950/10 to-background">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-medium mb-4">
            <Moon className="w-4 h-4" />
            Sleep Score Calculator
          </div>
          <h1 className="text-3xl font-bold mb-2">How Well Do You Sleep?</h1>
          <p className="text-muted-foreground text-sm">
            Answer a few questions to get your personalized sleep score
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step >= s.n
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.n ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-3.5 h-3.5" />}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("w-6 sm:w-12 h-0.5 rounded", step > s.n ? "bg-indigo-500" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <h2 className="text-lg font-bold text-center">Sleep Timing</h2>
              <Question label="What time do you usually go to bed?">
                {[
                  ["before-10", "Before 10 PM"],
                  ["10-11", "10-11 PM"],
                  ["11-12", "11 PM-12 AM"],
                  ["after-12", "After Midnight"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.bedtime === v} onClick={() => set("bedtime", v)} />
                ))}
              </Question>
              <Question label="What time do you usually wake up?">
                {[
                  ["before-6", "Before 6 AM"],
                  ["6-7", "6-7 AM"],
                  ["7-8", "7-8 AM"],
                  ["after-8", "After 8 AM"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.wakeTime === v} onClick={() => set("wakeTime", v)} />
                ))}
              </Question>
              <Question label="How long does it take you to fall asleep?">
                {[
                  ["under-15", "Under 15 min"],
                  ["15-30", "15-30 min"],
                  ["30-60", "30-60 min"],
                  ["over-60", "Over 1 hour"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.sleepLatency === v} onClick={() => set("sleepLatency", v)} />
                ))}
              </Question>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <h2 className="text-lg font-bold text-center">Sleep Quality</h2>
              <Question label="How often do you wake up during the night?">
                {[
                  ["none", "Never"],
                  ["once", "Once"],
                  ["2-3", "2-3 times"],
                  ["4+", "4+ times"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.nightWakings === v} onClick={() => set("nightWakings", v)} />
                ))}
              </Question>
              <Question label="How would you rate your overall sleep quality?">
                {[
                  ["excellent", "Excellent"],
                  ["good", "Good"],
                  ["fair", "Fair"],
                  ["poor", "Poor"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.sleepQuality === v} onClick={() => set("sleepQuality", v)} />
                ))}
              </Question>
              <Question label="Do you snore?">
                {[
                  ["no", "No"],
                  ["sometimes", "Sometimes"],
                  ["often", "Often/Loud"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.snoring === v} onClick={() => set("snoring", v)} />
                ))}
              </Question>
              <Question label="What are your dreams like?">
                {[
                  ["pleasant", "Pleasant/None"],
                  ["none", "Don't remember"],
                  ["vivid", "Very vivid"],
                  ["nightmares", "Nightmares"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.dreams === v} onClick={() => set("dreams", v)} />
                ))}
              </Question>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <h2 className="text-lg font-bold text-center">Sleep Environment</h2>
              <Question label="How is your room temperature at night?">
                {[
                  ["cool", "Cool (18-22°C)"],
                  ["moderate", "Moderate"],
                  ["warm", "Warm"],
                  ["hot", "Hot"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.roomTemp === v} onClick={() => set("roomTemp", v)} />
                ))}
              </Question>
              <Question label="How dark is your bedroom?">
                {[
                  ["very-dark", "Very dark"],
                  ["mostly-dark", "Mostly dark"],
                  ["some-light", "Some light"],
                  ["bright", "Bright/streetlight"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.darkness === v} onClick={() => set("darkness", v)} />
                ))}
              </Question>
              <Question label="Noise level in your bedroom?">
                {[
                  ["silent", "Very quiet"],
                  ["some", "Some noise"],
                  ["noisy", "Noisy"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.noise === v} onClick={() => set("noise", v)} />
                ))}
              </Question>
              <Question label="How comfortable is your mattress?">
                {[
                  ["excellent", "Excellent"],
                  ["good", "Good"],
                  ["okay", "Okay"],
                  ["bad", "Uncomfortable"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.mattress === v} onClick={() => set("mattress", v)} />
                ))}
              </Question>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <h2 className="text-lg font-bold text-center">Sleep Habits</h2>
              <Question label="Screen time before bed?">
                {[
                  ["no-screens", "No screens 1hr before"],
                  ["30-min", "Screens until 30 min before"],
                  ["1-hour", "Screens until bed"],
                  ["in-bed", "Use phone in bed"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.screenBefore === v} onClick={() => set("screenBefore", v)} />
                ))}
              </Question>
              <Question label="When is your last caffeine?">
                {[
                  ["none", "No caffeine"],
                  ["morning-only", "Morning only"],
                  ["afternoon", "Until afternoon"],
                  ["evening", "Evening/Night"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.caffeine === v} onClick={() => set("caffeine", v)} />
                ))}
              </Question>
              <Question label="How often do you exercise?">
                {[
                  ["daily", "Daily"],
                  ["3-4x", "3-4x/week"],
                  ["1-2x", "1-2x/week"],
                  ["none", "Rarely/Never"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.exercise === v} onClick={() => set("exercise", v)} />
                ))}
              </Question>
              <Question label="Do you take naps?">
                {[
                  ["none", "No naps"],
                  ["short", "Short (<30 min)"],
                  ["long", "Long (30+ min)"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.naps === v} onClick={() => set("naps", v)} />
                ))}
              </Question>
              <Question label="How consistent is your sleep schedule?">
                {[
                  ["very", "Very consistent"],
                  ["mostly", "Mostly consistent"],
                  ["somewhat", "Somewhat irregular"],
                  ["irregular", "Very irregular"],
                ].map(([v, l]) => (
                  <OptionButton key={v} label={l} selected={answers.consistency === v} onClick={() => set("consistency", v)} />
                ))}
              </Question>
            </motion.div>
          )}

          {step === 5 && result && (
            <motion.div key="s5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              {/* Score Circle */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-card rounded-3xl border shadow-xl p-8 text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                    <motion.circle
                      cx="60" cy="60" r="52" fill="none" strokeWidth="8" strokeLinecap="round"
                      className={result.total >= 75 ? "text-emerald-500" : result.total >= 50 ? "text-amber-500" : "text-red-500"}
                      stroke="currentColor"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - result.total / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold">{result.total}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>

                <div className={cn("text-2xl font-bold", getGrade(result.total).color)}>
                  {getGrade(result.total).emoji} {getGrade(result.total).label}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.total >= 80
                    ? "You're sleeping like a champion! Keep it up."
                    : result.total >= 60
                      ? "Not bad, but there's room for improvement."
                      : "Your sleep needs serious attention. See the tips below."}
                </p>
              </motion.div>

              {/* Category Breakdown */}
              <div className="bg-card rounded-2xl border p-6 space-y-4">
                <h3 className="font-bold text-sm">Category Breakdown</h3>
                {[
                  { label: "Timing", value: result.timing, icon: Clock },
                  { label: "Quality", value: result.quality, icon: Star },
                  { label: "Environment", value: result.environment, icon: Thermometer },
                  { label: "Habits", value: result.habits, icon: Coffee },
                ].map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium flex items-center gap-1.5">
                        <cat.icon className="w-3.5 h-3.5" /> {cat.label}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {cat.value}/25
                      </Badge>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={cn("h-full rounded-full", getCatColor(cat.value))}
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.value / 25) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {result.tips.length > 0 && (
                <div className="bg-card rounded-2xl border p-6">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Personalized Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => {
                    setStep(1);
                    setAnswers(DEFAULT);
                  }}
                >
                  Start Over
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-muted-foreground text-center">
                This is for informational purposes only. Not a medical assessment. Consult a sleep specialist for persistent sleep issues.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between items-center mt-8">
            <Button variant="ghost" onClick={() => setStep((step - 1) as Step)} disabled={step === 1} className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canProceed()}
              className="rounded-xl bg-indigo-500 hover:bg-indigo-600 px-8"
            >
              {step === 4 ? "Get Score" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
