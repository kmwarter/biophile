"use client";

import { type ReactNode } from "react";
import { HealthSidebar } from "@/components/shared/health-sidebar";
import { HealthProvider } from "@/components/context/health-context";

interface HealthLayoutProps {
  children: ReactNode;
}

export function HealthLayout({ children }: HealthLayoutProps) {
  return (
    <HealthProvider>
      <div className="flex min-h-screen bg-brand-cream-50">
        <HealthSidebar />
        <main className="flex-1 md:pt-0 pt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </HealthProvider>
  );
}
