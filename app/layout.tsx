import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard',
  description: 'Improved global design for the dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}