import React from 'react'
import ContentCard from '@/components/content-card'

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ContentCard
        title="Welcome to My App"
        description="Discover amazing features and boost your productivity."
        imageUrl="/images/welcome.webp"
      />
      <ContentCard
        title="Explore Users"
        description="Connect with others and expand your network."
        imageUrl="/images/users.webp"
      />
      <ContentCard
        title="Customize Settings"
        description="Personalize your experience to suit your needs."
        imageUrl="/images/settings.webp"
      />
      <ContentCard
        title="Get Help"
        description="Find answers to your questions and learn more."
        imageUrl="/images/help.webp"
      />
    </div>
  )
}