import { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Prompt Directory
          </Link>
          <nav>
            <Link href="/" className="mr-4 hover:text-gray-300">
              Home
            </Link>
            <Link href="/submit" className="hover:text-gray-300">
              Submit
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Prompt Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}