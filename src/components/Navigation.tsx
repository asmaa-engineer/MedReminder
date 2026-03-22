"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Pill, MessageSquare, History, User } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Pill, label: 'Meds', path: '/medications' },
    { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 pb-8 md:pb-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-blue-600 scale-110" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;