"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Stethoscope,
  Activity,
  User,
  ClipboardList,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  BODY_REGIONS,
  SYMPTOM_MAPPINGS,
  EXISTING_CONDITIONS,
  DURATION_OPTIONS,
  type SpecialistResult,
} from "@/data/symptom-checker";

type Step = 1 | 2 | 3 | 4;

export default function SymptomCheckerPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState("1-3days");
  const [severity, setSeverity] = useState(1); // 0=mild, 1=moderate, 2=severe
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [conditions, setConditions] = useState<string[]>([]);
  const [onMedication, setOnMedication] = useState(false);
  const [viewSide, setViewSide] = useState<"front" | "back">("front");

  // Get symptoms for selected body regions
  const availableSymptoms = useMemo(() => {
    const symptoms = new Set<string>();
    selectedRegions.forEach((regionId) => {
      const region = BODY_REGIONS.find((r) => r.id === regionId);
      if (region) region.symptoms.forEach((s) => symptoms.add(s));
    });
    return Array.from(symptoms);
  }, [selectedRegions]);

  // Get specialist recommendation
  const result = useMemo((): SpecialistResult | null => {
    if (step !== 4) return null;

    let bestMatch: SpecialistResult | null = null;
    let bestScore = 0;

    for (const mapping of SYMPTOM_MAPPINGS) {
      const regionMatch = mapping.regions.filter((r) =>
        selectedRegions.includes(r)
      ).length;
      const symptomMatch = mapping.symptoms.filter((s) =>
        selectedSymptoms.includes(s)
      ).length;
      const score = regionMatch * 2 + symptomMatch * 3;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = { ...mapping.result };
      }
    }

    // Adjust urgency based on severity
    if (bestMatch && severity === 2) {
      bestMatch.urgency = "urgent";
    }

    return bestMatch;
  }, [step, selectedRegions, selectedSymptoms, severity]);

  const toggleRegion = (id: string) => {
    setSelectedRegions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const toggleCondition = (condition: string) => {
    if (condition === "None") {
      setConditions([]);
      return;
    }
    setConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev.filter((c) => c !== "None"), condition]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedRegions.length > 0;
      case 2:
        return selectedSymptoms.length > 0;
      case 3:
        return age !== "" && parseInt(age) > 0;
      default:
        return false;
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedRegions([]);
    setSelectedSymptoms([]);
    setDuration("1-3days");
    setSeverity(1);
    setAge("");
    setGender("male");
    setConditions([]);
    setOnMedication(false);
  };

  const frontRegions = BODY_REGIONS.filter(
    (r) =>
      ![
        "back-upper",
        "back-lower",
      ].includes(r.id)
  );
  const backRegions = BODY_REGIONS.filter((r) =>
    ["back-upper", "back-lower", "head", "arms", "legs", "skin"].includes(r.id)
  );

  const displayedRegions = viewSide === "front" ? frontRegions : backRegions;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-sky-950/20 dark:to-background">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-sm font-medium mb-4">
            <Stethoscope className="w-4 h-4" />
            DocPoint — Symptom Checker
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Find the Right Doctor
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tap where it hurts, describe your symptoms, and get matched with the
            right specialist.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { n: 1, icon: Activity, label: "Body Map" },
            { n: 2, icon: ClipboardList, label: "Symptoms" },
            { n: 3, icon: User, label: "About You" },
            { n: 4, icon: Stethoscope, label: "Result" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  step >= s.n
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.n ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>
              {i < 3 && (
                <div
                  className={cn(
                    "w-8 sm:w-16 h-0.5 rounded",
                    step > s.n ? "bg-sky-500" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        <AnimatePresence mode="wait">
          {/* ═══════ STEP 1: BODY MAP ═══════ */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-1">
                  Where do you feel the problem?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tap one or more body regions below
                </p>
              </div>

              {/* Front/Back toggle */}
              <div className="flex justify-center gap-2">
                <Button
                  variant={viewSide === "front" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewSide("front")}
                  className="rounded-full"
                >
                  Front View
                </Button>
                <Button
                  variant={viewSide === "back" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewSide("back")}
                  className="rounded-full"
                >
                  Back View
                </Button>
              </div>

              {/* Body region grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                {displayedRegions.map((region) => {
                  const isSelected = selectedRegions.includes(region.id);
                  return (
                    <button
                      key={region.id}
                      onClick={() => toggleRegion(region.id)}
                      className={cn(
                        "relative p-4 rounded-2xl border-2 transition-all text-center",
                        isSelected
                          ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-lg shadow-sky-500/10 scale-[1.02]"
                          : "border-muted bg-card hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-sky-900/10"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      )}
                      <span className="text-2xl block mb-1">
                        {region.id === "head" && "🧠"}
                        {region.id === "eyes" && "👁️"}
                        {region.id === "ears" && "👂"}
                        {region.id === "nose" && "👃"}
                        {region.id === "throat" && "🫁"}
                        {region.id === "chest" && "🫀"}
                        {region.id === "stomach" && "🤢"}
                        {region.id === "liver" && "🫘"}
                        {region.id === "kidneys" && "🫘"}
                        {region.id === "back-upper" && "🔙"}
                        {region.id === "back-lower" && "🔙"}
                        {region.id === "arms" && "💪"}
                        {region.id === "legs" && "🦵"}
                        {region.id === "skin" && "🖐️"}
                        {region.id === "joints" && "🦴"}
                        {region.id === "feet" && "🦶"}
                      </span>
                      <span className="text-xs font-medium">{region.name}</span>
                    </button>
                  );
                })}
              </div>

              {selectedRegions.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedRegions.map((id) => {
                    const region = BODY_REGIONS.find((r) => r.id === id);
                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                      >
                        {region?.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* ═══════ STEP 2: SYMPTOMS ═══════ */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-1">
                  What symptoms are you experiencing?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select all that apply
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center max-w-[1000px] mx-auto">
                {availableSymptoms.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                        isSelected
                          ? "bg-sky-500 text-white border-sky-500 shadow-md"
                          : "bg-card border-muted hover:border-sky-300 text-foreground"
                      )}
                    >
                      {symptom}
                    </button>
                  );
                })}
              </div>

              {/* Duration */}
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-2">
                    How long have you had these symptoms?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DURATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt.value)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                          duration === opt.value
                            ? "bg-sky-500 text-white border-sky-500"
                            : "bg-card border-muted text-foreground hover:border-sky-300"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity */}
                <div>
                  <label className="text-sm font-semibold block mb-2">
                    Severity
                  </label>
                  <div className="flex gap-3">
                    {["Mild", "Moderate", "Severe"].map((label, i) => (
                      <button
                        key={label}
                        onClick={() => setSeverity(i)}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
                          severity === i
                            ? i === 0
                              ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : i === 1
                                ? "bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                                : "bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                            : "border-muted bg-card hover:border-muted-foreground/30"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════ STEP 3: ABOUT YOU ═══════ */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6 max-w-md mx-auto"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-1">Tell us about you</h2>
                <p className="text-sm text-muted-foreground">
                  This helps us give a better recommendation
                </p>
              </div>

              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className="text-sm font-semibold block mb-2">
                    Age
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-12 rounded-xl text-base"
                    min={1}
                    max={120}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-semibold block mb-2">
                    Gender
                  </label>
                  <div className="flex gap-3">
                    {(["male", "female", "other"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all capitalize",
                          gender === g
                            ? "bg-sky-50 border-sky-500 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400"
                            : "border-muted bg-card"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Existing conditions */}
                <div>
                  <label className="text-sm font-semibold block mb-2">
                    Any existing conditions?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EXISTING_CONDITIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleCondition(c)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                          conditions.includes(c)
                            ? "bg-sky-500 text-white border-sky-500"
                            : "bg-card border-muted text-foreground"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* On medication */}
                <div>
                  <label className="text-sm font-semibold block mb-2">
                    Currently on any medication?
                  </label>
                  <div className="flex gap-3">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setOnMedication(val)}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
                          onMedication === val
                            ? "bg-sky-50 border-sky-500 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400"
                            : "border-muted bg-card"
                        )}
                      >
                        {val ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════ STEP 4: RESULT ═══════ */}
          {step === 4 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 max-w-lg mx-auto"
            >
              {/* Result Card */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-card rounded-3xl border shadow-xl p-8 text-center"
              >
                <div className="text-5xl mb-4">{result.icon}</div>
                <p className="text-sm text-muted-foreground mb-1">
                  You should visit a
                </p>
                <h2 className="text-3xl font-extrabold text-sky-600 mb-4">
                  {result.specialist}
                </h2>

                {/* Urgency */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                    result.urgency === "routine"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : result.urgency === "soon"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {result.urgency === "routine" && (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  {result.urgency === "soon" && (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  {result.urgency === "urgent" && (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {result.urgency === "routine"
                    ? "Routine — Schedule at your convenience"
                    : result.urgency === "soon"
                      ? "Visit soon — Within a few days"
                      : "Urgent — See a doctor today"}
                </div>

                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {result.description}
                </p>
              </motion.div>

              {/* Common Conditions */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold text-sm mb-3">
                  Possible Conditions (not a diagnosis)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.commonConditions.map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Expected Tests */}
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold text-sm mb-3">
                  Tests the doctor may order
                </h3>
                <ul className="space-y-1.5">
                  {result.expectedTests.map((t) => (
                    <li
                      key={t}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  <strong>Disclaimer:</strong> This is not a medical diagnosis.
                  It is a general recommendation based on your symptoms. Always
                  consult a qualified healthcare professional for proper
                  diagnosis and treatment.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={reset}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
                <Link href="/channels" className="flex-1">
                  <Button className="w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600">
                    Find {result.specialist}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between items-center mt-8 max-w-md mx-auto">
            <Button
              variant="ghost"
              onClick={() => setStep((step - 1) as Step)}
              disabled={step === 1}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canProceed()}
              className="rounded-xl bg-sky-500 hover:bg-sky-600 px-8"
            >
              {step === 3 ? "Get Recommendation" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
