// Smoking cost + life impact calculator
// 11 minutes of life lost per cigarette (CDC)

export interface SmokingInputs {
  cigarettesPerDay: number;
  pricePerCigarette: number; // INR
  yearsSmoking: number;
}

export interface SmokingResult {
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  lifetimeCost: number;
  future10yCost: number; // with 5% inflation
  totalCigarettesSmoked: number;
  minutesLost: number;
  daysLost: number;
  yearsLost: number;
  investmentValue: number; // if invested at 12%
}

export function calculateSmokingCost(i: SmokingInputs): SmokingResult {
  const dailyCost = i.cigarettesPerDay * i.pricePerCigarette;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;
  const lifetimeCost = yearlyCost * i.yearsSmoking;

  // 10 years future with 5% inflation, compounded
  let future10yCost = 0;
  let yrCost = yearlyCost;
  for (let y = 0; y < 10; y++) {
    future10yCost += yrCost;
    yrCost *= 1.05;
  }

  const totalCigarettesSmoked = i.cigarettesPerDay * 365 * i.yearsSmoking;
  const minutesLost = totalCigarettesSmoked * 11;
  const daysLost = minutesLost / (60 * 24);
  const yearsLost = daysLost / 365;

  // If yearly cost invested at 12% compound annually
  let investmentValue = 0;
  for (let y = 0; y < i.yearsSmoking; y++) {
    investmentValue = (investmentValue + yearlyCost) * 1.12;
  }

  return {
    dailyCost: Math.round(dailyCost),
    monthlyCost: Math.round(monthlyCost),
    yearlyCost: Math.round(yearlyCost),
    lifetimeCost: Math.round(lifetimeCost),
    future10yCost: Math.round(future10yCost),
    totalCigarettesSmoked: Math.round(totalCigarettesSmoked),
    minutesLost: Math.round(minutesLost),
    daysLost: Math.round(daysLost),
    yearsLost: +yearsLost.toFixed(1),
    investmentValue: Math.round(investmentValue),
  };
}

export interface Purchase {
  emoji: string;
  name: string;
  price: number;
  count: number;
}

export function buyableItems(budget: number): Purchase[] {
  const items = [
    { emoji: "📱", name: "iPhone 15", price: 80000 },
    { emoji: "🏍️", name: "Royal Enfield Classic", price: 200000 },
    { emoji: "✈️", name: "International trip", price: 100000 },
    { emoji: "💻", name: "MacBook Air M3", price: 120000 },
    { emoji: "💍", name: "Gold (10g)", price: 65000 },
    { emoji: "📚", name: "Books (₹500 each)", price: 500 },
  ];
  return items
    .map((item) => ({ ...item, count: Math.floor(budget / item.price) }))
    .filter((item) => item.count > 0)
    .slice(0, 4);
}

export const DAMAGE_TIMELINE = [
  { years: 1, event: "Lung function drops ~5%", color: "#ef4444" },
  { years: 5, event: "Heart attack risk doubled", color: "#ef4444" },
  { years: 10, event: "Lung cancer risk 10x non-smoker", color: "#dc2626" },
  { years: 20, event: "COPD typically develops", color: "#991b1b" },
  { years: 30, event: "Life expectancy reduced ~10 yrs", color: "#7f1d1d" },
];

export const RECOVERY_TIMELINE = [
  { time: "20 mins", event: "Heart rate & BP drop", color: "#10b981" },
  { time: "12 hrs", event: "CO in blood normalizes", color: "#10b981" },
  { time: "2 weeks", event: "Circulation improves", color: "#10b981" },
  { time: "1 month", event: "Coughing, breath better", color: "#14b8a6" },
  { time: "1 year", event: "Heart disease risk halved", color: "#06b6d4" },
  { time: "5 years", event: "Stroke risk = non-smoker", color: "#06b6d4" },
  { time: "10 years", event: "Lung cancer risk halved", color: "#0891b2" },
  { time: "15 years", event: "Heart risk = never smoked", color: "#0e7490" },
];
