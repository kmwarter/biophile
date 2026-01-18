"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useHealth, type Biomarker, type CategoryDetail } from "@/components/context/health-context";
import {
  CategoryIcon,
  StatusBadge,
  MiniBarChart,
} from "@/components/shared/health-ui";
import type { CategoryIcon as CategoryIconType } from "@/types/health";

interface CategoryDetailViewProps {
  categoryId: string;
}

export function CategoryDetailView({ categoryId }: CategoryDetailViewProps) {
  const { fetchCategoryDetail } = useHealth();
  const [data, setData] = useState<CategoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const result = await fetchCategoryDetail(categoryId);
      setData(result);
      setIsLoading(false);
    }
    load();
  }, [categoryId, fetchCategoryDetail]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Category not found</p>
        <Link
          href="/health/data"
          className="mt-4 inline-flex items-center text-brand-teal-600 hover:text-brand-teal-700"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to Data
        </Link>
      </div>
    );
  }

  const { category, biomarkers, note } = data;

  // Sort biomarkers: out of range first, then in range, then other
  const sortedBiomarkers = [...biomarkers].sort((a, b) => {
    const statusOrder = { out_of_range: 0, in_range: 1, other: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Map category id to icon type
  const iconMap: Record<string, CategoryIconType> = {
    'thyroid': 'thyroid',
    'autoimmunity': 'autoimmunity',
    'blood': 'blood',
    'electrolytes': 'electrolytes',
    'toxins': 'toxins',
    'heart': 'heart',
    'immune': 'immune',
    'kidney': 'kidney',
    'liver': 'liver',
    'male-health': 'male-health',
    'female-health': 'female-health',
    'metabolic': 'metabolic',
    'nutrients': 'nutrients',
    'pancreas': 'pancreas',
    'stress': 'stress',
    'urine': 'urine',
  };

  const iconType: CategoryIconType = iconMap[category.id] || 'daily-metrics';

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link
          href="/health/data"
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Data
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400 rotate-180" />
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      {/* Category header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gray-50">
            <CategoryIcon icon={iconType} size="lg" className="text-gray-700" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-serif text-gray-900 mb-1">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-500">{category.description}</p>
            )}
            <div className="mt-4">
              <MiniBarChart counts={category.statusCounts} height="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Clinician notes */}
      {note && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Clinician Notes
          </h2>
          <div className="text-gray-600 leading-relaxed">
            <p>{note.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(note.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      {/* Biomarkers list */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Biomarkers ({biomarkers.length})
        </h2>
        <div className="space-y-2">
          {sortedBiomarkers.map((biomarker) => (
            <BiomarkerListItem
              key={biomarker.id}
              biomarker={biomarker}
              categoryId={categoryId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface BiomarkerListItemProps {
  biomarker: Biomarker;
  categoryId: string;
}

function BiomarkerListItem({ biomarker, categoryId }: BiomarkerListItemProps) {
  return (
    <Link
      href={`/health/data/${categoryId}/${biomarker.id}`}
      className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900">
            {biomarker.shortName || biomarker.name}
          </h3>
          {biomarker.shortName && (
            <p className="text-sm text-gray-500 truncate">{biomarker.name}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono text-lg font-medium text-gray-900">
              {typeof biomarker.value === "number"
                ? biomarker.value.toLocaleString()
                : biomarker.value}
            </span>
            <span className="text-sm text-gray-500 ml-1">{biomarker.unit}</span>
          </div>
          <StatusBadge status={biomarker.status} showDot={true} size="sm" />
        </div>
      </div>
    </Link>
  );
}
