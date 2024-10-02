import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Removed import for promptData utils as the module is not found
// import { savePrompt, updatePrompt, deletePrompt } from '@/utils/promptData';

interface Prompt {
  id?: string;
  title: string;
  description: string;
  tags: string[];
}

interface PromptCardProps {
  prompt?: Prompt;
  onSave?: (editedPrompt: Prompt) => void;
  onCancel?: () => void;
}

const defaultPrompt: Prompt = {
  title: '',
  description: '',
  tags: [],
};

const PromptCard: React.FC<PromptCardProps> = ({ 
  prompt = defaultPrompt, 
  onSave = () => {}, 
  onCancel = () => {} 
}) => {
  const [editedPrompt, setEditedPrompt] = useState<Prompt>(prompt);
  const [newTag, setNewTag] = useState<string>('');
  const [availableTags, setAvailableTags] = useState<string[]>(['AI', 'Coding', 'Design', 'Writing']);

  useEffect(() => {
    setEditedPrompt(prompt);
  }, [prompt]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag: string) => {
    if (!editedPrompt.tags.includes(tag)) {
      setEditedPrompt(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleAddNewTag = () => {
    if (newTag && !availableTags.includes(newTag) && !editedPrompt.tags.includes(newTag)) {
      setAvailableTags(prev => [...prev, newTag]);
      setEditedPrompt(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedPrompt(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    if (editedPrompt.id) {
      const updatedPrompt = updatePrompt(editedPrompt);
      onSave(updatedPrompt);
    } else {
      const newPrompt = savePrompt(editedPrompt);
      onSave(newPrompt);
    }
  };

  const handleDelete = () => {
    if (editedPrompt.id) {
      deletePrompt(editedPrompt.id);
      onCancel();
    }
  };

  // Filter out the tags that are already selected
  const remainingTags = availableTags.filter(tag => !editedPrompt.tags.includes(tag));

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={editedPrompt.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={editedPrompt.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editedPrompt.tags.map((tag) => (
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
          <Button onClick={handleSave}>Save</Button>
          {editedPrompt.id && <Button variant="destructive" onClick={handleDelete}>Delete</Button>}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;