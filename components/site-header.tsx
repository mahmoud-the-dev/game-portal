"use client";

import Link from "next/link";
import { Search, Bell, Library, Rocket, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo — links back to the homepage */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center group-hover:opacity-80 transition-opacity">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight hidden sm:block group-hover:opacity-80 transition-opacity">
            GAME<span className="text-primary">PORTAL</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl px-8 hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              className="block w-full p-2.5 pl-10 text-sm bg-primary/5 border border-primary/10 rounded-xl focus:ring-primary focus:border-primary placeholder-slate-500 dark:text-white transition-all outline-none"
              placeholder="Search for games, creators, or genres..."
              type="text"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-primary/5 hover:bg-primary/20 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 rounded-xl bg-primary/5 hover:bg-primary/20 text-slate-600 dark:text-slate-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl bg-primary/5 hover:bg-primary/20 text-slate-600 dark:text-slate-300 transition-colors">
            <Library className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform">
            <span className="text-sm font-bold text-primary">GP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
