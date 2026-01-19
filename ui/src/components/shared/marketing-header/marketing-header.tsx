"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";

// Logo - abstract health/wellness mark
function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 8v16M8 16h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

const navItems = [
  { href: "/blog", label: "Blog" },
];

export function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show marketing header on health app routes (they have their own sidebar)
  if (pathname.startsWith("/health")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream-50/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark className="w-8 h-8 text-brand-teal-600" />
          <span className="text-xl font-medium text-gray-900">
            Biophile<span className="text-brand-teal-600">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-gray-600 hover:text-gray-900 transition-colors",
                pathname === item.href && "text-gray-900"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/get-started"
            className="px-5 py-2 bg-brand-teal-600 text-white rounded-full font-medium hover:bg-brand-teal-700 transition-colors"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-gray-900 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 bg-brand-teal-600 text-white rounded-full font-medium text-center hover:bg-brand-teal-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
