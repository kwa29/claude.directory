import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </nav>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-primary">Facebook</a></li>
            <li><a href="#" className="hover:text-primary">Twitter</a></li>
            <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}