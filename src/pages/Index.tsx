"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import Navigation from '@/components/Navigation';
import { Pill, CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const todayMeds = [
    { id: 1, name: 'Lisinopril', dose: '10mg', time: '08:00 AM', status: 'taken' },
    { id: 2, name: 'Metformin', dose: '500mg', time: '12:30 PM', status: 'upcoming' },
    { id: 3, name: 'Atorvastatin', dose: '20mg', time: '08:00 PM', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hello, Alex</h1>
          <p className="text-gray-500">You've taken 1 of 3 doses today</p>
        </header>

        {/* Adherence Progress */}
        <GlassCard className="mb-8 bg-blue-600 text-white border-none">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Daily Adherence</h3>
              <p className="text-blue-100 text-sm">Keep it up!</p>
            </div>
            <div className="text-3xl font-bold">33%</div>
          </div>
          <Progress value={33} className="h-2 bg-blue-400/30" />
        </GlassCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-xl">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Taken</p>
              <p className="font-bold">1</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-xl">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Remaining</p>
              <p className="font-bold">2</p>
            </div>
          </GlassCard>
        </div>

        {/* Today's Schedule */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <Button variant="ghost" className="text-blue-600 font-semibold">View All</Button>
          </div>
          
          <div className="space-y-4">
            {todayMeds.map((med) => (
              <GlassCard key={med.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-2xl",
                    med.status === 'taken' ? "bg-green-100" : "bg-blue-100"
                  )}>
                    <Pill className={med.status === 'taken' ? "text-green-600" : "text-blue-600"} size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{med.name}</h4>
                    <p className="text-sm text-gray-500">{med.dose} • {med.time}</p>
                  </div>
                </div>
                {med.status === 'taken' ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">
                    Take
                  </Button>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAB */}
        <Button 
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center p-0"
        >
          <Plus size={32} className="text-white" />
        </Button>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;