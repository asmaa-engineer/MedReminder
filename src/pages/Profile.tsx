"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { 
  Settings as SettingsIcon, 
  LogOut, 
  ChevronRight, 
  Camera, 
  Loader2, 
  Trash2,
  Upload,
  Save,
  User as UserIcon,
  Phone,
  HeartPulse,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { uploadAvatar } from '@/lib/storageService';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    emergency_contact: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("[Profile] Fetching user data...");
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("[Profile] Auth error:", authError);
        showError("Failed to load user session");
        return;
      }

      setUser(user);
      console.log("[Profile] User found:", user?.email);
      
      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (profileError) {
          console.warn("[Profile] Profile fetch error (might not exist yet):", profileError);
        }

        if (profileData) {
          console.log("[Profile] Profile data loaded:", profileData);
          setProfile(profileData);
          setFormData({
            full_name: profileData.full_name || '',
            phone: profileData.phone || '',
            emergency_contact: profileData.emergency_contact || ''
          });
        }
      }
    };
    fetchData();

    // Real-time subscription for profile changes
    const channel = supabase
      .channel('profile_page_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'user_profiles' 
      }, (payload) => {
        console.log("[Profile] Real-time update received:", payload.new);
        setProfile(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError(error.message);
    } else {
      showSuccess("Logged out successfully");
      navigate('/login');
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    console.log("[Profile] Saving changes...", formData);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          emergency_contact: formData.emergency_contact,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      showSuccess("Profile updated successfully!");
    } catch (error: any) {
      console.error("[Profile] Save error:", error);
      showError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      await uploadAvatar(user.id, file);
      showSuccess("Profile picture updated!");
    } catch (error: any) {
      showError(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user) return;
    setIsUploading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ avatar_url: null })
        .eq('user_id', user.id);
      
      if (error) throw error;
      showSuccess("Profile picture removed");
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const initials = formData.full_name 
    ? formData.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || '??';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden">
                <AvatarImage src={profile?.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-full flex items-center justify-center z-10">
                  <Loader2 className="text-white animate-spin" size={32} />
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  disabled={isUploading}
                  className="absolute bottom-1 right-1 rounded-full bg-blue-600 hover:bg-blue-700 border-4 border-white dark:border-gray-800 w-10 h-10 shadow-lg z-20"
                >
                  <Camera size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2">
                <DropdownMenuItem 
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl gap-2 cursor-pointer"
                >
                  <Upload size={16} />
                  Upload Photo
                </DropdownMenuItem>
                {profile?.avatar_url && (
                  <DropdownMenuItem 
                    onClick={handleRemoveAvatar}
                    className="rounded-xl gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={16} />
                    Remove Photo
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.full_name || 'Set your name'}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </header>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Personal Information</h3>
            <GlassCard className="bg-white dark:bg-gray-900 border-none shadow-sm p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="pl-10 h-12 rounded-xl"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Email (Read-only)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <Input 
                    value={user?.email || ''}
                    readOnly
                    className="pl-10 h-12 rounded-xl bg-gray-50 text-gray-400 border-gray-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10 h-12 rounded-xl"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Emergency Contact</Label>
                <div className="relative">
                  <HeartPulse className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    value={formData.emergency_contact}
                    onChange={(e) => setFormData({...formData, emergency_contact: e.target.value})}
                    className="pl-10 h-12 rounded-xl"
                    placeholder="Name & Phone"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold mt-2"
              >
                {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                Save Changes
              </Button>
            </GlassCard>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{t('settings')}</h3>
            <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl text-gray-600"><SettingsIcon size={20} /></div>
                  <span className="font-medium">{t('settings')}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            </GlassCard>
          </section>

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl h-14 font-bold min-h-[48px]"
          >
            <LogOut size={20} className="mr-2" />
            {t('logout')}
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;