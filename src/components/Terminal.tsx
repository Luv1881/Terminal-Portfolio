import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ThemeType } from '../styles/themes';
import { CommandContext, CommandHistory } from '../contexts/CommandContext';
import { useTerminal } from '../hooks/useTerminal';
import TerminalBody from './terminal/TerminalBody';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }
`;

const TerminalContainer = styled.div<{ $theme: ThemeType }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 20px;
  background-color: ${(props) => props.$theme.background};
  color: ${(props) => props.$theme.text};
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  line-height: 1.4;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Terminal: React.FC = () => {
  const { state, dispatch, terminalBodyRef, inputRef, focusInput, handleFormSubmit, handleKeyDown } = useTerminal();
  const { commandHistory, inputValue, theme } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value });
  };

  const commandContextValue = {
    arg: inputValue.split(' '),
    history: commandHistory,
    clearHistory: () => dispatch({ type: 'CLEAR_HISTORY' }),
    addToHistory: (item: CommandHistory) => dispatch({ type: 'ADD_TO_HISTORY', payload: item }),
    currentPath: '~/portfolio'
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <CommandContext.Provider value={commandContextValue}>
        <TerminalContainer
          className="terminal-container"
          $theme={theme}
          onClick={focusInput}
          onKeyDown={handleKeyDown}
        >
          <TerminalBody
            commandHistory={commandHistory}
            terminalBodyRef={terminalBodyRef}
            theme={theme}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            inputRef={inputRef}
          />
        </TerminalContainer>
      </CommandContext.Provider>
    </ThemeProvider>
  );
};

export default Terminal;
