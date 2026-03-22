"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Mic, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello! I'm your MediMind assistant. How can I help you with your medications today?" },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: "I'm analyzing your request. Lisinopril is typically taken once daily. It's important not to skip doses to maintain stable blood pressure." 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-10">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-2xl">
            <ChevronLeft size={24} />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg">MediMind AI</h1>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-40"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-4 rounded-[2rem] text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-white dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-tl-none"
              )}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1 mb-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <Sparkles size={10} />
                    AI Assistant
                  </div>
                )}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-24 left-0 right-0 px-6 pb-6">
        <div className="max-w-md mx-auto relative">
          <div className="absolute -top-12 left-0 right-0 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['Side effects?', 'Missed dose?', 'Refill status'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium hover:bg-primary hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-center gap-2 bg-white dark:bg-white/10 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/20 shadow-2xl shadow-black/5">
            <Button variant="ghost" size="icon" className="rounded-full shrink-0">
              <Mic size={20} className="text-muted-foreground" />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your health..."
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            />
            <Button 
              onClick={handleSend}
              size="icon" 
              className="rounded-full shrink-0 w-10 h-10 shadow-lg shadow-primary/20"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Chat;