import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

interface FormErrors {
  title?: string;
  description?: string;
  author?: string;
  tags?: string;
}

export default function Submit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setAllTags(data));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length > 100) {
      newErrors.title = "Title must be 100 characters or less";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length > 500) {
      newErrors.description = "Description must be 500 characters or less";
    }

    if (!author.trim()) {
      newErrors.author = "Author is required";
    } else if (author.length > 50) {
      newErrors.author = "Author name must be 50 characters or less";
    }

    if (tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    } else if (tags.length > 5) {
      newErrors.tags = "Maximum 5 tags allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/prompts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, author, tags })
        });

        if (!response.ok) {
          throw new Error('Failed to submit prompt');
        }

        // Update tags in the JSON file
        for (const tag of tags) {
          if (!allTags.includes(tag)) {
            await fetch('/api/tags', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ tag })
            });
          }
        }
        
        setShowThankYou(true);
        
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        console.error('Error submitting prompt:', error);
        alert('An error occurred while submitting the prompt. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setNewTag(input);
    if (input) {
      setSuggestions(allTags.filter(tag => 
        tag.toLowerCase().includes(input.toLowerCase()) && !tags.includes(tag)
      ));
    } else {
      setSuggestions([]);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setNewTag("");
      setSuggestions([]);
      setErrors(prev => ({ ...prev, tags: undefined }));
    } else if (tags.length >= 5) {
      setErrors(prev => ({ ...prev, tags: "Maximum 5 tags allowed" }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag) {
      e.preventDefault();
      addTag(newTag);
    }
  };

  if (showThankYou) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h1>
        <p className="text-xl text-gray-600">Your prompt has been submitted successfully.</p>
        <p className="text-gray-500 mt-2">Redirecting to homepage...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Submit a Prompt</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            rows={4}
            required
          />
          {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.author && <p className="mt-1 text-red-500 text-sm">{errors.author}</p>}
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              id="tags"
              value={newTag}
              onChange={handleTagInput}
              onKeyDown={handleKeyDown}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white ${errors.tags ? 'border-red-500' : 'border-gray-300'}`}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                {suggestions.map(suggestion => (
                  <li
                    key={suggestion}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => addTag(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.tags && <p className="mt-1 text-red-500 text-sm">{errors.tags}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}