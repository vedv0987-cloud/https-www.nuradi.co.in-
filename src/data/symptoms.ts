// Symptoms A-Z database with detailed causes, red-flags, tests, and specialists.
// Indian search-volume prioritized. Content reviewed against WHO/Mayo Clinic/NHS.

export type BodyArea =
  | "head"
  | "chest"
  | "abdomen"
  | "back"
  | "limbs"
  | "skin"
  | "general"
  | "genitourinary";

export type CauseSeverity = "serious" | "common" | "less-common";

export interface SymptomCause {
  severity: CauseSeverity;
  name: string;
  description: string;
}

export interface WhichDoctor {
  specialty: string;
  when: string;
}

export interface Symptom {
  slug: string;
  name: string;
  aliases: string[];
  bodyArea: BodyArea;
  shortDescription: string;
  fullDescription: string;
  emergencySigns: string[];
  causes: SymptomCause[];
  whichDoctor: WhichDoctor[];
  commonTests: string[];
  homeActions: string[];
  quickTip?: string;
  relatedToolSlugs: string[];
  relatedInfographicIds: number[];
  relatedArticleSlugs?: string[];
}

export const BODY_AREA_LABELS: Record<BodyArea, string> = {
  head: "Head & Neurological",
  chest: "Chest & Heart",
  abdomen: "Abdomen & Digestive",
  back: "Back & Spine",
  limbs: "Arms, Legs & Joints",
  skin: "Skin, Hair & Nails",
  general: "General / Whole Body",
  genitourinary: "Urinary & Reproductive",
};

