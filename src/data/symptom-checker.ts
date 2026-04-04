// DocPoint Symptom Checker - Complete Symptom-to-Specialist Mapping Database

export interface BodyRegion {
  id: string;
  name: string;
  x: number;  // percentage position on body SVG (0-100)
  y: number;  // percentage position on body SVG (0-100)
  symptoms: string[];
}

export interface SpecialistResult {
  specialist: string;
  icon: string; // emoji
  description: string;
  commonConditions: string[];
  expectedTests: string[];
  urgency: "routine" | "soon" | "urgent";
}

export interface SymptomMapping {
  regions: string[];     // body region IDs
  symptoms: string[];    // symptom names
  result: SpecialistResult;
}

// ---------------------------------------------------------------------------
// Body Regions
// ---------------------------------------------------------------------------

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: "head",
    name: "Head",
    x: 50,
    y: 5,
    symptoms: [
      "Headache",
      "Dizziness",
      "Blurred Vision",
      "Memory Issues",
      "Fainting",
      "Hair Loss",
      "Scalp Pain",
    ],
  },
  {
    id: "eyes",
    name: "Eyes",
    x: 50,
    y: 8,
    symptoms: [
      "Blurred Vision",
      "Eye Pain",
      "Watery Eyes",
      "Redness",
      "Itching",
      "Double Vision",
    ],
  },
  {
    id: "ears",
    name: "Ears",
    x: 62,
    y: 7,
    symptoms: [
      "Hearing Loss",
      "Ear Pain",
      "Ringing/Tinnitus",
      "Discharge",
      "Dizziness",
    ],
  },
  {
    id: "nose",
    name: "Nose",
    x: 50,
    y: 10,
    symptoms: [
      "Congestion",
      "Sneezing",
      "Nosebleed",
      "Loss of Smell",
      "Sinus Pain",
    ],
  },
  {
    id: "throat",
    name: "Throat",
    x: 50,
    y: 15,
    symptoms: [
      "Sore Throat",
      "Difficulty Swallowing",
      "Hoarseness",
      "Thyroid Swelling",
      "Lump",
    ],
  },
  {
    id: "chest",
    name: "Chest",
    x: 50,
    y: 28,
    symptoms: [
      "Chest Pain",
      "Shortness of Breath",
      "Palpitations",
      "Cough",
      "Wheezing",
      "Chest Tightness",
      "Breast Lump",
    ],
  },
  {
    id: "stomach",
    name: "Stomach",
    x: 50,
    y: 40,
    symptoms: [
      "Acidity",
      "Bloating",
      "Abdominal Pain",
      "Vomiting",
      "Nausea",
      "Blood in Stool",
      "Constipation",
      "Diarrhea",
    ],
  },
  {
    id: "liver",
    name: "Liver",
    x: 40,
    y: 38,
    symptoms: [
      "Jaundice",
      "Fatigue",
      "Abdominal Swelling",
      "Dark Urine",
      "Loss of Appetite",
    ],
  },
  {
    id: "kidneys",
    name: "Kidneys",
    x: 55,
    y: 42,
    symptoms: [
      "Burning Urination",
      "Blood in Urine",
      "Lower Back Pain",
      "Frequent Urination",
      "Swelling",
    ],
  },
  {
    id: "back-upper",
    name: "Upper Back",
    x: 50,
    y: 25,
    symptoms: [
      "Stiffness",
      "Pain",
      "Muscle Spasm",
      "Numbness",
    ],
  },
  {
    id: "back-lower",
    name: "Lower Back",
    x: 50,
    y: 48,
    symptoms: [
      "Sciatica",
      "Numbness",
      "Tingling",
      "Chronic Pain",
      "Weakness",
    ],
  },
  {
    id: "arms",
    name: "Arms",
    x: 25,
    y: 38,
    symptoms: [
      "Joint Pain",
      "Swelling",
      "Numbness",
      "Tingling",
      "Weakness",
      "Fracture",
    ],
  },
  {
    id: "legs",
    name: "Legs",
    x: 42,
    y: 72,
    symptoms: [
      "Joint Pain",
      "Swelling",
      "Numbness",
      "Varicose Veins",
      "Cramping",
      "Weakness",
    ],
  },
  {
    id: "skin",
    name: "Skin",
    x: 78,
    y: 35,
    symptoms: [
      "Rash",
      "Itching",
      "Acne",
      "Pigmentation",
      "Moles",
      "Unusual Growth",
      "Dryness",
    ],
  },
  {
    id: "joints",
    name: "Joints",
    x: 30,
    y: 55,
    symptoms: [
      "Pain",
      "Morning Stiffness",
      "Swelling",
      "Redness",
      "Limited Movement",
    ],
  },
  {
    id: "feet",
    name: "Feet",
    x: 45,
    y: 93,
    symptoms: [
      "Swelling",
      "Pain",
      "Numbness",
      "Diabetic Issues",
      "Flat Feet",
    ],
  },
];

