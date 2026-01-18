"use client"

import { useState } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import {
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/utils/cn";

// ============================================
// LOGO ICON - Health mark
// ============================================

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
  {
    id: "dashboard",
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    id: "calls",
    href: "/calls",
    label: "Calls",
    icon: PhoneIcon,
  },
  {
    id: "billing",
    href: "/billing",
    label: "Billing",
    icon: CurrencyDollarIcon,
  },
  {
    id: "settings",
    href: "/settings",
    label: "Settings",
    icon: Cog6ToothIcon,
  },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  // Only show app header on provider routes
  const appRoutes = ["/dashboard", "/calls", "/billing", "/settings"];
  if (!appRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <header className="relative px-6 py-4 flex items-center justify-between bg-white border-b border-gray-200">
      <Link href="/dashboard" className="flex items-center gap-2">
        <LogoMark className="w-8 h-8 text-brand-teal-600" />
        <div className="flex flex-col">
          <div className="text-xl font-semibold text-gray-900">
            Thing<span className="text-brand-teal-600">.</span>
          </div>
          <div className="text-gray-400 text-xs font-light">Provider Portal</div>
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        {/* Desktop nav */}
        <nav className="w-full hidden md:block">
          <ul className="flex items-center justify-end gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                      active
                        ? "bg-brand-teal-50 text-brand-teal-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Hamburger button for mobile */}
        <div className="md:hidden h-[40px] flex justify-end">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            <Bars3Icon className="h-8 w-8 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className={cn(
          "fixed inset-0 w-full bg-white flex flex-col items-center justify-center z-50",
          "transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        <button
          onClick={toggleMenu}
          aria-label="Close Menu"
          className="absolute top-4 right-4"
        >
          <XMarkIcon className="h-8 w-8 text-gray-700" />
        </button>
        <ul className="flex flex-col items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.id}>
                <Link
                  onClick={toggleMenu}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-lg text-lg font-medium transition-colors",
                    active
                      ? "bg-brand-teal-50 text-brand-teal-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
