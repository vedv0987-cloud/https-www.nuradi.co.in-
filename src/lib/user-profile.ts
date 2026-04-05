"use client";

import { useEffect, useState } from "react";

export type Gender = "male" | "female" | "other";
export type DietType = "veg" | "nonveg" | "egg" | "vegan";
export type ExerciseFreq = "never" | "sometimes" | "regular" | "daily";

export const CONDITIONS = [
  "diabetes",
  "hypertension",
  "thyroid",
  "heart-disease",
  "pcos",
  "asthma",
  "high-cholesterol",
] as const;
export type Condition = (typeof CONDITIONS)[number];

export const GOALS = [
  "lose-weight",
  "build-muscle",
  "better-sleep",
  "less-stress",
  "eat-healthier",
  "track-health",
] as const;
export type Goal = (typeof GOALS)[number];

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  conditions: Condition[];
  goals: Goal[];
  diet: DietType;
  exercise: ExerciseFreq;
  onboardingComplete: boolean;
  completedAt: string | null;
}

const STORAGE_KEY = "nuradi_user_profile";

const EMPTY_PROFILE: UserProfile = {
  name: "",
  age: 30,
  gender: "male",
  heightCm: 170,
  weightKg: 70,
  conditions: [],
  goals: [],
  diet: "veg",
  exercise: "sometimes",
  onboardingComplete: false,
  completedAt: null,
};

export function getBmi(heightCm: number, weightKg: number): number {
  if (!heightCm || !weightKg) return 0;
  const m = heightCm / 100;
  return +(weightKg / (m * m)).toFixed(1);
}

export function getBmiLabel(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 23) return "Normal";
  if (bmi < 25) return "Overweight";
  return "Obese";
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProfile(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  const update = (partial: Partial<UserProfile>) => {
    setProfile((p) => {
      const next = { ...p, ...partial };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const complete = () => {
    update({ onboardingComplete: true, completedAt: new Date().toISOString() });
  };

  const reset = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setProfile(EMPTY_PROFILE);
  };

  return { profile, update, complete, reset, hydrated };
}

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as UserProfile) : null;
  } catch {
    return null;
  }
}
