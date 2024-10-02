import React from 'react';
import Link from 'next/link';
import { Home, BarChart2, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-white w-64 min-h-screen p-4 border-r border-gray-200">
      <div className="flex items-center mb-8">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold">Dashboard</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/analytics" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <BarChart2 className="mr-3 h-5 w-5" />
              Analytics
            </Link>
          </li>
          <li>
            <Link href="/users" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Users className="mr-3 h-5 w-5" />
              Users
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;