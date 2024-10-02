import { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              prompt.directory
            </Link>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search prompts..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Link href="/submit" className="text-blue-600 hover:text-blue-800 font-medium">
                Submit
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Prompt Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}