"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-300",
      hover && "hover:bg-white/15 hover:border-white/30",
      className
    )}>
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;