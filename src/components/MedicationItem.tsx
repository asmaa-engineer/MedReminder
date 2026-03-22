"use client";

import React from 'react';
import { Pill, Clock, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

interface MedicationItemProps {
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'upcoming' | 'missed';
  onToggle: () => void;
}

const MedicationItem = ({ name, dosage, time, status, onToggle }: MedicationItemProps) => {
  const isTaken = status === 'taken';
  const isMissed = status === 'missed';

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="mb-4"
    >
      <GlassCard className={cn(
        "p-5 transition-opacity duration-500",
        isTaken && "opacity-60 grayscale-[0.5]"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center",
              isTaken ? "bg-green-500/20 text-green-600" : "bg-primary/10 text-primary"
            )}>
              <Pill size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{name}</h3>
              <p className="text-sm text-muted-foreground">{dosage}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
              <Clock size={12} />
              {time}
            </div>
            <button 
              onClick={onToggle}
              className={cn(
                "transition-all duration-300",
                isTaken ? "text-green-500" : "text-muted-foreground hover:text-primary"
              )}
            >
              {isTaken ? <CheckCircle2 size={28} fill="currentColor" className="text-white dark:text-black" /> : <Circle size={28} />}
            </button>
          </div>
        </div>
        
        {isMissed && (
          <div className="mt-3 pt-3 border-t border-red-500/10">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Missed Dose</span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default MedicationItem;