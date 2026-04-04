"use client";

const MARQUEE_ITEMS = [
  { emoji: "\u2714\uFE0F", bold: "Medically reviewed", text: "content" },
  { emoji: "\uD83D\uDD0D", bold: "130 medical reviewers", text: "in network" },
  { emoji: "\uD83C\uDFC6", bold: "19 years", text: "of experience" },
  { emoji: "\uD83D\uDCCA", bold: "50 million", text: "monthly readers" },
  { emoji: "\u2714\uFE0F", bold: "Medically reviewed", text: "content" },
  { emoji: "\uD83D\uDD0D", bold: "130 medical reviewers", text: "in network" },
  { emoji: "\uD83C\uDFC6", bold: "19 years", text: "of experience" },
  { emoji: "\uD83D\uDCCA", bold: "50 million", text: "monthly readers" },
];

export function TrustBar() {
  return (
    <div className="overflow-hidden bg-[#2a2a2a] border-b border-white/5">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 mx-6 text-xs text-white/70"
          >
            <span className="text-sm">{item.emoji}</span>
            <span>
              <span className="font-semibold text-white/90">{item.bold}</span>{" "}
              {item.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
