"use client";

import Link from "next/link";
import {
  PhoneIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useDental } from "@/components/context/dental-context/dental-context";
import { cn } from "@/utils/cn";

export function DashboardView() {
  const { stats, missedCalls, pendingEobs, practice } = useDental();

  // Get recent activity (last 5 items)
  const recentCalls = missedCalls.slice(0, 3);
  const recentEobs = pendingEobs.slice(0, 3);

  return (
    <div className="h-full overflow-y-auto bg-brand-cream-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-8 shadow-sm">
          <h1 className="text-3xl font-light text-gray-900">
            Welcome back{practice?.name ? `, ${practice.name}` : ''}
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Here&apos;s what&apos;s happening with your practice today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={PhoneIcon}
            iconColor="text-brand-teal-600"
            iconBg="bg-brand-teal-50"
            label="Missed Calls Today"
            value={stats.missedCallsToday}
            href="/calls"
          />
          <StatCard
            icon={CurrencyDollarIcon}
            iconColor="text-brand-orange-500"
            iconBg="bg-orange-50"
            label="Pending EOBs"
            value={stats.pendingEobsCount}
            subtext={`$${stats.pendingEobsAmount.toLocaleString()} to post`}
            href="/billing"
          />
          <StatCard
            icon={CheckCircleIcon}
            iconColor="text-brand-teal-600"
            iconBg="bg-brand-teal-50"
            label="Posted This Week"
            value={stats.postedThisWeek}
            href="/billing"
          />
          <StatCard
            icon={ArrowTrendingUpIcon}
            iconColor="text-brand-teal-700"
            iconBg="bg-brand-teal-100"
            label="Revenue Recovered"
            value={`$${stats.revenueRecovered.toLocaleString()}`}
            subtext="This week"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Missed Calls */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-medium text-gray-900">Recent Missed Calls</h2>
              <Link
                href="/calls"
                className="text-sm text-brand-teal-600 hover:text-brand-teal-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentCalls.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No missed calls today
                </div>
              ) : (
                recentCalls.map((call) => (
                  <div key={call.id} className="px-6 py-4 flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
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
                    <StatusBadge status={call.status} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending EOBs */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-medium text-gray-900">Pending EOBs</h2>
              <Link
                href="/billing"
                className="text-sm text-brand-teal-600 hover:text-brand-teal-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentEobs.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No pending EOBs
                </div>
              ) : (
                recentEobs.map((eob) => (
                  <div key={eob.id} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                      <CurrencyDollarIcon className="w-5 h-5 text-brand-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {eob.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {eob.insurerName} &bull; {eob.claimNumber}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${eob.amountPaid.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">to post</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
          <h2 className="font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calls"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-teal-50 text-brand-teal-700 rounded-full hover:bg-brand-teal-100 transition-colors font-medium"
            >
              <PhoneIcon className="w-5 h-5" />
              Review Missed Calls
            </Link>
            <Link
              href="/billing"
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-50 text-brand-orange-600 rounded-full hover:bg-orange-100 transition-colors font-medium"
            >
              <CurrencyDollarIcon className="w-5 h-5" />
              Post Pending EOBs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTS
// ============================================

function StatCard({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  value,
  subtext,
  href,
}: {
  icon: typeof PhoneIcon;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string | number;
  subtext?: string;
  href?: string;
}) {
  const content = (
    <div className={cn(
      "bg-white rounded-2xl border border-gray-200/60 p-5 shadow-sm",
      href && "hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
    )}>
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
        {subtext && <div className="text-xs text-gray-400 mt-0.5">{subtext}</div>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

function StatusBadge({ status }: { status: string }) {
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
    responded: "Responded",
    scheduled: "Scheduled",
    closed: "Closed",
  };

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-xs font-medium",
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
