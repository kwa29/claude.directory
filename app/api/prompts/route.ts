import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'prompts.json');

interface Prompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

function getPrompts(): Prompt[] {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return [];
  }
  const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  return JSON.parse(fileContents);
}

function savePrompts(prompts: Prompt[]): void {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(prompts, null, 2));
}

export async function GET() {
  const prompts = getPrompts();
  return NextResponse.json(prompts);
}

export async function POST(request: Request) {
  const prompt: Omit<Prompt, 'id'> = await request.json();
  const prompts = getPrompts();
  const newPrompt = {
    ...prompt,
    id: Date.now().toString(),
  };
  prompts.push(newPrompt);
  savePrompts(prompts);
  return NextResponse.json(newPrompt);
}

export async function PUT(request: Request) {
  const updatedPrompt: Prompt = await request.json();
  const prompts = getPrompts();
  const index = prompts.findIndex(p => p.id === updatedPrompt.id);
  if (index !== -1) {
    prompts[index] = updatedPrompt;
    savePrompts(prompts);
  }
  return NextResponse.json(updatedPrompt);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const prompts = getPrompts();
  const updatedPrompts = prompts.filter(p => p.id !== id);
  savePrompts(updatedPrompts);
  return NextResponse.json({ success: true });
}