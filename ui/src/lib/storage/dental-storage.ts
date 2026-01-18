import type {
  DentalAppState,
  Practice,
  MissedCall,
  Conversation,
  ConversationMessage,
  Appointment,
  EOB,
  InsuranceCarrier,
} from '@/types/dental';
import { createEmptyDentalState, createDefaultPractice } from '@/types/dental';

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
  DENTAL_STATE: 'thing_dental_state',
} as const;

// ============================================
// LOAD / SAVE
// ============================================

export function loadDentalState(): DentalAppState {
  if (typeof window === 'undefined') {
    return createEmptyDentalState();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DENTAL_STATE);
    if (!stored) {
      return createEmptyDentalState();
    }
    return JSON.parse(stored) as DentalAppState;
  } catch {
    console.error('Failed to load dental state from localStorage');
    return createEmptyDentalState();
  }
}

export function saveDentalState(state: DentalAppState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.DENTAL_STATE, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save dental state to localStorage', error);
  }
}

// ============================================
// PRACTICE HELPERS
// ============================================

export function getOrCreatePractice(state: DentalAppState): Practice {
  if (state.practice) {
    return state.practice;
  }
  return createDefaultPractice();
}

// ============================================
// MISSED CALL HELPERS
// ============================================

export function createMissedCall(phone: string, name?: string): MissedCall {
  return {
    id: crypto.randomUUID(),
    patientPhone: phone,
    patientName: name,
    timestamp: Date.now(),
    status: 'new',
  };
}

// ============================================
// CONVERSATION HELPERS
// ============================================

export function createConversation(phone: string, name?: string): Conversation {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    patientPhone: phone,
    patientName: name,
    messages: [],
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };
}

export function createMessage(
  role: ConversationMessage['role'],
  content: string
): ConversationMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now(),
  };
}

// ============================================
// APPOINTMENT HELPERS
// ============================================

export function createAppointment(
  patientName: string,
  patientPhone: string,
  dateTime: number,
  type: string,
  duration: number = 60
): Appointment {
  return {
    id: crypto.randomUUID(),
    patientName,
    patientPhone,
    dateTime,
    duration,
    type,
    createdAt: Date.now(),
  };
}

// ============================================
// EOB HELPERS
// ============================================

export function createEOB(
  insurerName: string,
  patientName: string,
  claimNumber: string,
  amountBilled: number,
  amountPaid: number
): EOB {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    insurerId: crypto.randomUUID(),
    insurerName,
    patientName,
    claimNumber,
    dateOfService: now - 7 * 24 * 60 * 60 * 1000, // 1 week ago
    procedureCodes: ['D0120', 'D1110'],
    amountBilled,
    amountAllowed: amountBilled * 0.8,
    amountPaid,
    patientResponsibility: amountBilled - amountPaid,
    adjustments: [],
    status: 'pending',
    receivedAt: now,
  };
}

// ============================================
// CARRIER HELPERS
// ============================================

export function createCarrier(name: string, isConnected: boolean = false): InsuranceCarrier {
  return {
    id: crypto.randomUUID(),
    name,
    isConnected,
    eobCount: 0,
  };
}

// ============================================
// MOCK DATA GENERATION
// ============================================

export function generateMockData(): DentalAppState {
  const state = createEmptyDentalState();

  // Create practice
  state.practice = createDefaultPractice();
  state.practice.name = 'Sunshine Dental Care';
  state.practice.phone = '(555) 234-5678';

  // Create some mock missed calls
  const call1 = createMissedCall('(555) 111-2222', 'John Smith');
  call1.status = 'new';
  call1.timestamp = Date.now() - 30 * 60 * 1000; // 30 min ago

  const call2 = createMissedCall('(555) 333-4444', 'Sarah Johnson');
  call2.status = 'texted';
  call2.timestamp = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago

  const call3 = createMissedCall('(555) 555-6666', 'Mike Williams');
  call3.status = 'scheduled';
  call3.timestamp = Date.now() - 24 * 60 * 60 * 1000; // 1 day ago

  state.receptionist.missedCalls = {
    [call1.id]: call1,
    [call2.id]: call2,
    [call3.id]: call3,
  };

  // Create a mock conversation
  const conv = createConversation('(555) 333-4444', 'Sarah Johnson');
  conv.messages = [
    createMessage('assistant', 'Hi Sarah! We noticed we missed your call. How can we help you today?'),
    createMessage('patient', 'Hi, I need to schedule a cleaning appointment'),
    createMessage('assistant', 'I would be happy to help you schedule a cleaning! We have openings this Thursday at 2pm or Friday at 10am. Which works better for you?'),
  ];
  conv.messages[0].timestamp = Date.now() - 2 * 60 * 60 * 1000 + 1000;
  conv.messages[1].timestamp = Date.now() - 2 * 60 * 60 * 1000 + 60000;
  conv.messages[2].timestamp = Date.now() - 2 * 60 * 60 * 1000 + 120000;

  call2.conversationId = conv.id;
  state.receptionist.conversations = { [conv.id]: conv };

  // Create mock EOBs
  const eob1 = createEOB('Delta Dental', 'John Smith', 'CLM-2024-001', 350, 280);
  const eob2 = createEOB('MetLife', 'Sarah Johnson', 'CLM-2024-002', 520, 0);
  eob2.status = 'pending';
  const eob3 = createEOB('Cigna', 'Mike Williams', 'CLM-2024-003', 175, 140);
  eob3.status = 'posted';
  eob3.postedAt = Date.now() - 2 * 24 * 60 * 60 * 1000;

  state.billing.eobs = {
    [eob1.id]: eob1,
    [eob2.id]: eob2,
    [eob3.id]: eob3,
  };

  // Create mock carriers
  const carriers = [
    createCarrier('Delta Dental', true),
    createCarrier('MetLife', true),
    createCarrier('Cigna', true),
    createCarrier('Blue Cross Blue Shield', false),
    createCarrier('Aetna', false),
  ];
  carriers[0].eobCount = 12;
  carriers[1].eobCount = 8;
  carriers[2].eobCount = 5;

  state.billing.carriers = Object.fromEntries(
    carriers.map(c => [c.id, c])
  );

  return state;
}
