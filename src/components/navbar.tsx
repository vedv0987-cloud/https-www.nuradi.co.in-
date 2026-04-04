"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Menu, X, Sun, Moon, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";

const HEALTH_CONDITIONS = Object.values(DISEASE_CATEGORIES).map((c) => ({
  href: `/health-az/category/${c.id}`,
  label: c.label,
}));

const WELLNESS_LINKS = [
  { href: "/category/fitness", label: "Fitness & Exercise" },
  { href: "/category/nutrition", label: "Nutrition & Diet" },
  { href: "/category/mental-health", label: "Mental Well-Being" },
  { href: "/category/personal-dev", label: "Personal Growth" },
  { href: "/category/health", label: "Health & Wellness" },
  { href: "/category/science", label: "Science & Learning" },
];

const TOOL_LINKS = [
  { href: "/health-lab/bmi", label: "BMI Calculator" },
  { href: "/health-lab/calories", label: "Calorie Calculator" },
  { href: "/health-lab/macros", label: "Macro Calculator" },
  { href: "/health-lab/heart-rate", label: "Heart Rate Zones" },
  { href: "/health-lab/body-fat", label: "Body Fat Calculator" },
  { href: "/body-explorer", label: "Body Explorer" },
  { href: "/breathe", label: "Breathing Exercise" },
  { href: "/health-lab/sleep", label: "Sleep Calculator" },
  { href: "/health-lab/water", label: "Water Intake" },
];

const FEATURED_LINKS = [
  { href: "/explore", label: "Explore Videos" },
  { href: "/channels", label: "Top Channels" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/ai-insights", label: "AI Insights" },
  { href: "/daily-dose", label: "Daily Dose" },
  { href: "/news", label: "Health News" },
];

const NAV_ITEMS = [
  { key: "conditions", label: "Health Conditions" },
  { key: "wellness", label: "Wellness" },
  { key: "tools", label: "Tools" },
  { key: "featured", label: "Featured" },
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
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

  const renderDropdownContent = (key: string) => {
    switch (key) {
      case "conditions":
        return (
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white">Health Conditions</h3>
              <Link
                href="/health-az"
                onClick={() => setOpenDropdown(null)}
                className="flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline"
              >
                ALL <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-x-12 gap-y-3">
              {HEALTH_CONDITIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="text-sm text-[#333] dark:text-white/80 hover:text-teal-700 dark:hover:text-teal-400 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "wellness":
        return (
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white">Wellness</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {WELLNESS_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="text-sm text-[#333] dark:text-white/80 hover:text-teal-700 dark:hover:text-teal-400 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "tools":
        return (
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white">Health Tools</h3>
              <Link
                href="/health-lab"
                onClick={() => setOpenDropdown(null)}
                className="flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline"
              >
                ALL TOOLS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-x-12 gap-y-3">
              {TOOL_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="text-sm text-[#333] dark:text-white/80 hover:text-teal-700 dark:hover:text-teal-400 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "featured":
        return (
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-white">Featured</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {FEATURED_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className="text-sm text-[#333] dark:text-white/80 hover:text-teal-700 dark:hover:text-teal-400 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* Main navbar — always dark */}
      <nav className="bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-8">
          {/* Logo — left aligned */}
          <Link href="/" className="flex items-center flex-shrink-0 mr-2">
            <Image
              src="/nuradihealth-white.svg"
              alt="NuradiHealth"
              width={150}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links — next to logo */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() =>
                  setOpenDropdown(openDropdown === item.key ? null : item.key)
                }
                className={`flex items-center gap-1 px-4 py-1.5 text-[15px] font-bold transition-colors rounded ${
                  openDropdown === item.key
                    ? "text-white bg-white/10"
                    : "text-white hover:text-white/80"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === item.key ? "rotate-180" : ""
                  }`}
                />
              </button>
            ))}

            <Link
              href="/about"
              className="px-4 py-1.5 text-[15px] font-bold text-white hover:text-white/80 transition-colors rounded"
            >
              About
            </Link>
          </div>

          {/* Right side: Search + Theme Toggle */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search Icon */}
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setOpenDropdown(null);
              }}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Subtle Theme Toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-full text-white/40 hover:text-white/70 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setOpenDropdown(null);
              }}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mega-menu dropdown panels (desktop) */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block overflow-hidden bg-white dark:bg-[#222] border-b shadow-xl"
          >
            {renderDropdownContent(openDropdown)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden bg-white dark:bg-[#222] border-b shadow-lg"
          >
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto px-4 py-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos, channels, conditions..."
                  className="pl-12 h-12 text-base rounded-full border-2 focus-visible:ring-teal-600"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#1a1a1a] border-b border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {MOBILE_ALL.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
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
