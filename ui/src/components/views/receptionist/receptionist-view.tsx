"use client";

import { useState } from "react";
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDental } from "@/components/context/dental-context/dental-context";
import { cn } from "@/utils/cn";
import type { MissedCall } from "@/types/dental";

export function ReceptionistView() {
  const {
    missedCalls,
    getConversationForCall,
    startConversation,
    addMessage,
    bookAppointment,
  } = useDental();

  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const selectedCall = selectedCallId
    ? missedCalls.find(c => c.id === selectedCallId)
    : null;

  const conversation = selectedCallId
    ? getConversationForCall(selectedCallId)
    : null;

  const handleStartConversation = () => {
    if (!selectedCallId) return;
    startConversation(selectedCallId);
  };

  const handleSendMessage = () => {
    if (!conversation || !inputValue.trim()) return;

    // Add patient message
    addMessage(conversation.id, 'patient', inputValue.trim());
    setInputValue("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me check our availability.",
        "Great! We have several appointment slots available this week.",
        "Thank you for getting back to us! What type of appointment are you looking for?",
        "I can schedule that for you right away. Does Thursday at 2pm work?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(conversation.id, 'assistant', randomResponse);
    }, 1000);
  };

  const handleBookAppointment = () => {
    if (!conversation || !selectedCall) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);

    bookAppointment(
      conversation.id,
      selectedCall.patientName || "Patient",
      selectedCall.patientPhone,
      tomorrow.getTime(),
      "General Checkup"
    );

    addMessage(
      conversation.id,
      'assistant',
      `Great! I've scheduled your appointment for ${tomorrow.toLocaleDateString()} at 2:00 PM. We'll send you a reminder the day before. See you then!`
    );
  };

  return (
    <div className="h-full flex bg-brand-cream-50">
      {/* Calls List */}
      <div className="w-80 border-r border-gray-200/60 bg-white flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Missed Calls</h2>
          <p className="text-sm text-gray-500 mt-1">
            {missedCalls.length} calls to review
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {missedCalls.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <PhoneIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No missed calls</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {missedCalls.map((call) => (
                <CallItem
                  key={call.id}
                  call={call}
                  isSelected={selectedCallId === call.id}
                  onClick={() => setSelectedCallId(call.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conversation Panel */}
      <div className="flex-1 flex flex-col">
        {!selectedCall ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Select a call
              </h3>
              <p className="text-gray-500">
                Choose a missed call to view or start a conversation
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Conversation Header */}
            <div className="bg-white border-b border-gray-200/60 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-teal-50 flex items-center justify-center">
                  <span className="text-brand-teal-700 font-semibold">
                    {(selectedCall.patientName || "P")[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {selectedCall.patientName || "Unknown Caller"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedCall.patientPhone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedCall.status} />
                <button
                  onClick={() => setSelectedCallId(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {!conversation ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Send an automated message to this patient
                    </p>
                    <button
                      onClick={handleStartConversation}
                      className="px-5 py-2.5 bg-brand-teal-600 text-white rounded-full hover:bg-brand-teal-700 transition-colors font-medium"
                    >
                      Send Initial Text
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {conversation.messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      content={msg.content}
                      role={msg.role}
                      timestamp={msg.timestamp}
                    />
                  ))}

                  {conversation.appointmentBooked && (
                    <div className="bg-brand-teal-50 border border-brand-teal-200 rounded-xl p-4 flex items-center gap-3">
                      <CalendarIcon className="w-6 h-6 text-brand-teal-600" />
                      <div>
                        <div className="font-medium text-brand-teal-900">
                          Appointment Booked
                        </div>
                        <div className="text-sm text-brand-teal-700">
                          {new Date(conversation.appointmentBooked.dateTime).toLocaleDateString()} at{" "}
                          {new Date(conversation.appointmentBooked.dateTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            {conversation && conversation.status === 'active' && (
              <div className="bg-white border-t border-gray-200/60 p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2.5 bg-brand-teal-600 text-white rounded-xl hover:bg-brand-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                  {!conversation.appointmentBooked && (
                    <button
                      onClick={handleBookAppointment}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-orange-500 text-white rounded-xl hover:bg-brand-orange-600 transition-colors font-medium"
                    >
                      <CalendarIcon className="w-5 h-5" />
                      Book
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// COMPONENTS
// ============================================

function CallItem({
  call,
  isSelected,
  onClick,
}: {
  call: MissedCall;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-4 py-3 flex items-center gap-3 text-left transition-colors",
        isSelected ? "bg-brand-teal-50" : "hover:bg-gray-50"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
        call.status === 'new' ? "bg-red-50" :
        call.status === 'scheduled' ? "bg-brand-teal-50" : "bg-brand-teal-50"
      )}>
        <PhoneIcon className={cn(
          "w-5 h-5",
          call.status === 'new' ? "text-red-500" :
          call.status === 'scheduled' ? "text-brand-teal-600" : "text-brand-teal-600"
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">
          {call.patientName || call.patientPhone}
        </div>
        <div className="text-sm text-gray-500">
          {formatTimeAgo(call.timestamp)}
        </div>
      </div>
      <StatusBadge status={call.status} small />
    </button>
  );
}

function MessageBubble({
  content,
  role,
  timestamp,
}: {
  content: string;
  role: string;
  timestamp: number;
}) {
  const isAssistant = role === 'assistant';

  return (
    <div className={cn("flex", isAssistant ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3",
          isAssistant
            ? "bg-white border border-gray-200/60 text-gray-900 shadow-sm"
            : "bg-brand-teal-600 text-white"
        )}
      >
        <div>{content}</div>
        <div
          className={cn(
            "text-xs mt-1",
            isAssistant ? "text-gray-400" : "text-brand-teal-200"
          )}
        >
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, small = false }: { status: string; small?: boolean }) {
  const styles = {
    new: "bg-red-50 text-red-600",
    texted: "bg-brand-teal-50 text-brand-teal-700",
    responded: "bg-brand-teal-100 text-brand-teal-700",
    scheduled: "bg-brand-teal-50 text-brand-teal-700",
    closed: "bg-gray-100 text-gray-600",
  };

  const labels = {
    new: "New",
    texted: "Texted",
    responded: "Replied",
    scheduled: "Booked",
    closed: "Closed",
  };

  return (
    <span className={cn(
      "rounded-full font-medium",
      small ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
      styles[status as keyof typeof styles] || styles.new
    )}>
      {labels[status as keyof typeof labels] || status}
    </span>
  );
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
