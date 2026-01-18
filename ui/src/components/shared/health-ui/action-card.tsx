"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import {
  CalendarIcon,
  ClipboardDocumentListIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import type { ActionCard as ActionCardType } from "@/types/health";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: CalendarIcon,
  clipboard: ClipboardDocumentListIcon,
  link: LinkIcon,
  questionnaire: ClipboardDocumentCheckIcon,
};

interface ActionCardProps {
  card: ActionCardType;
  className?: string;
}

export function ActionCard({ card, className }: ActionCardProps) {
  const Icon = iconMap[card.icon] || CalendarIcon;

  return (
    <Link
      href={card.ctaLink}
      className={cn(
        "block bg-white rounded-2xl p-5 shadow-sm border border-gray-100",
        "hover:shadow-md hover:border-gray-200 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-brand-teal-50 flex-shrink-0">
          <Icon className="w-6 h-6 text-brand-teal-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{card.title}</h3>
            {card.isNew && (
              <span className="px-2 py-0.5 text-xs font-medium bg-brand-teal-100 text-brand-teal-700 rounded-full">
                NEW
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{card.description}</p>

          {/* Progress indicator */}
          {card.progress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500 uppercase tracking-wide font-medium">
                  {card.progress.current} of {card.progress.total} complete
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-teal-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(card.progress.current / card.progress.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
            {card.ctaText}
          </span>
        </div>
      </div>
    </Link>
  );
}
