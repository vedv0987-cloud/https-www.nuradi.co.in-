"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import {
  Syringe,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Baby,
  User,
  Shield,
} from "lucide-react";

interface Vaccine {
  name: string;
  doses: string[];
  ageGroups: string[];
  disease: string;
  mandatory: boolean;
}

interface AgeGroup {
  label: string;
  ageDays: number; // approximate age in days for comparison
  vaccines: Vaccine[];
}

const childSchedule: AgeGroup[] = [
  {
    label: "Birth",
    ageDays: 0,
    vaccines: [
      { name: "BCG", doses: ["1"], ageGroups: ["Birth"], disease: "Tuberculosis", mandatory: true },
      { name: "OPV-0", doses: ["0"], ageGroups: ["Birth"], disease: "Poliomyelitis", mandatory: true },
      { name: "Hepatitis B-1", doses: ["1"], ageGroups: ["Birth"], disease: "Hepatitis B", mandatory: true },
    ],
  },
  {
    label: "6 Weeks",
    ageDays: 42,
    vaccines: [
      { name: "DTwP/DTaP-1", doses: ["1"], ageGroups: ["6 weeks"], disease: "Diphtheria, Tetanus, Pertussis", mandatory: true },
      { name: "IPV-1", doses: ["1"], ageGroups: ["6 weeks"], disease: "Poliomyelitis", mandatory: true },
      { name: "Hepatitis B-2", doses: ["2"], ageGroups: ["6 weeks"], disease: "Hepatitis B", mandatory: true },
      { name: "Hib-1", doses: ["1"], ageGroups: ["6 weeks"], disease: "Haemophilus influenzae type b", mandatory: true },
      { name: "Rotavirus-1", doses: ["1"], ageGroups: ["6 weeks"], disease: "Rotavirus gastroenteritis", mandatory: true },
      { name: "PCV-1", doses: ["1"], ageGroups: ["6 weeks"], disease: "Pneumococcal disease", mandatory: true },
    ],
  },
  {
    label: "10 Weeks",
    ageDays: 70,
    vaccines: [
      { name: "DTwP/DTaP-2", doses: ["2"], ageGroups: ["10 weeks"], disease: "Diphtheria, Tetanus, Pertussis", mandatory: true },
      { name: "IPV-2", doses: ["2"], ageGroups: ["10 weeks"], disease: "Poliomyelitis", mandatory: true },
      { name: "Hib-2", doses: ["2"], ageGroups: ["10 weeks"], disease: "Haemophilus influenzae type b", mandatory: true },
      { name: "Rotavirus-2", doses: ["2"], ageGroups: ["10 weeks"], disease: "Rotavirus gastroenteritis", mandatory: true },
      { name: "PCV-2", doses: ["2"], ageGroups: ["10 weeks"], disease: "Pneumococcal disease", mandatory: true },
    ],
  },
  {
    label: "14 Weeks",
    ageDays: 98,
    vaccines: [
      { name: "DTwP/DTaP-3", doses: ["3"], ageGroups: ["14 weeks"], disease: "Diphtheria, Tetanus, Pertussis", mandatory: true },
      { name: "IPV-3", doses: ["3"], ageGroups: ["14 weeks"], disease: "Poliomyelitis", mandatory: true },
      { name: "Hepatitis B-3", doses: ["3"], ageGroups: ["14 weeks"], disease: "Hepatitis B", mandatory: true },
      { name: "Hib-3", doses: ["3"], ageGroups: ["14 weeks"], disease: "Haemophilus influenzae type b", mandatory: true },
      { name: "Rotavirus-3", doses: ["3"], ageGroups: ["14 weeks"], disease: "Rotavirus gastroenteritis", mandatory: true },
      { name: "PCV-3", doses: ["3"], ageGroups: ["14 weeks"], disease: "Pneumococcal disease", mandatory: true },
    ],
  },
  {
    label: "6 Months",
    ageDays: 183,
    vaccines: [
      { name: "OPV-1", doses: ["1"], ageGroups: ["6 months"], disease: "Poliomyelitis", mandatory: true },
      { name: "Influenza-1", doses: ["1"], ageGroups: ["6 months"], disease: "Influenza", mandatory: false },
    ],
  },
  {
    label: "9 Months",
    ageDays: 274,
    vaccines: [
      { name: "MMR-1", doses: ["1"], ageGroups: ["9 months"], disease: "Measles, Mumps, Rubella", mandatory: true },
      { name: "Typhoid Conjugate", doses: ["1"], ageGroups: ["9 months"], disease: "Typhoid fever", mandatory: true },
    ],
  },
  {
    label: "12 Months",
    ageDays: 365,
    vaccines: [
      { name: "Hepatitis A-1", doses: ["1"], ageGroups: ["12 months"], disease: "Hepatitis A", mandatory: true },
      { name: "PCV Booster", doses: ["Booster"], ageGroups: ["12 months"], disease: "Pneumococcal disease", mandatory: true },
    ],
  },
  {
    label: "15 Months",
    ageDays: 456,
    vaccines: [
      { name: "MMR-2", doses: ["2"], ageGroups: ["15 months"], disease: "Measles, Mumps, Rubella", mandatory: true },
      { name: "Varicella-1", doses: ["1"], ageGroups: ["15 months"], disease: "Chickenpox", mandatory: true },
    ],
  },
  {
    label: "16-18 Months",
    ageDays: 518,
    vaccines: [
      { name: "DTwP/DTaP Booster-1", doses: ["Booster 1"], ageGroups: ["16-18 months"], disease: "Diphtheria, Tetanus, Pertussis", mandatory: true },
      { name: "IPV Booster", doses: ["Booster"], ageGroups: ["16-18 months"], disease: "Poliomyelitis", mandatory: true },
      { name: "Hib Booster", doses: ["Booster"], ageGroups: ["16-18 months"], disease: "Haemophilus influenzae type b", mandatory: true },
    ],
  },
  {
    label: "2 Years",
    ageDays: 730,
    vaccines: [
      { name: "Typhoid Booster", doses: ["Booster"], ageGroups: ["2 years"], disease: "Typhoid fever", mandatory: true },
    ],
  },
  {
    label: "4-6 Years",
    ageDays: 1825,
    vaccines: [
      { name: "DTwP/DTaP Booster-2", doses: ["Booster 2"], ageGroups: ["4-6 years"], disease: "Diphtheria, Tetanus, Pertussis", mandatory: true },
      { name: "OPV-3", doses: ["3"], ageGroups: ["4-6 years"], disease: "Poliomyelitis", mandatory: true },
      { name: "MMR-3", doses: ["3"], ageGroups: ["4-6 years"], disease: "Measles, Mumps, Rubella", mandatory: false },
      { name: "Varicella-2", doses: ["2"], ageGroups: ["4-6 years"], disease: "Chickenpox", mandatory: true },
    ],
  },
  {
    label: "10-12 Years",
    ageDays: 4015,
    vaccines: [
      { name: "Tdap", doses: ["1"], ageGroups: ["10-12 years"], disease: "Tetanus, Diphtheria, Pertussis", mandatory: true },
      { name: "HPV (Girls)", doses: ["1", "2"], ageGroups: ["10-12 years"], disease: "Human Papillomavirus / Cervical cancer", mandatory: false },
    ],
  },
];

