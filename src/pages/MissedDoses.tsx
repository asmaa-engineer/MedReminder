"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { ChevronLeft, AlertCircle, Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const MissedDoses = () => {
  const navigate = useNavigate();
  const missed = [
    { id: 1, name: 'Lisinopril', time: '08:00 AM', date: 'Today', impact: '-2%' },
    { id: 4, name: 'Metformin', time: '08:00 PM', date: 'Yesterday', impact: '-1.5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">Missed Doses</h1>
      </header>

      <div className="px-6 py-8">
        <GlassCard className="mb-8 bg-red-600 text-white border-none p-6">
          <div className="flex gap-4">
            <div className="bg-white/20 p-3 rounded-2xl h-fit">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Adherence Impact</h3>
              <p className="text-sm text-red-100">Your adherence score dropped by 3.5% this week due to missed doses.</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-4">
          {missed.map((med) => (
            <GlassCard key={med.id} className="p-5 bg-white border-none shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{med.name}</h3>
                  <p className="text-sm text-gray-500">{med.date} • {med.time}</p>
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                  {med.impact} Score
                </span>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl border-gray-100 text-gray-600 h-12"
                >
                  <MessageSquare size={18} className="mr-2" /> Record Reason
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12"
                  onClick={() => showSuccess("Marked as taken")}
                >
                  <Check size={18} className="mr-2" /> Mark Taken
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

export default MissedDoses;