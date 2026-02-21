import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import SiteSidebar from "@/components/site-sidebar";
import SiteFooter from "@/components/site-footer";
import { THEME_COOKIE_NAME, resolveTheme } from "@/lib/theme";
import {
  SIDEBAR_COOKIE_NAME,
  resolveSidebarCollapsed,
} from "@/lib/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Game Portal",
    template: "%s | Game Portal",
  },
  description: "Play 50+ free browser games — no downloads, no accounts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookieValue = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const initialTheme = resolveTheme(themeCookieValue);
  const hasThemeCookie = typeof themeCookieValue === "string";

  const sidebarCookieValue = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value;
  const initialSidebarCollapsed = resolveSidebarCollapsed(sidebarCookieValue);

  return (
    <html
      lang="en"
      className={initialTheme === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          initialTheme={initialTheme}
          hasThemeCookie={hasThemeCookie}
        >
          <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <div className="flex max-w-[1600px] mx-auto">
              <SiteSidebar initialCollapsed={initialSidebarCollapsed} />
              <main className="flex-1 min-w-0">{children}</main>
            </div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
