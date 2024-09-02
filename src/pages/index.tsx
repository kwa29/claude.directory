import { useTag } from '../components/TagContext';
import { useSearch } from '../components/SearchContext';
import { useSort } from '../components/SortContext';
import { useState, useEffect } from 'react';
import EditPromptModal from '../components/EditPromptModal';

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
  const { selectedTag, setSelectedTag } = useTag();
  const { searchQuery } = useSearch();
  const { sortBy, setSortBy } = useSort();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPrompts();
    fetchTags();
  }, []);

  const fetchPrompts = () => {
    fetch('/api/prompts')
      .then(res => res.json())
      .then(data => setPrompts(data));
  };

  const fetchTags = () => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setAllTags(data));
  };

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
  };

  const handleSaveEdit = (updatedPrompt: Prompt) => {
    fetch('/api/prompts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrompt),
    })
      .then(response => {
        if (response.ok) {
          fetchPrompts();
          setEditingPrompt(null);
        } else {
          throw new Error('Failed to update prompt');
        }
      })
      .catch(error => {
        console.error('Error updating prompt:', error);
        alert('Failed to update prompt. Please try again.');
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      fetch(`/api/prompts?id=${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            fetchPrompts();
          } else {
            throw new Error('Failed to delete prompt');
          }
        })
        .catch(error => {
          console.error('Error deleting prompt:', error);
          alert('Failed to delete prompt. Please try again.');
        });
    }
  };

  const filteredAndSortedPrompts = prompts
    .filter(prompt => {
      const matchesTag = selectedTag ? prompt.tags.includes(selectedTag) : true;
      const matchesSearch = searchQuery
        ? prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      return matchesTag && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popularity':
          return b.popularity - a.popularity;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedTag ? `Prompts tagged with "${selectedTag}"` : "All Prompts"}
        </h1>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity' | 'title')}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      {filteredAndSortedPrompts.length === 0 ? (
        <p className="text-gray-600">No prompts found matching your criteria.</p>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedPrompts.map((prompt) => (
            <div key={prompt.id} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{prompt.title}</h2>
              <p className="text-gray-600 mb-4">{prompt.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">{prompt.author}</p>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span>Date: {new Date(prompt.date).toLocaleDateString()}</span>
                <span className="ml-4">Popularity: {prompt.popularity}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(prompt)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prompt.id)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingPrompt && (
        <EditPromptModal
          prompt={editingPrompt}
          onClose={() => setEditingPrompt(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
