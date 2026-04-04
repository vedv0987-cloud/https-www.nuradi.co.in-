import bodyPartsVideos from "./body-parts-videos.json";

export interface BodyPart {
  id: string;
  name: string;
  color: string;
  bg: string;
  bgDark: string;
  searchTerms: string;
  videoCount: number;
}

const BODY_PARTS_RAW: Omit<BodyPart, "videoCount">[] = [
  { id: "brain",        name: "Brain",              color: "#7F77DD", bg: "#EEEDFE", bgDark: "#3C3489", searchTerms: "brain neuroscience neurology memory alzheimer stroke" },
  { id: "heart",        name: "Heart",              color: "#D85A30", bg: "#FAECE7", bgDark: "#712B13", searchTerms: "heart cardiovascular blood pressure heart attack cholesterol" },
  { id: "lungs",        name: "Lungs",              color: "#378ADD", bg: "#E6F1FB", bgDark: "#0C447C", searchTerms: "lungs respiratory breathing asthma pneumonia COPD" },
  { id: "liver",        name: "Liver",              color: "#BA7517", bg: "#FAEEDA", bgDark: "#633806", searchTerms: "liver fatty liver cirrhosis hepatitis detox bile" },
  { id: "kidneys",      name: "Kidneys",            color: "#E24B4A", bg: "#FCEBEB", bgDark: "#791F1F", searchTerms: "kidney renal kidney stones dialysis CKD" },
  { id: "stomach",      name: "Stomach",            color: "#639922", bg: "#EAF3DE", bgDark: "#27500A", searchTerms: "stomach digestion gastritis acid reflux GERD ulcer" },
  { id: "pancreas",     name: "Pancreas",           color: "#D4537E", bg: "#FBEAF0", bgDark: "#72243E", searchTerms: "pancreas insulin diabetes type 1 type 2 blood sugar" },
  { id: "intestines",   name: "Intestines",         color: "#639922", bg: "#EAF3DE", bgDark: "#27500A", searchTerms: "intestines gut health microbiome IBS colon probiotics" },
  { id: "eyes",         name: "Eyes",               color: "#378ADD", bg: "#E6F1FB", bgDark: "#0C447C", searchTerms: "eyes vision ophthalmology retina LASIK glaucoma" },
  { id: "thyroid",      name: "Thyroid",            color: "#1D9E75", bg: "#E1F5EE", bgDark: "#085041", searchTerms: "thyroid hormones hypothyroidism hyperthyroidism metabolism" },
  { id: "spine",        name: "Spine",              color: "#888780", bg: "#F1EFE8", bgDark: "#444441", searchTerms: "spine spinal cord back pain posture herniated disc sciatica" },
  { id: "muscles",      name: "Muscles",            color: "#D85A30", bg: "#FAECE7", bgDark: "#712B13", searchTerms: "muscles strength training hypertrophy protein exercise" },
  { id: "skin",         name: "Skin",               color: "#D4537E", bg: "#FBEAF0", bgDark: "#72243E", searchTerms: "skin dermatology acne eczema psoriasis skincare melanoma" },
  { id: "bones",        name: "Bones",              color: "#B4B2A9", bg: "#F1EFE8", bgDark: "#444441", searchTerms: "bones skeleton osteoporosis arthritis fracture calcium" },
  { id: "blood",        name: "Blood",              color: "#E24B4A", bg: "#FCEBEB", bgDark: "#791F1F", searchTerms: "blood circulatory anemia hemoglobin blood type platelet" },
  { id: "immune",       name: "Immune System",      color: "#1D9E75", bg: "#E1F5EE", bgDark: "#085041", searchTerms: "immune system immunity vaccines inflammation autoimmune" },
  { id: "teeth",        name: "Teeth",              color: "#888780", bg: "#F1EFE8", bgDark: "#444441", searchTerms: "teeth dental oral health gums cavity root canal" },
  { id: "ears",         name: "Ears",               color: "#378ADD", bg: "#E6F1FB", bgDark: "#0C447C", searchTerms: "ears hearing tinnitus ear infection balance vertigo" },
  { id: "hormones",     name: "Hormones",           color: "#7F77DD", bg: "#EEEDFE", bgDark: "#3C3489", searchTerms: "hormones endocrine testosterone estrogen cortisol PCOS" },
  { id: "reproductive", name: "Reproductive",       color: "#D4537E", bg: "#FBEAF0", bgDark: "#72243E", searchTerms: "reproductive fertility pregnancy menstruation menopause" },
];

export const bodyParts: BodyPart[] = BODY_PARTS_RAW.map((bp) => ({
  ...bp,
  videoCount:
    (bodyPartsVideos as Record<string, { videoCount: number }>)[bp.id]
      ?.videoCount || 0,
}));
