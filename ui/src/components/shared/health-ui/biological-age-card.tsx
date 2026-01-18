"use client";

import { cn } from "@/utils/cn";
import { ShareIcon } from "@heroicons/react/24/outline";
import type { BiologicalAge } from "@/types/health";

interface BiologicalAgeCardProps {
  biologicalAge: BiologicalAge;
  className?: string;
}

export function BiologicalAgeCard({
  biologicalAge,
  className,
}: BiologicalAgeCardProps) {
  const isYounger = biologicalAge.difference < 0;
  const absDifference = Math.abs(biologicalAge.difference);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900",
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-teal-500/5 rounded-full blur-xl" />

      <div className="relative z-10">
        {/* Large number */}
        <div className="mb-2">
          <span className="text-5xl md:text-6xl font-light text-white tracking-tight font-mono">
            {biologicalAge.value.toFixed(1)}
          </span>
        </div>

        {/* Label */}
        <h3 className="text-white/80 text-lg font-medium mb-2">Biological Age</h3>

        {/* Difference */}
        <p className="text-white/70 text-sm">
          {isYounger ? (
            <>
              <span className="text-brand-teal-400 font-medium">
                {absDifference.toFixed(1)} years younger
              </span>{" "}
              than my calendar age
            </>
          ) : (
            <>
              <span className="text-brand-orange-400 font-medium">
                {absDifference.toFixed(1)} years older
              </span>{" "}
              than my calendar age
            </>
          )}
        </p>

        {/* Share button */}
        <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          <ShareIcon className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
