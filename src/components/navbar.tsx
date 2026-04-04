"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Wind,
  Calculator,
  Stethoscope,
  Heart,
  FlaskConical,
  Scale,
  Flame,
  Droplets,
  HeartPulse,
  Percent,
  PieChart,
  Timer,
  Brain,
  Dumbbell,
  Apple,
  Lightbulb,
  Atom,
  BookOpen,
  Activity,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = [
  {
    label: "Health Conditions",
    children: [
      { href: "/health-az", label: "Health A-Z", desc: "Browse all conditions", icon: Stethoscope },
      { href: "/health-az/category/cardiovascular", label: "Heart & Blood", desc: "Cardiovascular health", icon: Heart },
      { href: "/health-az/category/neurological", label: "Brain & Nerves", desc: "Neurological conditions", icon: Brain },
      { href: "/health-az/category/mental-health", label: "Mental Health", desc: "Anxiety, depression & more", icon: Activity },
      { href: "/health-az/category/digestive", label: "Digestive Health", desc: "Stomach & gut issues", icon: Apple },
      { href: "/health-az/category/endocrine", label: "Diabetes & Hormones", desc: "Metabolic conditions", icon: FlaskConical },
    ],
  },
  {
    label: "Wellness",
    children: [
      { href: "/category/fitness", label: "Fitness & Exercise", desc: "Workouts & training", icon: Dumbbell },
      { href: "/category/nutrition", label: "Nutrition & Diet", desc: "Eating well", icon: Apple },
      { href: "/category/mental-health", label: "Mental Well-Being", desc: "Stress & mindfulness", icon: Brain },
      { href: "/breathe", label: "Breathing Exercises", desc: "Guided breathing", icon: Wind },
      { href: "/category/personal-dev", label: "Personal Growth", desc: "Productivity & growth", icon: Lightbulb },
    ],
  },
  {
    label: "Tools",
    children: [
      { href: "/health-lab", label: "All Health Tools", desc: "8 interactive calculators", icon: FlaskConical },
      { href: "/health-lab/bmi", label: "BMI Calculator", desc: "Body Mass Index", icon: Scale },
      { href: "/health-lab/calories", label: "Calorie Calculator", desc: "Daily calorie needs", icon: Flame },
      { href: "/health-lab/macros", label: "Macro Calculator", desc: "Protein, carbs & fat", icon: PieChart },
      { href: "/health-lab/heart-rate", label: "Heart Rate Zones", desc: "Training zones", icon: HeartPulse },
      { href: "/body-explorer", label: "Body Explorer", desc: "Videos by organ", icon: Stethoscope },
    ],
  },
  {
    label: "Featured",
    children: [
      { href: "/explore", label: "Explore Videos", desc: "Browse all content", icon: BookOpen },
      { href: "/channels", label: "Top Channels", desc: "28 verified creators", icon: Atom },
      { href: "/learning-paths", label: "Learning Paths", desc: "Structured courses", icon: BookOpen },
      { href: "/ai-insights", label: "AI Insights", desc: "AI-powered analysis", icon: Lightbulb },
      { href: "/daily-dose", label: "Daily Dose", desc: "Daily health lesson", icon: Heart },
    ],
  },
];

const MOBILE_ALL = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/channels", label: "Channels" },
  { href: "/health-az", label: "Health A-Z" },
  { href: "/health-lab", label: "Health Tools" },
  { href: "/body-explorer", label: "Body Explorer" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/breathe", label: "Breathing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b">
      <nav
        ref={navRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src={theme === "dark" ? "/nuradihealth-on-dark.svg" : "/nuradihealth-on-light.svg"}
            alt="NuradiHealth"
            width={160}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === item.label ? null : item.label)
                }
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-muted text-foreground/80 hover:text-foreground",
                  openDropdown === item.label && "bg-muted text-foreground"
                )}
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    openDropdown === item.label && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-popover border rounded-xl shadow-xl p-2 z-50"
                  >
                    {item.children.map((child) => {
                      const Icon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{child.label}</p>
                            <p className="text-[11px] text-muted-foreground">
                              {child.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link
            href="/about"
            className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-48 pl-9 h-9 bg-muted/50 border-0 rounded-full focus-visible:ring-1"
            />
          </form>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full">
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-b overflow-hidden"
          >
            <form onSubmit={handleSearch} className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos, channels..."
                  className="pl-9 rounded-full"
                  autoFocus
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-b overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {MOBILE_ALL.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
