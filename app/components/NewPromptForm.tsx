import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewPrompt {
  title: string;
  description: string;
  tags: string[];
}

interface NewPromptFormProps {
  onSubmit: (newPrompt: NewPrompt) => void;
  onCancel: () => void;
}

const NewPromptForm: React.FC<NewPromptFormProps> = ({ onSubmit, onCancel }) => {
  const [newPrompt, setNewPrompt] = useState<NewPrompt>({
    title: '',
    description: '',
    tags: [],
  });
  const [newTag, setNewTag] = useState<string>('');
  const [availableTags, setAvailableTags] = useState<string[]>(['AI', 'Coding', 'Design', 'Writing']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag: string) => {
    if (!newPrompt.tags.includes(tag)) {
      setNewPrompt(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleAddNewTag = () => {
    if (newTag && !availableTags.includes(newTag) && !newPrompt.tags.includes(newTag)) {
      setAvailableTags(prev => [...prev, newTag]);
      setNewPrompt(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPrompt(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Filter out the tags that are already selected
  const remainingTags = availableTags.filter(tag => !newPrompt.tags.includes(tag));

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={newPrompt.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={newPrompt.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newPrompt.tags.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
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
              placeholder="Add new tag"
              value={newTag}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleAddNewTag}>Add</Button>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSubmit(newPrompt)}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewPromptForm;