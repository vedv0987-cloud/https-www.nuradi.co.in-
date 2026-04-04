"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, Phone, Star, Building2, Shield, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Hospital {
  id: number;
  name: string;
  city: string;
  state: string;
  type: string;
  specialties: string[];
  beds: number;
  rating: number;
  phone: string;
  address: string;
  emergency: boolean;
}

const hospitals: Hospital[] = [
  // Mumbai (5)
  {
    id: 1,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics"],
    beds: 750,
    rating: 4.7,
    phone: "+912230999999",
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai 400053",
    emergency: true,
  },
  {
    id: 2,
    name: "Fortis Hospital Mulund",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Private",
    specialties: ["Cardiac Surgery", "Nephrology", "Gastroenterology"],
    beds: 300,
    rating: 4.4,
    phone: "+912267116711",
    address: "Mulund Goregaon Link Road, Mulund West, Mumbai 400078",
    emergency: true,
  },
  {
    id: 3,
    name: "Lilavati Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Trust",
    specialties: ["Cardiology", "Neurosurgery", "Urology", "Pediatrics"],
    beds: 323,
    rating: 4.5,
    phone: "+912226751000",
    address: "A-791, Bandra Reclamation, Bandra West, Mumbai 400050",
    emergency: true,
  },
  {
    id: 4,
    name: "KEM Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    specialties: ["General Medicine", "Surgery", "Orthopedics", "Obstetrics"],
    beds: 1800,
    rating: 4.1,
    phone: "+912224136051",
    address: "Acharya Donde Marg, Parel, Mumbai 400012",
    emergency: true,
  },
  {
    id: 5,
    name: "Hinduja Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Trust",
    specialties: ["Oncology", "Transplant Surgery", "Pulmonology"],
    beds: 351,
    rating: 4.5,
    phone: "+912224447575",
    address: "Veer Savarkar Marg, Mahim, Mumbai 400016",
    emergency: true,
  },
  // Delhi (5)
  {
    id: 6,
    name: "AIIMS Delhi",
    city: "Delhi",
    state: "Delhi",
    type: "Government",
    specialties: ["Cardiology", "Neurology", "Oncology", "Trauma", "Pediatrics"],
    beds: 2478,
    rating: 4.6,
    phone: "+911126588500",
    address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029",
    emergency: true,
  },
  {
    id: 7,
    name: "Max Super Speciality Hospital Saket",
    city: "Delhi",
    state: "Delhi",
    type: "Private",
    specialties: ["Cardiac Sciences", "Neurosciences", "Oncology", "Orthopedics"],
    beds: 500,
    rating: 4.5,
    phone: "+911126515050",
    address: "1, 2, Press Enclave Road, Saket, New Delhi 110017",
    emergency: true,
  },
  {
    id: 8,
    name: "Sir Ganga Ram Hospital",
    city: "Delhi",
    state: "Delhi",
    type: "Trust",
    specialties: ["Gastroenterology", "Nephrology", "Cardiology", "Pulmonology"],
    beds: 675,
    rating: 4.4,
    phone: "+911125750000",
    address: "Rajinder Nagar, New Delhi 110060",
    emergency: true,
  },
  {
    id: 9,
    name: "Safdarjung Hospital",
    city: "Delhi",
    state: "Delhi",
    type: "Government",
    specialties: ["General Medicine", "Surgery", "Orthopedics", "Burns"],
    beds: 1531,
    rating: 4.0,
    phone: "+911126730000",
    address: "Ansari Nagar West, New Delhi 110029",
    emergency: true,
  },
  {
    id: 10,
    name: "Medanta - The Medicity",
    city: "Delhi",
    state: "Haryana",
    type: "Private",
    specialties: ["Heart Institute", "Neurosciences", "Cancer Institute", "Kidney & Urology"],
    beds: 1250,
    rating: 4.6,
    phone: "+911248834111",
    address: "CH Baktawar Singh Road, Sector 38, Gurgaon 122001",
    emergency: true,
  },
  // Bangalore (4)
  {
    id: 11,
    name: "Manipal Hospital Old Airport Road",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    specialties: ["Cardiology", "Oncology", "Neurology", "Transplant"],
    beds: 600,
    rating: 4.5,
    phone: "+918025023456",
    address: "98, HAL Old Airport Road, Bangalore 560017",
    emergency: true,
  },
  {
    id: 12,
    name: "Narayana Health City",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    specialties: ["Cardiac Surgery", "Nephrology", "Oncology", "Pediatrics"],
    beds: 900,
    rating: 4.4,
    phone: "+918071222222",
    address: "258/A, Bommasandra Industrial Area, Hosur Road, Bangalore 560099",
    emergency: true,
  },
  {
    id: 13,
    name: "St. John's Medical College Hospital",
    city: "Bangalore",
    state: "Karnataka",
    type: "Trust",
    specialties: ["General Medicine", "Surgery", "Pediatrics", "Dermatology"],
    beds: 1200,
    rating: 4.3,
    phone: "+918022065000",
    address: "Sarjapur Road, Koramangala, Bangalore 560034",
    emergency: true,
  },
  {
    id: 14,
    name: "Aster CMI Hospital",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    specialties: ["Orthopedics", "Neurosurgery", "Gastroenterology"],
    beds: 500,
    rating: 4.3,
    phone: "+918043424242",
    address: "43/2, New Airport Road, NH 44, Sahakara Nagar, Bangalore 560092",
    emergency: true,
  },
  // Chennai (4)
  {
    id: 15,
    name: "Apollo Hospitals Greams Road",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    specialties: ["Cardiology", "Oncology", "Transplant", "Neurology", "Orthopedics"],
    beds: 710,
    rating: 4.6,
    phone: "+914428293333",
    address: "21, Greams Lane, Off Greams Road, Chennai 600006",
    emergency: true,
  },
  {
    id: 16,
    name: "CMC Vellore",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Trust",
    specialties: ["Hematology", "Nephrology", "Neurology", "Endocrinology"],
    beds: 2700,
    rating: 4.7,
    phone: "+914162282010",
    address: "Ida Scudder Road, Vellore, Tamil Nadu 632004",
    emergency: true,
  },
  {
    id: 17,
    name: "MIOT International",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    specialties: ["Orthopedics", "Joint Replacement", "Spine Surgery", "Trauma"],
    beds: 600,
    rating: 4.4,
    phone: "+914422491099",
    address: "4/112, Mount Poonamallee Road, Manapakkam, Chennai 600089",
    emergency: true,
  },
  {
    id: 18,
    name: "Stanley Medical College Hospital",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Government",
    specialties: ["General Medicine", "Surgery", "Pediatrics", "Obstetrics"],
    beds: 1425,
    rating: 4.0,
    phone: "+914425281265",
    address: "Old Jail Road, Royapuram, Chennai 600001",
    emergency: true,
  },
  // Hyderabad (3)
  {
    id: 19,
    name: "Narayana Superspeciality Hospital",
    city: "Hyderabad",
    state: "Telangana",
    type: "Private",
    specialties: ["Cardiac Surgery", "Cardiology", "Nephrology", "Urology"],
    beds: 220,
    rating: 4.3,
    phone: "+914023567890",
    address: "Kuthbiguda, Langehouse, Hyderabad 500012",
    emergency: true,
  },
  {
    id: 20,
    name: "NIMS Hospital",
    city: "Hyderabad",
    state: "Telangana",
    type: "Government",
    specialties: ["Neurology", "Cardiology", "Oncology", "Nephrology"],
    beds: 1450,
    rating: 4.2,
    phone: "+914023390999",
    address: "Punjagutta, Hyderabad 500082",
    emergency: true,
  },
  {
    id: 21,
    name: "Yashoda Hospitals Somajiguda",
    city: "Hyderabad",
    state: "Telangana",
    type: "Private",
    specialties: ["Gastroenterology", "Pulmonology", "Nephrology", "Orthopedics"],
    beds: 500,
    rating: 4.4,
    phone: "+914040244444",
    address: "Raj Bhavan Road, Somajiguda, Hyderabad 500082",
    emergency: false,
  },
  // Kolkata (3)
  {
    id: 22,
    name: "SSKM Hospital",
    city: "Kolkata",
    state: "West Bengal",
    type: "Government",
    specialties: ["General Medicine", "Surgery", "Orthopedics", "Cardiology"],
    beds: 1775,
    rating: 4.1,
    phone: "+913322041101",
    address: "244, AJC Bose Road, Kolkata 700020",
    emergency: true,
  },
  {
    id: 23,
    name: "Apollo Gleneagles Hospital",
    city: "Kolkata",
    state: "West Bengal",
    type: "Private",
    specialties: ["Cardiac Sciences", "Neurosciences", "Orthopedics", "Oncology"],
    beds: 510,
    rating: 4.4,
    phone: "+913323203040",
    address: "58, Canal Circular Road, Kadapara, Kolkata 700054",
    emergency: true,
  },
  {
    id: 24,
    name: "Fortis Hospital Anandapur",
    city: "Kolkata",
    state: "West Bengal",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Urology", "Gastroenterology"],
    beds: 400,
    rating: 4.3,
    phone: "+913366284444",
    address: "730, Anandapur, EM Bypass Road, Kolkata 700107",
    emergency: true,
  },
  // Pune (3)
  {
    id: 25,
    name: "Ruby Hall Clinic",
    city: "Pune",
    state: "Maharashtra",
    type: "Trust",
    specialties: ["Cardiology", "Nephrology", "Oncology", "Neurology"],
    beds: 550,
    rating: 4.4,
    phone: "+912026163391",
    address: "40, Sassoon Road, Pune 411001",
    emergency: true,
  },
  {
    id: 26,
    name: "Sahyadri Super Speciality Hospital",
    city: "Pune",
    state: "Maharashtra",
    type: "Private",
    specialties: ["Joint Replacement", "Spine Surgery", "Cardiology", "Neurosurgery"],
    beds: 340,
    rating: 4.3,
    phone: "+912067210000",
    address: "Plot No 30-C, Karve Road, Deccan Gymkhana, Pune 411004",
    emergency: true,
  },
  {
    id: 27,
    name: "Sassoon General Hospital",
    city: "Pune",
    state: "Maharashtra",
    type: "Government",
    specialties: ["General Medicine", "Surgery", "Trauma", "Pediatrics"],
    beds: 1300,
    rating: 3.9,
    phone: "+912026128000",
    address: "Sassoon Road, Near Pune Railway Station, Pune 411001",
    emergency: true,
  },
  // Ahmedabad (3)
  {
    id: 28,
    name: "Civil Hospital Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "Government",
    specialties: ["General Medicine", "Surgery", "Pediatrics", "Obstetrics"],
    beds: 2000,
    rating: 4.0,
    phone: "+917922680721",
    address: "Asarwa, Ahmedabad 380016",
    emergency: true,
  },
  {
    id: 29,
    name: "Sterling Hospital",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "Private",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
    beds: 300,
    rating: 4.3,
    phone: "+917926300000",
    address: "Off Gurukul Road, Memnagar, Ahmedabad 380052",
    emergency: true,
  },
  {
    id: 30,
    name: "HCG Cancer Centre",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "Private",
    specialties: ["Oncology", "Radiation Therapy", "Surgical Oncology", "Hematology"],
    beds: 200,
    rating: 4.5,
    phone: "+917940003000",
    address: "Sola Science City Road, Sola, Ahmedabad 380060",
    emergency: false,
  },
];

