"use client";

import Link from "next/link";
import { useHealth } from "@/components/context/health-context";
import {
  SummaryBarChart,
  BiologicalAgeCard,
  CategoryCard,
} from "@/components/shared/health-ui";

export function HealthHomeView() {
  const {
    isLoading,
    error,
    user,
    biomarkersSummary,
    biologicalAge,
    categories,
    pendingActions,
  } = useHealth();

  const greeting = user?.preferredName || user?.firstName || "there";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome greeting */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif text-gray-900">
          Long live {greeting}.
        </h1>
      </div>

      {/* Pending actions */}
      {pendingActions.length > 0 && (
        <div className="space-y-3">
          {pendingActions.map((action, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              <Link
                href="/health/profile"
                className="px-4 py-2 text-sm font-medium text-white bg-brand-teal-600 rounded-lg hover:bg-brand-teal-700"
              >
                Continue
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Summary cards row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Biomarkers summary */}
        <Link href="/health/data" className="block">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {biomarkersSummary.total} Biomarkers
              </h2>
              <span className="text-sm text-gray-500">View all</span>
            </div>
            <SummaryBarChart
              inRange={biomarkersSummary.inRange}
              outOfRange={biomarkersSummary.outOfRange}
              other={biomarkersSummary.other}
            />
          </div>
        </Link>

        {/* Biological age */}
        {biologicalAge && (
          <BiologicalAgeCard biologicalAge={biologicalAge} className="h-full" />
        )}
      </div>

      {/* Categories grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
          <Link
            href="/health/data"
            className="text-sm text-brand-teal-600 hover:text-brand-teal-700 font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, 12).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              href={`/health/data/${category.id}`}
            />
          ))}
        </div>
        {categories.length > 12 && (
          <div className="mt-4 text-center">
            <Link
              href="/health/data"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View all {categories.length} categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
