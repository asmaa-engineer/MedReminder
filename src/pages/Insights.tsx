"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Brain, Calendar, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Insights = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-500">Your health trends and patterns</p>
        </header>

        {/* Weekly Trend */}
        <GlassCard className="mb-6 bg-white border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Weekly Adherence</h3>
            <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
              <TrendingUp size={16} />
              +12%
            </div>
          </div>
          
          <div className="flex items-end justify-between h-32 gap-2 mb-4">
            {[40, 70, 100, 85, 90, 60, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-1000",
                    val === 100 ? "bg-blue-600" : "bg-blue-200"
                  )} 
                  style={{ height: `${val}%` }} 
                />
                <span className="text-[10px] text-gray-400 font-medium">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AI Recommendation */}
        <GlassCard className="mb-6 bg-indigo-600 text-white border-none">
          <div className="flex gap-4">
            <div className="bg-white/20 p-3 rounded-2xl h-fit">
              <Brain size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold">Smart Recommendation</h4>
              <p className="text-sm text-indigo-100 leading-relaxed">
                You often miss your weekend doses. Would you like to set a special weekend reminder at 10:00 AM?
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl mt-2">
                Enable Weekend Mode
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <GlassCard className="p-4 bg-white border-none shadow-sm">
            <Calendar className="text-blue-600 mb-2" size={20} />
            <p className="text-xs text-gray-500">Streak</p>
            <p className="text-xl font-bold">5 Days</p>
          </GlassCard>
          <GlassCard className="p-4 bg-white border-none shadow-sm">
            <AlertCircle className="text-orange-600 mb-2" size={20} />
            <p className="text-xs text-gray-500">Missed</p>
            <p className="text-xl font-bold">2 Doses</p>
          </GlassCard>
        </div>

        {/* Refill Prediction */}
        <GlassCard className="bg-white border-none shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Refill Prediction</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">AI Analysis</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Lisinopril</span>
              <span className="text-sm font-bold">8 days left</span>
            </div>
            <Progress value={25} className="h-1.5" />
            <Button variant="outline" className="w-full rounded-xl border-gray-100 text-gray-600">
              View Refill Schedule
            </Button>
          </div>
        </GlassCard>
      </div>
      <Navigation />
    </div>
  );
};

export default Insights;