import React from 'react'
import { Button } from '@/components/ui/button'
import Features from '@/components/features'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-xl mb-8">Discover amazing features and boost your productivity</p>
        <Button size="lg">Get Started</Button>
      </section>
      <Features />
    </div>
  )
}