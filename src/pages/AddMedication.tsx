"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Pill, Clock, Calendar, AlertCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';
import GlassCard from '@/components/GlassCard';

const AddMedication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const detectedMed = location.state?.detectedMed || {};

  const [formData, setFormData] = useState({
    name: detectedMed.name || '',
    dose: detectedMed.dose || '',
    frequency: detectedMed.freq || 'Once Daily',
    time: detectedMed.time || '08:00',
    stock: '30',
    instructions: 'Take with water.'
  });

  const handleSave = () => {
    // In a real app, this would save to Supabase
    showSuccess(`${formData.name} added to your schedule!`);
    navigate('/medications');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">Add Medication</h1>
      </header>

      <div className="px-6 py-8 space-y-6">
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 bg-blue-600 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-blue-100 dark:shadow-none mb-4">
            <Pill size={40} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Enter medication details</p>
        </div>

        <GlassCard className="bg-white dark:bg-gray-900 border-none shadow-sm p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Medication Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Lisinopril"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dose">Dosage</Label>
              <Input 
                id="dose" 
                value={formData.dose} 
                onChange={(e) => setFormData({...formData, dose: e.target.value})}
                placeholder="e.g. 10mg"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Initial Stock</Label>
              <Input 
                id="stock" 
                type="number"
                value={formData.stock} 
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select 
              value={formData.frequency} 
              onValueChange={(val) => setFormData({...formData, frequency: val})}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Once Daily">Once Daily</SelectItem>
                <SelectItem value="Twice Daily">Twice Daily</SelectItem>
                <SelectItem value="Three times daily">Three times daily</SelectItem>
                <SelectItem value="As needed">As needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Reminder Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                id="time" 
                type="time"
                value={formData.time} 
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="h-12 pl-10 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Input 
              id="instructions" 
              value={formData.instructions} 
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              placeholder="e.g. Take with food"
              className="h-12 rounded-xl"
            />
          </div>
        </GlassCard>

        <Button 
          className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-100 dark:shadow-none"
          onClick={handleSave}
        >
          <Save size={20} className="mr-2" /> Save Medication
        </Button>
      </div>
    </div>
  );
};

export default AddMedication;