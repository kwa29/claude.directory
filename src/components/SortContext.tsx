import React, { createContext, useState, useContext, ReactNode } from 'react';

type SortOption = 'date' | 'popularity' | 'title';

type SortContextType = {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
};

const SortContext = createContext<SortContextType | undefined>(undefined);

export function SortProvider({ children }: { children: ReactNode }) {
  const [sortBy, setSortBy] = useState<SortOption>('date');

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
}