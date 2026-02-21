"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  TrendingUp,
  Users,
  History,
  Heart,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
} from "@/lib/sidebar";

const mainNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Trending", href: "/trending", icon: TrendingUp },
  { label: "Following", href: "/following", icon: Users },
];

const libraryNav = [
  { label: "History", href: "/history", icon: History },
  { label: "Liked Games", href: "/liked", icon: Heart },
  { label: "Downloads", href: "/downloads", icon: Download },
];

export default function SiteSidebar({
  initialCollapsed = false,
}: {
  initialCollapsed?: boolean;
}) {
  const pathname = usePathname();
  // Seeded from the SSR-read cookie so the server and first client render agree.
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      // Write cookie so the next SSR request renders the correct width immediately.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
      return next;
    });
  }

  return (
    <aside
      className={`hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16 border-r border-primary/5 shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden ${
        collapsed ? "w-[68px]" : "w-64"
      }`}
    >
      {/* Scrollable nav area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-8">
        <nav className="space-y-1 px-3">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary text-white font-semibold shadow-lg shadow-primary/20"
                    : "hover:bg-primary/10 text-slate-600 dark:text-slate-400 hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {/* Label fades out and collapses width so it doesn't push layout */}
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 border-t border-primary/10 pt-4">
          {/* Section heading collapses alongside labels */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              collapsed ? "h-0 opacity-0" : "h-8 opacity-100"
            }`}
          >
            <h3 className="px-1 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Library
            </h3>
          </div>
          <nav className="space-y-1">
            {libraryNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-white font-semibold shadow-lg shadow-primary/20"
                      : "hover:bg-primary/10 text-slate-600 dark:text-slate-400 hover:text-primary"
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span
                    className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Toggle button pinned to the bottom */}
      <div className="border-t border-primary/10 p-3">
        <button
          onClick={toggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:bg-primary/10 hover:text-primary transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
