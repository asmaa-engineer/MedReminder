"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Brain, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 70 },
  { name: 'Wed', value: 100 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 60 },
  { name: 'Sun', value: 95 },
];

const Insights = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
          <p className="text-gray-500 dark:text-gray-400">Your health trends and patterns</p>
        </header>

        {/* Weekly Trend Chart */}
        <GlassCard className="mb-6 bg-white dark:bg-gray-900 border-none shadow-sm p-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Weekly Adherence</h3>
            <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
              <TrendingUp size={16} />
              +12%
            </div>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.value === 100 ? '#2563eb' : '#bfdbfe'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
          <GlassCard className="p-4 bg-white dark:bg-gray-900 border-none shadow-sm">
            <Calendar className="text-blue-600 mb-2" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
            <p className="text-xl font-bold dark:text-white">5 Days</p>
          </GlassCard>
          <GlassCard className="p-4 bg-white dark:bg-gray-900 border-none shadow-sm">
            <AlertCircle className="text-orange-600 mb-2" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Missed</p>
            <p className="text-xl font-bold dark:text-white">2 Doses</p>
          </GlassCard>
        </div>

        {/* Refill Prediction */}
        <GlassCard className="bg-white dark:bg-gray-900 border-none shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold dark:text-white">Refill Prediction</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">AI Analysis</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Lisinopril</span>
              <span className="text-sm font-bold dark:text-white">8 days left</span>
            </div>
            <Progress value={25} className="h-1.5" />
            <Button variant="outline" className="w-full rounded-xl border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400">
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