import React, { createContext, useContext } from 'react';
import { ThemeType } from '../styles/themes';

export interface CommandHistory {
  command?: string;
  timestamp?: Date;
  output?: string;
  theme?: ThemeType;
  isSystem?: boolean;
}

interface CommandContextType {
  arg: string[];
  history: CommandHistory[];
  clearHistory: () => void;
  addToHistory: (cmd: CommandHistory) => void;
  currentPath: string;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export const CommandProvider: React.FC<{
  value: CommandContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <CommandContext.Provider value={value}>
      {children}
    </CommandContext.Provider>
  );
};

export const useCommandContext = (): CommandContextType => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommandContext must be used within a CommandProvider');
  }
  return context;
};

export { CommandContext };
