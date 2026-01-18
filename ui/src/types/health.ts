// Health Tracking Types for Consumer App
// UI-specific types used by the health views

// ============================================================================
// Biomarker Types
// ============================================================================

export type BiomarkerStatus = 'in_range' | 'out_of_range' | 'other';

export interface BiomarkerRange {
  low: number | null;
  high: number | null;
  optimalLow?: number | null;
  optimalHigh?: number | null;
  unit: string;
}

export interface BiomarkerHistoryPoint {
  date: string;
  value: number;
  status: BiomarkerStatus;
}

export interface Biomarker {
  id: string;
  name: string;
  shortName?: string;
  value: number | string | null;
  unit: string;
  status: BiomarkerStatus;
  range: BiomarkerRange;
  categoryId: string;
  history: BiomarkerHistoryPoint[];
  description?: string;
  whyItMatters?: string;
  foodsToEat?: string[];
  labReferenceNote?: string;
  lastUpdated: string;
}

// ============================================================================
// Category Types
// ============================================================================

export type CategoryIcon =
  | 'thyroid'
  | 'autoimmunity'
  | 'blood'
  | 'electrolytes'
  | 'toxins'
  | 'heart'
  | 'immune'
  | 'kidney'
  | 'liver'
  | 'male-health'
  | 'female-health'
  | 'metabolic'
  | 'nutrients'
  | 'pancreas'
  | 'stress'
  | 'urine'
  | 'biological-age'
  | 'daily-metrics';

export interface CategoryStatusCounts {
  inRange: number;
  outOfRange: number;
  other: number;
}

export interface Category {
  id: string;
  name: string;
  icon: CategoryIcon;
  description?: string;
  statusCounts: CategoryStatusCounts;
  biomarkerIds: string[];
}

// ============================================================================
// Lab Result Types
// ============================================================================

export interface LabVisit {
  id: string;
  date: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  confirmationCode?: string;
}

export interface ReferringPhysician {
  firstName: string;
  lastName: string;
  email?: string;
}

export interface LabResult {
  id: string;
  requisitionId: string;
  date: string;
  visits: LabVisit[];
  physician?: ReferringPhysician;
  biomarkerIds: string[];
  status: 'pending' | 'processing' | 'complete';
}

// ============================================================================
// Notes & Recommendations
// ============================================================================

export interface HealthNote {
  id: string;
  categoryId: string;
  categoryName: string;
  note: string;
  date: string;
  source: 'ai' | 'clinician' | 'user';
}

export type RecommendationType =
  | 'supplement'
  | 'food'
  | 'exercise'
  | 'lifestyle'
  | 'selfcare';

export interface Recommendation {
  id: string;
  name: string;
  type: RecommendationType;
  description?: string;
  linkedBiomarkerIds: string[];
  priority?: 'low' | 'medium' | 'high';
}

export interface RecommendationCategory {
  name: string;
  displayName: string;
  recommendations: Recommendation[];
}

// ============================================================================
// User & Profile Types
// ============================================================================

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserHealthProfile {
  id: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  biologicalSex?: 'male' | 'female';
  address?: UserAddress;
  createdAt: string;
  updatedAt: string;
}

export interface BiologicalAge {
  value: number;
  calendarAge: number;
  difference: number;
  calculatedAt: string;
  contributingFactors?: {
    biomarkerId: string;
    impact: 'positive' | 'negative';
  }[];
}

// ============================================================================
// Health History & Settings
// ============================================================================

export interface HealthHistoryItem {
  id: string;
  question: string;
  answer?: string;
  completed: boolean;
}

export interface ConnectedApp {
  id: string;
  name: string;
  connected: boolean;
  lastSyncAt?: string;
}

// ============================================================================
// App State
// ============================================================================

export interface HealthAppState {
  version: string;
  user: UserHealthProfile | null;
  biomarkers: Record<string, Biomarker>;
  categories: Record<string, Category>;
  labResults: Record<string, LabResult>;
  notes: Record<string, HealthNote>;
  recommendations: RecommendationCategory[];
  biologicalAge: BiologicalAge | null;
  healthHistory: HealthHistoryItem[];
  connectedApps: ConnectedApp[];
  appearance: 'system' | 'light' | 'dark';
  lastUpdated: string;
}

// ============================================================================
// Summary/Dashboard Types
// ============================================================================

export interface BiomarkersSummary {
  total: number;
  inRange: number;
  outOfRange: number;
  other: number;
}

export interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
  type: 'schedule' | 'history' | 'connected-apps' | 'questionnaire';
  isNew?: boolean;
  progress?: {
    current: number;
    total: number;
  };
}

// ============================================================================
// Navigation Types
// ============================================================================

export type HealthNavItem =
  | 'home'
  | 'data'
  | 'chat'
  | 'protocols'
  | 'docs'
  | 'tests'
  | 'invite';

export interface HealthNavigation {
  items: {
    id: HealthNavItem;
    label: string;
    icon: string;
    href: string;
  }[];
  currentItem: HealthNavItem;
}