// ---------------------------------------------------------------------------
// Symptom-to-Specialist Mappings
// ---------------------------------------------------------------------------

export const SYMPTOM_MAPPINGS: SymptomMapping[] = [
  // ---- HEAD ----
  {
    regions: ["head"],
    symptoms: ["Headache"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "A neurologist specializes in disorders of the brain and nervous system, including chronic and acute headaches.",
      commonConditions: ["Migraine", "Tension Headache", "Cluster Headache", "Sinusitis"],
      expectedTests: ["CT Scan", "MRI Brain", "Eye Exam", "Blood Pressure Check"],
      urgency: "soon",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Dizziness"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "Dizziness can originate from neurological or inner-ear issues. A neurologist will evaluate balance and brain function.",
      commonConditions: ["Vertigo", "BPPV", "Meniere's Disease", "Low Blood Pressure"],
      expectedTests: ["MRI Brain", "ENG/VNG Test", "Blood Tests", "Blood Pressure Monitoring"],
      urgency: "soon",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Blurred Vision"],
    result: {
      specialist: "Ophthalmologist",
      icon: "\u{1F441}\u{FE0F}",
      description:
        "An ophthalmologist diagnoses and treats vision-related issues and eye conditions.",
      commonConditions: ["Refractive Error", "Cataract", "Glaucoma", "Diabetic Retinopathy"],
      expectedTests: ["Visual Acuity Test", "Slit Lamp Exam", "Fundoscopy", "OCT Scan"],
      urgency: "soon",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Memory Issues"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "Memory problems may indicate neurological conditions. A neurologist will perform cognitive assessments.",
      commonConditions: ["Early Dementia", "Alzheimer's", "Vitamin Deficiency", "Stress/Anxiety"],
      expectedTests: ["Cognitive Assessment", "MRI Brain", "Blood Tests", "Neuropsychological Tests"],
      urgency: "soon",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Fainting"],
    result: {
      specialist: "Cardiologist",
      icon: "\u{2764}\u{FE0F}",
      description:
        "Fainting (syncope) may have cardiac or neurological causes. A cardiologist rules out heart-related issues first.",
      commonConditions: ["Vasovagal Syncope", "Arrhythmia", "Orthostatic Hypotension", "Dehydration"],
      expectedTests: ["ECG", "Echocardiogram", "Tilt Table Test", "Blood Tests"],
      urgency: "urgent",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Hair Loss"],
    result: {
      specialist: "Dermatologist",
      icon: "\u{1F52C}",
      description:
        "A dermatologist evaluates hair and scalp conditions including pattern and non-pattern hair loss.",
      commonConditions: ["Alopecia Areata", "Androgenetic Alopecia", "Telogen Effluvium", "Thyroid Disorders"],
      expectedTests: ["Scalp Biopsy", "Blood Tests (Thyroid, Iron)", "Trichoscopy", "Hormonal Panel"],
      urgency: "routine",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Scalp Pain"],
    result: {
      specialist: "Dermatologist",
      icon: "\u{1F52C}",
      description:
        "Scalp pain may be caused by skin conditions, infections, or nerve irritation. A dermatologist can diagnose and treat it.",
      commonConditions: ["Scalp Psoriasis", "Folliculitis", "Tension Headache", "Dermatitis"],
      expectedTests: ["Scalp Examination", "Skin Scraping", "Blood Tests", "Biopsy if needed"],
      urgency: "routine",
    },
  },

  // ---- EYES ----
  {
    regions: ["eyes"],
    symptoms: ["Blurred Vision", "Eye Pain", "Double Vision"],
    result: {
      specialist: "Ophthalmologist",
      icon: "\u{1F441}\u{FE0F}",
      description:
        "An ophthalmologist provides comprehensive eye care including diagnosing vision issues and eye diseases.",
      commonConditions: ["Refractive Error", "Glaucoma", "Cataract", "Optic Neuritis"],
      expectedTests: ["Visual Acuity Test", "Tonometry", "Fundoscopy", "Visual Field Test"],
      urgency: "soon",
    },
  },
  {
    regions: ["eyes"],
    symptoms: ["Watery Eyes", "Redness", "Itching"],
    result: {
      specialist: "Ophthalmologist",
      icon: "\u{1F441}\u{FE0F}",
      description:
        "Watery, red, or itchy eyes often indicate allergies, infections, or dry eye syndrome.",
      commonConditions: ["Allergic Conjunctivitis", "Dry Eye", "Blepharitis", "Eye Infection"],
      expectedTests: ["Slit Lamp Exam", "Tear Film Test", "Allergy Panel", "Culture if needed"],
      urgency: "routine",
    },
  },

  // ---- EARS ----
  {
    regions: ["ears"],
    symptoms: ["Hearing Loss", "Ringing/Tinnitus"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F442}",
      description:
        "An ENT (Ear, Nose & Throat) specialist evaluates hearing loss and tinnitus to determine the underlying cause.",
      commonConditions: ["Sensorineural Hearing Loss", "Tinnitus", "Otosclerosis", "Noise-Induced Hearing Loss"],
      expectedTests: ["Audiometry", "Tympanometry", "CT Temporal Bone", "ABR Test"],
      urgency: "soon",
    },
  },
  {
    regions: ["ears"],
    symptoms: ["Ear Pain", "Discharge"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F442}",
      description:
        "Ear pain and discharge may indicate infection. An ENT specialist will examine and treat the condition.",
      commonConditions: ["Otitis Media", "Otitis Externa", "Ear Wax Impaction", "Perforated Eardrum"],
      expectedTests: ["Otoscopy", "Ear Swab Culture", "Audiometry", "CT Scan if needed"],
      urgency: "soon",
    },
  },
  {
    regions: ["ears"],
    symptoms: ["Dizziness"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F442}",
      description:
        "Dizziness originating from the ears may be related to inner-ear disorders. An ENT specialist can evaluate vestibular function.",
      commonConditions: ["BPPV", "Meniere's Disease", "Labyrinthitis", "Vestibular Neuritis"],
      expectedTests: ["ENG/VNG Test", "Audiometry", "MRI Inner Ear", "Dix-Hallpike Test"],
      urgency: "soon",
    },
  },

  // ---- NOSE ----
  {
    regions: ["nose"],
    symptoms: ["Congestion", "Sneezing", "Loss of Smell"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F443}",
      description:
        "Chronic congestion and loss of smell are commonly treated by an ENT specialist.",
      commonConditions: ["Allergic Rhinitis", "Sinusitis", "Nasal Polyps", "Deviated Septum"],
      expectedTests: ["Nasal Endoscopy", "CT Sinuses", "Allergy Testing", "Smell Test"],
      urgency: "routine",
    },
  },
  {
    regions: ["nose"],
    symptoms: ["Nosebleed"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F443}",
      description:
        "Recurrent nosebleeds should be evaluated by an ENT specialist to rule out structural or vascular causes.",
      commonConditions: ["Dry Nasal Mucosa", "Nasal Polyps", "Hypertension", "Bleeding Disorder"],
      expectedTests: ["Nasal Endoscopy", "Blood Tests (CBC, Coagulation)", "Blood Pressure Check"],
      urgency: "soon",
    },
  },
  {
    regions: ["nose"],
    symptoms: ["Sinus Pain"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F443}",
      description:
        "Sinus pain may indicate sinusitis or other sinus conditions that require specialist evaluation.",
      commonConditions: ["Acute Sinusitis", "Chronic Sinusitis", "Nasal Polyps", "Allergic Rhinitis"],
      expectedTests: ["CT Sinuses", "Nasal Endoscopy", "Allergy Testing", "X-Ray Sinuses"],
      urgency: "routine",
    },
  },

  // ---- THROAT ----
  {
    regions: ["throat"],
    symptoms: ["Sore Throat", "Hoarseness"],
    result: {
      specialist: "ENT Specialist",
      icon: "\u{1F5E3}\u{FE0F}",
      description:
        "Persistent sore throat or hoarseness should be assessed by an ENT specialist for vocal cord or throat issues.",
      commonConditions: ["Pharyngitis", "Laryngitis", "Vocal Cord Nodules", "GERD-related Throat Irritation"],
      expectedTests: ["Laryngoscopy", "Throat Swab", "Blood Tests", "Acid Reflux Test"],
      urgency: "routine",
    },
  },
  {
    regions: ["throat"],
    symptoms: ["Difficulty Swallowing", "Lump"],
    result: {
      specialist: "Gastroenterologist",
      icon: "\u{1FA7A}",
      description:
        "Difficulty swallowing or a lump sensation may be related to esophageal or gastric conditions.",
      commonConditions: ["GERD", "Esophageal Stricture", "Globus Pharyngeus", "Esophageal Motility Disorder"],
      expectedTests: ["Upper GI Endoscopy", "Barium Swallow", "Esophageal Manometry", "pH Monitoring"],
      urgency: "soon",
    },
  },
  {
    regions: ["throat"],
    symptoms: ["Thyroid Swelling"],
    result: {
      specialist: "Endocrinologist",
      icon: "\u{1F98B}",
      description:
        "Thyroid swelling requires evaluation by an endocrinologist to check for thyroid disorders.",
      commonConditions: ["Goiter", "Thyroid Nodules", "Hypothyroidism", "Hyperthyroidism"],
      expectedTests: ["Thyroid Function Tests (TSH, T3, T4)", "Thyroid Ultrasound", "Fine Needle Aspiration", "Thyroid Scan"],
      urgency: "soon",
    },
  },

  // ---- CHEST ----
  {
    regions: ["chest"],
    symptoms: ["Chest Pain", "Palpitations"],
    result: {
      specialist: "Cardiologist",
      icon: "\u{2764}\u{FE0F}",
      description:
        "Chest pain and palpitations can indicate heart conditions. A cardiologist will evaluate cardiac health.",
      commonConditions: ["Angina", "Arrhythmia", "Heart Attack", "Mitral Valve Prolapse"],
      expectedTests: ["ECG", "Echocardiogram", "Stress Test", "Cardiac Enzymes (Troponin)"],
      urgency: "urgent",
    },
  },
  {
    regions: ["chest"],
    symptoms: ["Shortness of Breath", "Wheezing", "Chest Tightness"],
    result: {
      specialist: "Pulmonologist",
      icon: "\u{1FAC1}",
      description:
        "Breathing difficulties, wheezing, and chest tightness are commonly treated by a pulmonologist.",
      commonConditions: ["Asthma", "COPD", "Bronchitis", "Pneumonia"],
      expectedTests: ["Pulmonary Function Test (PFT)", "Chest X-Ray", "CT Chest", "Spirometry"],
      urgency: "soon",
    },
  },
  {
    regions: ["chest"],
    symptoms: ["Cough"],
    result: {
      specialist: "Pulmonologist",
      icon: "\u{1FAC1}",
      description:
        "A persistent cough can have many causes, from infections to chronic lung diseases. A pulmonologist specializes in respiratory conditions.",
      commonConditions: ["Chronic Bronchitis", "Asthma", "Tuberculosis", "GERD-related Cough"],
      expectedTests: ["Chest X-Ray", "Sputum Test", "PFT", "CT Chest"],
      urgency: "routine",
    },
  },
  {
    regions: ["chest"],
    symptoms: ["Breast Lump"],
    result: {
      specialist: "Oncologist / Breast Surgeon",
      icon: "\u{1F397}\u{FE0F}",
      description:
        "A breast lump should be evaluated promptly by a specialist to rule out malignancy.",
      commonConditions: ["Fibroadenoma", "Breast Cyst", "Fibrocystic Changes", "Breast Cancer"],
      expectedTests: ["Mammogram", "Breast Ultrasound", "Fine Needle Aspiration", "Biopsy"],
      urgency: "urgent",
    },
  },

  // ---- STOMACH ----
  {
    regions: ["stomach"],
    symptoms: ["Acidity", "Bloating", "Nausea"],
    result: {
      specialist: "Gastroenterologist",
      icon: "\u{1FA7A}",
      description:
        "A gastroenterologist treats digestive issues including acidity, bloating, and nausea.",
      commonConditions: ["GERD", "Gastritis", "Peptic Ulcer", "Functional Dyspepsia"],
      expectedTests: ["Upper GI Endoscopy", "H. Pylori Test", "Abdominal Ultrasound", "Blood Tests"],
      urgency: "routine",
    },
  },
  {
    regions: ["stomach"],
    symptoms: ["Abdominal Pain", "Vomiting"],
    result: {
      specialist: "Gastroenterologist",
      icon: "\u{1FA7A}",
      description:
        "Abdominal pain with vomiting may indicate a gastrointestinal condition requiring specialist evaluation.",
      commonConditions: ["Gastritis", "Appendicitis", "Pancreatitis", "Gallstones"],
      expectedTests: ["Abdominal Ultrasound", "CT Abdomen", "Blood Tests (Amylase, Lipase)", "Upper GI Endoscopy"],
      urgency: "soon",
    },
  },
  {
    regions: ["stomach"],
    symptoms: ["Blood in Stool"],
    result: {
      specialist: "Gastroenterologist",
      icon: "\u{1FA7A}",
      description:
        "Blood in stool is a serious symptom that needs prompt evaluation by a gastroenterologist.",
      commonConditions: ["Hemorrhoids", "Inflammatory Bowel Disease", "Colorectal Polyps", "Colorectal Cancer"],
      expectedTests: ["Colonoscopy", "Stool Occult Blood Test", "CBC", "CT Abdomen"],
      urgency: "urgent",
    },
  },
  {
    regions: ["stomach"],
    symptoms: ["Constipation", "Diarrhea"],
    result: {
      specialist: "Gastroenterologist",
      icon: "\u{1FA7A}",
      description:
        "Chronic constipation or diarrhea can indicate bowel disorders. A gastroenterologist can identify the cause.",
      commonConditions: ["Irritable Bowel Syndrome", "Inflammatory Bowel Disease", "Celiac Disease", "Lactose Intolerance"],
      expectedTests: ["Colonoscopy", "Stool Tests", "Blood Tests", "Hydrogen Breath Test"],
      urgency: "routine",
    },
  },

  // ---- LIVER ----
  {
    regions: ["liver"],
    symptoms: ["Jaundice", "Dark Urine"],
    result: {
      specialist: "Hepatologist / Gastroenterologist",
      icon: "\u{1F7E1}",
      description:
        "Jaundice and dark urine suggest liver dysfunction. A hepatologist or gastroenterologist can evaluate liver health.",
      commonConditions: ["Hepatitis", "Liver Cirrhosis", "Gallstones", "Bile Duct Obstruction"],
      expectedTests: ["Liver Function Tests", "Hepatitis Panel", "Abdominal Ultrasound", "CT/MRI Abdomen"],
      urgency: "urgent",
    },
  },
  {
    regions: ["liver"],
    symptoms: ["Fatigue", "Loss of Appetite"],
    result: {
      specialist: "Hepatologist / Gastroenterologist",
      icon: "\u{1F7E1}",
      description:
        "Persistent fatigue with appetite loss may be linked to liver conditions or other systemic diseases.",
      commonConditions: ["Fatty Liver Disease", "Chronic Hepatitis", "Liver Cirrhosis", "Anemia"],
      expectedTests: ["Liver Function Tests", "CBC", "Abdominal Ultrasound", "Fibroscan"],
      urgency: "soon",
    },
  },
  {
    regions: ["liver"],
    symptoms: ["Abdominal Swelling"],
    result: {
      specialist: "Hepatologist / Gastroenterologist",
      icon: "\u{1F7E1}",
      description:
        "Abdominal swelling (ascites) can indicate advanced liver disease and requires specialist evaluation.",
      commonConditions: ["Liver Cirrhosis", "Portal Hypertension", "Hepatocellular Carcinoma", "Budd-Chiari Syndrome"],
      expectedTests: ["Abdominal Ultrasound", "CT Abdomen", "Liver Function Tests", "Ascitic Fluid Analysis"],
      urgency: "urgent",
    },
  },

  // ---- KIDNEYS ----
  {
    regions: ["kidneys"],
    symptoms: ["Burning Urination", "Frequent Urination"],
    result: {
      specialist: "Urologist",
      icon: "\u{1F4A7}",
      description:
        "A urologist treats urinary tract conditions including infections and bladder issues.",
      commonConditions: ["Urinary Tract Infection", "Overactive Bladder", "Prostatitis", "Interstitial Cystitis"],
      expectedTests: ["Urinalysis", "Urine Culture", "Ultrasound KUB", "Uroflowmetry"],
      urgency: "soon",
    },
  },
  {
    regions: ["kidneys"],
    symptoms: ["Blood in Urine"],
    result: {
      specialist: "Nephrologist / Urologist",
      icon: "\u{1F4A7}",
      description:
        "Blood in urine (hematuria) is a serious sign that needs evaluation by a nephrologist or urologist.",
      commonConditions: ["Kidney Stones", "UTI", "Glomerulonephritis", "Bladder Cancer"],
      expectedTests: ["Urinalysis", "Ultrasound KUB", "CT Urogram", "Cystoscopy"],
      urgency: "urgent",
    },
  },
  {
    regions: ["kidneys"],
    symptoms: ["Lower Back Pain", "Swelling"],
    result: {
      specialist: "Nephrologist",
      icon: "\u{1F4A7}",
      description:
        "Lower back pain with swelling may indicate kidney disease. A nephrologist specializes in kidney conditions.",
      commonConditions: ["Kidney Stones", "Chronic Kidney Disease", "Kidney Infection", "Nephrotic Syndrome"],
      expectedTests: ["Kidney Function Tests (Creatinine, BUN)", "Ultrasound KUB", "Urinalysis", "24-hour Urine Protein"],
      urgency: "soon",
    },
  },

  // ---- UPPER BACK ----
  {
    regions: ["back-upper"],
    symptoms: ["Stiffness", "Pain", "Muscle Spasm"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "An orthopedic surgeon evaluates musculoskeletal issues including upper back stiffness and pain.",
      commonConditions: ["Muscle Strain", "Thoracic Spondylosis", "Poor Posture Syndrome", "Herniated Disc"],
      expectedTests: ["X-Ray Spine", "MRI Spine", "Physical Examination", "Blood Tests (ESR, CRP)"],
      urgency: "routine",
    },
  },
  {
    regions: ["back-upper"],
    symptoms: ["Numbness"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "Upper back numbness may indicate nerve compression or neurological issues.",
      commonConditions: ["Cervical Radiculopathy", "Thoracic Outlet Syndrome", "Multiple Sclerosis", "Herniated Disc"],
      expectedTests: ["MRI Spine", "Nerve Conduction Study", "EMG", "Blood Tests"],
      urgency: "soon",
    },
  },

  // ---- LOWER BACK ----
  {
    regions: ["back-lower"],
    symptoms: ["Sciatica", "Chronic Pain"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "An orthopedic surgeon treats lower back issues including sciatica and chronic pain conditions.",
      commonConditions: ["Lumbar Disc Herniation", "Spinal Stenosis", "Spondylolisthesis", "Degenerative Disc Disease"],
      expectedTests: ["X-Ray Lumbar Spine", "MRI Lumbar Spine", "Nerve Conduction Study", "Physical Exam"],
      urgency: "soon",
    },
  },
  {
    regions: ["back-lower"],
    symptoms: ["Numbness", "Tingling", "Weakness"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "Numbness, tingling, and weakness in the lower back area may indicate nerve damage or compression.",
      commonConditions: ["Lumbar Radiculopathy", "Cauda Equina Syndrome", "Peripheral Neuropathy", "Spinal Stenosis"],
      expectedTests: ["MRI Lumbar Spine", "EMG", "Nerve Conduction Study", "Blood Tests (Vitamin B12, Glucose)"],
      urgency: "soon",
    },
  },

  // ---- ARMS ----
  {
    regions: ["arms"],
    symptoms: ["Joint Pain", "Swelling"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "An orthopedic surgeon treats joint and bone problems in the arms, including pain and swelling.",
      commonConditions: ["Tennis Elbow", "Carpal Tunnel Syndrome", "Rotator Cuff Injury", "Arthritis"],
      expectedTests: ["X-Ray", "MRI", "Ultrasound", "Blood Tests (Uric Acid, RA Factor)"],
      urgency: "routine",
    },
  },
  {
    regions: ["arms"],
    symptoms: ["Numbness", "Tingling", "Weakness"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "Numbness, tingling, or weakness in the arms may point to nerve compression or neurological issues.",
      commonConditions: ["Carpal Tunnel Syndrome", "Cervical Radiculopathy", "Peripheral Neuropathy", "Thoracic Outlet Syndrome"],
      expectedTests: ["Nerve Conduction Study", "EMG", "MRI Cervical Spine", "Blood Tests"],
      urgency: "soon",
    },
  },
  {
    regions: ["arms"],
    symptoms: ["Fracture"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "Fractures require immediate evaluation and treatment by an orthopedic surgeon.",
      commonConditions: ["Simple Fracture", "Compound Fracture", "Stress Fracture", "Dislocation"],
      expectedTests: ["X-Ray", "CT Scan", "Physical Examination", "Bone Density Test if recurrent"],
      urgency: "urgent",
    },
  },

  // ---- LEGS ----
  {
    regions: ["legs"],
    symptoms: ["Joint Pain", "Swelling", "Weakness"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "An orthopedic surgeon evaluates leg joint pain, swelling, and weakness.",
      commonConditions: ["Osteoarthritis", "Ligament Injury", "Meniscus Tear", "Gout"],
      expectedTests: ["X-Ray Knee/Hip", "MRI", "Blood Tests (Uric Acid, RA Factor)", "Joint Fluid Analysis"],
      urgency: "routine",
    },
  },
  {
    regions: ["legs"],
    symptoms: ["Varicose Veins", "Cramping"],
    result: {
      specialist: "Vascular Surgeon",
      icon: "\u{1FA78}",
      description:
        "A vascular surgeon specializes in vein and blood vessel conditions including varicose veins.",
      commonConditions: ["Varicose Veins", "Deep Vein Thrombosis", "Chronic Venous Insufficiency", "Peripheral Artery Disease"],
      expectedTests: ["Doppler Ultrasound", "Venous Duplex Scan", "ABI Test", "Blood Tests (D-Dimer)"],
      urgency: "soon",
    },
  },
  {
    regions: ["legs"],
    symptoms: ["Numbness"],
    result: {
      specialist: "Neurologist",
      icon: "\u{1F9E0}",
      description:
        "Leg numbness may indicate nerve damage, peripheral neuropathy, or spinal issues.",
      commonConditions: ["Peripheral Neuropathy", "Lumbar Radiculopathy", "Diabetic Neuropathy", "Sciatica"],
      expectedTests: ["Nerve Conduction Study", "EMG", "MRI Spine", "Blood Tests (Glucose, Vitamin B12)"],
      urgency: "soon",
    },
  },

  // ---- SKIN ----
  {
    regions: ["skin"],
    symptoms: ["Rash", "Itching", "Dryness"],
    result: {
      specialist: "Dermatologist",
      icon: "\u{1F52C}",
      description:
        "A dermatologist specializes in skin conditions including rashes, itching, and dryness.",
      commonConditions: ["Eczema", "Psoriasis", "Contact Dermatitis", "Fungal Infection"],
      expectedTests: ["Skin Examination", "Patch Test", "Skin Biopsy", "Blood Tests (IgE)"],
      urgency: "routine",
    },
  },
  {
    regions: ["skin"],
    symptoms: ["Acne", "Pigmentation"],
    result: {
      specialist: "Dermatologist",
      icon: "\u{1F52C}",
      description:
        "Acne and pigmentation issues are treated by dermatologists with medical and cosmetic approaches.",
      commonConditions: ["Acne Vulgaris", "Melasma", "Post-inflammatory Hyperpigmentation", "Rosacea"],
      expectedTests: ["Skin Examination", "Hormonal Panel", "Wood's Lamp Exam", "Skin Biopsy if needed"],
      urgency: "routine",
    },
  },
  {
    regions: ["skin"],
    symptoms: ["Moles", "Unusual Growth"],
    result: {
      specialist: "Dermatologist / Oncologist",
      icon: "\u{1F52C}",
      description:
        "Moles or unusual skin growths should be evaluated to rule out skin cancer or other serious conditions.",
      commonConditions: ["Benign Mole", "Seborrheic Keratosis", "Melanoma", "Basal Cell Carcinoma"],
      expectedTests: ["Dermoscopy", "Skin Biopsy", "Excisional Biopsy", "Histopathology"],
      urgency: "soon",
    },
  },

  // ---- JOINTS ----
  {
    regions: ["joints"],
    symptoms: ["Pain", "Morning Stiffness", "Swelling"],
    result: {
      specialist: "Rheumatologist",
      icon: "\u{1F9B4}",
      description:
        "A rheumatologist specializes in autoimmune and inflammatory joint conditions.",
      commonConditions: ["Rheumatoid Arthritis", "Osteoarthritis", "Gout", "Lupus"],
      expectedTests: ["RA Factor", "Anti-CCP Antibodies", "ESR/CRP", "X-Ray Joints", "Uric Acid"],
      urgency: "soon",
    },
  },
  {
    regions: ["joints"],
    symptoms: ["Redness", "Limited Movement"],
    result: {
      specialist: "Rheumatologist",
      icon: "\u{1F9B4}",
      description:
        "Joint redness and limited range of motion often indicate inflammatory arthritis or infection.",
      commonConditions: ["Septic Arthritis", "Gout Flare", "Rheumatoid Arthritis", "Reactive Arthritis"],
      expectedTests: ["Joint Fluid Analysis", "Blood Tests (ESR, CRP, Uric Acid)", "X-Ray", "MRI"],
      urgency: "soon",
    },
  },

  // ---- FEET ----
  {
    regions: ["feet"],
    symptoms: ["Swelling", "Pain"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "An orthopedic surgeon evaluates foot pain and swelling to identify structural or inflammatory causes.",
      commonConditions: ["Plantar Fasciitis", "Achilles Tendinitis", "Stress Fracture", "Gout"],
      expectedTests: ["X-Ray Foot", "MRI Foot", "Ultrasound", "Blood Tests (Uric Acid)"],
      urgency: "routine",
    },
  },
  {
    regions: ["feet"],
    symptoms: ["Numbness", "Diabetic Issues"],
    result: {
      specialist: "Endocrinologist",
      icon: "\u{1F98B}",
      description:
        "Foot numbness and diabetic issues require management by an endocrinologist to prevent complications.",
      commonConditions: ["Diabetic Neuropathy", "Diabetic Foot Ulcer", "Peripheral Vascular Disease", "Charcot Foot"],
      expectedTests: ["Blood Sugar (HbA1c)", "Nerve Conduction Study", "Doppler Ultrasound", "Monofilament Test"],
      urgency: "soon",
    },
  },
  {
    regions: ["feet"],
    symptoms: ["Flat Feet"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "\u{1F9B4}",
      description:
        "Flat feet can cause pain and alignment issues. An orthopedic surgeon can assess and recommend treatment.",
      commonConditions: ["Pes Planus", "Posterior Tibial Tendon Dysfunction", "Overpronation", "Plantar Fasciitis"],
      expectedTests: ["X-Ray Foot (Weight-bearing)", "Physical Examination", "Gait Analysis", "MRI if needed"],
      urgency: "routine",
    },
  },
];

