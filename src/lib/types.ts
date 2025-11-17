// DermaFlow - Sistema de Tipos

export type SkinType = 'seca' | 'normal' | 'mista' | 'oleosa';
export type SkinSensitivity = 'baixa' | 'moderada' | 'alta';
export type FitzpatrickType = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
export type AcneLevel = 'nenhuma' | 'leve' | 'moderada' | 'severa';

export interface SkinConcern {
  id: string;
  name: string;
  severity: 'leve' | 'moderada' | 'severa';
}

export interface LifestyleFactors {
  stressLevel: number; // 1-5
  sleepQuality: number; // 1-5
  waterIntake: number; // copos/dia
  sunExposure: 'baixa' | 'moderada' | 'alta';
  hasMenstrualCycle: boolean;
  cycleAffectsSkin: boolean;
}

export interface SkinProfile {
  // Características básicas
  skinType: SkinType;
  fitzpatrickType: FitzpatrickType;
  sensitivity: SkinSensitivity;
  
  // Oleosidade por região
  oilinessZones: {
    tZone: number; // 1-5
    cheeks: number;
    chin: number;
  };
  
  // Preocupações
  concerns: SkinConcern[];
  acneLevel: AcneLevel;
  acneTriggers: string[];
  
  // Manchas
  hasHyperpigmentation: boolean;
  hyperpigmentationType?: 'melasma' | 'pos-inflamatoria' | 'solar' | 'mista';
  
  // Sinais de idade
  hasWrinkles: boolean;
  wrinkleAreas?: string[];
  textureIssues: string[];
  
  // Rotina atual
  currentRoutine: {
    morning: string[];
    night: string[];
    weekly: string[];
  };
  
  // Produtos atuais
  currentProducts: Array<{
    name: string;
    category: string;
    frequency: string;
  }>;
  
  // Preferências
  preferences: {
    texturePreference: string[];
    fragrancePreference: 'com' | 'sem' | 'tanto-faz';
    budget: 'economico' | 'moderado' | 'premium' | 'luxo';
  };
  
  // Fatores de vida
  lifestyle: LifestyleFactors;
  
  // Localização
  city: string;
  climate: 'tropical' | 'subtropical' | 'temperado' | 'seco' | 'umido';
  
  // Expectativas
  mainGoals: string[];
  timelineExpectation: '1-mes' | '3-meses' | '6-meses' | '1-ano';
  
  // Histórico
  allergies: string[];
  sensitivities: string[];
  previousReactions: string[];
}

export interface SkinID {
  code: string; // Ex: "2.3-O"
  description: string; // Ex: "Oleosa leve · Sensível moderada · Tendência a manchas"
  mainCharacteristics: string[];
  influencingFactors: string[];
  createdAt: Date;
  lastUpdated: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  skinProfile?: SkinProfile;
  skinID?: SkinID;
  onboardingCompleted: boolean;
  createdAt: Date;
}

export interface QuestionStep {
  id: string;
  title: string;
  subtitle: string;
  type: 'single' | 'multiple' | 'scale' | 'text' | 'visual';
  options?: Array<{
    value: string;
    label: string;
    description?: string;
    image?: string;
  }>;
  educationalNote?: string;
  required: boolean;
}
