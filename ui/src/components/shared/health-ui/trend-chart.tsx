"use client";

import { useMemo } from "react";
import { cn } from "@/utils/cn";

interface HistoryPoint {
  date: string;
  value: number | string;
  status: 'in_range' | 'out_of_range' | 'other';
}

interface Range {
  low: number | null;
  high: number | null;
  optimalLow?: number | null;
  optimalHigh?: number | null;
}

interface TrendChartProps {
  history: HistoryPoint[];
  range?: Range;
  height?: number;
  className?: string;
}

export function TrendChart({
  history,
  range,
  height = 120,
  className,
}: TrendChartProps) {
  const chartData = useMemo(() => {
    if (history.length === 0) return null;

    // Get min/max values for scaling (convert strings to numbers)
    const values = history.map((h) => typeof h.value === 'number' ? h.value : parseFloat(h.value) || 0);
    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    // Include range boundaries in scale if provided
    if (range?.low !== null && range?.low !== undefined) {
      minValue = Math.min(minValue, range.low);
    }
    if (range?.high !== null && range?.high !== undefined) {
      maxValue = Math.max(maxValue, range.high);
    }

    // Add padding
    const padding = (maxValue - minValue) * 0.1;
    minValue = Math.max(0, minValue - padding);
    maxValue = maxValue + padding;

    const valueRange = maxValue - minValue || 1;

    // Calculate point positions
    const points = history.map((point, index) => {
      const numValue = typeof point.value === 'number' ? point.value : parseFloat(point.value) || 0;
      return {
        x: (index / (history.length - 1)) * 100,
        y: ((maxValue - numValue) / valueRange) * 100,
        ...point,
        numValue,
      };
    });

    // Create SVG path
    const pathD = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    // Range band positions
    const rangeLowY =
      range?.low !== null && range?.low !== undefined
        ? ((maxValue - range.low) / valueRange) * 100
        : null;
    const rangeHighY =
      range?.high !== null && range?.high !== undefined
        ? ((maxValue - range.high) / valueRange) * 100
        : null;

    return {
      points,
      pathD,
      rangeLowY,
      rangeHighY,
      minValue,
      maxValue,
    };
  }, [history, range]);

  if (!chartData || history.length < 2) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-gray-400 text-sm",
          className
        )}
        style={{ height }}
      >
        Not enough data for trend
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        {/* Range band */}
        {chartData.rangeLowY !== null && chartData.rangeHighY !== null && (
          <rect
            x="0"
            y={chartData.rangeHighY}
            width="100"
            height={chartData.rangeLowY - chartData.rangeHighY}
            className="fill-brand-teal-50"
          />
        )}

        {/* Range boundaries */}
        {chartData.rangeHighY !== null && (
          <line
            x1="0"
            y1={chartData.rangeHighY}
            x2="100"
            y2={chartData.rangeHighY}
            className="stroke-brand-teal-200"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        )}
        {chartData.rangeLowY !== null && (
          <line
            x1="0"
            y1={chartData.rangeLowY}
            x2="100"
            y2={chartData.rangeLowY}
            className="stroke-brand-teal-200"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        )}

        {/* Trend line */}
        <path
          d={chartData.pathD}
          fill="none"
          className="stroke-gray-800"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {chartData.points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2.5"
            className={cn(
              point.status === "in_range"
                ? "fill-brand-teal-500"
                : point.status === "out_of_range"
                ? "fill-brand-orange-500"
                : "fill-gray-400"
            )}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Date labels */}
      <div className="flex justify-between text-xs text-gray-400">
        {history.map((point, index) => (
          <span
            key={index}
            className={cn(
              index === 0 && "text-left",
              index === history.length - 1 && "text-right",
              index > 0 && index < history.length - 1 && "text-center"
            )}
          >
            {formatDate(point.date)}
          </span>
        ))}
      </div>
    </div>
  );
}
