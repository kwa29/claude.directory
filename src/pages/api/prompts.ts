import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const promptsFilePath = path.join(process.cwd(), 'src/data/prompts.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const promptsData = await fs.promises.readFile(promptsFilePath, 'utf-8');
      const { prompts } = JSON.parse(promptsData);
      res.status(200).json(prompts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read prompts' });
    }
  } else if (req.method === 'POST') {
    try {
      const promptsData = await fs.promises.readFile(promptsFilePath, 'utf-8');
      const { prompts } = JSON.parse(promptsData);
      const newPrompt = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString(),
        popularity: 0
      };
      prompts.push(newPrompt);
      await fs.promises.writeFile(promptsFilePath, JSON.stringify({ prompts }, null, 2));
      res.status(201).json(newPrompt);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add prompt' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, ...updatedPrompt } = req.body;
      const promptsData = await fs.promises.readFile(promptsFilePath, 'utf-8');
      let { prompts } = JSON.parse(promptsData);
      const index = prompts.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        prompts[index] = { ...prompts[index], ...updatedPrompt };
        await fs.promises.writeFile(promptsFilePath, JSON.stringify({ prompts }, null, 2));
        res.status(200).json(prompts[index]);
      } else {
        res.status(404).json({ error: 'Prompt not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update prompt' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const promptsData = await fs.promises.readFile(promptsFilePath, 'utf-8');
      let { prompts } = JSON.parse(promptsData);
      prompts = prompts.filter((p: any) => p.id !== Number(id));
      await fs.promises.writeFile(promptsFilePath, JSON.stringify({ prompts }, null, 2));
      res.status(200).json({ message: 'Prompt deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete prompt' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}