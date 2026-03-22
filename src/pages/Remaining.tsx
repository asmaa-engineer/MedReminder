"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { ChevronLeft, Clock, Pill, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { showSuccess } from '@/utils/toast';

const Remaining = () => {
  const navigate = useNavigate();
  const remaining = [
    { id: 2, name: 'Metformin', dose: '500mg', time: '12:30 PM' },
    { id: 3, name: 'Atorvastatin', dose: '20mg', time: '08:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">Remaining Today</h1>
      </header>

      <div className="px-6 py-8">
        <GlassCard className="mb-8 bg-blue-600 text-white border-none p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Daily Progress</h3>
            <span className="text-2xl font-black">1/3</span>
          </div>
          <Progress value={33} className="h-2 bg-blue-400/30" />
          <p className="text-xs text-blue-100 mt-4">2 doses left to complete your day!</p>
        </GlassCard>

        <div className="space-y-4">
          {remaining.map((med) => (
            <GlassCard key={med.id} className="p-5 bg-white border-none shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Pill size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{med.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>Scheduled for {med.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl border-gray-100 text-gray-600 h-12"
                  onClick={() => showSuccess("Snoozed for 15 minutes")}
                >
                  Snooze
                </Button>
                <Button 
                  className="flex-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8"
                  onClick={() => showSuccess(`${med.name} logged!`)}
                >
                  <Check size={18} className="mr-2" /> Take Now
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Remaining;