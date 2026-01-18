"use client";

import { BeakerIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function HealthTestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Tests</h1>
        <p className="text-gray-500 mt-2">
          Schedule lab tests and view your testing history
        </p>
      </div>

      {/* Schedule a test CTA */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-brand-teal-50">
            <BeakerIcon className="w-6 h-6 text-brand-teal-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Schedule Your Next Test
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Book a comprehensive lab panel at Quest Diagnostics or LabCorp
              near you.
            </p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              Find a Location
            </button>
          </div>
        </div>
      </div>

      {/* Lab locations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Nearby Lab Locations
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            {
              name: "Quest Diagnostics",
              address: "1640 Valencia St, San Francisco, CA",
              distance: "0.8 mi",
            },
            {
              name: "LabCorp",
              address: "2100 Webster St, San Francisco, CA",
              distance: "1.2 mi",
            },
            {
              name: "Quest Diagnostics",
              address: "450 Sutter St, San Francisco, CA",
              distance: "1.5 mi",
            },
          ].map((location, index) => (
            <div
              key={index}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-500">{location.address}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{location.distance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testing history */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Testing History</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Your testing history will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
