export interface BodyRegion {
  id: string;
  name: string;
  symptoms: string[];
}

export interface SpecialistResult {
  specialist: string;
  icon: string;
  description: string;
  commonConditions: string[];
  expectedTests: string[];
  urgency: "routine" | "soon" | "urgent";
}

export interface SymptomMapping {
  regions: string[];
  symptoms: string[];
  result: SpecialistResult;
}

export const EXISTING_CONDITIONS = [
  "Diabetes", "Hypertension", "Heart Disease", "Asthma", "Thyroid", "PCOS", "Arthritis", "None",
];

export const DURATION_OPTIONS = [
  { value: "today", label: "Started today" },
  { value: "1-3days", label: "1-3 days" },
  { value: "1week", label: "About a week" },
  { value: "2weeks", label: "2+ weeks" },
  { value: "1month", label: "1+ month" },
  { value: "3months", label: "3+ months" },
];

export const BODY_REGIONS: BodyRegion[] = [
  { id: "head", name: "Head", symptoms: ["Headache", "Dizziness", "Blurred Vision", "Memory Issues", "Fainting", "Hair Loss", "Scalp Pain"] },
  { id: "eyes", name: "Eyes", symptoms: ["Blurred Vision", "Eye Pain", "Watery Eyes", "Redness", "Itching", "Double Vision"] },
  { id: "ears", name: "Ears", symptoms: ["Hearing Loss", "Ear Pain", "Ringing/Tinnitus", "Discharge", "Dizziness"] },
  { id: "nose", name: "Nose", symptoms: ["Congestion", "Sneezing", "Nosebleed", "Loss of Smell", "Sinus Pain"] },
  { id: "throat", name: "Throat", symptoms: ["Sore Throat", "Difficulty Swallowing", "Hoarseness", "Thyroid Swelling", "Lump in Throat"] },
  { id: "chest", name: "Chest", symptoms: ["Chest Pain", "Shortness of Breath", "Palpitations", "Cough", "Wheezing", "Chest Tightness", "Breast Lump"] },
  { id: "stomach", name: "Stomach", symptoms: ["Acidity", "Bloating", "Abdominal Pain", "Vomiting", "Nausea", "Blood in Stool", "Constipation", "Diarrhea"] },
  { id: "liver", name: "Liver", symptoms: ["Jaundice", "Fatigue", "Abdominal Swelling", "Dark Urine", "Loss of Appetite"] },
  { id: "kidneys", name: "Kidneys", symptoms: ["Burning Urination", "Blood in Urine", "Lower Back Pain", "Frequent Urination", "Swelling"] },
  { id: "back-upper", name: "Upper Back", symptoms: ["Stiffness", "Pain", "Muscle Spasm", "Numbness"] },
  { id: "back-lower", name: "Lower Back", symptoms: ["Sciatica", "Numbness", "Tingling", "Chronic Pain", "Weakness"] },
  { id: "arms", name: "Arms", symptoms: ["Joint Pain", "Swelling", "Numbness", "Tingling", "Weakness", "Fracture"] },
  { id: "legs", name: "Legs", symptoms: ["Joint Pain", "Swelling", "Numbness", "Varicose Veins", "Cramping", "Weakness"] },
  { id: "skin", name: "Skin", symptoms: ["Rash", "Itching", "Acne", "Pigmentation", "Moles", "Unusual Growth", "Dryness"] },
  { id: "joints", name: "Joints", symptoms: ["Pain", "Morning Stiffness", "Swelling", "Redness", "Limited Movement"] },
  { id: "feet", name: "Feet", symptoms: ["Swelling", "Pain", "Numbness", "Diabetic Issues", "Flat Feet"] },
];

