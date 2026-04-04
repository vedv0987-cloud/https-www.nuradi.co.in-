"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Trophy, Flame, CheckCircle2, ArrowLeft, Calendar } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  color: string;
  tasks: string[];
}

function generateTasks(prefix: string, variations: string[]): string[] {
  return Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const variation = variations[Math.min(i, variations.length - 1)];
    return `Day ${day}: ${prefix} — ${variation}`;
  });
}

const challenges: Challenge[] = [
  {
    id: "water",
    title: "30-Day Water Challenge",
    emoji: "💧",
    desc: "Track 8 glasses daily",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 5) return `Day ${day}: Drink 8 glasses of water`;
      if (day <= 10) return `Day ${day}: Drink 8 glasses + track the time of each glass`;
      if (day <= 15) return `Day ${day}: Drink 8 glasses + add lemon or cucumber`;
      if (day <= 20) return `Day ${day}: Drink 8 glasses + replace one sugary drink with water`;
      if (day <= 25) return `Day ${day}: Drink 10 glasses of water`;
      return `Day ${day}: Drink 10 glasses + help someone else start hydrating`;
    }),
  },
  {
    id: "walking",
    title: "30-Day Walking Challenge",
    emoji: "🚶",
    desc: "Start 10 min, build to 30 min",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const minutes = Math.min(10 + Math.floor(i * 20 / 29), 30);
      if (day <= 10) return `Day ${day}: Walk for ${minutes} minutes at a comfortable pace`;
      if (day <= 20) return `Day ${day}: Walk for ${minutes} minutes at a brisk pace`;
      return `Day ${day}: Walk for ${minutes} minutes — try a new route or terrain`;
    }),
  },
  {
    id: "no-sugar",
    title: "30-Day No Sugar Challenge",
    emoji: "🚫",
    desc: "Cut added sugar",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 5) return `Day ${day}: Identify and avoid obvious added sugars (soda, candy)`;
      if (day <= 10) return `Day ${day}: Read labels — skip products with added sugar in top 3 ingredients`;
      if (day <= 15) return `Day ${day}: Replace dessert with fruit`;
      if (day <= 20) return `Day ${day}: Avoid all packaged snacks with added sugar`;
      if (day <= 25) return `Day ${day}: Cook one fully sugar-free meal from scratch`;
      return `Day ${day}: Full day with zero added sugar — you are in control`;
    }),
  },
  {
    id: "meditation",
    title: "30-Day Meditation Challenge",
    emoji: "🧘",
    desc: "5 min daily meditation",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 7) return `Day ${day}: 5-minute breathing meditation — focus on inhale and exhale`;
      if (day <= 14) return `Day ${day}: 5-minute body scan meditation — notice tension and release`;
      if (day <= 21) return `Day ${day}: 7-minute guided meditation — try a new technique`;
      return `Day ${day}: 10-minute silent meditation — sit with your thoughts`;
    }),
  },
  {
    id: "sleep",
    title: "30-Day Sleep Challenge",
    emoji: "😴",
    desc: "Fix sleep schedule",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 5) return `Day ${day}: Set a consistent bedtime and wake time`;
      if (day <= 10) return `Day ${day}: No caffeine after 2 PM`;
      if (day <= 15) return `Day ${day}: Create a 30-minute wind-down routine before bed`;
      if (day <= 20) return `Day ${day}: Keep your bedroom cool and dark`;
      if (day <= 25) return `Day ${day}: No screens 30 minutes before sleep`;
      return `Day ${day}: Full sleep hygiene routine — aim for 7-8 hours`;
    }),
  },
  {
    id: "fruit-veg",
    title: "30-Day Fruit/Veg Challenge",
    emoji: "🥗",
    desc: "5 servings daily",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 7) return `Day ${day}: Eat at least 3 servings of fruits or vegetables`;
      if (day <= 14) return `Day ${day}: Eat at least 4 servings — add a new vegetable you rarely eat`;
      if (day <= 21) return `Day ${day}: Eat 5 servings — include at least 2 different colors`;
      return `Day ${day}: Eat 5+ servings — try a fully plant-based meal`;
    }),
  },
  {
    id: "screen-break",
    title: "30-Day Screen Break Challenge",
    emoji: "📵",
    desc: "No screens 1hr before bed",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 7) return `Day ${day}: No screens 30 minutes before bed — read or journal instead`;
      if (day <= 14) return `Day ${day}: No screens 45 minutes before bed — try stretching or planning tomorrow`;
      if (day <= 21) return `Day ${day}: No screens 1 hour before bed — enjoy a calm hobby`;
      return `Day ${day}: No screens 1 hour before bed — reflect on how your sleep has improved`;
    }),
  },
  {
    id: "gratitude",
    title: "30-Day Gratitude Challenge",
    emoji: "🙏",
    desc: "Write 3 things grateful for",
    color: "bg-white",
    tasks: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      if (day <= 7) return `Day ${day}: Write 3 things you are grateful for today`;
      if (day <= 14) return `Day ${day}: Write 3 things + tell one person why you appreciate them`;
      if (day <= 21) return `Day ${day}: Write 3 things + reflect on a challenge that made you stronger`;
      return `Day ${day}: Write 3 things + share your gratitude practice with someone`;
    }),
  },
];

const MILESTONES = [7, 14, 21, 30];

