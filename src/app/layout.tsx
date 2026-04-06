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
  title: "Global Cuisines | Premium Recipes",
  description: "Explore 5 authentic cuisines and discover mouth-watering recipes from around the globe. Beautifully responsive and dynamic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative z-0">
        <div className="flex-1">
          {children}
        </div>
        <footer className="w-full py-8 text-center text-foreground/60 text-sm font-medium tracking-wider relative z-10">
          Curated by Prince Singh
        </footer>
      </body>
    </html>
  );
}
