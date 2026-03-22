"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pill, Bell, MessageSquare, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Track your medications",
      description: "Easily manage all your prescriptions in one place with smart scheduling.",
      icon: <Pill size={64} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Smart reminders",
      description: "Never miss a dose again with personalized notifications and refill alerts.",
      icon: <Bell size={64} className="text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      title: "AI-powered assistant",
      description: "Get instant answers about side effects, interactions, and more from our AI.",
      icon: <MessageSquare size={64} className="text-purple-600" />,
      color: "bg-purple-50"
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('hasOnboarded', 'true');
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${slides[step].color} flex flex-col p-8`}>
      <div className="flex justify-end">
        <Button variant="ghost" onClick={() => {
          localStorage.setItem('hasOnboarded', 'true');
          navigate('/');
        }}>Skip</Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-32 h-32 bg-white rounded-[40px] shadow-xl flex items-center justify-center animate-in zoom-in duration-500">
          {slides[step].icon}
        </div>
        <div className="space-y-4 max-w-xs">
          <h2 className="text-3xl font-bold text-gray-900">{slides[step].title}</h2>
          <p className="text-gray-500 leading-relaxed">{slides[step].description}</p>
        </div>
      </div>

      <div className="pb-12 space-y-8">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'}`} 
            />
          ))}
        </div>
        <Button 
          className="w-full h-14 rounded-2xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
          onClick={handleNext}
        >
          {step === slides.length - 1 ? "Get Started" : "Next"}
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;