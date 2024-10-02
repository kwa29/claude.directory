import React from 'react'
import Link from 'next/link'
import { Home, Users, Settings, HelpCircle } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="bg-white w-64 h-full shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-gray-800">My App</h1>
      </div>
      <nav className="mt-8">
        <Link href="/" className="flex items-center mt-4 py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200">
          <Home className="h-5 w-5" />
          <span className="mx-4">Home</span>
        </Link>
        <Link href="/users" className="flex items-center mt-4 py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200">
          <Users className="h-5 w-5" />
          <span className="mx-4">Users</span>
        </Link>
        <Link href="/settings" className="flex items-center mt-4 py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200">
          <Settings className="h-5 w-5" />
          <span className="mx-4">Settings</span>
        </Link>
        <Link href="/help" className="flex items-center mt-4 py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200">
          <HelpCircle className="h-5 w-5" />
          <span className="mx-4">Help</span>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar