"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Phone, AlertTriangle, CheckCircle2, XCircle, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const EMERGENCY_NUMBERS = [
  { name: "Ambulance", number: "108", emoji: "🚑" },
  { name: "Police", number: "100", emoji: "👮" },
  { name: "Fire", number: "101", emoji: "🚒" },
  { name: "Women", number: "181", emoji: "👩" },
  { name: "Child", number: "1098", emoji: "👶" },
  { name: "Poison", number: "1066", emoji: "☠️" },
];

interface Emergency {
  id: number; title: string; icon: string; actWithin: string;
  steps: string[]; dos: string[]; donts: string[];
}

const EMERGENCIES: Emergency[] = [
  { id: 1, title: "Heart Attack", icon: "❤️", actWithin: "5 min", steps: ["Call 108 immediately", "Make person sit upright", "Give aspirin if available and not allergic", "Loosen tight clothing", "Begin CPR if person becomes unconscious", "Stay calm and wait for ambulance"], dos: ["Call 108 first", "Give aspirin (300mg)", "Keep person calm"], donts: ["Don't give water", "Don't let them walk", "Don't wait to see if it passes"] },
  { id: 2, title: "Choking", icon: "😤", actWithin: "2 min", steps: ["Ask 'Are you choking?'", "Stand behind the person", "Give 5 firm back blows between shoulder blades", "Give 5 abdominal thrusts (Heimlich maneuver)", "Repeat until object comes out", "Call 108 if not cleared"], dos: ["Stay calm", "Encourage coughing if mild", "Call 108 if severe"], donts: ["Don't do Heimlich on infants", "Don't reach blindly into throat", "Don't give water"] },
  { id: 3, title: "Burns", icon: "🔥", actWithin: "Immediate", steps: ["Cool burn under running water for 20 minutes", "Remove jewelry and clothing near the burn", "Cover with clean cloth or cling film", "Take over-the-counter painkillers", "Seek medical help for severe burns", "Keep the person warm"], dos: ["Cool with running water", "Cover loosely", "Take painkillers"], donts: ["Don't apply ice directly", "Don't use butter or toothpaste", "Don't pop blisters"] },
  { id: 4, title: "Heavy Bleeding", icon: "🩸", actWithin: "3 min", steps: ["Apply firm pressure with a clean cloth", "Don't remove the cloth — add more layers", "Elevate the wound above the heart", "Keep applying pressure for at least 10 minutes", "Call 108 for severe bleeding", "Apply tourniquet only as last resort"], dos: ["Apply firm pressure", "Elevate above heart", "Keep the cloth in place"], donts: ["Don't remove embedded objects", "Don't use a tourniquet unless trained", "Don't wash deep wounds"] },
  { id: 5, title: "Fracture", icon: "🦴", actWithin: "10 min", steps: ["Don't move the injured area", "Immobilize with a splint or padding", "Apply an ice pack wrapped in cloth", "Keep the person still and calm", "Call 108 for open fractures", "Support the limb in a comfortable position"], dos: ["Immobilize the area", "Apply ice", "Call 108 for open fractures"], donts: ["Don't try to realign the bone", "Don't move the person unnecessarily", "Don't apply heat"] },
  { id: 6, title: "Snake Bite", icon: "🐍", actWithin: "30 min", steps: ["Keep the person calm and still", "Remove jewelry near the bite", "Immobilize the bitten limb below heart level", "Get to the hospital immediately", "Try to remember the snake's appearance", "Mark the edge of swelling with a pen and time"], dos: ["Keep calm and still", "Remove rings/bracelets", "Get to hospital fast"], donts: ["Don't suck the venom out", "Don't apply a tourniquet", "Don't cut the wound"] },
  { id: 7, title: "Dog Bite", icon: "🐕", actWithin: "24 hrs", steps: ["Wash the wound with soap and water for 15 minutes", "Apply antiseptic like povidone-iodine", "Get anti-rabies vaccine within 24 hours", "Complete the full course of rabies vaccine", "Get a tetanus shot if not up to date", "Report the dog to local authorities"], dos: ["Wash with soap for 15 min", "Get anti-rabies vaccine", "Complete full course"], donts: ["Don't ignore even minor bites", "Don't apply turmeric or lime", "Don't delay vaccine"] },
  { id: 8, title: "Drowning", icon: "🌊", actWithin: "2 min", steps: ["Call 108 immediately", "Get the person out of the water safely", "Check if the person is breathing", "Begin CPR immediately if not breathing", "Turn on their side if breathing to drain water", "Keep them warm with a blanket"], dos: ["Start CPR immediately", "Call 108", "Keep them warm"], donts: ["Don't jump in unless trained", "Don't press on stomach", "Don't give up CPR"] },
  { id: 9, title: "Seizure", icon: "⚡", actWithin: "5 min", steps: ["Clear the area around the person", "Don't try to hold them down", "Don't put anything in their mouth", "Turn them on their side after jerking stops", "Time the seizure duration", "Call 108 if seizure lasts more than 5 minutes"], dos: ["Clear the area", "Turn on side after", "Time the seizure"], donts: ["Don't hold them down", "Don't put anything in mouth", "Don't give food or water during"] },
  { id: 10, title: "Heatstroke", icon: "☀️", actWithin: "10 min", steps: ["Move the person to shade or indoors", "Remove excess clothing", "Cool them with water, wet cloths, or fan", "Apply ice packs to neck, armpits, and groin", "Call 108 immediately", "Don't give fluids if unconscious"], dos: ["Move to shade", "Cool with water/fan", "Call 108"], donts: ["Don't give fluids if unconscious", "Don't use ice-cold water bath", "Don't ignore confusion"] },
  { id: 11, title: "Asthma Attack", icon: "🫁", actWithin: "5 min", steps: ["Help the person sit upright", "Give 4 puffs of reliever inhaler (blue)", "Wait 4 minutes", "If no improvement, give 4 more puffs", "Call 108 if still no improvement", "Stay calm and reassure them"], dos: ["Sit upright", "Use blue inhaler", "Stay calm"], donts: ["Don't lay them flat", "Don't leave them alone", "Don't give preventer inhaler"] },
  { id: 12, title: "Nosebleed", icon: "👃", actWithin: "15 min", steps: ["Sit and lean forward slightly", "Pinch the soft part of the nose firmly", "Hold for 10-15 minutes without checking", "Apply ice pack to the bridge of nose", "Breathe through the mouth", "Seek help if bleeding persists beyond 20 minutes"], dos: ["Lean forward", "Pinch nose 10-15 min", "Apply ice"], donts: ["Don't lean back", "Don't stuff with cotton", "Don't blow your nose"] },
  { id: 13, title: "Food Poisoning", icon: "🤮", actWithin: "6 hrs", steps: ["Sip ORS or clean water frequently", "Don't eat solid food initially", "Rest as much as possible", "Take prescribed anti-nausea medicine if needed", "Monitor for dehydration signs", "See a doctor if symptoms persist beyond 24 hours"], dos: ["Sip ORS/water", "Rest completely", "Monitor hydration"], donts: ["Don't eat solid food early", "Don't take anti-diarrheal medicine without doctor", "Don't ignore blood in stool"] },
  { id: 14, title: "Stroke (FAST)", icon: "🧠", actWithin: "3 min", steps: ["F — Face: Check for face drooping on one side", "A — Arms: Check if one arm drifts down", "S — Speech: Check for slurred speech", "T — Time: Call 108 immediately", "Note the exact time symptoms started", "Keep the person comfortable until help arrives"], dos: ["Use FAST test", "Call 108 immediately", "Note time of first symptom"], donts: ["Don't give food or water", "Don't give aspirin for stroke", "Don't drive yourself"] },
  { id: 15, title: "Head Injury", icon: "🤕", actWithin: "5 min", steps: ["Keep the person still and calm", "Apply gentle pressure to any bleeding with clean cloth", "Check for consciousness — keep talking to them", "Don't remove objects stuck in the wound", "Call 108 for vomiting, confusion, or unconsciousness", "Monitor breathing until help arrives"], dos: ["Keep still", "Control bleeding gently", "Monitor consciousness"], donts: ["Don't move them if neck injury suspected", "Don't remove embedded objects", "Don't let them sleep immediately after"] },
];

