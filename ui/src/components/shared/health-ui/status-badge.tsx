"use client";

import { cn } from "@/utils/cn";
import type { BiomarkerStatus } from "@/types/health";

interface StatusBadgeProps {
  status: BiomarkerStatus;
  value?: string | number;
  unit?: string;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig = {
  in_range: {
    dotColor: "bg-brand-teal-500",
    textColor: "text-brand-teal-700",
    bgColor: "bg-brand-teal-50",
    label: "In Range",
  },
  out_of_range: {
    dotColor: "bg-brand-orange-500",
    textColor: "text-brand-orange-700",
    bgColor: "bg-brand-orange-50",
    label: "Out of Range",
  },
  other: {
    dotColor: "bg-gray-400",
    textColor: "text-gray-600",
    bgColor: "bg-gray-100",
    label: "Other",
  },
};

export function StatusBadge({
  status,
  value,
  unit,
  showDot = true,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bgColor,
        config.textColor,
        sizeClasses[size],
        className
      )}
    >
      {showDot && (
        <span className={cn("rounded-full", config.dotColor, dotSizes[size])} />
      )}
      <span>{config.label}</span>
      {value !== undefined && (
        <span className="font-semibold">
          {" "}
          · {value}
          {unit && ` ${unit}`}
        </span>
      )}
    </span>
  );
}

// Simple dot-only indicator
interface StatusDotProps {
  status: BiomarkerStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusDot({ status, size = "md", className }: StatusDotProps) {
  const config = statusConfig[status];

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  };

  return (
    <span
      className={cn("rounded-full", config.dotColor, sizeClasses[size], className)}
    />
  );
}
