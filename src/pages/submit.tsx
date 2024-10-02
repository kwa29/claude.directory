import React, { useState, useEffect } from 'react'
import { Dropdown } from '@/components/ui/dropdown'
import { Input } from '@/components/ui/input'
import tagsData from '@/data/tags.json'

// Assuming other necessary imports are already present

export default function SubmitPrompt() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [availableTags, setAvailableTags] = useState<string[]>([])

  useEffect(() => {
    // Load tags from the JSON file
    setAvailableTags(tagsData.tags)
  }, [])

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  const handleAddNewTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag])
      setAvailableTags([...availableTags, newTag])
      setNewTag('')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      title: '', // Add these fields
      description: '',
      author: '',
      tags: selectedTags
    }
    console.log('Form data:', formData)
    // Add your form submission logic here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Submit a Prompt</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input
            type="text"
            id="title"
            name="title"
            className="w-full"
            // Add onChange handler and value prop
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows={4}
            // Add onChange handler and value prop
          ></textarea>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">Author</label>
          <Input
            type="text"
            id="author"
            name="author"
            className="w-full"
            // Add onChange handler and value prop
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <Dropdown
            options={availableTags}
            onSelect={handleTagSelect}
            placeholder="Select tags"
          />
          <div className="mt-2 flex flex-wrap">
            {selectedTags.map(tag => (
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

        <button 
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Submit Prompt
        </button>
      </form>
    </div>
  )
}