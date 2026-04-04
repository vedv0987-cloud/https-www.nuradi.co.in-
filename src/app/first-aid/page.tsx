"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Emergency {
  id: string;
  title: string;
  emoji: string;
  steps: string[];
  dos: string[];
  donts: string[];
  callWhen: string;
}

const emergencies: Emergency[] = [
  {
    id: "heart-attack",
    title: "Heart Attack",
    emoji: "\u2764\uFE0F",
    steps: [
      "Call 108 immediately.",
      "Have the person sit down and rest in a comfortable position.",
      "Loosen any tight clothing.",
      "If the person is not allergic, give them an aspirin (325 mg) to chew slowly.",
      "If the person becomes unresponsive and stops breathing, begin CPR.",
      "If an AED is available, use it as soon as possible.",
    ],
    dos: [
      "Keep the person calm and still.",
      "Monitor breathing continuously.",
      "Note the time symptoms started.",
    ],
    donts: [
      "Do NOT let them walk or exert themselves.",
      "Do NOT give water or food.",
      "Do NOT ignore mild chest discomfort.",
    ],
    callWhen:
      "Call 108 immediately if someone has chest pain, shortness of breath, or pain radiating to the arm or jaw.",
  },
  {
    id: "choking",
    title: "Choking",
    emoji: "\uD83E\uDD10",
    steps: [
      "Ask the person if they are choking. If they cannot speak or cough, act immediately.",
      "Stand behind the person and wrap your arms around their waist.",
      "Make a fist with one hand and place it just above the navel.",
      "Grasp the fist with the other hand and perform quick upward thrusts (Heimlich maneuver).",
      "Repeat until the object is expelled or the person becomes unconscious.",
      "If unconscious, lower them to the ground and begin CPR.",
    ],
    dos: [
      "Encourage coughing if the person can still cough.",
      "Call 108 if the obstruction is not cleared quickly.",
      "For infants, use back blows and chest thrusts instead.",
    ],
    donts: [
      "Do NOT perform blind finger sweeps.",
      "Do NOT slap the back of someone who is standing and can cough.",
      "Do NOT give water to clear the blockage.",
    ],
    callWhen:
      "Call 108 if the person cannot breathe, turns blue, or loses consciousness.",
  },
  {
    id: "burns",
    title: "Burns",
    emoji: "\uD83D\uDD25",
    steps: [
      "Remove the person from the source of the burn.",
      "Cool the burn under cool (not ice-cold) running water for at least 10\u201320 minutes.",
      "Remove jewelry or tight items near the burn before swelling begins.",
      "Cover the burn loosely with a sterile, non-stick bandage.",
      "Give over-the-counter pain relief if needed.",
      "For chemical burns, flush with large amounts of water for 20+ minutes.",
    ],
    dos: [
      "Use cool running water to soothe the burn.",
      "Cover with a clean, loose bandage.",
      "Seek medical help for burns larger than the palm.",
    ],
    donts: [
      "Do NOT apply ice directly to the burn.",
      "Do NOT pop blisters.",
      "Do NOT apply toothpaste, butter, or home remedies.",
    ],
    callWhen:
      "Call 108 for burns covering large areas, burns on the face/hands/joints, or deep burns that appear white or charred.",
  },
  {
    id: "heavy-bleeding",
    title: "Heavy Bleeding",
    emoji: "\uD83E\uDE78",
    steps: [
      "Call 108 if bleeding is severe.",
      "Apply firm, direct pressure to the wound with a clean cloth or bandage.",
      "Do not remove the cloth if blood soaks through; add more layers on top.",
      "If possible, elevate the injured limb above the heart.",
      "Maintain pressure for at least 15 minutes without checking.",
      "If bleeding does not stop and a tourniquet is available, apply it 2\u20133 inches above the wound.",
    ],
    dos: [
      "Wear gloves if available to protect yourself.",
      "Keep the person lying down and warm.",
      "Note the time a tourniquet is applied.",
    ],
    donts: [
      "Do NOT remove embedded objects from the wound.",
      "Do NOT keep checking the wound frequently.",
      "Do NOT use a tourniquet unless absolutely necessary.",
    ],
    callWhen:
      "Call 108 immediately if bleeding cannot be controlled, the wound is deep, or the person feels faint.",
  },
  {
    id: "fracture",
    title: "Fracture",
    emoji: "\uD83E\uDDB4",
    steps: [
      "Keep the injured area still; do not try to realign the bone.",
      "Immobilize the area above and below the fracture using a splint or padding.",
      "Apply ice wrapped in cloth to reduce swelling (20 minutes on, 20 minutes off).",
      "Elevate the injured limb if possible.",
      "Manage pain with over-the-counter medication if conscious.",
      "Transport to a hospital carefully, keeping the limb immobilized.",
    ],
    dos: [
      "Stabilize the injured area before moving the person.",
      "Use a sling for arm/shoulder fractures.",
      "Check circulation below the injury (pulse, feeling, color).",
    ],
    donts: [
      "Do NOT try to straighten or push the bone back.",
      "Do NOT move the person unnecessarily if a spinal injury is suspected.",
      "Do NOT apply heat to the injury.",
    ],
    callWhen:
      "Call 108 if the bone is visible, the limb is deformed, or there is no pulse below the injury.",
  },
  {
    id: "snake-bite",
    title: "Snake Bite",
    emoji: "\uD83D\uDC0D",
    steps: [
      "Move the person away from the snake safely.",
      "Keep the person calm and as still as possible.",
      "Remove jewelry and tight clothing near the bite.",
      "Keep the bitten limb below the level of the heart.",
      "Immobilize the limb with a splint.",
      "Get to the nearest hospital immediately for antivenom.",
    ],
    dos: [
      "Note the snake\u2019s appearance if safe to do so.",
      "Mark the edge of swelling with a pen and note the time.",
      "Keep the person hydrated with small sips of water.",
    ],
    donts: [
      "Do NOT cut the wound or try to suck out venom.",
      "Do NOT apply a tourniquet.",
      "Do NOT apply ice or immerse in cold water.",
    ],
    callWhen:
      "Call 108 immediately for all snake bites. Treat every bite as potentially venomous.",
  },
  {
    id: "dog-bite",
    title: "Dog Bite",
    emoji: "\uD83D\uDC15",
    steps: [
      "Wash the wound thoroughly with soap and running water for at least 10 minutes.",
      "Apply an antiseptic solution like povidone-iodine.",
      "Control bleeding by applying gentle pressure with a clean cloth.",
      "Cover with a clean bandage.",
      "Visit a hospital for anti-rabies vaccination immediately.",
      "Get a tetanus shot if not vaccinated in the last 5 years.",
    ],
    dos: [
      "Note details about the dog (stray/pet, vaccinated or not).",
      "Complete the full course of rabies vaccination.",
      "Watch for signs of infection (redness, swelling, pus).",
    ],
    donts: [
      "Do NOT delay washing the wound.",
      "Do NOT apply turmeric, chili, or other home remedies.",
      "Do NOT stitch the wound closed immediately.",
    ],
    callWhen:
      "Seek medical help immediately for all dog bites. Rabies is fatal once symptoms appear.",
  },
  {
    id: "drowning",
    title: "Drowning",
    emoji: "\uD83C\uDF0A",
    steps: [
      "Call 108 immediately.",
      "Remove the person from water only if safe to do so.",
      "Check for breathing. If not breathing, begin rescue breaths.",
      "If no pulse, start CPR (30 chest compressions, 2 breaths).",
      "Continue CPR until emergency help arrives or the person starts breathing.",
      "Once breathing, place them in the recovery position (on their side).",
    ],
    dos: [
      "Use a flotation device or rope to reach the person if possible.",
      "Keep the person warm with blankets after rescue.",
      "Monitor breathing continuously even if they seem recovered.",
    ],
    donts: [
      "Do NOT jump into dangerous water unless you are a trained rescuer.",
      "Do NOT try to drain water from the lungs by pressing the stomach.",
      "Do NOT leave the person alone even if they seem fine.",
    ],
    callWhen:
      "Call 108 immediately for any drowning incident, even if the person seems to recover.",
  },
  {
    id: "seizure",
    title: "Seizure",
    emoji: "\u26A1",
    steps: [
      "Clear the area of sharp or hard objects to prevent injury.",
      "Ease the person to the floor if they are standing.",
      "Place something soft under their head.",
      "Turn them on their side to keep the airway clear.",
      "Time the seizure duration.",
      "Stay with them until they are fully conscious and oriented.",
    ],
    dos: [
      "Speak calmly and reassure them when they regain consciousness.",
      "Loosen tight clothing around the neck.",
      "Note what happened to describe to medical personnel.",
    ],
    donts: [
      "Do NOT hold the person down or restrain their movements.",
      "Do NOT put anything in their mouth.",
      "Do NOT give food or water until fully alert.",
    ],
    callWhen:
      "Call 108 if the seizure lasts more than 5 minutes, the person does not regain consciousness, or it is their first seizure.",
  },
  {
    id: "heatstroke",
    title: "Heatstroke",
    emoji: "\u2600\uFE0F",
    steps: [
      "Call 108 immediately. Heatstroke is a medical emergency.",
      "Move the person to a cool, shaded area.",
      "Remove excess clothing.",
      "Cool the person rapidly: apply ice packs to the neck, armpits, and groin.",
      "Fan the person while misting with cool water.",
      "If conscious, give small sips of cool water.",
    ],
    dos: [
      "Monitor body temperature and keep cooling until it drops below 38\u00B0C.",
      "Place wet towels on the skin.",
      "Keep the person lying down with legs slightly elevated.",
    ],
    donts: [
      "Do NOT give large amounts of water to drink quickly.",
      "Do NOT use ice-cold water immersion without medical supervision.",
      "Do NOT give aspirin or paracetamol for heatstroke fever.",
    ],
    callWhen:
      "Call 108 if body temperature is above 40\u00B0C (104\u00B0F), the person is confused, or they lose consciousness.",
  },
  {
    id: "asthma-attack",
    title: "Asthma Attack",
    emoji: "\uD83D\uDCA8",
    steps: [
      "Help the person sit upright. Do not let them lie down.",
      "Help them use their reliever inhaler (usually blue) \u2014 4 puffs, one at a time.",
      "Wait 4 minutes. If no improvement, give 4 more puffs.",
      "If still no improvement after another 4 minutes, call 108.",
      "Continue giving 4 puffs every 4 minutes while waiting for help.",
      "Keep the person calm and encourage slow, steady breathing.",
    ],
    dos: [
      "Use a spacer with the inhaler if available.",
      "Loosen tight clothing.",
      "Stay with the person and keep them reassured.",
    ],
    donts: [
      "Do NOT let them lie flat.",
      "Do NOT give them cold water.",
      "Do NOT leave them alone during an attack.",
    ],
    callWhen:
      "Call 108 if the inhaler provides no relief, lips turn blue, or the person cannot speak in full sentences.",
  },
  {
    id: "nosebleed",
    title: "Nosebleed",
    emoji: "\uD83D\uDC43",
    steps: [
      "Have the person sit upright and lean slightly forward.",
      "Pinch the soft part of the nose firmly with thumb and index finger.",
      "Hold pressure continuously for 10\u201315 minutes without checking.",
      "Breathe through the mouth during this time.",
      "Apply a cold compress on the bridge of the nose.",
      "After bleeding stops, avoid blowing the nose for several hours.",
    ],
    dos: [
      "Spit out any blood that drains into the mouth.",
      "Stay upright for a few hours after the bleed stops.",
      "Use a humidifier if nosebleeds are frequent.",
    ],
    donts: [
      "Do NOT tilt the head backward.",
      "Do NOT stuff tissues or cotton deep into the nose.",
      "Do NOT pick or blow the nose after it stops.",
    ],
    callWhen:
      "Seek medical help if bleeding lasts more than 20 minutes, follows a head injury, or occurs frequently.",
  },
  {
    id: "food-poisoning",
    title: "Food Poisoning",
    emoji: "\uD83E\uDD2E",
    steps: [
      "Rest and avoid solid food until vomiting subsides.",
      "Take small, frequent sips of water or ORS to prevent dehydration.",
      "Gradually introduce bland foods (rice, toast, bananas) when tolerated.",
      "Avoid dairy, caffeine, alcohol, and fatty foods.",
      "Monitor for signs of dehydration: dry mouth, dark urine, dizziness.",
      "Wash hands thoroughly and isolate contaminated food.",
    ],
    dos: [
      "Keep sipping ORS or clear fluids regularly.",
      "Note what was eaten and when symptoms started.",
      "Rest as much as possible.",
    ],
    donts: [
      "Do NOT take anti-diarrheal medication without medical advice.",
      "Do NOT eat heavy or spicy foods.",
      "Do NOT self-medicate with antibiotics.",
    ],
    callWhen:
      "Seek medical help if there is blood in vomit or stool, high fever, severe dehydration, or symptoms last more than 3 days.",
  },
  {
    id: "stroke",
    title: "Stroke",
    emoji: "\uD83E\uDDE0",
    steps: [
      "Use FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 108.",
      "Call 108 immediately. Every minute counts.",
      "Note the exact time symptoms first appeared.",
      "Have the person lie down with their head slightly elevated.",
      "Turn them on their side if vomiting.",
      "Do not give any food, water, or medication.",
    ],
    dos: [
      "Keep the person calm and comfortable.",
      "Loosen tight clothing.",
      "Be prepared to perform CPR if they become unresponsive.",
    ],
    donts: [
      "Do NOT give aspirin (it could worsen a bleeding stroke).",
      "Do NOT let them fall asleep without medical evaluation.",
      "Do NOT delay calling for help to see if symptoms improve.",
    ],
    callWhen:
      "Call 108 IMMEDIATELY if you notice any FAST signs. Treatment within the first hour dramatically improves outcomes.",
  },
  {
    id: "head-injury",
    title: "Head Injury",
    emoji: "\uD83E\uDD15",
    steps: [
      "Call 108 if the person is unconscious, confused, or vomiting.",
      "Keep the person still; do not move them if a spinal injury is suspected.",
      "Apply gentle pressure with a clean cloth to any bleeding wound.",
      "Apply a cold compress to reduce swelling.",
      "Monitor consciousness, breathing, and pupil size.",
      "Keep the person awake and talking if possible.",
    ],
    dos: [
      "Watch for worsening symptoms for 24\u201348 hours.",
      "Check for clear fluid leaking from the nose or ears.",
      "Keep the head and shoulders slightly elevated.",
    ],
    donts: [
      "Do NOT move the person if a neck/spinal injury is suspected.",
      "Do NOT remove any object embedded in the head.",
      "Do NOT give aspirin or blood-thinning medication.",
    ],
    callWhen:
      "Call 108 if there is loss of consciousness, repeated vomiting, seizures, worsening headache, or confusion.",
  },
];

