import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white dark:bg-black`}>
        {children}
      </body>
    </html>
  );
}
