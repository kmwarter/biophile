"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

// ============================================================================
// API BASE URL
// ============================================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// ============================================================================
// TYPES (matching API response types)
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
  categoryId: string;
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

export interface Category {
  id: string;
  name: string;
  description: string;
  biomarkerCount: number;
  statusCounts: {
    inRange: number;
    outOfRange: number;
    other: number;
  };
}

export interface Note {
  id: string;
  categoryId: string;
  categoryName: string;
  content: string;
  date: string;
}

export interface Recommendation {
  id: string;
  name: string;
  type: 'supplement' | 'food' | 'lifestyle';
  linkedBiomarkerIds: string[];
}

export interface RecommendationGroup {
  type: 'supplement' | 'food' | 'lifestyle';
  displayName: string;
  items: Recommendation[];
}

export interface BiologicalAge {
  value: number;
  calendarAge: number;
  difference: number;
  calculatedAt: string;
}

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

export interface BiomarkersSummary {
  total: number;
  inRange: number;
  outOfRange: number;
  other: number;
}

export interface PendingAction {
  type: 'schedule' | 'questionnaire' | 'review';
  title: string;
  description: string;
}

export interface DashboardData {
  user: User;
  biologicalAge: BiologicalAge | null;
  biomarkersSummary: BiomarkersSummary;
  categories: Category[];
  recentNotes: Note[];
  pendingActions: PendingAction[];
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

// ============================================================================
// CONTEXT TYPE
// ============================================================================

interface HealthContextType {
  // Loading state
  isLoading: boolean;
  error: string | null;

  // Dashboard data
  dashboard: DashboardData | null;
  user: User | null;
  biologicalAge: BiologicalAge | null;
  biomarkersSummary: BiomarkersSummary;
  categories: Category[];
  notes: Note[];
  pendingActions: PendingAction[];

  // Recommendations
  recommendations: RecommendationGroup[];

  // Data fetchers
  fetchDashboard: () => Promise<void>;
  fetchCategoryDetail: (categoryId: string) => Promise<CategoryDetail | null>;
  fetchBiomarkerDetail: (biomarkerId: string) => Promise<BiomarkerDetail | null>;
  fetchAllBiomarkers: () => Promise<Biomarker[]>;

  // Settings
  appearance: 'system' | 'light' | 'dark';
  setAppearance: (appearance: 'system' | 'light' | 'dark') => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

const HealthContext = createContext<HealthContextType | null>(null);

// ============================================================================
// PROVIDER
// ============================================================================

export function HealthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationGroup[]>([]);
  const [appearance, setAppearanceState] = useState<'system' | 'light' | 'dark'>('system');

  // Fetch dashboard data on mount
  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/health/dashboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard');
      }
      const data: DashboardData = await response.json();
      setDashboard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Failed to fetch dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch recommendations
  const fetchRecommendations = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/health/recommendations`);
      if (!response.ok) return;
      const data: RecommendationGroup[] = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    }
  }, []);

  // Fetch category detail
  const fetchCategoryDetail = useCallback(async (categoryId: string): Promise<CategoryDetail | null> => {
    try {
      const response = await fetch(`${API_BASE}/health/categories/${categoryId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch category detail:', err);
      return null;
    }
  }, []);

  // Fetch biomarker detail
  const fetchBiomarkerDetail = useCallback(async (biomarkerId: string): Promise<BiomarkerDetail | null> => {
    try {
      const response = await fetch(`${API_BASE}/health/biomarkers/${biomarkerId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch biomarker detail:', err);
      return null;
    }
  }, []);

  // Fetch all biomarkers
  const fetchAllBiomarkers = useCallback(async (): Promise<Biomarker[]> => {
    try {
      const response = await fetch(`${API_BASE}/health/biomarkers`);
      if (!response.ok) return [];
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch biomarkers:', err);
      return [];
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchDashboard();
    fetchRecommendations();
  }, [fetchDashboard, fetchRecommendations]);

  // Load appearance from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thing_appearance');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setAppearanceState(saved);
      }
    }
  }, []);

  // Appearance setter
  const setAppearance = useCallback((value: 'system' | 'light' | 'dark') => {
    setAppearanceState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('thing_appearance', value);
    }
  }, []);

  // Derived values
  const user = dashboard?.user ?? null;
  const biologicalAge = dashboard?.biologicalAge ?? null;
  const biomarkersSummary = dashboard?.biomarkersSummary ?? { total: 0, inRange: 0, outOfRange: 0, other: 0 };
  const categories = dashboard?.categories ?? [];
  const notes = dashboard?.recentNotes ?? [];
  const pendingActions = dashboard?.pendingActions ?? [];

  const value: HealthContextType = {
    isLoading,
    error,
    dashboard,
    user,
    biologicalAge,
    biomarkersSummary,
    categories,
    notes,
    pendingActions,
    recommendations,
    fetchDashboard,
    fetchCategoryDetail,
    fetchBiomarkerDetail,
    fetchAllBiomarkers,
    appearance,
    setAppearance,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
}

// ============================================================================
// HOOK
// ============================================================================

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