const adultVaccines: Vaccine[] = [
  { name: "Influenza (Flu)", doses: ["Yearly"], ageGroups: ["Every year"], disease: "Influenza", mandatory: false },
  { name: "Tdap / Td", doses: ["Every 10 years"], ageGroups: ["All adults"], disease: "Tetanus, Diphtheria, Pertussis", mandatory: true },
  { name: "Pneumococcal (PCV15/PPSV23)", doses: ["1-2"], ageGroups: ["65+ years or high-risk"], disease: "Pneumococcal disease", mandatory: false },
  { name: "Shingles (Zoster)", doses: ["2"], ageGroups: ["50+ years"], disease: "Herpes Zoster (Shingles)", mandatory: false },
  { name: "COVID-19", doses: ["Primary + Boosters"], ageGroups: ["18+ years"], disease: "COVID-19", mandatory: false },
];

function getVaccineStatus(
  ageDays: number,
  childAgeDays: number | null
): "due" | "overdue" | "upcoming" | "none" {
  if (childAgeDays === null) return "none";
  const graceDays = 30;
  if (childAgeDays >= ageDays + graceDays) return "overdue";
  if (childAgeDays >= ageDays - 7 && childAgeDays < ageDays + graceDays) return "due";
  if (childAgeDays < ageDays) return "upcoming";
  return "none";
}

