"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Shield,
  Heart,
  Phone,
  AlertTriangle,
  Printer,
  Save,
  Cross,
  User,
  Droplets,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

const CHRONIC_CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Thyroid",
  "Epilepsy",
  "None",
] as const;

interface FormData {
  fullName: string;
  age: string;
  bloodGroup: string;
  allergies: string;
  medications: string;
  conditions: string[];
  emergencyContact1Name: string;
  emergencyContact1Phone: string;
  emergencyContact2Name: string;
  emergencyContact2Phone: string;
}

const STORAGE_KEY = "nuradi-emergency-card";

function loadFromStorage(): FormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FormData;
  } catch {
    /* ignore */
  }
  return null;
}

function saveToStorage(data: FormData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

const defaultForm: FormData = {
  fullName: "",
  age: "",
  bloodGroup: "",
  allergies: "",
  medications: "",
  conditions: [],
  emergencyContact1Name: "",
  emergencyContact1Phone: "",
  emergencyContact2Name: "",
  emergencyContact2Phone: "",
};

export default function EmergencyQRPage() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [cardGenerated, setCardGenerated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) setForm(saved);
  }, []);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        saveToStorage(next);
        return next;
      });
    },
    []
  );

  const toggleCondition = useCallback((condition: string) => {
    setForm((prev) => {
      let next: string[];
      if (condition === "None") {
        next = prev.conditions.includes("None") ? [] : ["None"];
      } else {
        const without = prev.conditions.filter((c) => c !== "None");
        next = without.includes(condition)
          ? without.filter((c) => c !== condition)
          : [...without, condition];
      }
      const updated = { ...prev, conditions: next };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const canGenerate =
    form.fullName.trim() &&
    form.age.trim() &&
    form.bloodGroup &&
    form.emergencyContact1Name.trim() &&
    form.emergencyContact1Phone.trim();

  const handleGenerate = () => {
    if (!canGenerate) return;
    setCardGenerated(true);
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950/20 via-neutral-950 to-neutral-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-red-500/20 bg-red-950/30 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Emergency Health Card
              </h1>
              <p className="text-sm text-red-300/70">
                Generate a printable emergency health card with your vital info
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4"
        >
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
          <p className="text-sm text-green-300/80">
            <span className="font-semibold text-green-300">Your data stays on your device.</span>{" "}
            Nothing is uploaded. All information is stored locally in your browser and never sent to any server.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8 print:hidden"
        >
          {/* Personal Info */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <User className="h-5 w-5 text-red-400" />
              Personal Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-neutral-400">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-400">
                  Age <span className="text-red-400">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Age"
                  min={0}
                  max={150}
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-400">
                Blood Group <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => updateField("bloodGroup", bg)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-semibold transition-all",
                      form.bloodGroup === bg
                        ? "border-red-500 bg-red-500/20 text-red-300"
                        : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
                    )}
                  >
                    <Droplets className="mr-1 inline h-3.5 w-3.5" />
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Medical Info */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Heart className="h-5 w-5 text-red-400" />
              Medical Information
            </h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-400">
                Allergies <span className="text-xs text-neutral-500">(comma-separated)</span>
              </label>
              <Input
                placeholder="e.g. Penicillin, Peanuts, Latex"
                value={form.allergies}
                onChange={(e) => updateField("allergies", e.target.value)}
                className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-400">
                Current Medications <span className="text-xs text-neutral-500">(comma-separated)</span>
              </label>
              <Input
                placeholder="e.g. Metformin 500mg, Aspirin 75mg"
                value={form.medications}
                onChange={(e) => updateField("medications", e.target.value)}
                className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-400">
                Chronic Conditions
              </label>
              <div className="flex flex-wrap gap-2">
                {CHRONIC_CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => toggleCondition(condition)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm transition-all",
                      form.conditions.includes(condition)
                        ? condition === "None"
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : "border-amber-500 bg-amber-500/20 text-amber-300"
                        : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
                    )}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Phone className="h-5 w-5 text-red-400" />
              Emergency Contacts
            </h2>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Contact 1 <span className="text-red-400">*</span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Contact name"
                  value={form.emergencyContact1Name}
                  onChange={(e) => updateField("emergencyContact1Name", e.target.value)}
                  className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
                />
                <Input
                  placeholder="Phone number"
                  type="tel"
                  value={form.emergencyContact1Phone}
                  onChange={(e) => updateField("emergencyContact1Phone", e.target.value)}
                  className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
                />
              </div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Contact 2 <span className="text-neutral-600">(optional)</span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Contact name"
                  value={form.emergencyContact2Name}
                  onChange={(e) => updateField("emergencyContact2Name", e.target.value)}
                  className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
                />
                <Input
                  placeholder="Phone number"
                  type="tel"
                  value={form.emergencyContact2Phone}
                  onChange={(e) => updateField("emergencyContact2Phone", e.target.value)}
                  className="border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-600"
                />
              </div>
            </div>
          </section>

          {/* Generate Button */}
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              disabled={!canGenerate}
              onClick={handleGenerate}
              className={cn(
                "w-full py-6 text-base font-semibold transition-all",
                canGenerate
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-neutral-800 text-neutral-500"
              )}
            >
              <Cross className="mr-2 h-5 w-5" />
              Generate Emergency Card
            </Button>
          </motion.div>

          {!canGenerate && (
            <p className="text-center text-xs text-neutral-500">
              Please fill in all required fields (marked with <span className="text-red-400">*</span>) to generate your card.
            </p>
          )}
        </motion.div>

        {/* Generated Card */}
        {cardGenerated && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="mt-12"
          >
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <h2 className="text-lg font-semibold text-white">Your Emergency Card</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                >
                  <Printer className="mr-1.5 h-4 w-4" />
                  Print Card
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert(
                      "To save your card as an image:\n\n" +
                        "- On desktop: Right-click the card and use your screenshot tool\n" +
                        "- On Mac: Cmd + Shift + 4, then drag over the card\n" +
                        "- On Windows: Win + Shift + S, then drag over the card\n" +
                        "- On mobile: Take a screenshot of this page"
                    );
                  }}
                  className="border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                >
                  <Save className="mr-1.5 h-4 w-4" />
                  Save as Image
                </Button>
              </div>
            </div>

            {/* The Card */}
            <div
              className="mx-auto overflow-hidden rounded-2xl border-2 border-red-500/40 bg-white shadow-2xl shadow-red-500/10"
              style={{ maxWidth: "540px", aspectRatio: "85.6 / 54" }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-red-700 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    <Cross className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Emergency Health Card
                    </h3>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Heart className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-2.5 px-5 py-3">
                {/* Name / Age / Blood */}
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-bold text-neutral-900">
                      {form.fullName}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Age: <span className="font-semibold text-neutral-700">{form.age} yrs</span>
                    </p>
                  </div>
                  <div className="ml-3 flex flex-col items-center rounded-lg border-2 border-red-500 bg-red-50 px-3 py-1.5">
                    <Droplets className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-lg font-black leading-tight text-red-600">
                      {form.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* Allergies */}
                {form.allergies.trim() && (
                  <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                        Allergies
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-red-800">
                      {form.allergies
                        .split(",")
                        .map((a) => a.trim())
                        .filter(Boolean)
                        .join(" | ")}
                    </p>
                  </div>
                )}

                {/* Medications & Conditions Row */}
                <div className="grid grid-cols-2 gap-2">
                  {form.medications.trim() && (
                    <div className="rounded-lg bg-blue-50 px-3 py-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Medications
                      </p>
                      <div className="mt-0.5 flex flex-wrap gap-1">
                        {form.medications
                          .split(",")
                          .map((m) => m.trim())
                          .filter(Boolean)
                          .map((med, i) => (
                            <span
                              key={i}
                              className="inline-block rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-800"
                            >
                              {med}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                  {form.conditions.length > 0 &&
                    !form.conditions.every((c) => c === "None") && (
                      <div className="rounded-lg bg-amber-50 px-3 py-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                          Conditions
                        </p>
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {form.conditions
                            .filter((c) => c !== "None")
                            .map((cond, i) => (
                              <span
                                key={i}
                                className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800"
                              >
                                {cond}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Emergency Contacts */}
                <div className="space-y-1.5 rounded-lg bg-neutral-50 px-3 py-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    Emergency Contacts
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 shrink-0 text-red-500" />
                    <span className="text-xs font-semibold text-neutral-800">
                      {form.emergencyContact1Name}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      {form.emergencyContact1Phone}
                    </span>
                  </div>
                  {form.emergencyContact2Name.trim() && form.emergencyContact2Phone.trim() && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 shrink-0 text-red-500" />
                      <span className="text-xs font-semibold text-neutral-800">
                        {form.emergencyContact2Name}
                      </span>
                      <span className="text-xs font-bold text-red-600">
                        {form.emergencyContact2Phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-neutral-200 bg-neutral-50 px-5 py-1.5 text-center">
                <p className="text-[9px] text-neutral-400">
                  Generated by <span className="font-semibold text-red-400">NuradiHealth</span>
                </p>
              </div>
            </div>

            {/* Screenshot Tip */}
            <p className="mt-4 text-center text-xs text-neutral-500 print:hidden">
              Tip: Take a screenshot of the card above to save it to your device, or use the Print button to print a physical copy.
            </p>
          </motion.div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          [class*="rounded-2xl"][class*="border-red"] {
            visibility: visible !important;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          [class*="rounded-2xl"][class*="border-red"] * {
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
