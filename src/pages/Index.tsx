"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import MedicationItem from '@/components/MedicationItem';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [meds, setMeds] = useState([
    { id: 1, name: 'Lisinopril', dosage: '10mg - 1 Tablet', time: '08:00 AM', status: 'taken' as const },
    { id: 2, name: 'Metformin', dosage: '500mg - 1 Capsule', time: '12:30 PM', status: 'upcoming' as const },
    { id: 3, name: 'Vitamin D3', dosage: '2000 IU - 1 Softgel', time: '06:00 PM', status: 'upcoming' as const },
  ]);

  const toggleMed = (id: number) => {
    setMeds(prev => prev.map(m => 
      m.id === id ? { ...m, status: m.status === 'taken' ? 'upcoming' : 'taken' } : m
    ));
  };

  const takenCount = meds.filter(m => m.status === 'taken').length;
  const progress = Math.round((takenCount / meds.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Good Morning,</p>
          <h1 className="text-2xl font-bold">Alex Johnson 👋</h1>
        </div>
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-2xl bg-white dark:bg-white/5 shadow-sm">
            <Bell size={20} />
          </Button>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Adherence Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl shadow-primary/20"
        >
          <div className="relative z-10 flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">{progress}%</h2>
              <p className="text-sm opacity-80 font-medium">Daily Adherence</p>
              <div className="flex items-center gap-1 mt-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                <span>+5% from yesterday</span>
              </div>
            </div>
            
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="opacity-20"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-bold">{takenCount}/{meds.length}</span>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Today's Schedule */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <h3 className="font-bold text-lg">Today's Schedule</h3>
            </div>
            <Button variant="link" className="text-xs font-bold uppercase tracking-wider">View All</Button>
          </div>

          <div className="space-y-1">
            {meds.map((med, index) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MedicationItem 
                  {...med} 
                  onToggle={() => toggleMed(med.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Insights */}
        <section className="pb-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-amber-500" />
            <h3 className="font-bold text-lg">AI Insights</h3>
          </div>
          <GlassCard className="p-5 bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                <TrendingUp className="text-amber-600" size={20} />
              </div>
              <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                You've been consistent with your morning meds for 5 days! Keep it up to reach your health goals.
              </p>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-28 right-6 w-16 h-16 bg-primary text-primary-foreground rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center z-40"
      >
        <Plus size={32} />
      </motion.button>

      <Navigation />
    </div>
  );
};

export default Index;