import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Marketing系统 · 增长营销工作台",
  description: "面向品牌与增长团队的 Marketing 一体化管理工作台。",
  metadataBase: new URL("https://marketing-system.uthan531.chatgpt.site"),
  openGraph: {
    title: "Marketing System",
    description: "一体化营销管理工作台",
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
