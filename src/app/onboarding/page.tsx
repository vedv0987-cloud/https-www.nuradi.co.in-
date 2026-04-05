"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useUserProfile,
  CONDITIONS,
  GOALS,
  type Condition,
  type Goal,
  type Gender,
  type DietType,
  type ExerciseFreq,
} from "@/lib/user-profile";

const CONDITION_LABELS: Record<Condition, string> = {
  diabetes: "Diabetes",
  hypertension: "Hypertension",
  thyroid: "Thyroid",
  "heart-disease": "Heart Disease",
  pcos: "PCOS",
  asthma: "Asthma",
  "high-cholesterol": "High Cholesterol",
};

const GOAL_LABELS: Record<Goal, { label: string; emoji: string }> = {
  "lose-weight": { label: "Lose Weight", emoji: "🔻" },
  "build-muscle": { label: "Build Muscle", emoji: "💪" },
  "better-sleep": { label: "Better Sleep", emoji: "😴" },
  "less-stress": { label: "Less Stress", emoji: "🧘" },
  "eat-healthier": { label: "Eat Healthier", emoji: "🥗" },
  "track-health": { label: "Track Health", emoji: "📊" },
};

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, update, complete } = useUserProfile();
  const [step, setStep] = useState(0);

  const canNext = [
    true, // welcome
    profile.name.trim().length > 0 && profile.age > 0,
    profile.heightCm > 0 && profile.weightKg > 0,
    profile.goals.length > 0,
  ][step];

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    complete();
    router.push("/dashboard");
  };

  const toggleCondition = (c: Condition) =>
    update({
      conditions: profile.conditions.includes(c)
        ? profile.conditions.filter((x) => x !== c)
        : [...profile.conditions, c],
    });

  const toggleGoal = (g: Goal) =>
    update({
      goals: profile.goals.includes(g)
        ? profile.goals.filter((x) => x !== g)
        : [...profile.goals, g],
    });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-8 bg-emerald-500" : i < step ? "w-1.5 bg-emerald-500" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">👋</div>
              <h1 className="text-3xl font-bold mb-3">Welcome to NuradiHealth!</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Let&apos;s personalize your experience. This takes 60 seconds.
                We&apos;ll recommend tools, articles & tips based on your health goals.
              </p>
              <p className="text-xs text-muted-foreground mb-8">
                All data stays on your device — we don&apos;t send it anywhere.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={next} className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
                  Let&apos;s Go <ArrowRight className="h-4 w-4" />
                </Button>
                <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
                  Skip for now
                </Link>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="basic"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl font-bold mb-1">Tell us about you</h2>
              <p className="text-sm text-muted-foreground mb-6">Quick basics</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Your Name
                  </label>
                  <Input
                    value={profile.name}
                    onChange={(e) => update({ name: e.target.value })}
                    placeholder="What should we call you?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Age
                    </label>
                    <Input
                      type="number"
                      min={15}
                      max={90}
                      value={profile.age}
                      onChange={(e) => update({ age: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Gender
                    </label>
                    <select
                      value={profile.gender}
                      onChange={(e) => update({ gender: e.target.value as Gender })}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="body"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl font-bold mb-1">Your body</h2>
              <p className="text-sm text-muted-foreground mb-6">We&apos;ll auto-calculate your BMI</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Height (cm)
                  </label>
                  <Input
                    type="number"
                    min={120}
                    max={220}
                    value={profile.heightCm}
                    onChange={(e) => update({ heightCm: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Weight (kg)
                  </label>
                  <Input
                    type="number"
                    min={30}
                    max={250}
                    value={profile.weightKg}
                    onChange={(e) => update({ weightKg: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Diet Type
                </label>
                <select
                  value={profile.diet}
                  onChange={(e) => update({ diet: e.target.value as DietType })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="veg">🥬 Vegetarian</option>
                  <option value="egg">🥚 Eggetarian</option>
                  <option value="nonveg">🍗 Non-Veg</option>
                  <option value="vegan">🌱 Vegan</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Exercise
                </label>
                <select
                  value={profile.exercise}
                  onChange={(e) => update({ exercise: e.target.value as ExerciseFreq })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="never">Never</option>
                  <option value="sometimes">Few times / month</option>
                  <option value="regular">3-5x / week</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Existing conditions (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.map((c) => {
                    const selected = profile.conditions.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleCondition(c)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-2 transition-colors ${
                          selected
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                            : "border-border bg-card hover:border-emerald-500/40"
                        }`}
                      >
                        {selected && "✓ "}
                        {CONDITION_LABELS[c]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-2xl font-bold mb-1">Your health goals</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Pick all that matter to you
              </p>

              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => {
                  const info = GOAL_LABELS[g];
                  const selected = profile.goals.includes(g);
                  return (
                    <button
                      key={g}
                      onClick={() => toggleGoal(g)}
                      className={`text-left p-4 rounded-xl border-2 transition-colors ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                          : "border-border bg-card hover:border-emerald-500/40"
                      }`}
                    >
                      <div className="text-2xl mb-1">{info.emoji}</div>
                      <p className="font-semibold text-sm">
                        {selected && "✓ "}{info.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        {step > 0 && (
          <div className="flex items-center justify-between mt-8 gap-3">
            <Button variant="outline" onClick={prev} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < 3 ? (
              <Button
                onClick={next}
                disabled={!canNext}
                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={finish}
                disabled={!canNext}
                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
              >
                Finish <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
