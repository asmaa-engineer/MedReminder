"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { 
  ChevronLeft, Moon, Globe, Trash2, Database, AlertTriangle, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const Settings = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session found");

      // Call Edge Function to delete auth user and all associated data
      const response = await fetch('https://oycdsiipsryeqhihrzgf.supabase.co/functions/v1/delete-user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete account");
      }

      await supabase.auth.signOut();
      showSuccess("Account and all data deleted successfully");
      navigate('/login');
    } catch (error: any) {
      console.error("Deletion error:", error);
      showError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const testDatabase = async () => {
    setIsTesting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      // Simple query to test connection
      const { error } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows", which is fine for a connection test
      
      showSuccess("Connected to Supabase successfully!");
    } catch (error: any) {
      showError(`Connection failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">{t('settings')}</h1>
      </header>

      <div className="px-6 py-8 space-y-8">
        {/* Appearance */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Appearance</h3>
          <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl text-indigo-600"><Moon size={20} /></div>
                <span className="font-medium">{t('dark_mode')}</span>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
              />
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-xl text-green-600"><Globe size={20} /></div>
                <span className="font-medium">{t('language')}</span>
              </div>
              <Select value={i18n.language} onValueChange={toggleLanguage}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="ar">{t('arabic')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </section>

        {/* Account Management */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Account Management</h3>
          <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
            <button 
              onClick={testDatabase}
              disabled={isTesting}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-800/30 p-2 rounded-xl text-blue-600">
                  {isTesting ? <Loader2 className="animate-spin" size={20} /> : <Database size={20} />}
                </div>
                <span className="font-medium">Test Database Connection</span>
              </div>
            </button>
            <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-xl"><Trash2 size={20} /></div>
                    <span className="font-medium">Delete Account</span>
                  </div>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle size={20} />
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your medications, doses, and health data. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 rounded-xl"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete Everything"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </GlassCard>
        </section>
      </div>
      <Navigation />
    </div>
  );
};

export default Settings;