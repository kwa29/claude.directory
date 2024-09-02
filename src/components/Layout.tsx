import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useTag } from "./TagContext";
import { useSearch } from "./SearchContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { selectedTag, setSelectedTag } = useTag();
  const { searchQuery, setSearchQuery } = useSearch();
  const [tags, setTags] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setTags(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Prompt Directory
          </Link>
        </div>
      </header>
      <div className="flex-grow container mx-auto px-4 py-8 flex">
        <aside className="w-64 pr-8 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Tags</h2>
          <div className="space-y-2 flex-grow">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSelectedTag(tag)}
                className={`block text-left w-full px-2 py-1 rounded ${
                  selectedTag === tag
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-gray-800"
                } transition-colors`}
              >
                {tag}
              </button>
            ))}
          </div>
          <Link 
            href="/submit" 
            className="mt-8 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors text-center"
          >
            Submit
          </Link>
        </aside>
        <main className="flex-grow max-w-3xl">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
            />
          </div>
          {children}
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Prompt Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}