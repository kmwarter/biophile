"use client";

import { cn } from "@/utils/cn";

interface Range {
  low: number | null;
  high: number | null;
  optimalLow?: number | null;
  optimalHigh?: number | null;
}

type Status = 'in_range' | 'out_of_range' | 'other';

interface RangeChartProps {
  value: number;
  range: Range;
  status: Status;
  className?: string;
}

export function RangeChart({ value, range, status, className }: RangeChartProps) {
  // Calculate position of the value marker
  // We'll show a range from 0 to 2x the high value (or value if out of range)
  const maxDisplay = Math.max(range.high || 0, value) * 1.5;
  const minDisplay = 0;
  const displayRange = maxDisplay - minDisplay;

  // Calculate percentages
  const lowPercent = range.low !== null ? ((range.low - minDisplay) / displayRange) * 100 : 0;
  const highPercent = range.high !== null ? ((range.high - minDisplay) / displayRange) * 100 : 100;
  const valuePercent = ((value - minDisplay) / displayRange) * 100;

  const statusColors = {
    in_range: "bg-brand-teal-500",
    out_of_range: "bg-brand-orange-500",
    other: "bg-gray-400",
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Range bar */}
      <div className="relative h-10">
        {/* Background */}
        <div className="absolute inset-0 flex rounded-lg overflow-hidden">
          {/* Below range */}
          {lowPercent > 0 && (
            <div
              className="bg-brand-orange-100"
              style={{ width: `${lowPercent}%` }}
            />
          )}
          {/* In range */}
          <div
            className="bg-brand-teal-100"
            style={{ width: `${highPercent - lowPercent}%` }}
          />
          {/* Above range */}
          <div className="flex-1 bg-brand-orange-100" />
        </div>

        {/* Range boundary lines */}
        {range.low !== null && range.low > 0 && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-brand-teal-300"
            style={{ left: `${lowPercent}%` }}
          />
        )}
        {range.high !== null && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-brand-teal-300"
            style={{ left: `${highPercent}%` }}
          />
        )}

        {/* Value marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${Math.min(Math.max(valuePercent, 2), 98)}%` }}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full border-2 border-white shadow-lg",
              statusColors[status]
            )}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        {range.low !== null && range.low > 0 && (
          <span style={{ marginLeft: `${lowPercent}%`, transform: "translateX(-50%)" }}>
            {range.low}
          </span>
        )}
        <span className="flex-1" />
        {range.high !== null && (
          <span style={{ marginRight: `${100 - highPercent}%`, transform: "translateX(50%)" }}>
            {range.high}
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm bg-brand-orange-100" />
          <span className="text-gray-500">Out of Range</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm bg-brand-teal-100" />
          <span className="text-gray-500">In Range</span>
        </span>
      </div>
    </div>
  );
}
