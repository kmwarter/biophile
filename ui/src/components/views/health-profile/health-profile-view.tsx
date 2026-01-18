"use client";

import { useHealth } from "@/components/context/health-context";
import {
  LockClosedIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";

export function HealthProfileView() {
  const {
    isLoading,
    user,
    appearance,
    setAppearance,
  } = useHealth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Profile & Settings</h1>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
        </div>
        <div className="p-6">
          {/* Avatar and name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-brand-teal-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-brand-teal-600">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Settings fields */}
          <div className="space-y-4">
            {/* Email - locked */}
            <SettingsField
              label="Email"
              value={user.email}
              locked={true}
            />

            {/* Phone - locked */}
            <SettingsField
              label="Phone"
              value={user.phone || "Not set"}
              locked={true}
            />

            {/* Date of Birth - locked */}
            <SettingsField
              label="Date of Birth"
              value={
                user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "Not set"
              }
              locked={true}
            />

            {/* Preferred Name */}
            <SettingsField
              label="Preferred Name"
              value={user.preferredName || user.firstName}
              locked={true}
            />

            {/* Address */}
            <SettingsField
              label="Address"
              value={
                user.address
                  ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}`
                  : "Not set"
              }
              locked={true}
            />
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAppearance("system")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors",
                appearance === "system"
                  ? "border-brand-teal-500 bg-brand-teal-50 text-brand-teal-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              <ComputerDesktopIcon className="w-5 h-5" />
              System
            </button>
            <button
              onClick={() => setAppearance("light")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors",
                appearance === "light"
                  ? "border-brand-teal-500 bg-brand-teal-50 text-brand-teal-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              <SunIcon className="w-5 h-5" />
              Light
            </button>
            <button
              onClick={() => setAppearance("dark")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors",
                appearance === "dark"
                  ? "border-brand-teal-500 bg-brand-teal-50 text-brand-teal-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              <MoonIcon className="w-5 h-5" />
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Membership Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Membership</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">
                {user.membership === 'active' ? 'Active Member' : 'Free Plan'}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Member since {new Date(user.memberSince).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingsFieldProps {
  label: string;
  value: string;
  locked?: boolean;
}

function SettingsField({ label, value, locked }: SettingsFieldProps) {
  return (
    <div className="flex items-center">
      <label className="w-32 text-sm font-medium text-gray-500">{label}</label>
      <div className="flex-1 flex items-center justify-between">
        <span className="text-gray-900">{value}</span>
        {locked && <LockClosedIcon className="w-4 h-4 text-gray-400" />}
      </div>
    </div>
  );
}
