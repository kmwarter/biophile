"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  BeakerIcon,
  UserPlusIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  BeakerIcon as BeakerIconSolid,
  UserPlusIcon as UserPlusIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from "@heroicons/react/24/solid";
import { cn } from "@/utils/cn";

// ============================================
// LOGO
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

// ============================================
// NAV ITEMS
// ============================================

const navItems = [
  {
    id: "home",
    href: "/health",
    label: "Home",
    icon: HomeIcon,
    iconSolid: HomeIconSolid,
  },
  {
    id: "data",
    href: "/health/data",
    label: "Data",
    icon: ChartBarIcon,
    iconSolid: ChartBarIconSolid,
  },
  {
    id: "chat",
    href: "/health/chat",
    label: "Chat",
    icon: ChatBubbleLeftRightIcon,
    iconSolid: ChatBubbleLeftRightIconSolid,
  },
  {
    id: "protocols",
    href: "/health/protocols",
    label: "Protocols",
    icon: ClipboardDocumentListIcon,
    iconSolid: ClipboardDocumentListIconSolid,
  },
  {
    id: "docs",
    href: "/health/docs",
    label: "Docs",
    icon: DocumentTextIcon,
    iconSolid: DocumentTextIconSolid,
  },
  {
    id: "tests",
    href: "/health/tests",
    label: "Tests",
    icon: BeakerIcon,
    iconSolid: BeakerIconSolid,
  },
  {
    id: "invite",
    href: "/health/invite",
    label: "Invite",
    icon: UserPlusIcon,
    iconSolid: UserPlusIconSolid,
  },
];

const profileItem = {
  id: "profile",
  href: "/health/profile",
  label: "Profile",
  icon: UserCircleIcon,
  iconSolid: UserCircleIconSolid,
};

// ============================================
// SIDEBAR COMPONENT
// ============================================

export function HealthSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/health") {
      return pathname === "/health";
    }
    return pathname.startsWith(href);
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 mb-2">
        <Link href="/health" className="flex items-center gap-2">
          <LogoMark className="w-8 h-8 text-brand-teal-600" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              Thing<span className="text-brand-teal-600">.</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Main nav items */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = active ? item.iconSolid : item.icon;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-brand-teal-50 text-brand-teal-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile at bottom */}
      <div className="p-3 border-t border-gray-200">
        <Link
          href={profileItem.href}
          onClick={() => setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            isActive(profileItem.href)
              ? "bg-brand-teal-50 text-brand-teal-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {isActive(profileItem.href) ? (
            <profileItem.iconSolid className="w-5 h-5 flex-shrink-0" />
          ) : (
            <profileItem.icon className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{profileItem.label}</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 lg:w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <Link href="/health" className="flex items-center gap-2">
          <LogoMark className="w-7 h-7 text-brand-teal-600" />
          <span className="text-lg font-semibold text-gray-900">
            Thing<span className="text-brand-teal-600">.</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-50 flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Close menu"
        >
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </button>
        <NavContent />
      </aside>
    </>
  );
}