export const SYMPTOMS: Symptom[] = [
  {
    slug: "chest-pain",
    name: "Chest Pain",
    aliases: ["seenay mein dard", "heart pain", "chest discomfort"],
    bodyArea: "chest",
    shortDescription: "Pain, pressure, or discomfort anywhere between your neck and upper abdomen.",
    fullDescription: "Chest pain can feel like crushing pressure, burning, squeezing, or sharp stabbing. It ranges from minor acidity to life-threatening heart attacks. Indians are 4x more likely than Western populations to experience heart attacks before age 50, which makes prompt evaluation of chest pain especially critical in India.",
    emergencySigns: [
      "Crushing pressure or squeezing pain lasting more than 15 minutes",
      "Pain spreading to left arm, jaw, back, or neck",
      "Chest pain with cold sweating, nausea, or vomiting",
      "Chest pain with shortness of breath",
      "Chest pain with fainting or severe weakness",
    ],
    causes: [
      { severity: "serious", name: "Heart Attack (Myocardial Infarction)", description: "A blocked coronary artery starves the heart muscle of oxygen. Classic signs: crushing pressure, sweating, pain radiating to left arm or jaw. Requires emergency hospital care within 90 minutes." },
      { severity: "serious", name: "Angina", description: "Narrowed heart arteries cause pain during physical exertion or emotional stress. Pain improves with rest or nitroglycerin. Warning sign that a heart attack may follow." },
      { severity: "serious", name: "Pulmonary Embolism", description: "A blood clot in the lungs causes sudden sharp chest pain with severe shortness of breath. Risk factors: long flights, recent surgery, birth control pills." },
      { severity: "serious", name: "Aortic Dissection", description: "A tear in the main artery causes sudden tearing pain in chest and back. Rare but deadly. Usually requires emergency surgery." },
      { severity: "common", name: "GERD / Acid Reflux", description: "Stomach acid backs up into the esophagus, causing burning pain behind the breastbone. Worse after spicy meals or lying down. Very common in Indians due to diet." },
      { severity: "common", name: "Muscle Strain / Costochondritis", description: "Inflammation of rib cartilage or pulled chest muscle after heavy lifting, coughing, or exercise. Pain worsens when pressing on the chest wall." },
      { severity: "common", name: "Anxiety / Panic Attack", description: "Chest tightness with rapid heartbeat, sweating, and fear of dying. Can mimic heart attack exactly. Often lasts 10-20 minutes and resolves." },
      { severity: "common", name: "Pleurisy", description: "Inflammation of the lung lining causes sharp pain that worsens with breathing, coughing, or movement. Often follows viral respiratory infection." },
      { severity: "less-common", name: "Shingles", description: "Reactivated chickenpox virus causes burning pain on one side of chest, followed by a rash a few days later." },
      { severity: "less-common", name: "Gallstones", description: "Pain in upper-right chest or abdomen after fatty meals. Can radiate to right shoulder." },
    ],
    whichDoctor: [
      { specialty: "Emergency (dial 108)", when: "Any emergency sign present, or pain is sudden and severe" },
      { specialty: "Cardiologist", when: "Pain triggered by exertion, or you have heart disease risk factors" },
      { specialty: "Gastroenterologist", when: "Burning pain linked to meals or acidity" },
      { specialty: "General Physician", when: "You're unsure or pain is mild and persistent" },
    ],
    commonTests: ["ECG", "Troponin blood test", "Chest X-Ray", "2D Echo", "CT Angiography", "Treadmill Test (TMT)"],
    homeActions: [
      "If any emergency sign: call 108 immediately, chew one 325mg aspirin if available",
      "If mild: sit down, loosen tight clothing, rest in a comfortable position",
      "Try an antacid (Gelusil, Digene) if it feels like acidity",
      "Note: timing, duration, what triggers it, what eases it — share with doctor",
      "Track BP, pulse, and breathing if you have a monitor",
    ],
    quickTip: "Keep one 325mg Aspirin/Ecosprin tablet at home. If someone has a suspected heart attack, give them one to chew (not swallow) while waiting for the ambulance.",
    relatedToolSlugs: ["heart-risk", "heart-rate-zones", "bmi"],
    relatedInfographicIds: [1, 2, 5],
    relatedArticleSlugs: ["heart-health-after-40"],
  },
  {
    slug: "headache",
    name: "Headache",
    aliases: ["sir dard", "head pain", "cephalgia"],
    bodyArea: "head",
    shortDescription: "Pain in the head or upper neck, ranging from dull ache to throbbing or sharp.",
    fullDescription: "Headaches are the most common neurological symptom worldwide. Most are harmless tension headaches or migraines, but a sudden severe headache can signal a serious condition like stroke or bleeding. Knowing which type you have helps you treat it correctly.",
    emergencySigns: [
      "Sudden severe 'thunderclap' headache unlike any before",
      "Headache with weakness on one side of the body",
      "Headache with slurred speech, confusion, or vision loss",
      "Headache after a head injury",
      "Headache with high fever and stiff neck",
    ],
    causes: [
      { severity: "serious", name: "Stroke", description: "Blood clot or bleeding in the brain causes sudden severe headache, often with one-sided weakness or speech problems. Golden hour: call 108 within 4.5 hours for best outcome." },
      { severity: "serious", name: "Brain Hemorrhage (SAH)", description: "A burst blood vessel causes the worst headache of your life within seconds. Often with vomiting and neck stiffness. Requires emergency CT scan." },
      { severity: "serious", name: "Meningitis", description: "Infection of brain's protective layers causes severe headache, high fever, stiff neck, and light sensitivity. Can be fatal without fast treatment." },
      { severity: "common", name: "Tension Headache", description: "Dull band-like pressure around the head from stress, poor posture, screen time, or dehydration. Most common type — affects 80% of people at some point." },
      { severity: "common", name: "Migraine", description: "Throbbing one-sided pain with nausea, light/sound sensitivity. Often preceded by aura (zigzag lines, numbness). Lasts 4-72 hours. Genetic, more common in women." },
      { severity: "common", name: "Sinus Headache", description: "Pressure behind forehead, cheeks, or eyes, worse when bending forward. Common during seasonal allergies or colds." },
      { severity: "common", name: "Dehydration", description: "Not drinking enough water causes dull constant headache with dry mouth and dark urine. Very common in Indian summers." },
      { severity: "less-common", name: "Cluster Headache", description: "Excruciating pain around one eye, often at night. Comes in 'clusters' for weeks, then disappears. Rare but intensely painful." },
      { severity: "less-common", name: "Medication Overuse Headache", description: "Taking pain-killers more than 3x per week actually causes rebound headaches. Ironically worsens the problem." },
      { severity: "less-common", name: "Brain Tumor", description: "Gradually worsening headaches over weeks, often worse in the morning, with vomiting or vision changes. Rare cause of headache." },
    ],
    whichDoctor: [
      { specialty: "Emergency (dial 108)", when: "Any emergency sign, especially thunderclap onset" },
      { specialty: "Neurologist", when: "Frequent migraines, unusual headaches, or neurological symptoms" },
      { specialty: "ENT Specialist", when: "Sinus pressure or pain worse when bending" },
      { specialty: "General Physician", when: "Occasional tension headaches" },
    ],
    commonTests: ["CT Scan Brain (if emergency)", "MRI Brain (for persistent cases)", "Blood pressure check", "Eye checkup", "Sinus X-Ray"],
    homeActions: [
      "Drink 2 glasses of water immediately — dehydration is a common cause",
      "Rest in a dark quiet room",
      "Try a cold pack on forehead or warm compress on neck",
      "Take paracetamol 500mg or ibuprofen 400mg (max 3x per week)",
      "Identify and avoid triggers: skipped meals, poor sleep, screen time, stress",
    ],
    quickTip: "Keep a headache diary for 2 weeks — note timing, triggers, what you ate, stress level. Pattern recognition is half the diagnosis.",
    relatedToolSlugs: ["sleep-score", "biological-age", "hydration"],
    relatedInfographicIds: [22, 80],
    relatedArticleSlugs: ["digital-age-mental-health"],
  },
  {
    slug: "fever",
    name: "Fever",
    aliases: ["bukhar", "pyrexia", "high temperature"],
    bodyArea: "general",
    shortDescription: "Body temperature above 100.4°F (38°C), usually with chills, body aches, or sweating.",
    fullDescription: "Fever is your immune system fighting infection — not a disease itself. A mild fever (99-100°F) helps kill germs. Fever becomes a concern when it's very high (>103°F), lasts more than 3 days, or affects a baby, elderly person, or someone with weak immunity.",
    emergencySigns: [
      "Fever above 104°F (40°C) in adults",
      "Fever in a baby under 3 months old (any fever is emergency)",
      "Fever with stiff neck and severe headache",
      "Fever with confusion, seizures, or unconsciousness",
      "Fever with rash that doesn't fade when pressed",
      "Fever with difficulty breathing or chest pain",
    ],
    causes: [
      { severity: "serious", name: "Dengue", description: "Mosquito-borne viral fever with severe body aches, retro-orbital pain (behind eyes), and rash. Platelet count drops. Critical phase: day 4-7. Common during monsoon in India." },
      { severity: "serious", name: "Malaria", description: "Cyclical high fever with chills and sweating, often every 48-72 hours. Falciparum malaria can be fatal. Confirm with blood smear or rapid test." },
      { severity: "serious", name: "Typhoid", description: "Step-ladder rising fever over a week with headache, weakness, and abdominal pain. From contaminated food/water. Needs antibiotics." },
      { severity: "serious", name: "Sepsis", description: "Body-wide infection response — fever with rapid heartbeat, confusion, low BP. Life-threatening, needs hospital care within an hour." },
      { severity: "common", name: "Viral Fever (Flu, COVID, Common Cold)", description: "Most common cause. Fever with cough, sore throat, body aches, runny nose. Usually resolves in 3-7 days with rest and hydration." },
      { severity: "common", name: "Urinary Tract Infection (UTI)", description: "Fever with burning urination, urgency, and lower abdominal pain. Common in women. Needs urine culture + antibiotics." },
      { severity: "common", name: "Gastroenteritis", description: "Fever with vomiting and diarrhea from contaminated food or water. Usually self-limiting in 2-3 days." },
      { severity: "common", name: "Bacterial Infection (Throat, Chest, Skin)", description: "Localized infection causing fever. Needs antibiotic based on source (strep throat, pneumonia, cellulitis)." },
      { severity: "less-common", name: "Tuberculosis", description: "Low-grade evening fever for weeks with night sweats, weight loss, persistent cough. Common in India. Needs sputum test + X-ray." },
      { severity: "less-common", name: "Autoimmune Disease (Lupus, RA)", description: "Recurrent unexplained fever with joint pain, rash, or fatigue. Needs specialist workup." },
    ],
    whichDoctor: [
      { specialty: "Emergency (dial 108)", when: "Any emergency sign, or fever in baby under 3 months" },
      { specialty: "General Physician", when: "Most fevers — they'll refer if complex" },
      { specialty: "Infectious Disease Specialist", when: "Prolonged unexplained fever (>2 weeks)" },
      { specialty: "Pediatrician", when: "Any fever in children" },
    ],
    commonTests: ["CBC (Complete Blood Count)", "Malaria rapid test", "Dengue NS1/IgM", "Typhoid Widal test", "Urine Routine", "Blood culture", "Chest X-ray"],
    homeActions: [
      "Drink plenty of fluids — water, ORS, coconut water, soups (3+ liters/day)",
      "Take paracetamol (Dolo 650/Crocin) 4-6 hourly, max 4 doses/day in adults",
      "Rest completely — your body is fighting infection",
      "Apply cool damp cloth on forehead and neck if very high fever",
      "Wear light cotton clothes, don't over-bundle",
      "Eat light: khichdi, dal-chawal, fruits, curd",
    ],
    quickTip: "During monsoon, if fever lasts >2 days in India, always get CBC + dengue/malaria test — don't wait.",
    relatedToolSlugs: ["kids-dosage", "hydration"],
    relatedInfographicIds: [15, 19, 20, 57, 67, 68],
    relatedArticleSlugs: ["natural-immunity-boosters"],
  },
];
