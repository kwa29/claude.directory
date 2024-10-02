import React, { useState, useEffect } from 'react';
import { Dropdown } from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import tagsData from '@/data/tags.json';

interface Prompt {
  id: number;
  title: string;
  description: string;
  author: string;
  tags: string[];
  date: string;
  popularity: number;
}

interface EditPromptModalProps {
  prompt: Prompt;
  onClose: () => void;
  onSave: (updatedPrompt: Prompt) => void;
}

export default function EditPromptModal({ prompt, onClose, onSave }: EditPromptModalProps) {
  const [editedPrompt, setEditedPrompt] = useState<Prompt>(prompt);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setAvailableTags(tagsData.tags);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleTagSelect = (tag: string) => {
    if (!editedPrompt.tags.includes(tag)) {
      setEditedPrompt(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditedPrompt(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleAddNewTag = () => {
    if (newTag && !editedPrompt.tags.includes(newTag)) {
      setEditedPrompt(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setAvailableTags(prev => [...prev, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedPrompt);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Prompt</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={editedPrompt.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedPrompt.description}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <Input
              type="text"
              id="author"
              name="author"
              value={editedPrompt.author}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
              Tags
            </label>
            <Dropdown
              options={availableTags}
              onSelect={handleTagSelect}
              placeholder="Select tags"
            />
            <div className="mt-2 flex flex-wrap">
              {editedPrompt.tags.map(tag => (
                <span key={tag} className="inline-flex items-center bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2">
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-red-600 hover:text-red-800"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
            <Input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a new tag"
              className="mt-2 w-full"
            />
            <button 
              onClick={handleAddNewTag}
              type="button"
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Add Tag
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}