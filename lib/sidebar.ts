export const SIDEBAR_COOKIE_NAME = "gp-sidebar-collapsed";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Returns true when the cookie value signals a collapsed sidebar. */
export function resolveSidebarCollapsed(
  value: string | null | undefined
): boolean {
  return value === "true";
}
