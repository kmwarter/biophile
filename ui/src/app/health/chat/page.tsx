"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function HealthChatPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Chat</h1>
        <p className="text-gray-500 mt-2">
          AI-powered health insights and questions
        </p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-brand-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-brand-teal-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Chat with AI to get personalized insights about your health data.
          Bring your own API key for privacy.
        </p>
      </div>
    </div>
  );
}
