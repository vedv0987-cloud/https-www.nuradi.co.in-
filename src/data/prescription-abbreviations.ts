// 100+ medical prescription abbreviations with Hindi translations

export type AbbrCategory = "frequency" | "timing" | "route" | "form" | "medical" | "misc";

export interface Abbreviation {
  abbr: string;
  full: string;
  meaning: string;
  hindi: string;
  category: AbbrCategory;
  example?: string;
}

export const CATEGORY_LABELS: Record<AbbrCategory, string> = {
  frequency: "Dosage Frequency",
  timing: "Timing",
  route: "Route",
  form: "Dosage Form",
  medical: "Medical Shortforms",
  misc: "Miscellaneous",
};

export const ABBREVIATIONS: Abbreviation[] = [
  // Frequency
  { abbr: "OD", full: "Once Daily", meaning: "Take once a day", hindi: "दिन में एक बार", category: "frequency" },
  { abbr: "BD", full: "Bis in Die", meaning: "Twice a day", hindi: "दिन में दो बार", category: "frequency" },
  { abbr: "BID", full: "Bis in Die", meaning: "Twice a day", hindi: "दिन में दो बार", category: "frequency" },
  { abbr: "TDS", full: "Ter die sumendum", meaning: "Three times a day", hindi: "दिन में तीन बार", category: "frequency" },
  { abbr: "TID", full: "Ter in Die", meaning: "Three times a day", hindi: "दिन में तीन बार", category: "frequency" },
  { abbr: "QID", full: "Quater in Die", meaning: "Four times a day", hindi: "दिन में चार बार", category: "frequency" },
  { abbr: "QDS", full: "Quater die sumendum", meaning: "Four times a day", hindi: "दिन में चार बार", category: "frequency" },
  { abbr: "QHS", full: "Quaque Hora Somni", meaning: "Every night at bedtime", hindi: "हर रात सोते समय", category: "frequency" },
  { abbr: "HS", full: "Hora Somni", meaning: "At bedtime", hindi: "सोते समय", category: "frequency" },
  { abbr: "SOS", full: "Si Opus Sit", meaning: "Only when needed", hindi: "जरूरत पड़ने पर ही", category: "frequency" },
  { abbr: "PRN", full: "Pro Re Nata", meaning: "As required", hindi: "आवश्यकतानुसार", category: "frequency" },
  { abbr: "STAT", full: "Statim", meaning: "Immediately / Now", hindi: "तुरंत", category: "frequency" },
  { abbr: "Q4H", full: "Every 4 Hours", meaning: "Every 4 hours", hindi: "हर 4 घंटे में", category: "frequency" },
  { abbr: "Q6H", full: "Every 6 Hours", meaning: "Every 6 hours", hindi: "हर 6 घंटे में", category: "frequency" },
  { abbr: "Q8H", full: "Every 8 Hours", meaning: "Every 8 hours", hindi: "हर 8 घंटे में", category: "frequency" },
  { abbr: "Q12H", full: "Every 12 Hours", meaning: "Every 12 hours", hindi: "हर 12 घंटे में", category: "frequency" },
  { abbr: "EOD", full: "Every Other Day", meaning: "Alternate days", hindi: "एक दिन छोड़कर", category: "frequency" },
  { abbr: "QD", full: "Quaque Die", meaning: "Every day", hindi: "हर दिन", category: "frequency" },

  // Timing
  { abbr: "AC", full: "Ante Cibum", meaning: "Before food", hindi: "खाने से पहले", category: "timing" },
  { abbr: "PC", full: "Post Cibum", meaning: "After food", hindi: "खाने के बाद", category: "timing" },
  { abbr: "CC", full: "Cum Cibo", meaning: "With food", hindi: "खाने के साथ", category: "timing" },
  { abbr: "BBF", full: "Before Breakfast", meaning: "Before breakfast", hindi: "नाश्ते से पहले", category: "timing" },
  { abbr: "ABF", full: "After Breakfast", meaning: "After breakfast", hindi: "नाश्ते के बाद", category: "timing" },
  { abbr: "AM", full: "Ante Meridiem", meaning: "Morning", hindi: "सुबह", category: "timing" },
  { abbr: "PM", full: "Post Meridiem", meaning: "Evening", hindi: "शाम", category: "timing" },
  { abbr: "ES", full: "Empty Stomach", meaning: "On empty stomach", hindi: "खाली पेट", category: "timing" },

  // Route
  { abbr: "PO", full: "Per Os", meaning: "By mouth (oral)", hindi: "मुँह से", category: "route" },
  { abbr: "IV", full: "Intravenous", meaning: "Into a vein", hindi: "नस में", category: "route" },
  { abbr: "IM", full: "Intramuscular", meaning: "Into muscle", hindi: "मांसपेशी में", category: "route" },
  { abbr: "SC", full: "Subcutaneous", meaning: "Under the skin", hindi: "त्वचा के नीचे", category: "route" },
  { abbr: "SQ", full: "Subcutaneous", meaning: "Under the skin", hindi: "त्वचा के नीचे", category: "route" },
  { abbr: "SL", full: "Sublingual", meaning: "Under the tongue", hindi: "जीभ के नीचे", category: "route" },
  { abbr: "INH", full: "Inhalation", meaning: "Breathe in", hindi: "साँस से", category: "route" },
  { abbr: "TOP", full: "Topical", meaning: "Apply on skin", hindi: "त्वचा पर लगाना", category: "route" },
  { abbr: "PR", full: "Per Rectum", meaning: "Via rectum", hindi: "गुदा मार्ग से", category: "route" },
  { abbr: "OD (eye)", full: "Oculus Dexter", meaning: "Right eye", hindi: "दाहिनी आँख", category: "route" },
  { abbr: "OS (eye)", full: "Oculus Sinister", meaning: "Left eye", hindi: "बाईं आँख", category: "route" },
  { abbr: "OU (eye)", full: "Oculus Uterque", meaning: "Both eyes", hindi: "दोनों आँखें", category: "route" },
  { abbr: "PV", full: "Per Vagina", meaning: "Via vagina", hindi: "योनि मार्ग से", category: "route" },

  // Form
  { abbr: "TAB", full: "Tablet", meaning: "Tablet", hindi: "गोली", category: "form" },
  { abbr: "CAP", full: "Capsule", meaning: "Capsule", hindi: "कैप्सूल", category: "form" },
  { abbr: "SYR", full: "Syrup", meaning: "Liquid syrup", hindi: "सिरप", category: "form" },
  { abbr: "INJ", full: "Injection", meaning: "Injection", hindi: "इंजेक्शन", category: "form" },
  { abbr: "GTT", full: "Guttae", meaning: "Drops", hindi: "बूँदें", category: "form" },
  { abbr: "OINT", full: "Ointment", meaning: "Skin ointment", hindi: "मलहम", category: "form" },
  { abbr: "SUPP", full: "Suppository", meaning: "Suppository", hindi: "सपोसिटरी", category: "form" },
  { abbr: "NEB", full: "Nebulization", meaning: "Nebulizer dose", hindi: "नेबुलाइज़र से", category: "form" },
  { abbr: "LOT", full: "Lotion", meaning: "Lotion", hindi: "लोशन", category: "form" },
  { abbr: "SUSP", full: "Suspension", meaning: "Liquid suspension", hindi: "सस्पेंशन", category: "form" },
  { abbr: "mg", full: "Milligrams", meaning: "Milligrams", hindi: "मिलीग्राम", category: "form" },
  { abbr: "g", full: "Grams", meaning: "Grams", hindi: "ग्राम", category: "form" },
  { abbr: "mcg", full: "Micrograms", meaning: "Micrograms", hindi: "माइक्रोग्राम", category: "form" },
  { abbr: "ml", full: "Milliliters", meaning: "Milliliters", hindi: "मिलीलीटर", category: "form" },
  { abbr: "IU", full: "International Units", meaning: "International units", hindi: "अंतरराष्ट्रीय इकाई", category: "form" },

  // Medical
  { abbr: "Rx", full: "Recipe", meaning: "Prescription", hindi: "दवा का पर्चा", category: "medical" },
  { abbr: "Dx", full: "Diagnosis", meaning: "Diagnosis", hindi: "रोग निदान", category: "medical" },
  { abbr: "Hx", full: "History", meaning: "Medical history", hindi: "इतिहास", category: "medical" },
  { abbr: "Tx", full: "Treatment", meaning: "Treatment plan", hindi: "उपचार", category: "medical" },
  { abbr: "Sx", full: "Symptoms", meaning: "Symptoms", hindi: "लक्षण", category: "medical" },
  { abbr: "Fx", full: "Fracture", meaning: "Bone fracture", hindi: "हड्डी टूटना", category: "medical" },
  { abbr: "SOB", full: "Shortness of Breath", meaning: "Breathlessness", hindi: "साँस फूलना", category: "medical" },
  { abbr: "BP", full: "Blood Pressure", meaning: "Blood pressure", hindi: "रक्तचाप", category: "medical" },
  { abbr: "HR", full: "Heart Rate", meaning: "Heart rate", hindi: "हृदय गति", category: "medical" },
  { abbr: "RR", full: "Respiratory Rate", meaning: "Breathing rate", hindi: "श्वसन दर", category: "medical" },
  { abbr: "T", full: "Temperature", meaning: "Body temperature", hindi: "तापमान", category: "medical" },
  { abbr: "Wt", full: "Weight", meaning: "Weight", hindi: "वज़न", category: "medical" },
  { abbr: "Ht", full: "Height", meaning: "Height", hindi: "ऊँचाई", category: "medical" },
  { abbr: "N/V", full: "Nausea / Vomiting", meaning: "Nausea and vomiting", hindi: "जी मिचलाना, उल्टी", category: "medical" },
  { abbr: "c/o", full: "Complains Of", meaning: "Complaining of", hindi: "शिकायत", category: "medical" },
  { abbr: "s/p", full: "Status Post", meaning: "After event", hindi: "बाद की स्थिति", category: "medical" },
  { abbr: "w/o", full: "Without", meaning: "Without", hindi: "बिना", category: "medical" },
  { abbr: "R/O", full: "Rule Out", meaning: "Rule out", hindi: "संभावना जांचें", category: "medical" },
  { abbr: "F/U", full: "Follow Up", meaning: "Follow-up visit", hindi: "अगली मुलाकात", category: "medical" },
  { abbr: "D/C", full: "Discharge / Discontinue", meaning: "Discharge or stop", hindi: "छुट्टी / बंद करें", category: "medical" },
  { abbr: "NKA", full: "No Known Allergies", meaning: "No known allergies", hindi: "कोई ज्ञात एलर्जी नहीं", category: "medical" },
  { abbr: "NKDA", full: "No Known Drug Allergies", meaning: "No known drug allergies", hindi: "किसी दवा से एलर्जी नहीं", category: "medical" },
  { abbr: "Hb", full: "Hemoglobin", meaning: "Hemoglobin level", hindi: "हीमोग्लोबिन", category: "medical" },
  { abbr: "RBS", full: "Random Blood Sugar", meaning: "Random blood sugar", hindi: "रैंडम ब्लड शुगर", category: "medical" },
  { abbr: "FBS", full: "Fasting Blood Sugar", meaning: "Fasting blood sugar", hindi: "खाली पेट शुगर", category: "medical" },
  { abbr: "PPBS", full: "Post Prandial Blood Sugar", meaning: "After-meal sugar", hindi: "खाने के बाद शुगर", category: "medical" },
  { abbr: "TSH", full: "Thyroid Stimulating Hormone", meaning: "Thyroid test", hindi: "थायरॉइड हार्मोन", category: "medical" },
  { abbr: "WBC", full: "White Blood Cells", meaning: "White blood cells", hindi: "श्वेत रक्त कोशिकाएँ", category: "medical" },
  { abbr: "RBC", full: "Red Blood Cells", meaning: "Red blood cells", hindi: "लाल रक्त कोशिकाएँ", category: "medical" },
  { abbr: "CBC", full: "Complete Blood Count", meaning: "Full blood test", hindi: "पूर्ण रक्त जांच", category: "medical" },
  { abbr: "ECG", full: "Electrocardiogram", meaning: "Heart test", hindi: "हृदय की जांच", category: "medical" },
  { abbr: "CT", full: "Computed Tomography", meaning: "CT scan", hindi: "सीटी स्कैन", category: "medical" },
  { abbr: "MRI", full: "Magnetic Resonance Imaging", meaning: "MRI scan", hindi: "एमआरआई", category: "medical" },
  { abbr: "USG", full: "Ultrasonography", meaning: "Ultrasound", hindi: "अल्ट्रासाउंड", category: "medical" },
  { abbr: "OPD", full: "Outpatient Department", meaning: "OPD visit", hindi: "बाह्य रोगी विभाग", category: "medical" },
  { abbr: "IPD", full: "Inpatient Department", meaning: "Hospital admission", hindi: "अंतः रोगी विभाग", category: "medical" },
  { abbr: "ICU", full: "Intensive Care Unit", meaning: "ICU", hindi: "गहन चिकित्सा कक्ष", category: "medical" },
  { abbr: "ER", full: "Emergency Room", meaning: "Emergency room", hindi: "आपातकालीन कक्ष", category: "medical" },
  { abbr: "LMP", full: "Last Menstrual Period", meaning: "Last period date", hindi: "अंतिम मासिक धर्म", category: "medical" },
  { abbr: "EDD", full: "Expected Date of Delivery", meaning: "Due date", hindi: "प्रसव की तारीख", category: "medical" },
  { abbr: "G", full: "Gravida", meaning: "Number of pregnancies", hindi: "गर्भधारण संख्या", category: "medical" },
  { abbr: "P", full: "Para", meaning: "Number of births", hindi: "प्रसव संख्या", category: "medical" },
  { abbr: "BMI", full: "Body Mass Index", meaning: "Body mass index", hindi: "बॉडी मास इंडेक्स", category: "medical" },

  // Misc
  { abbr: "qs", full: "Quantum Sufficit", meaning: "As much as needed", hindi: "आवश्यकतानुसार मात्रा", category: "misc" },
  { abbr: "aa", full: "Ana", meaning: "Of each", hindi: "प्रत्येक का", category: "misc" },
  { abbr: "ad lib", full: "Ad Libitum", meaning: "As desired", hindi: "इच्छानुसार", category: "misc" },
  { abbr: "sig", full: "Signa", meaning: "Label / write", hindi: "लेबल / निर्देश", category: "misc" },
  { abbr: "disp", full: "Dispense", meaning: "Give / provide", hindi: "वितरण", category: "misc" },
];
