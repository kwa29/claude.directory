import React from 'react'
import Button from '../components/button'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
      <p className="mb-4">This is an example of our new button components.</p>
      <div className="space-x-4">
        <Button onClick={() => console.log('Primary button clicked!')}>
          Primary Button
        </Button>
        <Button variant="secondary" onClick={() => console.log('Secondary button clicked!')}>
          Secondary Button
        </Button>
      </div>
    </div>
  )
}