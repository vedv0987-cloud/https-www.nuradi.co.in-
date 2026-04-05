export type HelplineCategory =
  | "emergency"
  | "medical"
  | "mental-health"
  | "child-women"
  | "disease"
  | "blood"
  | "addiction";

export interface Helpline {
  name: string;
  number: string; // tel: link
  display: string; // human-readable
  hours: string; // "24/7" or "Mon-Fri 9AM-5PM"
  category: HelplineCategory;
  note?: string;
}

export const CATEGORY_LABELS: Record<HelplineCategory, { label: string; emoji: string; color: string }> = {
  emergency: { label: "General Emergency", emoji: "🚑", color: "#dc2626" },
  medical: { label: "Medical", emoji: "🏥", color: "#2563eb" },
  "mental-health": { label: "Mental Health", emoji: "🧠", color: "#7c3aed" },
  "child-women": { label: "Child & Women", emoji: "👩‍👧", color: "#db2777" },
  disease: { label: "Disease-Specific", emoji: "🦠", color: "#059669" },
  blood: { label: "Blood Donation", emoji: "🩸", color: "#b91c1c" },
  addiction: { label: "Drug & Addiction", emoji: "💊", color: "#ea580c" },
};

export const HELPLINES: Helpline[] = [
  // Emergency
  { name: "National Emergency", number: "112", display: "112", hours: "24/7", category: "emergency", note: "Police, Fire, Ambulance" },
  { name: "Ambulance", number: "108", display: "108", hours: "24/7", category: "emergency", note: "All states of India" },
  { name: "Government Ambulance", number: "102", display: "102", hours: "24/7", category: "emergency" },
  { name: "Disaster Management", number: "1078", display: "1078", hours: "24/7", category: "emergency" },
  { name: "Fire Brigade", number: "101", display: "101", hours: "24/7", category: "emergency" },
  { name: "Police", number: "100", display: "100", hours: "24/7", category: "emergency" },

  // Medical
  { name: "AIIMS Delhi", number: "01126588500", display: "011-2658-8500", hours: "24/7", category: "medical" },
  { name: "Health Helpline (Central)", number: "1075", display: "1075", hours: "24/7", category: "medical" },
  { name: "Blood Bank Directory", number: "1910", display: "1910", hours: "24/7", category: "medical" },
  { name: "Organ Donation (NOTTO)", number: "18001037100", display: "1800-103-7100", hours: "24/7", category: "medical" },
  { name: "Poison Information Centre", number: "18001221213", display: "1800-1221-213", hours: "24/7", category: "medical" },

  // Mental Health
  { name: "iCall (TISS Mumbai)", number: "9152987821", display: "9152-987-821", hours: "Mon-Sat 8AM-10PM", category: "mental-health" },
  { name: "Vandrevala Foundation", number: "18602662345", display: "1860-2662-345", hours: "24/7", category: "mental-health" },
  { name: "NIMHANS Helpline", number: "08046110007", display: "080-4611-0007", hours: "24/7", category: "mental-health" },
  { name: "Sneha (Chennai)", number: "04424640050", display: "044-2464-0050", hours: "24/7", category: "mental-health" },
  { name: "AASRA", number: "9820466726", display: "9820-466-726", hours: "24/7", category: "mental-health" },
  { name: "Connecting Trust (Bangalore)", number: "08025723456", display: "080-2572-3456", hours: "12PM-8PM", category: "mental-health" },
  { name: "Roshni (Hyderabad)", number: "04066202000", display: "040-6620-2000", hours: "11AM-9PM", category: "mental-health" },
  { name: "KIRAN Mental Health", number: "18005990019", display: "1800-599-0019", hours: "24/7", category: "mental-health", note: "Govt of India" },
  { name: "Jeevan Suicide Prevention", number: "09999666555", display: "9999-666-555", hours: "24/7", category: "mental-health" },

  // Child & Women
  { name: "Childline", number: "1098", display: "1098", hours: "24/7", category: "child-women", note: "Child protection & help" },
  { name: "Women Helpline (National)", number: "181", display: "181", hours: "24/7", category: "child-women" },
  { name: "National Commission for Women", number: "7827170170", display: "7827-170-170", hours: "9AM-5PM", category: "child-women" },
  { name: "Domestic Violence", number: "181", display: "181", hours: "24/7", category: "child-women" },
  { name: "Senior Citizen Helpline", number: "14567", display: "14567", hours: "24/7", category: "child-women" },
  { name: "POSH Helpline (Workplace)", number: "07827170170", display: "7827-170-170", hours: "9AM-5PM", category: "child-women" },

  // Disease
  { name: "TB Helpline", number: "18001166666", display: "1800-11-6666", hours: "24/7", category: "disease" },
  { name: "HIV/AIDS", number: "1097", display: "1097", hours: "24/7", category: "disease" },
  { name: "Cancer Helpline (AIIMS)", number: "01126589142", display: "011-2658-9142", hours: "Mon-Fri 9AM-5PM", category: "disease" },
  { name: "Diabetes Helpline", number: "18003451800", display: "1800-345-1800", hours: "9AM-9PM", category: "disease" },
  { name: "Covid-19 Helpline", number: "1075", display: "1075", hours: "24/7", category: "disease" },

  // Blood
  { name: "Indian Red Cross", number: "01123716441", display: "011-2371-6441", hours: "9AM-6PM", category: "blood" },
  { name: "Blood Connect", number: "01141053093", display: "011-4105-3093", hours: "24/7", category: "blood" },
  { name: "e-Rakt Kosh", number: "01123978046", display: "011-2397-8046", hours: "9AM-6PM", category: "blood", note: "Search blood banks at eraktkosh.in" },

  // Addiction
  { name: "NIMHANS De-addiction", number: "08026995000", display: "080-2699-5000", hours: "24/7", category: "addiction" },
  { name: "Drug Abuse Helpline", number: "18001100031", display: "1800-11-0031", hours: "24/7", category: "addiction" },
];
