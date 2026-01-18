// ============================================
// PRACTICE TYPES
// ============================================

export type PMSType = 'dentrix' | 'eaglesoft' | 'opendental' | 'other';

export interface PracticeSettings {
  timezone: string;
  businessHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
  };
  autoResponseEnabled: boolean;
  autoResponseDelay: number; // seconds
}

export interface Practice {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  pmsType: PMSType;
  settings: PracticeSettings;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// PATIENT TYPES
// ============================================

export interface InsuranceInfo {
  carrierId: string;
  carrierName: string;
  memberId: string;
  groupNumber?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  insuranceInfo?: InsuranceInfo;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// RECEPTIONIST / CALLS TYPES
// ============================================

export type CallStatus = 'new' | 'texted' | 'responded' | 'scheduled' | 'closed';

export interface MissedCall {
  id: string;
  patientPhone: string;
  patientName?: string;
  timestamp: number;
  status: CallStatus;
  conversationId?: string;
  notes?: string;
}

export type MessageRole = 'patient' | 'assistant' | 'system';

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Appointment {
  id: string;
  patientId?: string;
  patientName: string;
  patientPhone: string;
  dateTime: number;
  duration: number; // minutes
  type: string; // "Cleaning", "Consultation", etc.
  notes?: string;
  createdAt: number;
}

export interface Conversation {
  id: string;
  patientPhone: string;
  patientName?: string;
  messages: ConversationMessage[];
  appointmentBooked?: Appointment;
  status: 'active' | 'closed';
  createdAt: number;
  updatedAt: number;
}

// ============================================
// BILLING / EOB TYPES
// ============================================

export type EOBStatus = 'pending' | 'posted' | 'error' | 'review';

export interface Adjustment {
  code: string;
  description: string;
  amount: number;
}

export interface EOB {
  id: string;
  insurerId: string;
  insurerName: string;
  patientId?: string;
  patientName: string;
  claimNumber: string;
  dateOfService: number;
  procedureCodes: string[];
  amountBilled: number;
  amountAllowed: number;
  amountPaid: number;
  patientResponsibility: number;
  adjustments: Adjustment[];
  status: EOBStatus;
  errorMessage?: string;
  receivedAt: number;
  postedAt?: number;
}

export interface InsuranceCarrier {
  id: string;
  name: string;
  portalUrl?: string;
  isConnected: boolean;
  lastSyncAt?: number;
  eobCount: number;
}

// ============================================
// STATE TYPES
// ============================================

export interface ReceptionistState {
  missedCalls: Record<string, MissedCall>;
  conversations: Record<string, Conversation>;
  appointments: Record<string, Appointment>;
}

export interface BillingState {
  eobs: Record<string, EOB>;
  carriers: Record<string, InsuranceCarrier>;
  postingRules: PostingRule[];
}

export interface PostingRule {
  id: string;
  carrierId?: string; // null = all carriers
  adjustmentCode: string;
  action: 'auto_post' | 'review' | 'ignore';
}

export interface DentalAppState {
  version: string;
  practice: Practice | null;
  patients: Record<string, Patient>;
  receptionist: ReceptionistState;
  billing: BillingState;
}

// ============================================
// MOCK DATA HELPERS
// ============================================

export function createDefaultPractice(): Practice {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    name: 'My Dental Practice',
    phone: '(555) 123-4567',
    pmsType: 'opendental',
    settings: {
      timezone: 'America/Los_Angeles',
      businessHours: { start: '09:00', end: '17:00' },
      autoResponseEnabled: true,
      autoResponseDelay: 30,
    },
    createdAt: now,
    updatedAt: now,
  };
}

export function createEmptyDentalState(): DentalAppState {
  return {
    version: '1.0.0',
    practice: null,
    patients: {},
    receptionist: {
      missedCalls: {},
      conversations: {},
      appointments: {},
    },
    billing: {
      eobs: {},
      carriers: {},
      postingRules: [],
    },
  };
}
