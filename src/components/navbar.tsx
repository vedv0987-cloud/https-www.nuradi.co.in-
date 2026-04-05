"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
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
  { href: "/dashboard", label: "📊 My Dashboard" },
  { href: "/helplines", label: "🚨 Emergency Helplines" },
  { href: "/tools/prescription-decoder", label: "📝 Prescription Decoder" },
  { href: "/tools", label: "🧰 All 34 Tools" },
  { href: "/tools/bmi", label: "BMI & Body Metrics" },
  { href: "/tools/biological-age", label: "Biological Age Calculator" },
  { href: "/tools/sleep-score", label: "Sleep Score" },
  { href: "/tools/gut-health", label: "Gut Health Score" },
  { href: "/tools/water-tracker", label: "Water Tracker" },
  { href: "/tools/mood-tracker", label: "Mood & Stress Tracker" },
  { href: "/tools/emergency-qr", label: "Emergency QR Card" },
  { href: "/tools/generic-medicine", label: "Generic Medicine Finder" },
  { href: "/tools/food-nutrition", label: "Food Nutrition Database" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/body-explorer", label: "Body Explorer" },
  { href: "/breathe", label: "Breathing Exercise" },
];

const VIDEO_LINKS = [
  { href: "/explore", label: "Explore All Videos" },
  { href: "/channels", label: "Top Channels" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/daily-dose", label: "Daily Dose" },
  { href: "/ai-insights", label: "AI Insights" },
  { href: "/health-news", label: "📰 Health News (Live)" },
];

const FEATURES_LINKS = [
  { href: "/first-aid", label: "First Aid Guide" },
  { href: "/quiz", label: "Health Quiz" },
  { href: "/home-remedies", label: "Home Remedies" },
  { href: "/myths", label: "Health Myths Busted" },
  { href: "/challenges", label: "30-Day Challenges" },
  { href: "/pregnancy", label: "Pregnancy Tracker" },
  { href: "/vaccination", label: "Vaccination Schedule" },
  { href: "/infographics", label: "Disease Infographics" },
  { href: "/exercises", label: "Exercise & Yoga Library" },
  { href: "/blog", label: "Health Blog" },
  { href: "/journal", label: "Symptom Diary" },
  { href: "/chat", label: "HealthBot AI" },
];

const NAV_ITEMS = [
  { key: "conditions", label: "Health Conditions" },
  { key: "wellness", label: "Wellness" },
  { key: "tools", label: "Tools" },
  { key: "features", label: "Features" },
  { key: "videos", label: "Health Videos" },
];

const MOBILE_ALL = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Health Videos" },
  { href: "/channels", label: "Channels" },
  { href: "/health-az", label: "Health A-Z" },
  { href: "/tools/bmi", label: "BMI Calculator" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/first-aid", label: "First Aid Guide" },
  { href: "/quiz", label: "Health Quiz" },
  { href: "/home-remedies", label: "Home Remedies" },
  { href: "/myths", label: "Health Myths" },
  { href: "/challenges", label: "30-Day Challenges" },
  { href: "/pregnancy", label: "Pregnancy Tracker" },
  { href: "/vaccination", label: "Vaccination Schedule" },
  { href: "/infographics", label: "Infographics" },
  { href: "/exercises", label: "Exercises" },
  { href: "/blog", label: "Blog" },
  { href: "/journal", label: "Symptom Diary" },
  { href: "/about", label: "About" },
];

export function Navbar() {
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
          <div className="max-w-[1600px] mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Health Conditions</h3>
              <Link href="/health-az" onClick={() => setOpenDropdown(null)} className="flex items-center gap-1 text-sm font-bold text-teal-700 hover:underline">
                ALL <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-x-12 gap-y-3">
              {HEALTH_CONDITIONS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpenDropdown(null)} className="text-sm text-[#333] hover:text-teal-700 transition-colors py-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "wellness":
        return (
          <div className="max-w-[1100px] mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Wellness</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {WELLNESS_LINKS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpenDropdown(null)} className="text-sm text-[#333] hover:text-teal-700 transition-colors py-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "tools":
        return (
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Health Tools</h3>
              <div className="flex gap-4">
                <Link href="/health-lab" onClick={() => setOpenDropdown(null)} className="flex items-center gap-1 text-sm font-bold text-teal-700 hover:underline">
                  ALL TOOLS <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/infographics" onClick={() => setOpenDropdown(null)} className="flex items-center gap-1 text-sm font-bold text-teal-700 hover:underline">
                  INFOGRAPHICS <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-12 gap-y-3">
              {TOOL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpenDropdown(null)} className="text-sm text-[#333] hover:text-teal-700 transition-colors py-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "features":
        return (
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Features</h3>
              <span className="text-xs font-semibold text-gray-500">13 tools & guides</span>
            </div>
            <div className="grid grid-cols-4 gap-x-10 gap-y-3">
              {FEATURES_LINKS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpenDropdown(null)} className="text-sm text-[#333] hover:text-teal-700 transition-colors py-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      case "videos":
        return (
          <div className="max-w-[1100px] mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-lg font-bold text-[#1a1a1a]">Health Videos</h3>
              <Link href="/explore" onClick={() => setOpenDropdown(null)} className="flex items-center gap-1 text-sm font-bold text-teal-700 hover:underline">
                ALL VIDEOS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {VIDEO_LINKS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpenDropdown(null)} className="text-sm text-[#333] hover:text-teal-700 transition-colors py-1">
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
      <nav className="bg-[#1a1a1a]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-[60px] flex items-center">
          {/* Logo — flush left */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/nuradihealth-white.svg"
              alt="NuradiHealth"
              width={200}
              height={36}
              className="h-[30px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links — with gap from logo */}
          <div className="hidden lg:flex items-center gap-0 ml-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() =>
                  setOpenDropdown(openDropdown === item.key ? null : item.key)
                }
                className={`flex items-center gap-1.5 px-5 py-2 text-[16px] font-bold tracking-[-0.01em] transition-colors ${
                  openDropdown === item.key
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === item.key ? "rotate-180" : ""
                  }`}
                />
              </button>
            ))}

            <Link
              href="/pricing"
              className="px-5 py-2 text-[16px] font-bold tracking-[-0.01em] text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
            >
              Pricing
              <span className="text-[9px] font-black uppercase tracking-wider bg-amber-400 text-[#1a1a1a] px-1.5 py-0.5 rounded">Pro</span>
            </Link>
            <Link
              href="/about"
              className="px-5 py-2 text-[16px] font-bold tracking-[-0.01em] text-white/90 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right side: Search only */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setOpenDropdown(null);
              }}
              className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setOpenDropdown(null);
              }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mega-menu dropdown panels */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block overflow-hidden bg-white border-b shadow-xl"
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
            className="overflow-hidden bg-white border-b shadow-lg"
          >
            <form onSubmit={handleSearch} className="max-w-[1000px] mx-auto px-4 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos, channels, conditions..."
                  className="pl-12 h-12 text-base rounded-full border-2 border-gray-200 focus-visible:ring-teal-600 focus-visible:border-teal-600"
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
                  className="block px-3 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
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
