import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { Suspense } from "react";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Oluwafemi Adenuga - Senior Backend Engineer",
  description: "Senior Backend Engineer specializing in Python, Django, FastAPI, and cloud-native development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white dark:bg-black`}>
        <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        </Suspense>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
