import React from 'react'
import FeatureCard from './feature-card'
import { RocketIcon, LightningBoltIcon, MixIcon } from '@radix-ui/react-icons'

const features = [
  {
    icon: <RocketIcon className="w-6 h-6" />,
    title: 'Fast Performance',
    description: 'Experience lightning-fast load times and smooth interactions.',
  },
  {
    icon: <LightningBoltIcon className="w-6 h-6" />,
    title: 'Easy to Use',
    description: 'Intuitive interface designed for the best user experience.',
  },
  {
    icon: <MixIcon className="w-6 h-6" />,
    title: 'Customizable',
    description: 'Tailor the platform to your specific needs and preferences.',
  },
]

export default function Features() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  )
}