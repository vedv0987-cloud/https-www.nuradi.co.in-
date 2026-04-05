"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalculatorShell } from "@/components/tools/CalculatorShell";
import {
  BLOOD_GROUPS, canDonateTo, canReceiveFrom, predictBabyBloodGroup,
  GROUP_STATS, type BloodGroup,
} from "@/lib/calculators/blood-group";

export default function BloodGroupPage() {
  const [yours, setYours] = useState<BloodGroup | null>(null);
  const [partner, setPartner] = useState<BloodGroup | null>(null);

  const donate = useMemo(() => yours ? canDonateTo(yours) : [], [yours]);
  const receive = useMemo(() => yours ? canReceiveFrom(yours) : [], [yours]);
  const baby = useMemo(() => yours && partner ? predictBabyBloodGroup(yours, partner) : [], [yours, partner]);

  const GroupPicker = ({ value, onChange, label }: { value: BloodGroup | null; onChange: (v: BloodGroup) => void; label: string }) => (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">{label}</label>
      <div className="grid grid-cols-4 gap-2">
        {BLOOD_GROUPS.map((g) => {
          const selected = g === value;
          return (
            <button
              key={g}
              onClick={() => onChange(g)}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center font-extrabold transition-colors ${
                selected
                  ? "border-rose-500 bg-rose-500 text-white"
                  : "border-border bg-card hover:border-rose-500/40"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );

  const inputs = (
    <div className="space-y-5">
      <GroupPicker value={yours} onChange={setYours} label="Your Blood Group" />
      <GroupPicker value={partner} onChange={setPartner} label="Partner's Blood Group (optional)" />
    </div>
  );

  const resultPanel = (
    <AnimatePresence mode="wait">
      {!yours ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-10 text-center">
          <div className="text-5xl mb-3">🩸</div>
          <p className="text-muted-foreground">Select your blood group to see compatibility.</p>
        </motion.div>
      ) : (
        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Big blood drop */}
          <div className="rounded-2xl border bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 p-8 text-center">
            <div className="text-6xl mb-2">🩸</div>
            <div className="text-5xl font-extrabold text-rose-700 dark:text-rose-300 mb-2">{yours}</div>
            <p className="text-sm text-muted-foreground">{GROUP_STATS[yours].prevalence} · {GROUP_STATS[yours].factoid}</p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3 text-emerald-600 dark:text-emerald-400">You can donate to</h3>
            <div className="grid grid-cols-4 gap-2">
              {BLOOD_GROUPS.map((g) => {
                const can = donate.includes(g);
                return (
                  <div key={g} className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm ${can ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border bg-muted/30 text-muted-foreground line-through opacity-50"}`}>
                    {g}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-bold mb-3 text-blue-600 dark:text-blue-400">You can receive from</h3>
            <div className="grid grid-cols-4 gap-2">
              {BLOOD_GROUPS.map((g) => {
                const can = receive.includes(g);
                return (
                  <div key={g} className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm ${can ? "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300" : "border-border bg-muted/30 text-muted-foreground line-through opacity-50"}`}>
                    {g}
                  </div>
                );
              })}
            </div>
          </div>

          {partner && baby.length > 0 && (
            <div className="rounded-2xl border bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 p-6">
              <h3 className="font-bold mb-3">👶 Possible Baby Blood Groups</h3>
              <div className="space-y-2">
                {baby.map((b) => (
                  <div key={b.group} className="flex items-center gap-3">
                    <div className="w-14 rounded-lg bg-white dark:bg-card border-2 border-pink-300 flex items-center justify-center font-extrabold text-pink-700 dark:text-pink-300 py-1">
                      {b.group}
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white dark:bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.probability}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold w-10 text-right">{b.probability}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <CalculatorShell
      slug="blood-group"
      title="Blood Group Compatibility"
      description="See who you can donate to, who can donate to you, and what blood groups your baby might have."
      inputs={inputs}
      result={resultPanel}
    />
  );
}
