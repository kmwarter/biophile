"use client";

import { cn } from "@/utils/cn";
import type { CategoryStatusCounts } from "@/types/health";

interface MiniBarChartProps {
  counts: CategoryStatusCounts;
  showLabels?: boolean;
  height?: "sm" | "md" | "lg";
  className?: string;
}

export function MiniBarChart({
  counts,
  showLabels = true,
  height = "md",
  className,
}: MiniBarChartProps) {
  const total = counts.inRange + counts.outOfRange + counts.other;
  if (total === 0) return null;

  const inRangePercent = (counts.inRange / total) * 100;
  const outOfRangePercent = (counts.outOfRange / total) * 100;
  const otherPercent = (counts.other / total) * 100;

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {/* Bar */}
      <div
        className={cn(
          "flex rounded-full overflow-hidden bg-gray-100",
          heightClasses[height]
        )}
      >
        {inRangePercent > 0 && (
          <div
            className="bg-brand-teal-500 transition-all duration-300"
            style={{ width: `${inRangePercent}%` }}
          />
        )}
        {outOfRangePercent > 0 && (
          <div
            className="bg-brand-orange-500 transition-all duration-300"
            style={{ width: `${outOfRangePercent}%` }}
          />
        )}
        {otherPercent > 0 && (
          <div
            className="bg-gray-400 transition-all duration-300"
            style={{ width: `${otherPercent}%` }}
          />
        )}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex items-center gap-3 text-xs">
          {counts.inRange > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-teal-500" />
              <span className="text-brand-teal-700 font-medium">
                {counts.inRange}
              </span>
            </span>
          )}
          {counts.outOfRange > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-orange-500" />
              <span className="text-brand-orange-700 font-medium">
                {counts.outOfRange}
              </span>
            </span>
          )}
          {counts.other > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-gray-600 font-medium">{counts.other}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Larger summary bar chart with full labels
interface SummaryBarChartProps {
  inRange: number;
  outOfRange: number;
  other: number;
  className?: string;
}

export function SummaryBarChart({
  inRange,
  outOfRange,
  other,
  className,
}: SummaryBarChartProps) {
  const total = inRange + outOfRange + other;
  if (total === 0) return null;

  const inRangePercent = (inRange / total) * 100;
  const outOfRangePercent = (outOfRange / total) * 100;
  const otherPercent = (other / total) * 100;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Bar */}
      <div className="flex rounded-lg overflow-hidden h-4 bg-gray-100">
        {inRangePercent > 0 && (
          <div
            className="bg-brand-teal-500 transition-all duration-300"
            style={{ width: `${inRangePercent}%` }}
          />
        )}
        {outOfRangePercent > 0 && (
          <div
            className="bg-brand-orange-500 transition-all duration-300"
            style={{ width: `${outOfRangePercent}%` }}
          />
        )}
        {otherPercent > 0 && (
          <div
            className="bg-gray-400 transition-all duration-300"
            style={{ width: `${otherPercent}%` }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-brand-teal-500" />
          <span className="text-gray-600">
            <span className="font-semibold text-brand-teal-700">{inRange}</span>{" "}
            In Range
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-brand-orange-500" />
          <span className="text-gray-600">
            <span className="font-semibold text-brand-orange-700">
              {outOfRange}
            </span>{" "}
            Out of Range
          </span>
        </span>
        {other > 0 && (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-gray-400" />
            <span className="text-gray-600">
              <span className="font-semibold text-gray-700">{other}</span> Other
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
