// Pediatric medicine dosage calculator (common Indian OTC/Rx)
// All dosages per standard Indian pediatric guidelines. ALWAYS verify with pediatrician.

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  activeIngredient: string;
  syrupStrength: string; // e.g. "120mg/5ml"
  mgPerMl: number;
  mgPerKgPerDose: number;
  maxMgPerKgPerDay: number;
  dosesPerDay: number;
  notes: string;
}

export const MEDICINES: Medicine[] = [
  {
    id: "calpol",
    name: "Paracetamol",
    brand: "Calpol / Crocin / Dolo",
    activeIngredient: "Paracetamol",
    syrupStrength: "120mg per 5ml",
    mgPerMl: 24,
    mgPerKgPerDose: 15,
    maxMgPerKgPerDay: 60,
    dosesPerDay: 4,
    notes: "For fever > 100°F or pain. Gap: 4-6 hours.",
  },
  {
    id: "meftal-p",
    name: "Ibuprofen",
    brand: "Meftal-P / Ibugesic Plus",
    activeIngredient: "Ibuprofen",
    syrupStrength: "100mg per 5ml",
    mgPerMl: 20,
    mgPerKgPerDose: 10,
    maxMgPerKgPerDay: 30,
    dosesPerDay: 3,
    notes: "For fever + inflammation. Give after food. Gap: 6-8 hours.",
  },
  {
    id: "augmentin",
    name: "Amoxicillin + Clavulanate",
    brand: "Augmentin Duo",
    activeIngredient: "Amoxicillin",
    syrupStrength: "228.5mg per 5ml",
    mgPerMl: 45.7,
    mgPerKgPerDose: 15,
    maxMgPerKgPerDay: 45,
    dosesPerDay: 3,
    notes: "Antibiotic — ONLY if prescribed. Complete full course.",
  },
  {
    id: "azee",
    name: "Azithromycin",
    brand: "Azee / Zithromax",
    activeIngredient: "Azithromycin",
    syrupStrength: "200mg per 5ml",
    mgPerMl: 40,
    mgPerKgPerDose: 10,
    maxMgPerKgPerDay: 10,
    dosesPerDay: 1,
    notes: "Once daily × 3 days. Give 1 hour before or 2 hours after food.",
  },
  {
    id: "cetirizine",
    name: "Cetirizine",
    brand: "Alerid / Cetzine",
    activeIngredient: "Cetirizine",
    syrupStrength: "5mg per 5ml",
    mgPerMl: 1,
    mgPerKgPerDose: 0.25,
    maxMgPerKgPerDay: 0.5,
    dosesPerDay: 1,
    notes: "Antihistamine for allergies. May cause drowsiness.",
  },
  {
    id: "ondem",
    name: "Ondansetron",
    brand: "Ondem / Emeset",
    activeIngredient: "Ondansetron",
    syrupStrength: "2mg per 5ml",
    mgPerMl: 0.4,
    mgPerKgPerDose: 0.15,
    maxMgPerKgPerDay: 0.45,
    dosesPerDay: 3,
    notes: "For vomiting. Dissolve in water before giving.",
  },
];

export interface DosageResult {
  medicine: Medicine;
  doseMg: number;
  doseMl: number;
  maxDailyMg: number;
  totalDailyMl: number;
  scheduleHours: number;
  warning?: string;
}

export function calculateDosage(weightKg: number, medicine: Medicine): DosageResult {
  const doseMg = weightKg * medicine.mgPerKgPerDose;
  const doseMl = +(doseMg / medicine.mgPerMl).toFixed(1);
  const maxDailyMg = weightKg * medicine.maxMgPerKgPerDay;
  const totalDailyMl = +((medicine.mgPerKgPerDose * weightKg * medicine.dosesPerDay) / medicine.mgPerMl).toFixed(1);
  const scheduleHours = Math.floor(24 / medicine.dosesPerDay);

  let warning: string | undefined;
  if (weightKg < 5) warning = "Baby is too small. Consult pediatrician immediately for correct dosage.";
  else if (weightKg > 40) warning = "Child weight > 40kg — consider adult dosage, verify with doctor.";

  return {
    medicine,
    doseMg: Math.round(doseMg),
    doseMl,
    maxDailyMg: Math.round(maxDailyMg),
    totalDailyMl,
    scheduleHours,
    warning,
  };
}
