"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera as CameraIcon, X, Zap, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const Camera = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleCapture = () => {
    setIsProcessing(true);
    // Simulate AI Vision processing
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
      showSuccess("Medication detected!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Viewfinder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 border-2 border-white/30 rounded-[40px] relative">
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
          
          {isProcessing && (
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Sparkles className="animate-spin text-blue-400" size={40} />
                <span className="text-sm font-bold tracking-widest uppercase">Analyzing...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white">
          <X size={24} />
        </Button>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold">AI VISION ACTIVE</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <ImageIcon size={24} />
        </Button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-12 flex flex-col items-center gap-8 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-sm text-gray-300 text-center max-w-xs">
          Position the medication label within the frame for automatic detection
        </p>
        
        {hasResult ? (
          <div className="flex flex-col items-center gap-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white text-black p-6 rounded-3xl w-full max-w-xs space-y-2">
              <h3 className="font-bold text-lg">Lisinopril Detected</h3>
              <p className="text-sm text-gray-500">Dosage: 10mg • Once Daily</p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-4"
                onClick={() => navigate('/medications/new')}
              >
                Confirm & Add
              </Button>
            </div>
            <Button variant="ghost" onClick={() => setHasResult(false)}>Retake Photo</Button>
          </div>
        ) : (
          <button 
            onClick={handleCapture}
            disabled={isProcessing}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-105 transition-transform active:scale-95"
          >
            <div className="w-full h-full bg-white rounded-full" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Camera;