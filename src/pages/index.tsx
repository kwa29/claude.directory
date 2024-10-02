import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Prompt {
  id: number;
  title: string;
  description: string;
  author: string;
  tags: string[];
  date: string;
  popularity: number;
}

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = () => {
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => setPrompts(data));
  };

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="hero-section w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Discover <span className="gradient-text">AI Prompts</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Explore a vast collection of AI prompts to enhance your creativity and productivity.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="input flex-1 glass-effect text-white placeholder-gray-300"
                    placeholder="Search prompts..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="button button-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Featured Prompts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => (
                <div key={prompt.id} className="card">
                  <div className="p-6 space-y-2">
                    <h3 className="text-2xl font-bold">{prompt.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{prompt.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {prompt.tags.map((tag, index) => (
                        <span key={index} className="tag tag-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">By {prompt.author}</p>
                    <button className="button button-secondary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}