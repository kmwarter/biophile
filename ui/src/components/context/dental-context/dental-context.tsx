"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  loadDentalState,
  saveDentalState,
  generateMockData,
  createMissedCall,
  createConversation,
  createMessage,
  createAppointment,
} from '@/lib/storage/dental-storage';
import type {
  DentalAppState,
  Practice,
  MissedCall,
  Conversation,
  ConversationMessage,
  Appointment,
  EOB,
  CallStatus,
  EOBStatus,
} from '@/types/dental';

// ============================================
// CONTEXT TYPE
// ============================================

interface DentalContextType {
  // State
  state: DentalAppState;
  practice: Practice | null;

  // Missed Calls
  missedCalls: MissedCall[];
  addMissedCall: (phone: string, name?: string) => MissedCall;
  updateCallStatus: (callId: string, status: CallStatus) => void;

  // Conversations
  conversations: Conversation[];
  getConversation: (id: string) => Conversation | undefined;
  getConversationForCall: (callId: string) => Conversation | undefined;
  startConversation: (callId: string) => Conversation;
  addMessage: (conversationId: string, role: ConversationMessage['role'], content: string) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (
    conversationId: string,
    patientName: string,
    patientPhone: string,
    dateTime: number,
    type: string
  ) => Appointment;

  // EOBs
  eobs: EOB[];
  pendingEobs: EOB[];
  postedEobs: EOB[];
  updateEobStatus: (eobId: string, status: EOBStatus, errorMessage?: string) => void;
  postEob: (eobId: string) => void;

  // Practice
  updatePractice: (updates: Partial<Practice>) => void;

  // Stats
  stats: {
    missedCallsToday: number;
    pendingEobsCount: number;
    pendingEobsAmount: number;
    postedThisWeek: number;
    revenueRecovered: number;
  };
}

// ============================================
// CONTEXT
// ============================================

const DentalContext = createContext<DentalContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

