import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const tagsFilePath = path.join(process.cwd(), 'src/data/tags.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tagsData = await fs.promises.readFile(tagsFilePath, 'utf-8');
      const { tags } = JSON.parse(tagsData);
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read tags' });
    }
  } else if (req.method === 'POST') {
    try {
      const { tag } = req.body;
      const tagsData = await fs.promises.readFile(tagsFilePath, 'utf-8');
      const { tags } = JSON.parse(tagsData);
      if (!tags.includes(tag)) {
        tags.push(tag);
        await fs.promises.writeFile(tagsFilePath, JSON.stringify({ tags }, null, 2));
      }
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update tags' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}