// ---------------------------------------------------------------------------
// Existing Conditions & Duration Options
// ---------------------------------------------------------------------------

export const EXISTING_CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Thyroid",
  "PCOS",
  "Arthritis",
  "None",
];

export const DURATION_OPTIONS = [
  { value: "today", label: "Started today" },
  { value: "1-3days", label: "1-3 days" },
  { value: "1week", label: "About a week" },
  { value: "2weeks", label: "2+ weeks" },
  { value: "1month", label: "1+ month" },
  { value: "3months", label: "3+ months" },
];

// ---------------------------------------------------------------------------
// Helper: find specialist by region + symptoms
// ---------------------------------------------------------------------------

export function findSpecialist(
  regionId: string,
  selectedSymptoms: string[]
): SymptomMapping | null {
  // Try to find the most specific match (most overlapping symptoms)
  let bestMatch: SymptomMapping | null = null;
  let bestScore = 0;

  for (const mapping of SYMPTOM_MAPPINGS) {
    if (!mapping.regions.includes(regionId)) continue;

    const overlap = mapping.symptoms.filter((s) =>
      selectedSymptoms.includes(s)
    ).length;

    if (overlap > bestScore) {
      bestScore = overlap;
      bestMatch = mapping;
    }
  }

  return bestMatch;
}

export function getRegionById(id: string): BodyRegion | undefined {
  return BODY_REGIONS.find((r) => r.id === id);
}
