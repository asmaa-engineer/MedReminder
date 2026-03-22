"use client";

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasOnboarded = localStorage.getItem('hasOnboarded');
      navigate(hasOnboarded ? '/' : '/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 animate-bounce">
          <Pill size={80} className="rotate-45" />
        </div>
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight">MediMind</h1>
      <p className="mt-2 text-blue-100 font-medium">AI-Powered Care</p>
      
      <div className="absolute bottom-12 flex gap-1">
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Splash;