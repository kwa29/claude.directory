import Image from "next/image";

const prompts = [
  {
    title: "Personal Website",
    description: "Create a personal website using Next.js and Tailwind CSS.",
    author: "@is.it.ab",
    tags: ["website", "web development", "ai"],
  },
  {
    title: "Blocky Territorial",
    description: "A game inspired by Territorial style using React.",
    author: "@djward888",
    tags: ["games", "territorial", "react"],
  },
  // Add more prompts as needed
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prompts.map((prompt, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">{prompt.title}</h2>
          <p className="text-gray-700">{prompt.description}</p>
          <p className="text-gray-500">By {prompt.author}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {prompt.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
