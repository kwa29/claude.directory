import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'prompts.json');

async function getPrompts() {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

async function savePrompts(prompts: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(prompts, null, 2));
}

export async function GET() {
  const prompts = await getPrompts();
  return NextResponse.json(prompts);
}

export async function POST(request: Request) {
  const newPrompt = await request.json();
  const prompts = await getPrompts();
  
  newPrompt.id = Date.now().toString();
  newPrompt.downloads = 0;
  
  prompts.push(newPrompt);
  
  await savePrompts(prompts);
  
  return NextResponse.json(newPrompt, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedPrompt = await request.json();
  const prompts = await getPrompts();
  
  const index = prompts.findIndex((p: any) => p.id === updatedPrompt.id);
  if (index !== -1) {
    prompts[index] = updatedPrompt;
    await savePrompts(prompts);
    return NextResponse.json(updatedPrompt);
  }
  
  return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const prompts = await getPrompts();
  
  const filteredPrompts = prompts.filter((p: any) => p.id !== id);
  
  if (filteredPrompts.length < prompts.length) {
    await savePrompts(filteredPrompts);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
}