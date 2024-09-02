import { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            Prompt Directory
          </Link>
          <nav>
            <Link href="/submit" className="text-blue-600 hover:text-blue-800">
              Submit
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; 2023 Prompt Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}