const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"];
const types = ["All", "Government", "Private", "Trust"];
const sortOptions = ["Rating", "Name", "Beds"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.round(rating)
              ? "fill-white text-white"
              : "fill-none text-neutral-600"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-neutral-400">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function HospitalsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = hospitals.filter((h) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.specialties.some((s) => s.toLowerCase().includes(q));
      const matchesCity = city === "All" || h.city === city;
      const matchesType = type === "All" || h.type === type;
      const matchesEmergency = !emergencyOnly || h.emergency;
      return matchesSearch && matchesCity && matchesType && matchesEmergency;
    });

    result.sort((a, b) => {
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Beds") return b.beds - a.beds;
      return 0;
    });

    return result;
  }, [search, city, type, emergencyOnly, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-7 w-7 text-white" />
            <h1 className="text-2xl font-bold tracking-tight">Hospital & Clinic Finder</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              placeholder="Search by hospital name, city, or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-white"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <span className="text-sm text-neutral-500">
            {filtered.length} hospital{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 rounded-lg border border-neutral-800 bg-neutral-950">
                {/* City */}
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-xs uppercase tracking-wider">City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-700">
                      {cities.map((c) => (
                        <SelectItem key={c} value={c} className="text-white focus:bg-neutral-800 focus:text-white">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-xs uppercase tracking-wider">Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-700">
                      {types.map((t) => (
                        <SelectItem key={t} value={t} className="text-white focus:bg-neutral-800 focus:text-white">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-xs uppercase tracking-wider">Sort by</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-700">
                      {sortOptions.map((s) => (
                        <SelectItem key={s} value={s} className="text-white focus:bg-neutral-800 focus:text-white">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Emergency Toggle */}
                <div className="space-y-2">
                  <Label className="text-neutral-400 text-xs uppercase tracking-wider">Emergency</Label>
                  <div className="flex items-center gap-3 pt-1">
                    <Switch
                      checked={emergencyOnly}
                      onCheckedChange={setEmergencyOnly}
                    />
                    <span className="text-sm text-neutral-300">24/7 Emergency only</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hospital Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((hospital) => (
              <motion.div
                key={hospital.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-600 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      {/* Left */}
                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Title row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-semibold text-white truncate">
                            {hospital.name}
                          </h2>
                          <Badge
                            variant="outline"
                            className={
                              hospital.type === "Government"
                                ? "border-neutral-500 text-neutral-300"
                                : hospital.type === "Private"
                                ? "border-white text-white"
                                : "border-neutral-400 text-neutral-300"
                            }
                          >
                            {hospital.type}
                          </Badge>
                          {hospital.emergency && (
                            <Badge className="bg-red-600 text-white hover:bg-red-700 border-none">
                              <Shield className="h-3 w-3 mr-1" />
                              24/7 Emergency
                            </Badge>
                          )}
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-1.5 text-neutral-400 text-sm">
                          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>
                            {hospital.address} &mdash; {hospital.city}, {hospital.state}
                          </span>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1.5">
                          {hospital.specialties.map((s) => (
                            <Badge
                              key={s}
                              variant="secondary"
                              className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs"
                            >
                              {s}
                            </Badge>
                          ))}
                        </div>

                        {/* Phone */}
                        <a
                          href={`tel:${hospital.phone}`}
                          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {hospital.phone}
                        </a>
                      </div>

                      {/* Right stats */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 shrink-0">
                        <StarRating rating={hospital.rating} />
                        <div className="flex items-center gap-1.5 text-sm text-neutral-400">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>{hospital.beds.toLocaleString()} beds</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-neutral-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No hospitals match your filters.</p>
              <p className="text-sm mt-1">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
