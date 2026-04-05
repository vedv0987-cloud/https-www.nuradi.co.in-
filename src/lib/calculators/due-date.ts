export type DueDateMethod = "lmp" | "conception" | "ivf";

const BABY_SIZES: Record<number, { size: string; emoji: string }> = {
  4: { size: "poppy seed", emoji: "🫘" }, 5: { size: "sesame seed", emoji: "🌾" },
  6: { size: "lentil", emoji: "🫘" }, 7: { size: "blueberry", emoji: "🫐" },
  8: { size: "raspberry", emoji: "🫐" }, 9: { size: "cherry", emoji: "🍒" },
  10: { size: "strawberry", emoji: "🍓" }, 11: { size: "lime", emoji: "🍈" },
  12: { size: "plum", emoji: "🫐" }, 13: { size: "peach", emoji: "🍑" },
  14: { size: "lemon", emoji: "🍋" }, 15: { size: "apple", emoji: "🍎" },
  16: { size: "avocado", emoji: "🥑" }, 17: { size: "pomegranate", emoji: "🥭" },
  18: { size: "bell pepper", emoji: "🫑" }, 19: { size: "mango", emoji: "🥭" },
  20: { size: "banana", emoji: "🍌" }, 21: { size: "carrot", emoji: "🥕" },
  22: { size: "papaya", emoji: "🥭" }, 23: { size: "grapefruit", emoji: "🍊" },
  24: { size: "corn", emoji: "🌽" }, 25: { size: "cauliflower", emoji: "🥬" },
  26: { size: "lettuce", emoji: "🥬" }, 27: { size: "rutabaga", emoji: "🥔" },
  28: { size: "eggplant", emoji: "🍆" }, 29: { size: "butternut squash", emoji: "🎃" },
  30: { size: "cabbage", emoji: "🥬" }, 31: { size: "coconut", emoji: "🥥" },
  32: { size: "jicama", emoji: "🥔" }, 33: { size: "pineapple", emoji: "🍍" },
  34: { size: "cantaloupe", emoji: "🍈" }, 35: { size: "honeydew", emoji: "🍈" },
  36: { size: "romaine lettuce", emoji: "🥬" }, 37: { size: "swiss chard", emoji: "🥬" },
  38: { size: "leek", emoji: "🥬" }, 39: { size: "watermelon (mini)", emoji: "🍉" },
  40: { size: "watermelon", emoji: "🍉" },
};

export function getBabySize(week: number): { size: string; emoji: string } {
  const w = Math.max(4, Math.min(40, week));
  return BABY_SIZES[w] || BABY_SIZES[40];
}

export interface DueDateResult {
  dueDate: Date;
  daysToGo: number;
  weeksPregnant: number;
  daysPregnant: number;
  trimester: 1 | 2 | 3;
}

export function calculateDueDate(
  method: DueDateMethod,
  date: Date,
  cycleLength = 28
): DueDateResult {
  const d = new Date(date);
  let dueDate: Date;
  if (method === "lmp") {
    dueDate = new Date(d);
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
  } else if (method === "conception") {
    dueDate = new Date(d);
    dueDate.setDate(dueDate.getDate() + 266);
  } else {
    dueDate = new Date(d);
    dueDate.setDate(dueDate.getDate() + 261);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const MS = 1000 * 60 * 60 * 24;
  const daysToGo = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / MS));
  const totalDaysPregnant = 280 - daysToGo;
  const weeksPregnant = Math.max(0, Math.floor(totalDaysPregnant / 7));
  const daysPregnant = Math.max(0, totalDaysPregnant % 7);

  let trimester: 1 | 2 | 3 = 1;
  if (weeksPregnant >= 28) trimester = 3;
  else if (weeksPregnant >= 13) trimester = 2;

  return { dueDate, daysToGo, weeksPregnant, daysPregnant, trimester };
}

export const MILESTONES = [
  { week: 8, event: "First heartbeat detected ♥" },
  { week: 12, event: "End of 1st trimester — risk drops" },
  { week: 16, event: "You may feel baby move 👋" },
  { week: 20, event: "Anomaly scan (halfway mark!)" },
  { week: 24, event: "Baby viable outside womb" },
  { week: 28, event: "3rd trimester begins" },
  { week: 37, event: "Full term reached ✓" },
  { week: 40, event: "Due date! 🎉" },
];

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
