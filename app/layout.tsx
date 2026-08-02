import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketing 3.0 · 营销管理系统",
  description: "目标、达人、内容、财务与数据分析一体化营销管理系统。",
  metadataBase: new URL("https://marketing-system.uthan531.chatgpt.site"),
  openGraph: {
    title: "Marketing 3.0",
    description: "目标、达人、内容、财务与分析一体化营销管理系统",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Marketing System 一体化营销管理工作台" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
