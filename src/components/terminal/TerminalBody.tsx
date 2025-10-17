import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../styles/themes';
import Output from '../Output';
import Prompt from './Prompt';
import { CommandHistory } from '../../contexts/CommandContext';

const TerminalShell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
`;

const HistoryScrollArea = styled.div<{ $theme: ThemeType }>`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 20px;
  min-height: 0;
  align-items: flex-start;
  width: 100%;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.$theme.scrollbarTrack};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.$theme.scrollbarThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.$theme.scrollbarThumbHover};
  }

  @media (max-width: 768px) {
    padding: 0 0 16px;
    gap: 10px;
  }
`;

const CurrentPromptForm = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
`;

const InputField = styled.input<{ $theme: ThemeType }>`
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.$theme.text};
  font-family: inherit;
  font-size: inherit;
  padding: 2px 0;
  caret-color: ${(props) => props.$theme.primary};

  &::placeholder {
    color: ${(props) => props.$theme.placeholder};
  }
`;

interface TerminalBodyProps {
  commandHistory: CommandHistory[];
  terminalBodyRef: React.RefObject<HTMLDivElement>;
  theme: ThemeType;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TerminalBody: React.FC<TerminalBodyProps> = ({
  commandHistory,
  terminalBodyRef,
  theme,
  inputValue,
  handleInputChange,
  handleFormSubmit,
  inputRef,
}) => {
  return (
    <TerminalShell>
      <HistoryScrollArea ref={terminalBodyRef} $theme={theme}>
        <Output commandHistory={commandHistory} />
        <CurrentPromptForm onSubmit={handleFormSubmit}>
          <Prompt theme={theme} />
          <InputField
            ref={inputRef}
            $theme={theme}
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </CurrentPromptForm>
      </HistoryScrollArea>
    </TerminalShell>
  );
};

export default TerminalBody;
