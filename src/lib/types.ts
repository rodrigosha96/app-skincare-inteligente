export interface QuestionStep {
  id: string;
  title: string;
  subtitle?: string;
  type: 'text' | 'single' | 'multiple' | 'visual' | 'scale';
  options?: QuestionOption[];
  educationalNote?: string;
  required: boolean;
}

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  image?: string;
}

export interface UserProfile {
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
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  key_ingredients: string[];
  price: number;
  image_url: string;
  created_at: string;
}

export interface Routine {
  id: string;
  user_id: string;
  profile_id: string;
  type: 'morning' | 'night' | 'weekly';
  steps: RoutineStep[];
  created_at: string;
  updated_at: string;
}

export interface RoutineStep {
  order: number;
  product_id?: string;
  product_name: string;
  category: string;
  instructions: string;
  wait_time?: number;
}
