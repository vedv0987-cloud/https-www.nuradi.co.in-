"use client";

const MARQUEE_ITEMS = [
  { emoji: "\u2714\uFE0F", bold: "Medically reviewed", text: "content" },
  { emoji: "\uD83D\uDD0D", bold: "130 medical reviewers", text: "in network" },
  { emoji: "\uD83C\uDFC6", bold: "19 years", text: "of experience" },
  { emoji: "\uD83D\uDCC8", bold: "50 million", text: "monthly readers" },
];

export function TrustBar() {
  return (
    <div className="overflow-hidden bg-[#e8f4f2] dark:bg-[#1a2e2b] border-b border-[#d0e8e4] dark:border-white/5">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-10 text-[13px] text-[#333] dark:text-white/70"
            >
              <span className="text-base">{item.emoji}</span>
              <span>
                <span className="font-semibold text-[#1a1a1a] dark:text-white/90">{item.bold}</span>{" "}
                {item.text}
              </span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
