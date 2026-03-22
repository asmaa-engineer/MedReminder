"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/GlassCard';
import Navigation from '@/components/Navigation';
import { Pill, CheckCircle2, Clock, AlertCircle, Plus, Sparkles, Bell, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  const todayMeds = [
    { id: 1, name: 'Lisinopril', dose: '10mg', time: '08:00 AM', status: 'taken' },
    { id: 2, name: 'Metformin', dose: '500mg', time: '12:30 PM', status: 'upcoming' },
    { id: 3, name: 'Atorvastatin', dose: '20mg', time: '08:00 PM', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hello, Alex</h1>
            <p className="text-gray-500">You've taken 1 of 3 doses today</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative bg-white/50 backdrop-blur-md rounded-2xl shadow-sm"
            onClick={() => navigate('/notifications')}
          >
            <Bell size={24} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
          </Button>
        </header>

        {/* Adherence Progress */}
        <GlassCard 
          className="mb-8 bg-blue-600 text-white border-none cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => navigate('/insights')}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Daily Adherence</h3>
              <p className="text-blue-100 text-sm">Keep it up!</p>
            </div>
            <div className="text-3xl font-black">33%</div>
          </div>
          <Progress value={33} className="h-2 bg-blue-400/30" />
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-100">
            <TrendingUp size={14} />
            <span>Your adherence is up 12% from last week</span>
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard 
            className="p-4 flex items-center gap-3 bg-white border-none shadow-sm cursor-pointer"
            onClick={() => navigate('/history')}
          >
            <div className="bg-green-100 p-2 rounded-xl">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Taken</p>
              <p className="text-lg font-black">1</p>
            </div>
          </GlassCard>
          <GlassCard 
            className="p-4 flex items-center gap-3 bg-white border-none shadow-sm cursor-pointer"
            onClick={() => navigate('/remaining')}
          >
            <div className="bg-orange-100 p-2 rounded-xl">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Remaining</p>
              <p className="text-lg font-black">2</p>
            </div>
          </GlassCard>
        </div>

        {/* AI Insight Card */}
        <GlassCard 
          className="mb-8 bg-indigo-50 border-indigo-100 p-4 flex items-center gap-4 cursor-pointer"
          onClick={() => navigate('/chat')}
        >
          <div className="bg-indigo-600 p-3 rounded-2xl text-white">
            <Sparkles size={20} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">AI Insight</p>
            <p className="text-sm text-indigo-900 font-medium">"You're doing great! Don't forget your Metformin at 12:30 PM."</p>
          </div>
        </GlassCard>

        {/* Today's Schedule */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <Button 
              variant="ghost" 
              className="text-blue-600 font-bold hover:bg-blue-50 rounded-xl"
              onClick={() => navigate('/medications')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {todayMeds.map((med) => (
              <GlassCard 
                key={med.id} 
                className="flex items-center justify-between p-4 bg-white border-none shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => navigate(`/medications/${med.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-2xl",
                    med.status === 'taken' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                  )}>
                    <Pill size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{med.name}</h4>
                    <p className="text-xs text-gray-500">{med.dose} • {med.time}</p>
                  </div>
                </div>
                {med.status === 'taken' ? (
                  <div className="bg-green-50 p-2 rounded-full">
                    <CheckCircle2 className="text-green-500" size={24} />
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 font-bold shadow-md shadow-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Log dose logic
                    }}
                  >
                    Take
                  </Button>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAB */}
        <Button 
          onClick={() => navigate('/camera')}
          className="fixed bottom-24 right-6 w-16 h-16 rounded-[24px] shadow-2xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center p-0 border-4 border-white"
        >
          <Plus size={32} className="text-white" />
        </Button>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;