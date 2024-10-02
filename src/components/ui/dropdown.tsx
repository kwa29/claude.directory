import React, { useState, useRef, useEffect } from 'react'

interface DropdownProps {
  options: string[]
  onSelect: (option: string) => void
  placeholder: string
}

export function Dropdown({ options, onSelect, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option: string) => {
    onSelect(option)
    // Don't close the dropdown after selection
    // setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-left bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {placeholder}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li 
              key={option}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-red-100 transition-colors"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}