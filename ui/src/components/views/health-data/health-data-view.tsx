"use client";

import { useHealth } from "@/components/context/health-context";
import {
  CategoryCard,
  SummaryBarChart,
} from "@/components/shared/health-ui";

export function HealthDataView() {
  const { categories, biomarkersSummary } = useHealth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Data</h1>
        <p className="text-gray-500">
          Explore your health data across all categories
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {biomarkersSummary.total} Biomarkers
          </h2>
        </div>
        <SummaryBarChart
          inRange={biomarkersSummary.inRange}
          outOfRange={biomarkersSummary.outOfRange}
          other={biomarkersSummary.other}
        />
      </div>

      {/* Categories grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          All Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              href={`/health/data/${category.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
