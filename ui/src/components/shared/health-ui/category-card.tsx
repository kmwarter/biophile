"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import type { CategoryIcon as CategoryIconType } from "@/types/health";
import { CategoryIcon } from "./category-icon";
import { MiniBarChart } from "./mini-bar-chart";

interface CategoryData {
  id: string;
  name: string;
  statusCounts: {
    inRange: number;
    outOfRange: number;
    other: number;
  };
  biomarkerCount?: number;
}

interface CategoryCardProps {
  category: CategoryData;
  href?: string;
  className?: string;
}

// Map category id to icon
const categoryIconMap: Record<string, CategoryIconType> = {
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

function getCategoryIcon(categoryId: string): CategoryIconType {
  return categoryIconMap[categoryId] || 'daily-metrics';
}

export function CategoryCard({ category, href, className }: CategoryCardProps) {
  const total =
    category.biomarkerCount ||
    category.statusCounts.inRange +
    category.statusCounts.outOfRange +
    category.statusCounts.other;

  const icon = getCategoryIcon(category.id);

  const content = (
    <div
      className={cn(
        "bg-white rounded-2xl p-4 shadow-sm border border-gray-100",
        "hover:shadow-md hover:border-gray-200 transition-all duration-200",
        "cursor-pointer",
        className
      )}
    >
      {/* Icon and name */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gray-50">
          <CategoryIcon icon={icon} size="md" className="text-gray-700" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{category.name}</h3>
          <p className="text-sm text-gray-500">{total} biomarkers</p>
        </div>
      </div>

      {/* Status bar */}
      <MiniBarChart counts={category.statusCounts} height="sm" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// Compact version for grids
interface CompactCategoryCardProps {
  category: CategoryData;
  href?: string;
  className?: string;
}

export function CompactCategoryCard({
  category,
  href,
  className,
}: CompactCategoryCardProps) {
  const icon = getCategoryIcon(category.id);

  const content = (
    <div
      className={cn(
        "bg-white rounded-xl p-3 shadow-sm border border-gray-100",
        "hover:shadow-md hover:border-gray-200 transition-all duration-200",
        "cursor-pointer flex items-center gap-3",
        className
      )}
    >
      <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
        <CategoryIcon icon={icon} size="sm" className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm truncate">
          {category.name}
        </h4>
        <div className="mt-1">
          <MiniBarChart
            counts={category.statusCounts}
            height="sm"
            showLabels={true}
          />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
