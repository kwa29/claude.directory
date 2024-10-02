import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PromptCardProps {
  title: string;
  description: string;
  tags: string[];
  downloads: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, description, tags, downloads }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
          <img src="/placeholder.svg" alt={title} className="w-16 h-16 mb-2" />
          <span className="text-sm font-medium text-center">{title}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <img src="/placeholder.svg" alt={title} className="w-32 h-32" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Downloads: {downloads}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromptCard;