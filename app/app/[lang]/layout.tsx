import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "@/app/globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ['400', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400",],
  display: 'swap'
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Nicola Rebola",
  description: "Software Engineer",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${dmSans.variable} ${dmMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )

  
}