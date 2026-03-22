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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-4 py-2 flex justify-around items-center z-50 pb-8 md:pb-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center min-w-[64px] min-h-[48px] transition-all duration-300",
              isActive ? "text-blue-600 scale-110" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;