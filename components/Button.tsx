import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};