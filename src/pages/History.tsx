"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { Calendar as CalendarIcon, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

const History = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const history = [
    { id: 1, name: 'Lisinopril', time: '08:00 AM', status: 'taken', takenAt: '08:05 AM' },
    { id: 2, name: 'Metformin', time: '12:30 PM', status: 'taken', takenAt: '12:45 PM' },
    { id: 3, name: 'Atorvastatin', time: '08:00 PM', status: 'missed', takenAt: '-' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">History</h1>
          <Button variant="outline" size="icon" className="rounded-xl bg-white border-none shadow-sm">
            <Download size={20} className="text-gray-600" />
          </Button>
        </header>

        <GlassCard className="mb-8 bg-white border-none shadow-sm p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-none"
          />
        </GlassCard>

        <div className="space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon size={18} className="text-blue-600" />
            {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </h2>
          
          {history.map((item) => (
            <GlassCard key={item.id} className="p-4 bg-white border-none shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-2xl",
                  item.status === 'taken' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {item.status === 'taken' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">Scheduled: {item.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-xs font-bold",
                  item.status === 'taken' ? "text-green-600" : "text-red-600"
                )}>
                  {item.status === 'taken' ? 'Taken' : 'Missed'}
                </p>
                <p className="text-[10px] text-gray-400">{item.takenAt !== '-' ? `at ${item.takenAt}` : 'No record'}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default History;