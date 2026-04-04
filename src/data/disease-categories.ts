export interface DiseaseCategory {
  id: string;
  label: string;
  color: string;
  bg: string;
  icon: string;
}

export const DISEASE_CATEGORIES: Record<string, DiseaseCategory> = {
  cardiovascular: { id: "cardiovascular", label: "Heart & Blood Vessels", color: "#E24B4A", bg: "#FCEBEB", icon: "Heart" },
  endocrine: { id: "endocrine", label: "Hormones & Metabolism", color: "#D4537E", bg: "#FBEAF0", icon: "Zap" },
  respiratory: { id: "respiratory", label: "Lungs & Breathing", color: "#378ADD", bg: "#E6F1FB", icon: "Wind" },
  digestive: { id: "digestive", label: "Stomach & Digestion", color: "#639922", bg: "#EAF3DE", icon: "Utensils" },
  neurological: { id: "neurological", label: "Brain & Nerves", color: "#BA7517", bg: "#FAEEDA", icon: "Brain" },
  "mental-health": { id: "mental-health", label: "Mental Health", color: "#7F77DD", bg: "#EEEDFE", icon: "Heart" },
  musculoskeletal: { id: "musculoskeletal", label: "Bones & Muscles", color: "#888780", bg: "#F1EFE8", icon: "Bone" },
  skin: { id: "skin", label: "Skin & Hair", color: "#D4537E", bg: "#FBEAF0", icon: "Fingerprint" },
  renal: { id: "renal", label: "Kidneys & Urinary", color: "#E24B4A", bg: "#FCEBEB", icon: "Droplet" },
  reproductive: { id: "reproductive", label: "Reproductive Health", color: "#D4537E", bg: "#FBEAF0", icon: "Baby" },
  immune: { id: "immune", label: "Immune System", color: "#1D9E75", bg: "#E1F5EE", icon: "Shield" },
  eye: { id: "eye", label: "Eyes & Vision", color: "#378ADD", bg: "#E6F1FB", icon: "Eye" },
  ear: { id: "ear", label: "Ears & Hearing", color: "#378ADD", bg: "#E6F1FB", icon: "Ear" },
  dental: { id: "dental", label: "Teeth & Mouth", color: "#888780", bg: "#F1EFE8", icon: "Smile" },
  nutritional: { id: "nutritional", label: "Nutrition & Deficiencies", color: "#639922", bg: "#EAF3DE", icon: "Apple" },
};
