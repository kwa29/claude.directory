import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubmitPromptFormProps {
  onSubmit: (prompt: { title: string; description: string; tags: string[] }) => void;
}

const SubmitPromptForm: React.FC<SubmitPromptFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>(['AI', 'Coding', 'Design', 'Writing']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, tags });
    setTitle('');
    setDescription('');
    setTags([]);
  };

  const handleTagChange = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags(prev => [...prev, tag]);
    }
  };

  const handleAddNewTag = () => {
    if (newTag && !availableTags.includes(newTag) && !tags.includes(newTag)) {
      setAvailableTags(prev => [...prev, newTag]);
      setTags(prev => [...prev, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // Filter out the tags that are already selected
  const remainingTags = availableTags.filter(tag => !tags.includes(tag));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Prompt Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Prompt Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
            </span>
          ))}
        </div>
        {remainingTags.length > 0 && (
          <Select onValueChange={handleTagChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {remainingTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex mt-2">
          <Input
            type="text"
            placeholder="Add new tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="mr-2"
          />
          <Button type="button" onClick={handleAddNewTag}>Add</Button>
        </div>
      </div>
      <Button type="submit">Submit Prompt</Button>
    </form>
  );
};

export default SubmitPromptForm;