export default function FirstAidPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = EMERGENCIES.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            First Aid Emergency Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">What to Do in an Emergency</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Step-by-step first aid guides for 15 common emergencies</p>
        </div>

        {/* Emergency Numbers */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {EMERGENCY_NUMBERS.map((n) => (
            <a key={n.number} href={`tel:${n.number}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors">
              <Phone className="w-3.5 h-3.5" /> {n.emoji} {n.name}: {n.number}
            </a>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search emergencies..." className="pl-11 h-11 rounded-full" />
        </div>
      </div>

      {/* Emergency Cards */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((em, i) => (
            <motion.div key={em.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <button onClick={() => toggle(em.id)} className="w-full p-5 text-left flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{em.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm">{em.title}</h3>
                    <Badge variant="outline" className="text-[10px] mt-1 text-red-600 border-red-200">Act within: {em.actWithin}</Badge>
                  </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", expanded.has(em.id) && "rotate-180")} />
              </button>

              <AnimatePresence>
                {expanded.has(em.id) && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 space-y-4">
                      {/* Steps */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Steps</h4>
                        <ol className="space-y-1.5">
                          {em.steps.map((s, j) => (
                            <li key={j} className="text-sm flex gap-2">
                              <span className="font-bold text-[#1a1a1a] flex-shrink-0">{j + 1}.</span>
                              <span className="text-muted-foreground">{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      {/* Do's */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 mb-2">Do</h4>
                        {em.dos.map((d, j) => (
                          <p key={j} className="text-sm flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />{d}</p>
                        ))}
                      </div>
                      {/* Don'ts */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">Don&apos;t</h4>
                        {em.donts.map((d, j) => (
                          <p key={j} className="text-sm flex items-center gap-2 text-muted-foreground"><XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />{d}</p>
                        ))}
                      </div>
                      <a href="tel:108" className="block">
                        <Button className="w-full bg-red-600 hover:bg-red-700 rounded-xl"><Phone className="w-4 h-4 mr-2" /> Call 108 — Ambulance</Button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 border rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This guide is for informational purposes only. Always call emergency services (108) for serious situations. This does not replace professional medical training.
          </p>
        </div>
      </div>
    </div>
  );
}
