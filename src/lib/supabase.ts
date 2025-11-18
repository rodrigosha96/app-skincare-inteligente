import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          skin_id: string;
          skin_description: string;
          skin_type: string;
          fitzpatrick: string;
          sensitivity: string;
          concerns: string[];
          acne_level: string;
          lifestyle_stress: string;
          menstrual_cycle: string;
          sun_exposure: string;
          goals: string[];
          budget: string;
          influencing_factors: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skin_id: string;
          skin_description: string;
          skin_type: string;
          fitzpatrick: string;
          sensitivity: string;
          concerns: string[];
          acne_level: string;
          lifestyle_stress: string;
          menstrual_cycle: string;
          sun_exposure: string;
          goals: string[];
          budget: string;
          influencing_factors: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skin_id?: string;
          skin_description?: string;
          skin_type?: string;
          fitzpatrick?: string;
          sensitivity?: string;
          concerns?: string[];
          acne_level?: string;
          lifestyle_stress?: string;
          menstrual_cycle?: string;
          sun_exposure?: string;
          goals?: string[];
          budget?: string;
          influencing_factors?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          brand: string;
          category: string;
          description: string;
          key_ingredients: string[];
          price: number;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand: string;
          category: string;
          description: string;
          key_ingredients: string[];
          price: number;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand?: string;
          category?: string;
          description?: string;
          key_ingredients?: string[];
          price?: number;
          image_url?: string;
          created_at?: string;
        };
      };
      routines: {
        Row: {
          id: string;
          user_id: string;
          profile_id: string;
          type: 'morning' | 'night' | 'weekly';
          steps: any[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile_id: string;
          type: 'morning' | 'night' | 'weekly';
          steps: any[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile_id?: string;
          type?: 'morning' | 'night' | 'weekly';
          steps?: any[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
