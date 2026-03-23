"use client";

import { supabase } from "@/integrations/supabase/client";

/**
 * Optimizes an image by resizing it and converting it to WebP format.
 */
export const optimizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas to Blob failed"));
          },
          'image/webp',
          0.8
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Uploads an optimized avatar to Supabase Storage and updates the user profile.
 */
export const uploadAvatar = async (userId: string, file: File) => {
  try {
    const optimizedBlob = await optimizeImage(file);
    const fileName = `${userId}/${Date.now()}.webp`;
    
    // Upload to Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, optimizedBlob, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Update Profile Table
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ avatar_url: publicUrl })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error("Avatar upload error:", error);
    throw error;
  }
};