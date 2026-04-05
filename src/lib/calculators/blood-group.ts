export const BLOOD_GROUPS = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] as const;
export type BloodGroup = typeof BLOOD_GROUPS[number];

// Who can give to whom (RBC transfusion)
// Rows = donor, Cols = recipient
const COMPAT: Record<BloodGroup, BloodGroup[]> = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], // universal donor
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"], // universal recipient
};

export function canDonateTo(donor: BloodGroup): BloodGroup[] {
  return COMPAT[donor];
}

export function canReceiveFrom(recipient: BloodGroup): BloodGroup[] {
  return BLOOD_GROUPS.filter((donor) => COMPAT[donor].includes(recipient));
}

// Punnett square for possible baby blood groups
// Parents' ABO genotypes are drawn from phenotype probabilities (simplified)
function aboGenotypes(phenotype: "A" | "B" | "AB" | "O"): string[] {
  if (phenotype === "A") return ["AA", "AO"];
  if (phenotype === "B") return ["BB", "BO"];
  if (phenotype === "AB") return ["AB"];
  return ["OO"];
}

function combineAbo(p1: string, p2: string): string[] {
  const children: string[] = [];
  for (const a1 of p1) for (const a2 of p2) {
    const pair = [a1, a2].sort((x, y) => x === "O" ? 1 : y === "O" ? -1 : x.localeCompare(y)).join("");
    children.push(pair);
  }
  return children;
}

function genotypeToPhenotype(g: string): "A" | "B" | "AB" | "O" {
  if (g === "AB") return "AB";
  if (g.includes("A")) return "A";
  if (g.includes("B")) return "B";
  return "O";
}

export interface BabyBloodGroup { group: BloodGroup; probability: number; }

export function predictBabyBloodGroup(p1: BloodGroup, p2: BloodGroup): BabyBloodGroup[] {
  const [abo1, rh1] = [p1.replace(/[+-]/, "") as "A" | "B" | "AB" | "O", p1.endsWith("+") ? "+" : "-"];
  const [abo2, rh2] = [p2.replace(/[+-]/, "") as "A" | "B" | "AB" | "O", p2.endsWith("+") ? "+" : "-"];

  const g1 = aboGenotypes(abo1);
  const g2 = aboGenotypes(abo2);

  // Average over all genotype pair combinations
  const counts: Record<string, number> = {};
  let total = 0;
  for (const genotype1 of g1) {
    for (const genotype2 of g2) {
      const childGenos = combineAbo(genotype1, genotype2);
      for (const child of childGenos) {
        const ph = genotypeToPhenotype(child);
        counts[ph] = (counts[ph] || 0) + 1;
        total++;
      }
    }
  }

  // Rh: if either parent is +/+, child is likely +. If both -/-, child is -.
  // Simplified: if both "-", child is "-". Else both "+" and "-" are possible.
  const rhResults: { rh: "+" | "-"; prob: number }[] =
    rh1 === "-" && rh2 === "-" ? [{ rh: "-", prob: 1 }]
    : rh1 === "+" && rh2 === "+" ? [{ rh: "+", prob: 0.75 }, { rh: "-", prob: 0.25 }]
    : [{ rh: "+", prob: 0.5 }, { rh: "-", prob: 0.5 }];

  const results: BabyBloodGroup[] = [];
  for (const [ph, count] of Object.entries(counts)) {
    const aboProb = count / total;
    for (const rhResult of rhResults) {
      const group = `${ph}${rhResult.rh}` as BloodGroup;
      const prob = Math.round(aboProb * rhResult.prob * 100);
      if (prob > 0) {
        const existing = results.find((r) => r.group === group);
        if (existing) existing.probability += prob;
        else results.push({ group, probability: prob });
      }
    }
  }

  return results.sort((a, b) => b.probability - a.probability);
}

export const GROUP_STATS: Record<BloodGroup, { prevalence: string; factoid: string }> = {
  "O+": { prevalence: "~38%", factoid: "Most common worldwide" },
  "O-": { prevalence: "~7%", factoid: "Universal donor" },
  "A+": { prevalence: "~34%", factoid: "Second most common" },
  "A-": { prevalence: "~6%", factoid: "Rare" },
  "B+": { prevalence: "~9%", factoid: "High in India" },
  "B-": { prevalence: "~2%", factoid: "Very rare" },
  "AB+": { prevalence: "~3%", factoid: "Universal recipient" },
  "AB-": { prevalence: "~1%", factoid: "Rarest blood group" },
};
