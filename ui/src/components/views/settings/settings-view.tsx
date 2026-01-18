"use client";

import { useState } from "react";
import {
  BuildingOfficeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useDental } from "@/components/context/dental-context/dental-context";
import { cn } from "@/utils/cn";
import type { PMSType } from "@/types/dental";

type TabId = 'practice' | 'receptionist' | 'integrations';

export function SettingsView() {
  const { practice, updatePractice } = useDental();
  const [activeTab, setActiveTab] = useState<TabId>('practice');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'practice' as TabId, label: 'Practice Info', icon: BuildingOfficeIcon },
    { id: 'receptionist' as TabId, label: 'AI Receptionist', icon: ChatBubbleLeftRightIcon },
    { id: 'integrations' as TabId, label: 'Integrations', icon: CpuChipIcon },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-brand-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/60 px-6 py-5">
        <h1 className="text-xl font-medium text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure your practice and automation settings
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200/60 bg-white p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors text-left",
                    activeTab === tab.id
                      ? "bg-brand-teal-50 text-brand-teal-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl">
            {activeTab === 'practice' && (
              <PracticeSettings
                practice={practice}
                onUpdate={updatePractice}
                onSave={handleSave}
                saved={saved}
              />
            )}
            {activeTab === 'receptionist' && (
              <ReceptionistSettings
                practice={practice}
                onUpdate={updatePractice}
                onSave={handleSave}
                saved={saved}
              />
            )}
            {activeTab === 'integrations' && (
              <IntegrationsSettings
                practice={practice}
                onUpdate={updatePractice}
                onSave={handleSave}
                saved={saved}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SETTINGS PANELS
// ============================================

function PracticeSettings({
  practice,
  onUpdate,
  onSave,
  saved,
}: {
  practice: ReturnType<typeof useDental>['practice'];
  onUpdate: (updates: Partial<NonNullable<typeof practice>>) => void;
  onSave: () => void;
  saved: boolean;
}) {
  const [name, setName] = useState(practice?.name || '');
  const [phone, setPhone] = useState(practice?.phone || '');
  const [email, setEmail] = useState(practice?.email || '');
  const [address, setAddress] = useState(practice?.address || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, phone, email, address });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Practice Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Practice Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
              placeholder="Sunshine Dental Care"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
              placeholder="office@sunshinedental.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent resize-none"
              placeholder="123 Main St, Suite 100&#10;San Francisco, CA 94102"
            />
          </div>
        </div>
      </div>

      <SaveButton saved={saved} />
    </form>
  );
}

function ReceptionistSettings({
  practice,
  onUpdate,
  onSave,
  saved,
}: {
  practice: ReturnType<typeof useDental>['practice'];
  onUpdate: (updates: Partial<NonNullable<typeof practice>>) => void;
  onSave: () => void;
  saved: boolean;
}) {
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(
    practice?.settings.autoResponseEnabled ?? true
  );
  const [autoResponseDelay, setAutoResponseDelay] = useState(
    practice?.settings.autoResponseDelay ?? 30
  );
  const [businessHoursStart, setBusinessHoursStart] = useState(
    practice?.settings.businessHours.start ?? '09:00'
  );
  const [businessHoursEnd, setBusinessHoursEnd] = useState(
    practice?.settings.businessHours.end ?? '17:00'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      settings: {
        ...practice?.settings,
        timezone: practice?.settings.timezone ?? 'America/Los_Angeles',
        autoResponseEnabled,
        autoResponseDelay,
        businessHours: {
          start: businessHoursStart,
          end: businessHoursEnd,
        },
      },
    });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          AI Receptionist
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Auto-Response</div>
              <div className="text-sm text-gray-500">
                Automatically text patients when they call and you miss
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoResponseEnabled(!autoResponseEnabled)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors",
                autoResponseEnabled ? "bg-brand-teal-500" : "bg-gray-300"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white shadow transition-transform",
                  autoResponseEnabled ? "translate-x-6" : "translate-x-0.5"
                )}
                style={{ marginTop: '2px' }}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Response Delay (seconds)
            </label>
            <input
              type="number"
              value={autoResponseDelay}
              onChange={(e) => setAutoResponseDelay(parseInt(e.target.value) || 30)}
              min={10}
              max={300}
              className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Wait this long before sending auto-response (in case you pick up)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Business Hours
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opening Time
            </label>
            <input
              type="time"
              value={businessHoursStart}
              onChange={(e) => setBusinessHoursStart(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Closing Time
            </label>
            <input
              type="time"
              value={businessHoursEnd}
              onChange={(e) => setBusinessHoursEnd(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <SaveButton saved={saved} />
    </form>
  );
}

function IntegrationsSettings({
  practice,
  onUpdate,
  onSave,
  saved,
}: {
  practice: ReturnType<typeof useDental>['practice'];
  onUpdate: (updates: Partial<NonNullable<typeof practice>>) => void;
  onSave: () => void;
  saved: boolean;
}) {
  const [pmsType, setPmsType] = useState<PMSType>(practice?.pmsType ?? 'opendental');

  const pmsOptions: { value: PMSType; label: string }[] = [
    { value: 'opendental', label: 'Open Dental' },
    { value: 'dentrix', label: 'Dentrix' },
    { value: 'eaglesoft', label: 'Eaglesoft' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ pmsType });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Practice Management System
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your PMS
            </label>
            <div className="grid grid-cols-2 gap-3">
              {pmsOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPmsType(option.value)}
                  className={cn(
                    "p-4 border rounded-xl text-left transition-colors",
                    pmsType === option.value
                      ? "border-brand-teal-500 bg-brand-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="button"
              className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Configure Connection
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Connect to your PMS to enable automatic EOB posting
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Phone System
        </h2>

        <div className="flex items-center justify-between p-4 border border-gray-200/60 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <PhoneIcon className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Twilio</div>
              <div className="text-sm text-gray-500">SMS & Voice</div>
            </div>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
            Coming Soon
          </span>
        </div>
      </div>

      <SaveButton saved={saved} />
    </form>
  );
}

function SaveButton({ saved }: { saved: boolean }) {
  return (
    <button
      type="submit"
      className={cn(
        "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all",
        saved
          ? "bg-brand-teal-50 text-brand-teal-700"
          : "bg-brand-teal-600 text-white hover:bg-brand-teal-700"
      )}
    >
      {saved ? (
        <>
          <CheckIcon className="w-5 h-5" />
          Saved
        </>
      ) : (
        'Save Changes'
      )}
    </button>
  );
}