export default function VaccinationPage() {
  const [activeTab, setActiveTab] = useState<"children" | "adults">("children");
  const [birthDate, setBirthDate] = useState("");

  const childAgeDays = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth > today) return null;
    const diff = today.getTime() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [birthDate]);

  const childAgeLabel = useMemo(() => {
    if (childAgeDays === null) return null;
    const years = Math.floor(childAgeDays / 365);
    const months = Math.floor((childAgeDays % 365) / 30);
    const days = childAgeDays % 30;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0 && years === 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
    return parts.join(", ") || "Newborn";
  }, [childAgeDays]);

  return (
    <div className="min-h-screen bg-white text-black print:bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <Syringe className="h-8 w-8" />
            Indian Vaccination Schedule 💉
          </h1>
          <p className="mt-2 text-gray-600">
            IAP 2024 Recommended Immunization Schedule
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex justify-center gap-2 print:hidden">
          <Button
            variant={activeTab === "children" ? "default" : "outline"}
            onClick={() => setActiveTab("children")}
            className={cn(
              "gap-2",
              activeTab === "children"
                ? "bg-black text-white hover:bg-gray-800"
                : "border-black text-black hover:bg-gray-100"
            )}
          >
            <Baby className="h-4 w-4" />
            Children (0-12 years)
          </Button>
          <Button
            variant={activeTab === "adults" ? "default" : "outline"}
            onClick={() => setActiveTab("adults")}
            className={cn(
              "gap-2",
              activeTab === "adults"
                ? "bg-black text-white hover:bg-gray-800"
                : "border-black text-black hover:bg-gray-100"
            )}
          >
            <User className="h-4 w-4" />
            Adults
          </Button>
        </div>

        {/* Children Tab */}
        {activeTab === "children" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Age Calculator */}
            <div className="mb-8 rounded-lg border-2 border-black p-4 print:hidden">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Age Calculator</h2>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Enter your child&apos;s birth date to see which vaccines are due, overdue, or upcoming.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="max-w-xs border-black"
                  max={new Date().toISOString().split("T")[0]}
                />
                {childAgeLabel && (
                  <span className="text-sm font-medium text-gray-700">
                    Child&apos;s age: <strong>{childAgeLabel}</strong>
                  </span>
                )}
                {birthDate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBirthDate("")}
                    className="border-black text-black hover:bg-gray-100 w-fit"
                  >
                    Clear
                  </Button>
                )}
              </div>
              {childAgeDays !== null && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-3 w-3 rounded-full bg-red-500" /> Overdue
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-3 w-3 rounded-full bg-blue-500" /> Due / Upcoming
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-500" /> Completed (past age)
                  </span>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black sm:left-6 print:left-4" />

              {childSchedule.map((group, idx) => {
                const status = getVaccineStatus(group.ageDays, childAgeDays);
                return (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="relative mb-6 pl-10 sm:pl-14 print:pl-10"
                  >
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-2.5 top-1 h-4 w-4 rounded-full border-2 border-black sm:left-4.5 print:left-2.5",
                        status === "overdue" && "bg-red-500 border-red-500",
                        status === "due" && "bg-blue-500 border-blue-500",
                        status === "upcoming" && "bg-blue-300 border-blue-400",
                        status === "none" && "bg-white"
                      )}
                    />

                    {/* Age Label */}
                    <h3
                      className={cn(
                        "mb-2 text-lg font-bold",
                        status === "overdue" && "text-red-600",
                        status === "due" && "text-blue-600"
                      )}
                    >
                      {group.label}
                      {status === "overdue" && (
                        <AlertTriangle className="ml-2 inline h-4 w-4 text-red-500" />
                      )}
                      {status === "due" && (
                        <Clock className="ml-2 inline h-4 w-4 text-blue-500" />
                      )}
                      {status === "upcoming" && (
                        <Clock className="ml-2 inline h-4 w-4 text-blue-400" />
                      )}
                    </h3>

                    {/* Vaccine Cards */}
                    <div className="grid gap-2 sm:grid-cols-2">
                      {group.vaccines.map((vaccine) => (
                        <div
                          key={vaccine.name}
                          className={cn(
                            "rounded-md border p-3 transition-colors",
                            status === "overdue" && "border-red-300 bg-red-50",
                            status === "due" && "border-blue-300 bg-blue-50",
                            status === "upcoming" && "border-blue-200 bg-blue-50/50",
                            status === "none" && "border-gray-300 bg-gray-50",
                            "print:border-gray-400 print:bg-white"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              {status === "overdue" ? (
                                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500 print:text-black" />
                              ) : status === "due" ? (
                                <Clock className="h-4 w-4 shrink-0 text-blue-500 print:text-black" />
                              ) : (
                                <Shield className="h-4 w-4 shrink-0 text-gray-500 print:text-black" />
                              )}
                              <span className="font-semibold text-sm">{vaccine.name}</span>
                            </div>
                            <Badge
                              variant={vaccine.mandatory ? "default" : "outline"}
                              className={cn(
                                "shrink-0 text-[10px] px-1.5 py-0",
                                vaccine.mandatory
                                  ? "bg-black text-white"
                                  : "border-gray-400 text-gray-600"
                              )}
                            >
                              {vaccine.mandatory ? "Mandatory" : "Optional"}
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs text-gray-600">
                            Prevents: {vaccine.disease}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Adults Tab */}
        {activeTab === "adults" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              <h2 className="text-xl font-bold">Adult Vaccination Schedule</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {adultVaccines.map((vaccine, idx) => (
                <motion.div
                  key={vaccine.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="rounded-lg border-2 border-black p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold flex items-center gap-2">
                      <Syringe className="h-4 w-4" />
                      {vaccine.name}
                    </h3>
                    <Badge
                      variant={vaccine.mandatory ? "default" : "outline"}
                      className={cn(
                        "shrink-0 text-[10px] px-1.5 py-0",
                        vaccine.mandatory
                          ? "bg-black text-white"
                          : "border-gray-400 text-gray-600"
                      )}
                    >
                      {vaccine.mandatory ? "Recommended" : "Optional"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Prevents:</strong> {vaccine.disease}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Doses:</strong> {vaccine.doses.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Who:</strong> {vaccine.ageGroups.join(", ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Print Button */}
        <div className="mt-8 flex justify-center print:hidden">
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="gap-2 border-black text-black hover:bg-gray-100"
          >
            <CheckCircle2 className="h-4 w-4" />
            Print Schedule
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
          <p>
            Based on Indian Academy of Pediatrics (IAP) 2024 Recommended
            Immunization Schedule. Consult your pediatrician for personalized
            advice.
          </p>
        </div>
      </div>
    </div>
  );
}