function ConfettiExplosion() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 400,
    y: -(Math.random() * 300 + 100),
    rotate: Math.random() * 720 - 360,
    bg: ["#000", "#444", "#888", "#bbb", "#fff"][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 0.5,
            rotate: p.rotate,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: p.size > 8 ? "50%" : "2px",
            backgroundColor: p.bg,
          }}
        />
      ))}
    </div>
  );
}

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load completed days from localStorage when a challenge is selected
  useEffect(() => {
    if (!selectedChallenge || !mounted) return;
    const loaded: Record<string, boolean> = {};
    for (let d = 1; d <= 30; d++) {
      const key = `challenge-${selectedChallenge.id}-${d}`;
      const val = localStorage.getItem(key);
      if (val === "true") loaded[key] = true;
    }
    setCompletedDays(loaded);
  }, [selectedChallenge, mounted]);

  const toggleDay = useCallback(
    (day: number) => {
      if (!selectedChallenge) return;
      const key = `challenge-${selectedChallenge.id}-${day}`;
      const newVal = !completedDays[key];
      setCompletedDays((prev) => {
        const next = { ...prev };
        if (newVal) next[key] = true;
        else delete next[key];
        return next;
      });
      localStorage.setItem(key, String(newVal));

      // Check milestones
      if (newVal) {
        const count = Object.values({ ...completedDays, [key]: true }).filter(Boolean).length;
        if (MILESTONES.includes(count)) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
      }
    },
    [selectedChallenge, completedDays]
  );

  const daysCompleted = Object.values(completedDays).filter(Boolean).length;

  // Calculate current streak (consecutive completed days ending at latest completed)
  const currentStreak = (() => {
    if (!selectedChallenge) return 0;
    let streak = 0;
    for (let d = 30; d >= 1; d--) {
      const key = `challenge-${selectedChallenge.id}-${d}`;
      if (completedDays[key]) {
        // Count consecutive from here backwards
        let s = 0;
        for (let k = d; k >= 1; k--) {
          const kk = `challenge-${selectedChallenge.id}-${k}`;
          if (completedDays[kk]) s++;
          else break;
        }
        streak = Math.max(streak, s);
        break;
      }
    }
    return streak;
  })();

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
      </div>
    );
  }

  // Challenge selection grid
  if (!selectedChallenge) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <Trophy className="h-7 w-7" />
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                30-Day Health Challenges
              </h1>
            </div>
            <p className="text-gray-500">
              Pick a challenge and commit to 30 days of positive change.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setSelectedChallenge(c)}
                  className={cn(
                    "group relative flex w-full flex-col items-center rounded-2xl border-2 border-black p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                    "bg-white"
                  )}
                >
                  <span className="mb-3 text-5xl">{c.emoji}</span>
                  <h2 className="mb-1 text-sm font-bold leading-tight">
                    {c.title}
                  </h2>
                  <p className="text-xs text-gray-500">{c.desc}</p>
                  <Badge
                    variant="outline"
                    className="mt-3 border-black text-[10px] font-medium"
                  >
                    30 DAYS
                  </Badge>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Challenge detail view
  const progressPct = Math.round((daysCompleted / 30) * 100);

  return (
    <div className="min-h-screen bg-white text-black">
      {showConfetti && <ConfettiExplosion />}

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            className="mb-4 gap-1 px-2 text-gray-500 hover:text-black"
            onClick={() => {
              setSelectedChallenge(null);
              setCompletedDays({});
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            All Challenges
          </Button>

          <div className="mb-6 flex items-start gap-4">
            <span className="text-5xl">{selectedChallenge.emoji}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{selectedChallenge.title}</h1>
              <p className="text-sm text-gray-500">{selectedChallenge.desc}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-1.5 rounded-full border-2 border-black px-3 py-1.5 text-sm font-semibold">
            <Flame className="h-4 w-4" />
            <span>Current streak: {currentStreak} days</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border-2 border-black px-3 py-1.5 text-sm font-semibold">
            <Calendar className="h-4 w-4" />
            <span>
              {daysCompleted}/30 days
            </span>
          </div>
          {daysCompleted === 30 && (
            <Badge className="bg-black text-white">
              <Trophy className="mr-1 h-3 w-3" /> Challenge Complete!
            </Badge>
          )}
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full border border-black bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-400">
            {MILESTONES.map((m) => (
              <span key={m} className={cn(daysCompleted >= m && "font-bold text-black")}>
                {m}d
              </span>
            ))}
          </div>
        </div>

        {/* 30-day calendar grid */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
          {selectedChallenge.tasks.map((task, i) => {
            const day = i + 1;
            const key = `challenge-${selectedChallenge.id}-${day}`;
            const done = !!completedDays[key];

            return (
              <motion.button
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.015 }}
                title={task}
                onClick={() => toggleDay(day)}
                className={cn(
                  "relative flex h-14 w-full flex-col items-center justify-center rounded-xl border-2 text-xs font-bold transition-all",
                  done
                    ? "border-black bg-black text-white shadow-none"
                    : "border-gray-300 bg-white text-black hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                )}
              >
                {done && (
                  <CheckCircle2 className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-white text-black" />
                )}
                <span className="text-base leading-none">{day}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected day task info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-xl border-2 border-dashed border-gray-300 p-4 text-center text-sm text-gray-500"
        >
          Tap a day to mark it complete. Hover to see the daily task.
        </motion.div>
      </div>
    </div>
  );
}
