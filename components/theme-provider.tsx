"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  THEME_STORAGE_KEY,
  type Theme,
  resolveTheme,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage write failures (privacy mode, quota, etc.).
  }

  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`;
}

function getStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!storedTheme) {
      return null;
    }
    return resolveTheme(storedTheme);
  } catch {
    return null;
  }
}

export function ThemeProvider({
  children,
  initialTheme,
  hasThemeCookie,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
  hasThemeCookie: boolean;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    // Keep support for pre-cookie users by promoting localStorage to cookie.
    const storedTheme = hasThemeCookie ? null : getStoredTheme();
    const resolvedTheme = storedTheme ?? initialTheme;
    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) {
        setTheme(resolvedTheme);
      }
    });
    applyThemeClass(resolvedTheme);
    persistTheme(resolvedTheme);
    return () => {
      isMounted = false;
    };
  }, [hasThemeCookie, initialTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyThemeClass(next);
      persistTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
