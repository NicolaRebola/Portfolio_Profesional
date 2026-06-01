import type { Metadata, Viewport } from "next";
import { SITE_METADATA_BASE } from "@/app/_constants/site";
import VisitTracker from "@/app/_components/VisitTracker";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "@/app/globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
};

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root shell for every route (including `/`, which is outside `[lang]`).
 * `[lang]/layout.tsx` sets `document.documentElement.lang` for localized pages.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
