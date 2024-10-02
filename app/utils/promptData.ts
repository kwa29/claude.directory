import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'prompts.json');

interface Prompt {
  id: number;
  title: string;
  description: string;
  tags: string[];
  downloads: number;
}

export async function getPrompts(): Promise<Prompt[]> {
  const response = await fetch('/api/prompts');
  return response.json();
}

export async function savePrompt(prompt: Omit<Prompt, 'id'>): Promise<Prompt> {
  const response = await fetch('/api/prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prompt),
  });
  return response.json();
}

export async function updatePrompt(updatedPrompt: Prompt): Promise<Prompt> {
  const response = await fetch('/api/prompts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPrompt),
  });
  return response.json();
}

export async function deletePrompt(id: string): Promise<void> {
  await fetch('/api/prompts', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
}