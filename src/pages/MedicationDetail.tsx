"use client";

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { ChevronLeft, Edit2, Trash2, Clock, Pill, AlertCircle, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logDose } from '@/lib/medicationService';
import { showSuccess } from '@/utils/toast';

const MedicationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for the specific medication
  const med = {
    id: Number(id),
    name: 'Lisinopril',
    dose: '10mg',
    freq: 'Once Daily',
    time: '08:00 AM',
    instructions: 'Take with water, preferably in the morning.',
    stock: 24,
    total: 30,
    adherence: 92,
    history: [
      { date: 'Today', status: 'taken', time: '08:05 AM' },
      { date: 'Yesterday', status: 'taken', time: '08:10 AM' },
      { date: 'Oct 24', status: 'missed', time: '-' },
    ]
  };

  const handleLog = async () => {
    await logDose(med.id);
    showSuccess(`${med.name} logged successfully!`);
  };

  const handleArchive = () => {
    showSuccess(`${med.name} archived.`);
    navigate('/medications');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ChevronLeft size={24} />
          </Button>
          <h1 className="font-bold text-xl dark:text-white">Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400"><Edit2 size={20} /></Button>
          <Button variant="ghost" size="icon" className="text-red-400"><Trash2 size={20} /></Button>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white shadow-xl shadow-blue-100 dark:shadow-none mb-4">
            <Pill size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{med.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{med.dose} • {med.freq}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard className="p-4 bg-white dark:bg-gray-900 border-none shadow-sm">
            <Clock className="text-blue-600 mb-2" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Next Dose</p>
            <p className="font-bold dark:text-white">{med.time}</p>
          </GlassCard>
          <GlassCard className="p-4 bg-white dark:bg-gray-900 border-none shadow-sm">
            <AlertCircle className="text-orange-600 mb-2" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Stock</p>
            <p className="font-bold dark:text-white">{med.stock}/{med.total}</p>
          </GlassCard>
        </div>

        <section className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Instructions</h3>
          <GlassCard className="bg-white dark:bg-gray-900 border-none shadow-sm p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{med.instructions}</p>
          </GlassCard>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4 ml-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent History</h3>
            <span className="text-xs font-bold text-blue-600">{med.adherence}% Adherence</span>
          </div>
          <div className="space-y-3">
            {med.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    h.status === 'taken' ? "bg-green-500" : "bg-red-500"
                  )} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{h.date}</span>
                </div>
                <span className="text-xs text-gray-400">{h.time}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 rounded-2xl h-14 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-bold"
            onClick={handleArchive}
          >
            <Archive size={20} className="mr-2" /> Archive
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 font-bold shadow-lg shadow-blue-100 dark:shadow-none"
            onClick={handleLog}
          >
            Log Dose Now
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default MedicationDetail;