export const SYMPTOM_MAPPINGS: SymptomMapping[] = [
  {
    regions: ["head"],
    symptoms: ["Headache", "Dizziness", "Fainting", "Memory Issues"],
    result: {
      specialist: "Neurologist",
      icon: "🧠",
      description: "Based on your head-related symptoms, a neurologist specializes in brain and nervous system disorders and can best evaluate your condition.",
      commonConditions: ["Migraine", "Tension Headache", "Vertigo", "Concussion"],
      expectedTests: ["CT Scan", "MRI Brain", "EEG", "Neurological Exam"],
      urgency: "soon",
    },
  },
  {
    regions: ["head", "skin"],
    symptoms: ["Hair Loss", "Scalp Pain"],
    result: {
      specialist: "Dermatologist",
      icon: "🩺",
      description: "Hair and scalp issues are best evaluated by a dermatologist who specializes in skin, hair, and nail conditions.",
      commonConditions: ["Alopecia", "Scalp Dermatitis", "Fungal Infection", "Telogen Effluvium"],
      expectedTests: ["Scalp Biopsy", "Blood Tests (Iron, Thyroid)", "Trichoscopy"],
      urgency: "routine",
    },
  },
  {
    regions: ["eyes"],
    symptoms: ["Blurred Vision", "Eye Pain", "Double Vision"],
    result: {
      specialist: "Ophthalmologist",
      icon: "👁️",
      description: "An ophthalmologist is an eye specialist who can diagnose and treat vision problems, eye pain, and other eye conditions.",
      commonConditions: ["Refractive Error", "Glaucoma", "Cataracts", "Retinal Issues"],
      expectedTests: ["Eye Exam", "Tonometry", "Retinal Scan", "Visual Field Test"],
      urgency: "soon",
    },
  },
  {
    regions: ["eyes"],
    symptoms: ["Watery Eyes", "Redness", "Itching"],
    result: {
      specialist: "Ophthalmologist",
      icon: "👁️",
      description: "Watery, red, or itchy eyes could be allergic or infectious. An ophthalmologist can determine the cause and prescribe treatment.",
      commonConditions: ["Allergic Conjunctivitis", "Dry Eye", "Blepharitis", "Eye Infection"],
      expectedTests: ["Slit Lamp Exam", "Allergy Test", "Tear Film Analysis"],
      urgency: "routine",
    },
  },
  {
    regions: ["ears"],
    symptoms: ["Hearing Loss", "Ear Pain", "Discharge"],
    result: {
      specialist: "ENT Specialist",
      icon: "👂",
      description: "An ENT (Ear, Nose, Throat) specialist can evaluate hearing problems, ear pain, and infections.",
      commonConditions: ["Ear Infection", "Wax Buildup", "Hearing Loss", "Otitis Media"],
      expectedTests: ["Audiometry", "Otoscopy", "Tympanometry", "CT Temporal Bone"],
      urgency: "soon",
    },
  },
  {
    regions: ["ears"],
    symptoms: ["Ringing/Tinnitus", "Dizziness"],
    result: {
      specialist: "ENT Specialist",
      icon: "👂",
      description: "Tinnitus and dizziness often originate from inner ear problems. An ENT specialist can evaluate and treat these conditions.",
      commonConditions: ["Tinnitus", "Meniere's Disease", "BPPV", "Inner Ear Infection"],
      expectedTests: ["Audiometry", "Vestibular Testing", "MRI", "Electronystagmography"],
      urgency: "routine",
    },
  },
  {
    regions: ["nose"],
    symptoms: ["Congestion", "Sneezing", "Sinus Pain", "Loss of Smell"],
    result: {
      specialist: "ENT Specialist / Allergist",
      icon: "👃",
      description: "Nasal congestion, sneezing, and sinus issues are best evaluated by an ENT specialist or allergist.",
      commonConditions: ["Sinusitis", "Allergic Rhinitis", "Nasal Polyps", "Deviated Septum"],
      expectedTests: ["Nasal Endoscopy", "CT Sinuses", "Allergy Testing", "Skin Prick Test"],
      urgency: "routine",
    },
  },
  {
    regions: ["throat"],
    symptoms: ["Sore Throat", "Difficulty Swallowing", "Hoarseness"],
    result: {
      specialist: "ENT Specialist",
      icon: "🫁",
      description: "Throat problems including soreness, swallowing difficulty, and voice changes should be evaluated by an ENT specialist.",
      commonConditions: ["Tonsillitis", "Pharyngitis", "Laryngitis", "GERD"],
      expectedTests: ["Laryngoscopy", "Throat Culture", "Barium Swallow", "Endoscopy"],
      urgency: "soon",
    },
  },
  {
    regions: ["throat"],
    symptoms: ["Thyroid Swelling", "Lump in Throat"],
    result: {
      specialist: "Endocrinologist",
      icon: "🦋",
      description: "Thyroid swelling or lumps should be evaluated by an endocrinologist who specializes in hormone-related conditions.",
      commonConditions: ["Goiter", "Thyroid Nodule", "Hypothyroidism", "Hyperthyroidism"],
      expectedTests: ["Thyroid Function Tests", "Ultrasound Neck", "Fine Needle Biopsy", "Thyroid Scan"],
      urgency: "soon",
    },
  },
  {
    regions: ["chest"],
    symptoms: ["Chest Pain", "Palpitations", "Chest Tightness"],
    result: {
      specialist: "Cardiologist",
      icon: "❤️",
      description: "Chest pain and palpitations need cardiac evaluation. A cardiologist specializes in heart and cardiovascular conditions.",
      commonConditions: ["Angina", "Arrhythmia", "Heart Attack", "Hypertension"],
      expectedTests: ["ECG", "Echocardiogram", "Stress Test", "Cardiac Enzymes", "Holter Monitor"],
      urgency: "urgent",
    },
  },
  {
    regions: ["chest"],
    symptoms: ["Shortness of Breath", "Wheezing", "Cough"],
    result: {
      specialist: "Pulmonologist",
      icon: "🫁",
      description: "Breathing difficulties and persistent cough should be evaluated by a pulmonologist who specializes in lung diseases.",
      commonConditions: ["Asthma", "COPD", "Bronchitis", "Pneumonia"],
      expectedTests: ["Pulmonary Function Test", "Chest X-Ray", "CT Chest", "Sputum Culture", "SpO2"],
      urgency: "soon",
    },
  },
  {
    regions: ["chest"],
    symptoms: ["Breast Lump"],
    result: {
      specialist: "Oncologist / Breast Surgeon",
      icon: "🎗️",
      description: "Any breast lump should be evaluated urgently by a breast surgeon or oncologist to rule out serious conditions.",
      commonConditions: ["Fibroadenoma", "Breast Cyst", "Breast Cancer", "Fibrocystic Changes"],
      expectedTests: ["Mammogram", "Breast Ultrasound", "Biopsy", "MRI Breast"],
      urgency: "urgent",
    },
  },
  {
    regions: ["stomach"],
    symptoms: ["Acidity", "Bloating", "Nausea"],
    result: {
      specialist: "Gastroenterologist",
      icon: "🏥",
      description: "Digestive issues like acidity and bloating are best managed by a gastroenterologist who specializes in the digestive system.",
      commonConditions: ["GERD", "Gastritis", "IBS", "Peptic Ulcer"],
      expectedTests: ["Upper GI Endoscopy", "H. pylori Test", "Abdominal Ultrasound", "Stool Test"],
      urgency: "routine",
    },
  },
  {
    regions: ["stomach"],
    symptoms: ["Abdominal Pain", "Vomiting", "Blood in Stool"],
    result: {
      specialist: "Gastroenterologist",
      icon: "🏥",
      description: "Severe abdominal pain and blood in stool require urgent evaluation by a gastroenterologist.",
      commonConditions: ["Appendicitis", "Ulcerative Colitis", "Crohn's Disease", "Hemorrhoids"],
      expectedTests: ["Colonoscopy", "CT Abdomen", "Blood Tests", "Stool Occult Blood Test"],
      urgency: "urgent",
    },
  },
  {
    regions: ["liver"],
    symptoms: ["Jaundice", "Fatigue", "Dark Urine", "Abdominal Swelling"],
    result: {
      specialist: "Hepatologist / Gastroenterologist",
      icon: "🫘",
      description: "Liver-related symptoms like jaundice need evaluation by a hepatologist or gastroenterologist.",
      commonConditions: ["Hepatitis", "Fatty Liver", "Cirrhosis", "Liver Infection"],
      expectedTests: ["Liver Function Tests", "Hepatitis Panel", "Abdominal Ultrasound", "Fibroscan"],
      urgency: "soon",
    },
  },
  {
    regions: ["kidneys"],
    symptoms: ["Burning Urination", "Blood in Urine", "Frequent Urination"],
    result: {
      specialist: "Urologist / Nephrologist",
      icon: "🫘",
      description: "Urinary symptoms should be evaluated by a urologist or nephrologist who specializes in kidney and urinary tract conditions.",
      commonConditions: ["UTI", "Kidney Stones", "Prostate Issues", "Kidney Disease"],
      expectedTests: ["Urine Analysis", "Kidney Function Tests", "Ultrasound KUB", "CT Scan"],
      urgency: "soon",
    },
  },
  {
    regions: ["back-upper"],
    symptoms: ["Stiffness", "Pain", "Muscle Spasm"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "🦴",
      description: "Upper back pain and stiffness are commonly treated by an orthopedic surgeon specializing in spine conditions.",
      commonConditions: ["Muscle Strain", "Cervical Spondylosis", "Herniated Disc", "Postural Issues"],
      expectedTests: ["X-Ray Spine", "MRI Spine", "Physical Examination", "Nerve Conduction Study"],
      urgency: "routine",
    },
  },
  {
    regions: ["back-lower"],
    symptoms: ["Sciatica", "Numbness", "Tingling", "Chronic Pain"],
    result: {
      specialist: "Orthopedic / Neurosurgeon",
      icon: "🦴",
      description: "Lower back pain with sciatica or numbness may involve nerve compression and needs orthopedic or neurosurgery evaluation.",
      commonConditions: ["Lumbar Disc Herniation", "Sciatica", "Spinal Stenosis", "Spondylolisthesis"],
      expectedTests: ["MRI Lumbar Spine", "X-Ray", "EMG/NCV", "CT Scan"],
      urgency: "soon",
    },
  },
  {
    regions: ["arms", "legs"],
    symptoms: ["Joint Pain", "Swelling", "Morning Stiffness"],
    result: {
      specialist: "Rheumatologist",
      icon: "🦴",
      description: "Joint pain with stiffness could indicate an autoimmune or inflammatory condition. A rheumatologist specializes in these.",
      commonConditions: ["Rheumatoid Arthritis", "Osteoarthritis", "Gout", "Lupus"],
      expectedTests: ["RF Factor", "Anti-CCP", "ESR/CRP", "X-Ray Joints", "ANA"],
      urgency: "routine",
    },
  },
  {
    regions: ["arms", "legs"],
    symptoms: ["Fracture", "Weakness"],
    result: {
      specialist: "Orthopedic Surgeon",
      icon: "🦴",
      description: "Fractures, injuries, and significant weakness in limbs need evaluation by an orthopedic surgeon.",
      commonConditions: ["Bone Fracture", "Ligament Tear", "Tendon Injury", "Osteoporosis"],
      expectedTests: ["X-Ray", "CT Scan", "MRI", "Bone Density Test"],
      urgency: "urgent",
    },
  },
  {
    regions: ["arms", "legs"],
    symptoms: ["Numbness", "Tingling"],
    result: {
      specialist: "Neurologist",
      icon: "🧠",
      description: "Persistent numbness and tingling in limbs may indicate nerve issues. A neurologist can evaluate the cause.",
      commonConditions: ["Peripheral Neuropathy", "Carpal Tunnel", "Nerve Compression", "B12 Deficiency"],
      expectedTests: ["Nerve Conduction Study", "EMG", "MRI", "Blood Tests (B12, Thyroid, Sugar)"],
      urgency: "routine",
    },
  },
  {
    regions: ["skin"],
    symptoms: ["Rash", "Itching", "Dryness"],
    result: {
      specialist: "Dermatologist",
      icon: "🩺",
      description: "Skin rashes, itching, and dryness are best evaluated by a dermatologist.",
      commonConditions: ["Eczema", "Psoriasis", "Allergic Dermatitis", "Fungal Infection"],
      expectedTests: ["Skin Examination", "Patch Test", "Skin Biopsy", "Blood Tests"],
      urgency: "routine",
    },
  },
  {
    regions: ["skin"],
    symptoms: ["Acne", "Pigmentation"],
    result: {
      specialist: "Dermatologist",
      icon: "🩺",
      description: "Acne and pigmentation concerns are managed by dermatologists who can prescribe targeted treatments.",
      commonConditions: ["Acne Vulgaris", "Melasma", "Hyperpigmentation", "Rosacea"],
      expectedTests: ["Skin Analysis", "Hormone Tests", "Comedone Extraction Assessment"],
      urgency: "routine",
    },
  },
  {
    regions: ["skin"],
    symptoms: ["Moles", "Unusual Growth"],
    result: {
      specialist: "Dermatologist / Oncologist",
      icon: "🔬",
      description: "Unusual moles or skin growths should be examined by a dermatologist to rule out skin cancer.",
      commonConditions: ["Melanoma", "Basal Cell Carcinoma", "Seborrheic Keratosis", "Dysplastic Nevi"],
      expectedTests: ["Dermoscopy", "Skin Biopsy", "Excisional Biopsy", "Histopathology"],
      urgency: "urgent",
    },
  },
  {
    regions: ["joints"],
    symptoms: ["Pain", "Morning Stiffness", "Swelling", "Redness"],
    result: {
      specialist: "Rheumatologist",
      icon: "🦴",
      description: "Joint pain with morning stiffness and swelling suggests an inflammatory condition. A rheumatologist is the specialist to see.",
      commonConditions: ["Rheumatoid Arthritis", "Gout", "Psoriatic Arthritis", "Reactive Arthritis"],
      expectedTests: ["RF Factor", "Anti-CCP", "Uric Acid", "X-Ray Joints", "Joint Fluid Analysis"],
      urgency: "soon",
    },
  },
  {
    regions: ["feet"],
    symptoms: ["Swelling", "Pain"],
    result: {
      specialist: "Orthopedic / Vascular Surgeon",
      icon: "🦶",
      description: "Foot swelling and pain could have multiple causes. An orthopedic or vascular surgeon can determine the issue.",
      commonConditions: ["Plantar Fasciitis", "Flat Feet", "Peripheral Edema", "DVT"],
      expectedTests: ["X-Ray Foot", "Doppler Ultrasound", "Blood Tests", "MRI Foot"],
      urgency: "routine",
    },
  },
  {
    regions: ["feet"],
    symptoms: ["Numbness", "Diabetic Issues"],
    result: {
      specialist: "Diabetologist / Neurologist",
      icon: "💉",
      description: "Foot numbness in diabetic patients indicates possible neuropathy. A diabetologist can manage your sugar and nerve health.",
      commonConditions: ["Diabetic Neuropathy", "Diabetic Foot", "Peripheral Vascular Disease"],
      expectedTests: ["HbA1c", "Nerve Conduction Study", "Monofilament Test", "Doppler Study"],
      urgency: "soon",
    },
  },
  // General/systemic mappings
  {
    regions: ["head", "stomach", "chest"],
    symptoms: ["Fatigue", "Loss of Appetite"],
    result: {
      specialist: "General Physician",
      icon: "👨‍⚕️",
      description: "General fatigue and appetite loss can have many causes. A general physician can perform initial evaluation and refer if needed.",
      commonConditions: ["Anemia", "Thyroid Disorder", "Depression", "Infection"],
      expectedTests: ["Complete Blood Count", "Thyroid Tests", "Liver Function Tests", "ESR/CRP"],
      urgency: "routine",
    },
  },
  {
    regions: ["head"],
    symptoms: ["Blurred Vision"],
    result: {
      specialist: "Ophthalmologist",
      icon: "👁️",
      description: "Blurred vision originating with head symptoms needs eye evaluation. An ophthalmologist can check your vision and eye health.",
      commonConditions: ["Refractive Error", "Migraine with Aura", "Optic Neuritis"],
      expectedTests: ["Visual Acuity Test", "Fundoscopy", "OCT", "Visual Field Test"],
      urgency: "soon",
    },
  },
  {
    regions: ["chest", "stomach"],
    symptoms: ["Cough", "Acidity"],
    result: {
      specialist: "General Physician / Pulmonologist",
      icon: "👨‍⚕️",
      description: "A chronic cough with acidity could be GERD-related. A general physician or pulmonologist can evaluate.",
      commonConditions: ["GERD", "Chronic Cough", "Post-nasal Drip", "Acid Reflux"],
      expectedTests: ["Chest X-Ray", "PFT", "Upper GI Endoscopy", "pH Monitoring"],
      urgency: "routine",
    },
  },
  {
    regions: ["stomach", "kidneys"],
    symptoms: ["Lower Back Pain", "Abdominal Pain"],
    result: {
      specialist: "Urologist",
      icon: "🫘",
      description: "Combined back and abdominal pain may indicate kidney stones or urinary issues. A urologist can evaluate.",
      commonConditions: ["Kidney Stones", "Renal Colic", "UTI", "Hydronephrosis"],
      expectedTests: ["Ultrasound KUB", "CT KUB", "Urine Analysis", "Blood Creatinine"],
      urgency: "soon",
    },
  },
];
