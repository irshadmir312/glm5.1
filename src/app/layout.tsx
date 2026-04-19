import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0a0a14',
};

export const metadata: Metadata = {
  title: "Irshad Majeed Mir | AI Portfolio OS 2026",
  description: "An immersive, AI-powered portfolio experience by Irshad Majeed Mir — AI/ML Engineer, Data Scientist, Full Stack Developer. Explore projects, take quizzes, chat with my AI clone, and discover why I'm the right hire.",
  keywords: ["Irshad Majeed Mir", "AI Engineer", "Data Scientist", "Portfolio", "Machine Learning", "Full Stack Developer", "AI Portfolio"],
  authors: [{ name: "Irshad Majeed Mir" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Irshad Majeed Mir | AI Portfolio OS",
    description: "An immersive, AI-powered portfolio experience — explore, interact, and engage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
