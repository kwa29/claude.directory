import Layout from "../components/Layout";
import { Button } from "../components/Button";

export default function Home() {
  const tags = ["TypeScript", "Python", "React", "Next.js", "React Native", "Vite", "C#", "Meta-Prompt", "Expo", "JavaScript", "FastAPI", "Unity", "Game Development", "API", "Function", "Tailwind"];
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Welcome to Prompt Directory</h1>
      <p className="text-lg mb-6">
        Prompt Directory is a collection of prompts for AI models.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map((tag, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{tag}</h2>
          </div>
        ))}
      </div>
    </Layout>
  )
}