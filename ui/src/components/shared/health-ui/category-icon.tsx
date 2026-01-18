"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { CategoryIcon as CategoryIconType } from "@/types/health";

interface CategoryIconProps {
  icon: CategoryIconType;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// SVG icon paths for each category - line art style
const iconPaths: Record<CategoryIconType, ReactNode> = {
  thyroid: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4c-2 0-4 2-4 4 0 3 2 5 4 8 2-3 4-5 4-8 0-2-2-4-4-4zm0 0v16m-3-4c-2 0-4-1-4-3m14 3c2 0 4-1 4-3"
    />
  ),
  autoimmunity: (
    <>
      <circle cx="12" cy="12" r="8" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2m2-6a4 4 0 11-8 0" />
    </>
  ),
  blood: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l-1.912 5.813a2 2 0 01-1.275 1.275L3 12l5.813 1.912a2 2 0 011.275 1.275L12 21l1.912-5.813a2 2 0 011.275-1.275L21 12l-5.813-1.912a2 2 0 01-1.275-1.275L12 3z"
    />
  ),
  electrolytes: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  ),
  toxins: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </>
  ),
  heart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  ),
  immune: (
    <>
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v4m0 14v4m11-11h-4M5 12H1m16.778-6.778l-2.828 2.828M8.05 15.95l-2.828 2.828m11.556 0l-2.828-2.828M8.05 8.05L5.222 5.222" />
    </>
  ),
  kidney: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3c-1.657 0-3 2.686-3 6s1.343 6 3 6c0 0 0 3 3 3s3-3 3-3c1.657 0 3-2.686 3-6s-1.343-6-3-6c0 0 0-1-3-1s-3 1-3 1z"
    />
  ),
  liver: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6c-4 0-7 3-7 6 0 4 3 7 7 7s7-3 7-7c0-3-3-6-7-6zm0 0V3m-3 6h6"
    />
  ),
  "male-health": (
    <>
      <circle cx="10" cy="14" r="5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l5-5m0 0v4m0-4h-4" />
    </>
  ),
  "female-health": (
    <>
      <circle cx="12" cy="10" r="5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6m-3-3h6" />
    </>
  ),
  metabolic: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l3-3m0 0l3 3m-3-3v12m15-12l-3-3m0 0l-3 3m3-3v12M9 21h6"
    />
  ),
  nutrients: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  pancreas: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  ),
  stress: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  ),
  urine: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  ),
  "biological-age": (
    <>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </>
  ),
  "daily-metrics": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  ),
};

export function CategoryIcon({ icon, size = "md", className }: CategoryIconProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  const strokeWidth = size === "sm" ? 2 : 1.5;

  return (
    <svg
      className={cn(sizeClasses[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {iconPaths[icon]}
    </svg>
  );
}
