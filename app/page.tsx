'use client';

import { useState, useEffect } from 'react';
import PromptCard from './components/PromptCard';
import SubmitPromptForm from './components/SubmitPromptForm';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Prompt {
  id: number;
  title: string;
  description: string;
  tags: string[];
  downloads: number;
}

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    const response = await fetch('/api/prompts');
    const data = await response.json();
    setPrompts(data);
  };

  const handleSubmitPrompt = async (newPrompt: { title: string; description: string; tags: string[] }) => {
    const response = await fetch('/api/prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPrompt),
    });
    if (response.ok) {
      fetchPrompts();
    }
  };

  const filteredAndSortedPrompts = prompts
    .filter(prompt => 
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === 'All' || prompt.tags.includes(selectedTag))
    )
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return a.title.localeCompare(b.title);
    });

  const allTags = Array.from(new Set(prompts.flatMap(prompt => prompt.tags)));

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Submit a New Prompt</h2>
        <SubmitPromptForm onSubmit={handleSubmitPrompt} />
      </div>
      <div className="mb-8 flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="downloads">Downloads</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAndSortedPrompts.map((prompt) => (
          <PromptCard key={prompt.id} {...prompt} />
        ))}
      </div>
    </div>
  );
}