function EmergencyCard({ emergency }: { emergency: Emergency }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        "border border-neutral-300 rounded-lg overflow-hidden bg-white",
        "hover:border-neutral-500 transition-colors cursor-pointer"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={emergency.title}>
            {emergency.emoji}
          </span>
          <h3 className="text-lg font-semibold text-black">
            {emergency.title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-neutral-500 shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-500 shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 space-y-5 border-t border-neutral-200 pt-4">
              {/* Steps */}
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm uppercase tracking-wide">
                  Steps
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-neutral-700 text-sm">
                  {emergency.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Do's */}
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-black" />
                  Do&apos;s
                </h4>
                <ul className="space-y-1.5 text-neutral-700 text-sm">
                  {emergency.dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-black mt-0.5">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <h4 className="font-semibold text-black mb-2 text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-black" />
                  Don&apos;ts
                </h4>
                <ul className="space-y-1.5 text-neutral-700 text-sm">
                  {emergency.donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-black mt-0.5">&minus;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to call */}
              <div className="bg-neutral-50 border border-red-300 rounded-md p-3">
                <p className="text-sm font-semibold text-red-700 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  When to Call Emergency
                </p>
                <p className="text-sm text-neutral-800">
                  {emergency.callWhen}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FirstAidPage() {
  const [search, setSearch] = useState("");

  const filtered = emergencies.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.steps.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      e.dos.some((d) => d.toLowerCase().includes(search.toLowerCase())) ||
      e.donts.some((d) => d.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="max-w-[1100px] mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                First Aid Guide
              </h1>
              <p className="text-sm text-neutral-500">
                Quick reference for common emergencies
              </p>
            </div>
          </div>

          {/* Emergency Numbers */}
          <div className="flex flex-wrap gap-2 mb-4">
            <a href="tel:108">
              <Badge
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 cursor-pointer gap-1 py-1 px-2.5 text-sm font-semibold"
              >
                <Phone className="h-3.5 w-3.5" />
                Ambulance: 108
              </Badge>
            </a>
            <a href="tel:100">
              <Badge
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 cursor-pointer gap-1 py-1 px-2.5 text-sm font-semibold"
              >
                <Phone className="h-3.5 w-3.5" />
                Police: 100
              </Badge>
            </a>
            <a href="tel:101">
              <Badge
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 cursor-pointer gap-1 py-1 px-2.5 text-sm font-semibold"
              >
                <Phone className="h-3.5 w-3.5" />
                Fire: 101
              </Badge>
            </a>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search emergencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-neutral-50 border-neutral-300 focus:border-black"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1100px] mx-auto px-4 py-6">
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((emergency) => (
              <EmergencyCard key={emergency.id} emergency={emergency} />
            ))
          ) : (
            <div className="text-center py-12 text-neutral-500">
              <p className="text-lg">No emergencies match your search.</p>
              <p className="text-sm mt-1">Try a different keyword.</p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 mb-6 border-t border-neutral-200 pt-6">
          <p className="text-xs text-neutral-400 text-center leading-relaxed">
            This guide is for informational purposes only and is not a
            substitute for professional medical advice. Always call emergency
            services (108) in life-threatening situations. Information is based
            on general first aid guidelines and may not cover all scenarios.
          </p>
        </div>
      </main>
    </div>
  );
}
