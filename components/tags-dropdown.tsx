'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTags } from '@/actions/get-tags'
import { createTag } from '@/actions/create-tag'

interface Tag {
  id: string
  name: string
}

interface TagsDropdownProps {
  onSelect: (tag: string) => void
}

export function TagsDropdown({ onSelect }: TagsDropdownProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getTags()
      setTags(fetchedTags)
    }
    fetchTags()
  }, [])

  const handleCreateTag = async () => {
    if (newTag) {
      const createdTag = await createTag(newTag)
      setTags([...tags, createdTag])
      setNewTag('')
      onSelect(createdTag.name)
    }
  }

  return (
    <div>
      <Select onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.name}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-2">
        <Input
          type="text"
          placeholder="Create new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button onClick={handleCreateTag}>Create Tag</Button>
      </div>
    </div>
  )
}