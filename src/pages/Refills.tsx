"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { ChevronLeft, AlertCircle, ShoppingCart, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const Refills = () => {
  const navigate = useNavigate();
  const lowStock = [
    { id: 3, name: 'Atorvastatin', remaining: 3, threshold: 5, daysLeft: 3 },
    { id: 1, name: 'Lisinopril', remaining: 8, threshold: 5, daysLeft: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">Refill Reminders</h1>
      </header>

      <div className="px-6 py-8">
        <GlassCard className="mb-8 bg-orange-500 text-white border-none p-6">
          <div className="flex gap-4">
            <div className="bg-white/20 p-3 rounded-2xl h-fit">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Low Stock Alert</h3>
              <p className="text-sm text-orange-50">One of your medications will run out in 3 days. Order a refill soon!</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Medications</h3>
            <div className="space-y-4">
              {lowStock.map((med) => (
                <GlassCard key={med.id} className="p-5 bg-white border-none shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{med.name}</h4>
                      <p className="text-sm text-gray-500">{med.remaining} doses remaining</p>
                    </div>
                    <Badge className={cn(
                      "rounded-lg",
                      med.daysLeft <= 3 ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {med.daysLeft} days left
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12">
                      <ShoppingCart size={18} className="mr-2" /> Order Refill
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-gray-100">
                      <ExternalLink size={18} className="text-gray-400" />
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Settings</h3>
            <GlassCard className="p-0 bg-white border-none shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl text-blue-600"><RefreshCw size={20} /></div>
                  <div>
                    <p className="font-medium">Auto-Refill</p>
                    <p className="text-[10px] text-gray-400">Notify pharmacy automatically</p>
                  </div>
                </div>
                <Switch />
              </div>
            </GlassCard>
          </section>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Refills;