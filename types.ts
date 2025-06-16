
import { es } from 'date-fns/locale';

export interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  age?: number;
  weight?: number; // kg
  height?: number; // cm
  bloodType?: string;
  medicalConditions?: string[];
  medications?: string[];
  allergies?: string[];
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriodDate?: string; // YYYY-MM-DD
}

export interface PeriodEntry {
  id: string;
  userId: string;
  periodStartDate: string; // YYYY-MM-DD
  periodEndDate?: string; // YYYY-MM-DD
  cycleLength: number; // calculated or input, in days
  notes?: string;
  isIrregular?: boolean;
}

export type SymptomIntensity = 'leve' | 'moderado' | 'severo';

export interface SymptomLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  symptom: string; // e.g., 'dolor abdominal', 'fatiga'
  intensity?: SymptomIntensity;
  customSymptom?: string; // if symptom is 'otro'
}

export interface MoodLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  mood: string; // e.g., 'feliz', 'triste', 'ansiosa' (could be emoji unicode)
  intensity?: number; // 1-5 scale or similar
  notes?: string;
}

export interface HabitLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  habitType: 'activity' | 'sleep' | 'hydration' | 'medication' | 'diet';
  details: Record<string, any>; // e.g., { type: 'yoga', duration: 60 } for activity
}

export interface NoteEntry {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  content: string;
  tags?: string[];
}

export interface PredictionData {
  nextPeriodStartDate: string; // YYYY-MM-DD
  fertileWindowStart: string; // YYYY-MM-DD
  fertileWindowEnd: string; // YYYY-MM-DD
  ovulationDate: string; // YYYY-MM-DD
}

declare global {
  interface Window {
    jspdf: any;
    autoTable: any;
  }
}

export const DATE_FORMAT_DISPLAY = "d 'de' MMMM 'de' yyyy";
export const DATE_FORMAT_INPUT = "yyyy-MM-dd";
export const LOCALE_ES = es;
