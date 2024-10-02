import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Search, Sun } from 'lucide-react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Claude Directory",
  description: "A directory of Claude Sonnet prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="p-8">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold">Claude Directory</h1>
              <Button variant="outline" size="icon" aria-label="Toggle dark mode">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Input
                  type="text"
                  placeholder="Search prompts..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {/* Add category and sort dropdowns here */}
            </div>
          </header>
          <main>{children}</main>
          <footer className="mt-8 text-center text-gray-500 dark:text-gray-400">
            © 2024 Claude Directory. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