export function DentalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DentalAppState>(() => {
    const loaded = loadDentalState();
    // If empty, generate mock data for demo
    if (!loaded.practice) {
      return generateMockData();
    }
    return loaded;
  });

  // Persist on state change
  useEffect(() => {
    saveDentalState(state);
  }, [state]);

  // ============================================
  // DERIVED STATE
  // ============================================

  const missedCalls = Object.values(state.receptionist.missedCalls).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const conversations = Object.values(state.receptionist.conversations).sort(
    (a, b) => b.updatedAt - a.updatedAt
  );

  const appointments = Object.values(state.receptionist.appointments).sort(
    (a, b) => a.dateTime - b.dateTime
  );

  const eobs = Object.values(state.billing.eobs).sort(
    (a, b) => b.receivedAt - a.receivedAt
  );

  const pendingEobs = eobs.filter(e => e.status === 'pending' || e.status === 'review');
  const postedEobs = eobs.filter(e => e.status === 'posted');

  // Stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTs = today.getTime();

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const stats = {
    missedCallsToday: missedCalls.filter(c => c.timestamp >= todayTs).length,
    pendingEobsCount: pendingEobs.length,
    pendingEobsAmount: pendingEobs.reduce((sum, e) => sum + e.amountPaid, 0),
    postedThisWeek: postedEobs.filter(e => e.postedAt && e.postedAt >= weekAgo).length,
    revenueRecovered: postedEobs
      .filter(e => e.postedAt && e.postedAt >= weekAgo)
      .reduce((sum, e) => sum + e.amountPaid, 0),
  };

  // ============================================
  // MISSED CALLS
  // ============================================

  const addMissedCall = useCallback((phone: string, name?: string): MissedCall => {
    const call = createMissedCall(phone, name);
    setState(prev => ({
      ...prev,
      receptionist: {
        ...prev.receptionist,
        missedCalls: {
          ...prev.receptionist.missedCalls,
          [call.id]: call,
        },
      },
    }));
    return call;
  }, []);

  const updateCallStatus = useCallback((callId: string, status: CallStatus) => {
    setState(prev => {
      const call = prev.receptionist.missedCalls[callId];
      if (!call) return prev;

      return {
        ...prev,
        receptionist: {
          ...prev.receptionist,
          missedCalls: {
            ...prev.receptionist.missedCalls,
            [callId]: { ...call, status },
          },
        },
      };
    });
  }, []);

  // ============================================
  // CONVERSATIONS
  // ============================================

  const getConversation = useCallback((id: string): Conversation | undefined => {
    return state.receptionist.conversations[id];
  }, [state.receptionist.conversations]);

  const getConversationForCall = useCallback((callId: string): Conversation | undefined => {
    const call = state.receptionist.missedCalls[callId];
    if (!call?.conversationId) return undefined;
    return state.receptionist.conversations[call.conversationId];
  }, [state.receptionist.missedCalls, state.receptionist.conversations]);

  const startConversation = useCallback((callId: string): Conversation => {
    const call = state.receptionist.missedCalls[callId];
    if (!call) throw new Error('Call not found');

    // Check if conversation already exists
    if (call.conversationId && state.receptionist.conversations[call.conversationId]) {
      return state.receptionist.conversations[call.conversationId];
    }

    const conv = createConversation(call.patientPhone, call.patientName);

    // Add initial AI message
    const initialMessage = createMessage(
      'assistant',
      `Hi${call.patientName ? ` ${call.patientName.split(' ')[0]}` : ''}! We noticed we missed your call. How can we help you today?`
    );
    conv.messages.push(initialMessage);

    setState(prev => ({
      ...prev,
      receptionist: {
        ...prev.receptionist,
        missedCalls: {
          ...prev.receptionist.missedCalls,
          [callId]: { ...call, conversationId: conv.id, status: 'texted' },
        },
        conversations: {
          ...prev.receptionist.conversations,
          [conv.id]: conv,
        },
      },
    }));

    return conv;
  }, [state.receptionist.missedCalls, state.receptionist.conversations]);

  const addMessage = useCallback((
    conversationId: string,
    role: ConversationMessage['role'],
    content: string
  ) => {
    const message = createMessage(role, content);

    setState(prev => {
      const conv = prev.receptionist.conversations[conversationId];
      if (!conv) return prev;

      return {
        ...prev,
        receptionist: {
          ...prev.receptionist,
          conversations: {
            ...prev.receptionist.conversations,
            [conversationId]: {
              ...conv,
              messages: [...conv.messages, message],
              updatedAt: Date.now(),
            },
          },
        },
      };
    });
  }, []);

  // ============================================
  // APPOINTMENTS
  // ============================================

  const bookAppointment = useCallback((
    conversationId: string,
    patientName: string,
    patientPhone: string,
    dateTime: number,
    type: string
  ): Appointment => {
    const apt = createAppointment(patientName, patientPhone, dateTime, type);

    setState(prev => {
      const conv = prev.receptionist.conversations[conversationId];

      // Find the call associated with this conversation
      const callEntry = Object.entries(prev.receptionist.missedCalls).find(
        ([, call]) => call.conversationId === conversationId
      );

      return {
        ...prev,
        receptionist: {
          ...prev.receptionist,
          appointments: {
            ...prev.receptionist.appointments,
            [apt.id]: apt,
          },
          conversations: conv ? {
            ...prev.receptionist.conversations,
            [conversationId]: {
              ...conv,
              appointmentBooked: apt,
              status: 'closed',
              updatedAt: Date.now(),
            },
          } : prev.receptionist.conversations,
          missedCalls: callEntry ? {
            ...prev.receptionist.missedCalls,
            [callEntry[0]]: { ...callEntry[1], status: 'scheduled' },
          } : prev.receptionist.missedCalls,
        },
      };
    });

    return apt;
  }, []);

  // ============================================
  // EOBS
  // ============================================

  const updateEobStatus = useCallback((
    eobId: string,
    status: EOBStatus,
    errorMessage?: string
  ) => {
    setState(prev => {
      const eob = prev.billing.eobs[eobId];
      if (!eob) return prev;

      return {
        ...prev,
        billing: {
          ...prev.billing,
          eobs: {
            ...prev.billing.eobs,
            [eobId]: {
              ...eob,
              status,
              errorMessage,
              postedAt: status === 'posted' ? Date.now() : eob.postedAt,
            },
          },
        },
      };
    });
  }, []);

  const postEob = useCallback((eobId: string) => {
    updateEobStatus(eobId, 'posted');
  }, [updateEobStatus]);

  // ============================================
  // PRACTICE
  // ============================================

  const updatePractice = useCallback((updates: Partial<Practice>) => {
    setState(prev => {
      if (!prev.practice) return prev;
      return {
        ...prev,
        practice: {
          ...prev.practice,
          ...updates,
          updatedAt: Date.now(),
        },
      };
    });
  }, []);

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value: DentalContextType = {
    state,
    practice: state.practice,
    missedCalls,
    addMissedCall,
    updateCallStatus,
    conversations,
    getConversation,
    getConversationForCall,
    startConversation,
    addMessage,
    appointments,
    bookAppointment,
    eobs,
    pendingEobs,
    postedEobs,
    updateEobStatus,
    postEob,
    updatePractice,
    stats,
  };

  return (
    <DentalContext.Provider value={value}>
      {children}
    </DentalContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useDental() {
  const context = useContext(DentalContext);
  if (!context) {
    throw new Error('useDental must be used within a DentalProvider');
  }
  return context;
}
