import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'prompts.json');

export async function GET() {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const prompts = JSON.parse(fileContents);
  return NextResponse.json(prompts);
}

export async function POST(request: Request) {
  const newPrompt = await request.json();
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const prompts = JSON.parse(fileContents);
  
  newPrompt.id = prompts.length + 1;
  newPrompt.downloads = 0;
  
  prompts.push(newPrompt);
  
  await fs.writeFile(dataFilePath, JSON.stringify(prompts, null, 2));
  
  return NextResponse.json(newPrompt, { status: 201 });
}