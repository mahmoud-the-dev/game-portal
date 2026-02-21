export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "gp-theme";
export const THEME_COOKIE_NAME = "gp-theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function resolveTheme(value: string | null | undefined): Theme {
  return value === "light" ? "light" : "dark";
}
