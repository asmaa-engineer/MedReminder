"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Pill, MessageSquare, History, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navigation = () => {
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('avatar_url')
          .eq('user_id', user.id)
          .single();
        setAvatarUrl(data?.avatar_url);
      }
    };
    fetchAvatar();

    // Subscribe to profile changes
    const channel = supabase
      .channel('profile_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'user_profiles' 
      }, (payload) => {
        setAvatarUrl(payload.new.avatar_url);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Pill, label: 'Meds', path: '/medications' },
    { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/profile', isProfile: true },
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
            {item.isProfile && avatarUrl ? (
              <Avatar className={cn(
                "w-6 h-6 border transition-all",
                isActive ? "border-blue-600" : "border-transparent"
              )}>
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="bg-blue-50 text-[8px] font-bold">
                  <User size={12} />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            )}
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;