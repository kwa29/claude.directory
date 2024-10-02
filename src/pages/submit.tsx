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
    setAvailableTags(tagsData.map(tag => tag.name))
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
    // Assuming you have other form fields
    const formData = {
      // ... other form fields ...
      tags: selectedTags
    }
    // Submit the form data
    console.log('Form data:', formData)
    // Add your form submission logic here
  }

  return (
    <div>
      <h1>Submit a Prompt</h1>
      <form onSubmit={handleSubmit}>
        {/* Other form fields */}
        
        <div>
          <label htmlFor="tags">Tags</label>
          <Dropdown
            options={availableTags}
            onSelect={handleTagSelect}
            placeholder="Select tags"
          />
          <div>
            {selectedTags.map(tag => (
              <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-red-500 hover:text-red-700"
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
            className="mt-2"
          />
          <button 
            onClick={handleAddNewTag}
            type="button"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Tag
          </button>
        </div>

        {/* Submit button */}
        <button 
          type="submit"
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Prompt
        </button>
      </form>
    </div>
  )
}