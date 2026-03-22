"use client";

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { Search, Filter, Pill, ChevronRight, Plus, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Medications = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const meds = [
    { id: 1, name: 'Lisinopril', dose: '10mg', freq: 'Once Daily', status: 'Active', next: 'Tomorrow, 08:00 AM' },
    { id: 2, name: 'Metformin', dose: '500mg', freq: 'Twice Daily', status: 'Active', next: 'Today, 08:00 PM' },
    { id: 3, name: 'Atorvastatin', dose: '20mg', freq: 'Once Daily', status: 'Refill Needed', next: 'Today, 09:00 PM' },
    { id: 4, name: 'Amoxicillin', dose: '250mg', freq: 'Three times daily', status: 'Completed', next: '-' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Medications</h1>
            <Button 
              onClick={() => navigate('/camera')}
              className="bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-100"
            >
              <Plus size={20} className="mr-1" /> Add
            </Button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search medications..." 
                className="pl-10 h-12 rounded-xl border-none shadow-sm bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white border-none shadow-sm">
              <Filter size={18} className="text-gray-600" />
            </Button>
          </div>
        </header>

        <div className="space-y-4">
          {meds.map((med) => (
            <GlassCard 
              key={med.id} 
              className="p-4 bg-white border-none shadow-sm flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => navigate(`/medications/${med.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-2xl",
                  med.status === 'Active' ? "bg-blue-50 text-blue-600" : 
                  med.status === 'Refill Needed' ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-400"
                )}>
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{med.name}</h3>
                  <p className="text-xs text-gray-500">{med.dose} • {med.freq}</p>
                  {med.next !== '-' && (
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-600 font-medium">
                      <Clock size={10} />
                      Next: {med.next}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className={cn(
                  "rounded-lg text-[10px] px-2 py-0.5",
                  med.status === 'Active' ? "bg-blue-50 text-blue-600" : 
                  med.status === 'Refill Needed' ? "bg-orange-50 text-orange-600" : "bg-gray-100 text-gray-500"
                )}>
                  {med.status}
                </Badge>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Medications;