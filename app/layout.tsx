import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { Suspense } from "react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Oluwafemi Adenuga - Senior Software Engineer",
  description: "Senior Software Engineer specializing in Python, Django, FastAPI, and cloud-native development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FDFBF7] text-[#1A1A1A]`}>
        <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        </Suspense>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
