import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'prompts.json');

interface Prompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
  downloads: number;
}

export async function getPrompts(): Promise<Prompt[]> {
  const response = await fetch('/api/prompts');
  if (!response.ok) {
    throw new Error('Failed to fetch prompts');
  }
  return response.json();
}

export async function savePrompt(prompt: Omit<Prompt, 'id' | 'downloads'>): Promise<Prompt> {
  const response = await fetch('/api/prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prompt),
  });
  if (!response.ok) {
    throw new Error('Failed to save prompt');
  }
  return response.json();
}

export async function updatePrompt(updatedPrompt: Prompt): Promise<Prompt> {
  const response = await fetch(`/api/prompts/${updatedPrompt.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPrompt),
  });
  if (!response.ok) {
    throw new Error('Failed to update prompt');
  }
  return response.json();
}

export async function deletePrompt(id: string): Promise<void> {
  const response = await fetch(`/api/prompts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete prompt');
  }
}