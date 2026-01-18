"use client";

import { useState } from "react";
import {
  UserPlusIcon,
  EnvelopeIcon,
  LinkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function HealthInvitePage() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const inviteLink = "https://thing.health/invite/abc123";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invite logic
    setEmail("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Invite Friends</h1>
        <p className="text-gray-500 mt-2">
          Share the gift of health tracking with friends and family
        </p>
      </div>

      {/* Invite by email */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-brand-teal-50">
            <EnvelopeIcon className="w-6 h-6 text-brand-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Invite by Email
            </h2>
            <p className="text-gray-500 text-sm">
              Send a personal invitation to someone you care about
            </p>
          </div>
        </div>
        <form onSubmit={handleInvite} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Send Invite
          </button>
        </form>
      </div>

      {/* Share link */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-brand-teal-50">
            <LinkIcon className="w-6 h-6 text-brand-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Share Your Link
            </h2>
            <p className="text-gray-500 text-sm">
              Copy your personal invite link to share anywhere
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm"
          />
          <button
            onClick={handleCopy}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 text-brand-teal-600" />
                Copied!
              </>
            ) : (
              "Copy Link"
            )}
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-brand-teal-50">
            <UserPlusIcon className="w-6 h-6 text-brand-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Why Invite Friends?
            </h2>
          </div>
        </div>
        <ul className="space-y-3">
          {[
            "Help loved ones take control of their health",
            "Track health trends together as a family",
            "Compare insights and motivate each other",
            "Everyone gets free access to core features",
          ].map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-brand-teal-500 flex-shrink-0" />
              <span className="text-gray-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
