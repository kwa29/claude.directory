import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'prompts.json');

interface Prompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export function getPrompts(): Prompt[] {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return [];
  }
  const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  return JSON.parse(fileContents);
}

export function savePrompt(prompt: Omit<Prompt, 'id'>): Prompt {
  const prompts = getPrompts();
  const newPrompt = {
    ...prompt,
    id: Date.now().toString(), // Simple ID generation
  };
  prompts.push(newPrompt);
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(prompts, null, 2));
  return newPrompt;
}

export function updatePrompt(updatedPrompt: Prompt): Prompt {
  const prompts = getPrompts();
  const index = prompts.findIndex(p => p.id === updatedPrompt.id);
  if (index !== -1) {
    prompts[index] = updatedPrompt;
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(prompts, null, 2));
  }
  return updatedPrompt;
}

export function deletePrompt(id: string): void {
  const prompts = getPrompts();
  const updatedPrompts = prompts.filter(p => p.id !== id);
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedPrompts, null, 2));
}