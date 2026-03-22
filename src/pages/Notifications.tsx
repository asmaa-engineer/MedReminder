"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { Bell, Pill, AlertCircle, Sparkles, ChevronLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Notifications = () => {
  const navigate = useNavigate();
  const notifications = [
    { id: 1, type: 'reminder', title: 'Time for Metformin', body: 'Take 500mg with your lunch.', time: '2m ago', read: false },
    { id: 2, type: 'missed', title: 'Missed Dose', body: 'You missed your 8:00 AM Lisinopril.', time: '4h ago', read: true },
    { id: 3, type: 'refill', title: 'Low Stock Alert', body: 'Atorvastatin is running low (3 days left).', time: '1d ago', read: true },
    { id: 4, type: 'insight', title: 'Weekly Summary', body: 'Your adherence improved by 12% this week!', time: '2d ago', read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Pill className="text-blue-600" size={20} />;
      case 'missed': return <AlertCircle className="text-red-600" size={20} />;
      case 'refill': return <AlertCircle className="text-orange-600" size={20} />;
      case 'insight': return <Sparkles className="text-purple-600" size={20} />;
      default: return <Bell className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ChevronLeft size={24} />
          </Button>
          <h1 className="font-bold text-xl">Notifications</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <Trash2 size={20} />
        </Button>
      </header>

      <div className="px-6 py-6 space-y-4">
        {notifications.map((n) => (
          <GlassCard key={n.id} className={cn(
            "p-4 border-none shadow-sm flex gap-4 transition-all active:scale-[0.98]",
            n.read ? "bg-white" : "bg-blue-50/50 border-l-4 border-l-blue-600"
          )}>
            <div className={cn(
              "p-3 rounded-2xl h-fit",
              n.type === 'reminder' ? "bg-blue-100" : 
              n.type === 'missed' ? "bg-red-100" : 
              n.type === 'refill' ? "bg-orange-100" : "bg-purple-100"
            )}>
              {getIcon(n.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{n.title}</h3>
                <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{n.body}</p>
            </div>
          </GlassCard>
        ))}
      </div>
      <Navigation />
    </div>
  );
};

export default Notifications;