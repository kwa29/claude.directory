import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

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
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-all hover:shadow-xl cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/placeholder.svg" alt={title} className="w-20 h-20 mb-4 rounded-full bg-gray-200" />
          <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Downloads: {downloads}</p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <img src="/placeholder.svg" alt={title} className="w-32 h-32 rounded-full bg-gray-200" />
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