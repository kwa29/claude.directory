import React, { useState } from 'react'

interface DropdownProps {
  options: string[]
  onSelect: (option: string) => void
  placeholder: string
}

export function Dropdown({ options, onSelect, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-left bg-white border rounded-md"
      >
        {placeholder}
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <li 
              key={option}
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}