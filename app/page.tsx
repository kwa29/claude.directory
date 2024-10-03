'use client';

import { useState, useEffect } from 'react';
import PromptCard from './components/PromptCard';
import SubmitPromptForm from './components/SubmitPromptForm';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

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
      <motion.div 
        className="hero bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-20 mb-12 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Claude Directory</h1>
          <p className="text-xl mb-8">Discover and share amazing Claude Sonnet prompts</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-100">Submit a Prompt</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit a New Prompt</DialogTitle>
              </DialogHeader>
              <SubmitPromptForm onSubmit={handleSubmitPrompt} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-4 justify-center">
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

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredAndSortedPrompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PromptCard 
              prompt={{
                ...prompt,
                id: prompt.id.toString()
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
