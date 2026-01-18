"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import { useDental } from "@/components/context/dental-context/dental-context";
import { cn } from "@/utils/cn";
import type { EOB, InsuranceCarrier } from "@/types/dental";

type TabId = 'pending' | 'posted' | 'carriers';

export function BillingView() {
  const {
    eobs,
    pendingEobs,
    postedEobs,
    postEob,
    state,
  } = useDental();

  const [activeTab, setActiveTab] = useState<TabId>('pending');
  const [selectedEobId, setSelectedEobId] = useState<string | null>(null);
  const [postingId, setPostingId] = useState<string | null>(null);

  const carriers = Object.values(state.billing.carriers);

  const selectedEob = selectedEobId
    ? eobs.find(e => e.id === selectedEobId)
    : null;

  const handlePostEob = async (eobId: string) => {
    setPostingId(eobId);
    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    postEob(eobId);
    setPostingId(null);
  };

  const tabs = [
    { id: 'pending' as TabId, label: 'Pending', count: pendingEobs.length },
    { id: 'posted' as TabId, label: 'Posted', count: postedEobs.length },
    { id: 'carriers' as TabId, label: 'Carriers', count: carriers.filter(c => c.isConnected).length },
  ];

  return (
    <div className="h-full flex flex-col bg-brand-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/60 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Billing</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage insurance EOBs and payment posting
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
              <ArrowPathIcon className="w-5 h-5" />
              Fetch EOBs
            </button>
            {pendingEobs.length > 0 && (
              <button
                onClick={() => pendingEobs.forEach(e => handlePostEob(e.id))}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-teal-600 text-white rounded-xl hover:bg-brand-teal-700 transition-colors font-medium"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Post All ({pendingEobs.length})
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-brand-teal-50 text-brand-teal-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {tab.label}
              <span className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs",
                activeTab === tab.id
                  ? "bg-brand-teal-100 text-brand-teal-700"
                  : "bg-gray-100 text-gray-500"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {activeTab === 'carriers' ? (
          <CarriersView carriers={carriers} />
        ) : (
          <>
            {/* EOB List */}
            <div className="w-96 border-r border-gray-200/60 bg-white overflow-y-auto">
              {(activeTab === 'pending' ? pendingEobs : postedEobs).length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>No {activeTab} EOBs</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {(activeTab === 'pending' ? pendingEobs : postedEobs).map((eob) => (
                    <EOBItem
                      key={eob.id}
                      eob={eob}
                      isSelected={selectedEobId === eob.id}
                      isPosting={postingId === eob.id}
                      onClick={() => setSelectedEobId(eob.id)}
                      onPost={() => handlePostEob(eob.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* EOB Detail */}
            <div className="flex-1 overflow-y-auto">
              {selectedEob ? (
                <EOBDetail eob={selectedEob} onPost={() => handlePostEob(selectedEob.id)} isPosting={postingId === selectedEob.id} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Select an EOB
                    </h3>
                    <p className="text-gray-500">
                      Choose an EOB to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// COMPONENTS
// ============================================

function EOBItem({
  eob,
  isSelected,
  isPosting,
  onClick,
  onPost,
}: {
  eob: EOB;
  isSelected: boolean;
  isPosting: boolean;
  onClick: () => void;
  onPost: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "px-4 py-4 cursor-pointer transition-colors",
        isSelected ? "bg-brand-teal-50" : "hover:bg-gray-50"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {eob.patientName}
          </div>
          <div className="text-sm text-gray-500">
            {eob.insurerName}
          </div>
        </div>
        <StatusBadge status={eob.status} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          {eob.claimNumber}
        </div>
        <div className="font-semibold text-gray-900">
          ${eob.amountPaid.toLocaleString()}
        </div>
      </div>
      {eob.status === 'pending' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPost();
          }}
          disabled={isPosting}
          className="mt-3 w-full py-2.5 bg-brand-teal-600 text-white rounded-xl hover:bg-brand-teal-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPosting ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-4 h-4" />
              Post to PMS
            </>
          )}
        </button>
      )}
    </div>
  );
}

function EOBDetail({
  eob,
  onPost,
  isPosting,
}: {
  eob: EOB;
  onPost: () => void;
  isPosting: boolean;
}) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              EOB Details
            </h2>
            <div className="text-sm text-gray-500 mt-1">
              Claim #{eob.claimNumber}
            </div>
          </div>
          <StatusBadge status={eob.status} />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Patient & Insurance */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Patient
              </div>
              <div className="font-medium text-gray-900">{eob.patientName}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Insurance
              </div>
              <div className="font-medium text-gray-900">{eob.insurerName}</div>
            </div>
          </div>

          {/* Amounts */}
          <div className="bg-brand-cream-50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Billed</div>
                <div className="text-lg font-semibold text-gray-900">
                  ${eob.amountBilled.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Allowed</div>
                <div className="text-lg font-semibold text-gray-900">
                  ${eob.amountAllowed.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Insurance Paid</div>
                <div className="text-lg font-semibold text-brand-teal-600">
                  ${eob.amountPaid.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Patient Owes</div>
                <div className="text-lg font-semibold text-gray-900">
                  ${eob.patientResponsibility.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Procedure Codes */}
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Procedure Codes
            </div>
            <div className="flex flex-wrap gap-2">
              {eob.procedureCodes.map((code) => (
                <span
                  key={code}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-mono"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-gray-500">Date of Service</div>
              <div className="text-gray-900">
                {new Date(eob.dateOfService).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Received</div>
              <div className="text-gray-900">
                {new Date(eob.receivedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Action */}
          {eob.status === 'pending' && (
            <button
              onClick={onPost}
              disabled={isPosting}
              className="w-full py-3 bg-brand-teal-600 text-white rounded-xl hover:bg-brand-teal-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPosting ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  Posting to PMS...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Post to Practice Management System
                </>
              )}
            </button>
          )}

          {eob.status === 'posted' && eob.postedAt && (
            <div className="flex items-center gap-2 text-sm text-brand-teal-700 bg-brand-teal-50 rounded-xl px-4 py-3">
              <CheckCircleIcon className="w-5 h-5" />
              Posted on {new Date(eob.postedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CarriersView({ carriers }: { carriers: InsuranceCarrier[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carriers.map((carrier) => (
            <div
              key={carrier.id}
              className="bg-white rounded-2xl border border-gray-200/60 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    carrier.isConnected ? "bg-brand-teal-50" : "bg-gray-100"
                  )}>
                    <BuildingOfficeIcon className={cn(
                      "w-5 h-5",
                      carrier.isConnected ? "text-brand-teal-600" : "text-gray-400"
                    )} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{carrier.name}</div>
                    <div className="text-sm text-gray-500">
                      {carrier.isConnected
                        ? `${carrier.eobCount} EOBs synced`
                        : "Not connected"
                      }
                    </div>
                  </div>
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium",
                  carrier.isConnected
                    ? "bg-brand-teal-50 text-brand-teal-700"
                    : "bg-gray-100 text-gray-600"
                )}>
                  {carrier.isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <button
                className={cn(
                  "w-full py-2.5 rounded-xl font-medium transition-colors",
                  carrier.isConnected
                    ? "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "bg-brand-teal-600 text-white hover:bg-brand-teal-700"
                )}
              >
                {carrier.isConnected ? "Manage Connection" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-orange-50 text-brand-orange-600",
    posted: "bg-brand-teal-50 text-brand-teal-700",
    error: "bg-red-50 text-red-600",
    review: "bg-brand-teal-100 text-brand-teal-700",
  };

  const icons = {
    pending: ClockIcon,
    posted: CheckCircleIcon,
    error: ExclamationCircleIcon,
    review: DocumentTextIcon,
  };

  const Icon = icons[status as keyof typeof icons] || ClockIcon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
      styles[status as keyof typeof styles] || styles.pending
    )}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
