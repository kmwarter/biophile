/**
 * Health API Types
 * These are the types returned by the API - the UI uses them directly
 */

// ============================================================================
// User
// ============================================================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  phone: string;
  biologicalSex: 'male' | 'female';
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  membership: 'active' | 'inactive' | 'pending';
  memberSince: string;
}

// ============================================================================
// Categories
// ============================================================================

export type CategoryId =
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
  | 'urine';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  biomarkerCount: number;
  statusCounts: {
    inRange: number;
    outOfRange: number;
    other: number;
  };
}

// ============================================================================
// Biomarkers
// ============================================================================

export type BiomarkerStatus = 'in_range' | 'out_of_range' | 'other';

export interface BiomarkerHistoryPoint {
  date: string;
  value: number | string;
  status: BiomarkerStatus;
}

export interface Biomarker {
  id: string;
  name: string;
  shortName?: string;
  value: number | string | null;
  unit: string;
  status: BiomarkerStatus;
  categoryId: CategoryId;
  range: {
    low: number | null;
    high: number | null;
    optimalLow: number | null;
    optimalHigh: number | null;
  };
  description: string;
  whyItMatters?: string;
  history: BiomarkerHistoryPoint[];
  lastUpdated: string;
  improving?: boolean;
}

// ============================================================================
// Notes (Clinician summaries per category)
// ============================================================================

export interface Note {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  content: string;
  date: string;
}

// ============================================================================
// Recommendations
// ============================================================================

export type RecommendationType = 'supplement' | 'food' | 'lifestyle';

export interface Recommendation {
  id: string;
  name: string;
  type: RecommendationType;
  linkedBiomarkerIds: string[];
}

export interface RecommendationGroup {
  type: RecommendationType;
  displayName: string;
  items: Recommendation[];
}

// ============================================================================
// Lab Results / Requisitions
// ============================================================================

export interface LabVisit {
  id: string;
  date: string;
  location: string;
  address: string;
  city: string;
  state: string;
  confirmationCode: string;
  completed: boolean;
}

export interface Requisition {
  id: string;
  type: 'annual' | 'followup';
  status: 'pending' | 'scheduled' | 'completed';
  createdAt: string;
  visits: LabVisit[];
  pdfUrls: string[];
}

// ============================================================================
// Biological Age
// ============================================================================

export interface BiologicalAge {
  value: number;
  calendarAge: number;
  difference: number;
  calculatedAt: string;
}

// ============================================================================
// Questionnaire
// ============================================================================

export interface QuestionnaireSection {
  id: string;
  name: string;
  required: boolean;
  completed: boolean;
}

export interface QuestionnaireStatus {
  requiredComplete: boolean;
  allComplete: boolean;
  sections: QuestionnaireSection[];
}

// ============================================================================
// API Responses
// ============================================================================

export interface HealthDashboard {
  user: User;
  biologicalAge: BiologicalAge | null;
  biomarkersSummary: {
    total: number;
    inRange: number;
    outOfRange: number;
    other: number;
  };
  categories: Category[];
  recentNotes: Note[];
  pendingActions: {
    type: 'schedule' | 'questionnaire' | 'review';
    title: string;
    description: string;
  }[];
}

export interface CategoryDetail {
  category: Category;
  biomarkers: Biomarker[];
  note: Note | null;
}

export interface BiomarkerDetail {
  biomarker: Biomarker;
  recommendations: Recommendation[];
}
