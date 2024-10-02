import { Button } from "@/components/ui/button"

export default function ButtonShowcase() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Button Showcase</h1>
      
      <div className="space-x-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="space-x-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>

      <div className="space-x-2">
        <Button customEffect="hover">Hover Effect</Button>
        <Button customEffect="pulsate">Pulsate Effect</Button>
      </div>
    </div>
  )
}