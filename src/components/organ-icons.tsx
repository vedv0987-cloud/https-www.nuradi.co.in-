// Clean, color-filled SVG organ icons for Body Explorer
// Each icon is a filled, solid-color SVG — no outlines, no strokes

export function BrainIcon({ color = "#7F77DD", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C24 8 18 12 16 18c-3 0-6 2-7 5s0 7 2 9c-2 2-3 5-2 8s3 5 6 6c0 3 2 6 5 7s6 1 8-1c2 2 5 3 8 3s6-1 8-3c2 2 5 2 8 1s5-4 5-7c3-1 5-3 6-6s0-6-2-8c2-2 3-6 2-9s-4-5-7-5c-2-6-8-10-16-10z" fill={color} />
      <path d="M32 18v28M24 22c0 4 3 6 8 6M40 22c0 4-3 6-8 6M22 32c3 0 6 2 10 2M42 32c-3 0-6 2-10 2M24 40c2-2 5-3 8-3M40 40c-2-2-5-3-8-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function HeartIcon({ color = "#D85A30", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 52c-1 0-2-.4-2.8-1.2C18 40.4 10 33 10 24.5 10 18 15 13 21.5 13c3.7 0 7.3 1.8 9.5 4.5h2c2.2-2.7 5.8-4.5 9.5-4.5C49 13 54 18 54 24.5c0 8.5-8 16-19.2 26.3-.8.8-1.8 1.2-2.8 1.2z" fill={color} />
      <path d="M26 16c-2 1-4 3-5 6M22 28c1 2 3 3 5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M32 18v6l3 4-3 4v8l-4 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

export function LungsIcon({ color = "#378ADD", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10v20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M32 20l-8 6c-4 3-7 8-8 14-1 4-1 8 1 10s5 3 9 2c3-1 6-3 6-6V30" fill={color} opacity="0.85" />
      <path d="M32 20l8 6c4 3 7 8 8 14 1 4 1 8-1 10s-5 3-9 2c-3-1-6-3-6-6V30" fill={color} />
      <path d="M24 30c-2 2-4 6-4 10M40 30c2 2 4 6 4 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function LiverIcon({ color = "#BA7517", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 28c0-8 6-14 14-16 4-1 10-1 16 2 5 3 8 7 9 12 1 6-1 12-4 16-4 5-10 8-17 8-6 0-11-2-14-6-3-4-4-10-4-16z" fill={color} />
      <path d="M30 14c-2 6-2 14 0 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M30 14l4-2" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function KidneysIcon({ color = "#E24B4A", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 16c-6 0-10 5-10 12 0 5 2 10 5 14 2 3 5 5 8 5 4 0 6-3 6-7 0-3-1-5-3-7 2-2 3-5 3-8 0-5-4-9-9-9z" fill={color} />
      <path d="M44 16c6 0 10 5 10 12 0 5-2 10-5 14-2 3-5 5-8 5-4 0-6-3-6-7 0-3 1-5 3-7-2-2-3-5-3-8 0-5 4-9 9-9z" fill={color} opacity="0.85" />
      <path d="M26 32h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M29 32v10M35 32v10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StomachIcon({ color = "#639922", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 10h8c4 0 7 3 7 7v4c0 6-3 11-8 14-4 2-6 6-6 10v6c0 2-2 4-4 4s-4-2-4-4v-4c0-6 2-10 6-14 3-3 5-7 5-11v-4c0-2-1-3-3-3h-8c-2 0-3 1-3 3v2" fill={color} />
      <path d="M20 22c-4 2-7 6-7 12 0 5 3 9 7 10" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M26 24c0 4-2 7-4 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function PancreasIcon({ color = "#D4537E", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 28c0-4 3-7 7-7h4c3 0 5 1 7 3l4 4c2 2 5 3 8 3h6c4 0 7 3 7 7s-3 7-7 7h-2c-4 0-7-2-9-5l-2-3c-2-2-4-3-7-3h-8c-4 0-7-3-7-6z" fill={color} />
      <path d="M19 24c0 3 2 5 4 5M44 34c-2 0-4 2-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function IntestinesIcon({ color = "#639922", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8v6" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M20 18c0-2 2-4 4-4h16c2 0 4 2 4 4v4c0 2-2 4-4 4H24c-2 0-4 2-4 4v0c0 2 2 4 4 4h16c2 0 4 2 4 4v0c0 2-2 4-4 4H24c-2 0-4 2-4 4v0c0 2 2 4 4 4h8" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="52" r="4" fill={color} opacity="0.6" />
    </svg>
  );
}

export function EyeIcon({ color = "#378ADD", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 18c-14 0-22 14-22 14s8 14 22 14 22-14 22-14-8-14-22-14z" fill={color} opacity="0.2" />
      <circle cx="32" cy="32" r="12" fill="white" />
      <circle cx="32" cy="32" r="9" fill={color} />
      <circle cx="32" cy="32" r="4" fill="#1a1a2e" />
      <circle cx="29" cy="28" r="2" fill="white" opacity="0.7" />
    </svg>
  );
}

export function ThyroidIcon({ color = "#1D9E75", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8v48" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M18 22c-4 2-6 6-6 11s2 9 6 11c3 2 7 2 10 0l4-3 4 3c3 2 7 2 10 0 4-2 6-6 6-11s-2-9-6-11c-3-2-7-2-10 0l-4 3-4-3c-3-2-7-2-10 0z" fill={color} />
      <path d="M24 30c0 3 2 5 4 5M40 30c0 3-2 5-4 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function SpineIcon({ color = "#888780", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[10, 20, 30, 40, 50].map((y, i) => (
        <g key={i}>
          <rect x="24" y={y} width="16" height="7" rx="3" fill={color} />
          <rect x="28" y={y + 7} width="8" height="3" rx="1.5" fill={color} opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

export function MusclesIcon({ color = "#D85A30", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12c-2 0-4 1-5 3l-4 10c-1 3 0 6 2 8l6 6c1 1 2 3 2 5v10c0 2 2 4 4 4h2c2 0 4-2 4-4V42c0-3-1-6-3-8l-4-4 3-8c1-2 3-3 5-3" fill={color} opacity="0.8" />
      <path d="M42 12c2 0 4 1 5 3l4 10c1 3 0 6-2 8l-6 6c-1 1-2 3-2 5v10c0 2-2 4-4 4h-2c-2 0-4-2-4-4V42c0-3 1-6 3-8l4-4-3-8c-1-2-3-3-5-3" fill={color} />
      <ellipse cx="32" cy="26" rx="8" ry="10" fill={color} />
      <path d="M28 22c2 2 6 2 8 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function SkinIcon({ color = "#D4537E", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="14" rx="2" fill={color} />
      <rect x="8" y="26" width="48" height="14" rx="0" fill={color} opacity="0.6" />
      <rect x="8" y="40" width="48" height="14" rx="2" fill={color} opacity="0.35" />
      <path d="M20 12v-2c0-1 1-2 2-2s2 1 2 2v4M36 12v-4c0-1 1-2 2-2s2 1 2 2v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="34" r="2" fill="white" opacity="0.3" />
      <circle cx="40" cy="48" r="3" fill="white" opacity="0.2" />
    </svg>
  );
}

export function BonesIcon({ color = "#B4B2A9", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 10c-3 0-6 2-6 5s2 5 5 5h2v24h-2c-3 0-5 2-5 5s3 5 6 5c2 0 4-1 5-3 1 2 3 3 5 3 3 0 6-2 6-5s-2-5-5-5h-2V20h2c3 0 5-2 5-5s-3-5-6-5c-2 0-4 1-5 3-1-2-3-3-5-3z" fill={color} />
      <path d="M38 10c-2 0-3 1-4 3 1-2 3-3 5-3 3 0 6 2 6 5s-2 5-5 5h-2v24h2c3 0 5 2 5 5s-3 5-6 5c-2 0-4-1-5-3 1 2 2 3 4 3" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function BloodIcon({ color = "#E24B4A", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="28" rx="10" ry="5" fill={color} />
      <ellipse cx="22" cy="28" rx="6" ry="2" fill={color} opacity="0.5" />
      <ellipse cx="40" cy="22" rx="8" ry="4" fill={color} opacity="0.8" transform="rotate(-20 40 22)" />
      <ellipse cx="40" cy="22" rx="5" ry="1.5" fill={color} opacity="0.4" transform="rotate(-20 40 22)" />
      <ellipse cx="30" cy="42" rx="11" ry="5.5" fill={color} opacity="0.9" transform="rotate(10 30 42)" />
      <ellipse cx="30" cy="42" rx="7" ry="2.5" fill={color} opacity="0.4" transform="rotate(10 30 42)" />
      <circle cx="50" cy="38" r="4" fill="white" opacity="0.9" />
      <circle cx="50" cy="38" r="2.5" fill={color} opacity="0.3" />
    </svg>
  );
}

export function ImmuneIcon({ color = "#1D9E75", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6l20 10v16c0 12-8 20-20 26C20 52 12 44 12 32V16L32 6z" fill={color} />
      <path d="M28 28h8M32 24v8" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="18" r="3" fill={color} opacity="0.4" />
      <circle cx="48" cy="18" r="3" fill={color} opacity="0.4" />
      <circle cx="14" cy="36" r="2" fill={color} opacity="0.3" />
      <circle cx="50" cy="36" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

export function TeethIcon({ color = "#888780", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12h20c4 0 7 3 7 7v6c0 4-2 8-5 10l-2 2v14c0 3-2 5-5 5s-5-3-5-5V44h-1v8c0 3-2 5-5 5s-5-2-5-5V37l-2-2c-3-2-5-6-5-10v-6c0-4 3-7 7-7z" fill="white" stroke={color} strokeWidth="2" />
      <path d="M28 14v8M36 14v8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function EarsIcon({ color = "#378ADD", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 14c8 0 14 7 14 16 0 6-3 11-7 14-2 2-3 4-3 7v5c0 2-2 4-4 4s-4-2-4-4v-5c0-4 2-8 5-11 3-2 5-6 5-10 0-6-4-10-8-10" fill={color} />
      <path d="M38 22c4 0 6 3 6 8s-3 9-6 11" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M18 30c0-8 5-16 14-16" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="22" cy="34" r="6" fill={color} opacity="0.3" />
      <path d="M20 30c0 2 1 4 3 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function HormonesIcon({ color = "#7F77DD", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8l4 12-8 8 8 8-4 12h4l4-10 4 4 4-4 4 10h4l-4-12 8-8-8-8 4-12h-4l-4 10-4-4-4 4-4-10h-4z" fill={color} opacity="0.15" />
      <circle cx="32" cy="20" r="5" fill={color} />
      <circle cx="22" cy="32" r="4" fill={color} opacity="0.7" />
      <circle cx="42" cy="32" r="4" fill={color} opacity="0.7" />
      <circle cx="32" cy="44" r="5" fill={color} opacity="0.85" />
      <path d="M32 25v14M27 32h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="28" y1="23" x2="25" y2="29" stroke={color} strokeWidth="2" />
      <line x1="36" y1="23" x2="39" y2="29" stroke={color} strokeWidth="2" />
      <line x1="25" y1="35" x2="28" y2="41" stroke={color} strokeWidth="2" />
      <line x1="39" y1="35" x2="36" y2="41" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function ReproductiveIcon({ color = "#D4537E", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 14c2-3 5-5 10-5s8 2 10 5c1 2 2 5 1 8l-2 6c-1 3-1 5-1 8v14c0 2-2 4-4 4h-8c-2 0-4-2-4-4V41c0-3 0-5-1-8l-2-6c-1-3 0-6 1-8z" fill={color} opacity="0.8" />
      <path d="M22 14c-4 1-7 4-8 8-1 3 0 6 2 8l6 4" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M42 14c4 1 7 4 8 8 1 3 0 6-2 8l-6 4" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="18" r="4" fill={color} opacity="0.5" />
      <circle cx="50" cy="18" r="4" fill={color} opacity="0.5" />
    </svg>
  );
}

// Icon component map
export const ORGAN_ICONS: Record<string, React.FC<{ color?: string; size?: number }>> = {
  brain: BrainIcon,
  heart: HeartIcon,
  lungs: LungsIcon,
  liver: LiverIcon,
  kidneys: KidneysIcon,
  stomach: StomachIcon,
  pancreas: PancreasIcon,
  intestines: IntestinesIcon,
  eyes: EyeIcon,
  thyroid: ThyroidIcon,
  spine: SpineIcon,
  muscles: MusclesIcon,
  skin: SkinIcon,
  bones: BonesIcon,
  blood: BloodIcon,
  immune: ImmuneIcon,
  teeth: TeethIcon,
  ears: EarsIcon,
  hormones: HormonesIcon,
  reproductive: ReproductiveIcon,
};
