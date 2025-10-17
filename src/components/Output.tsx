import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CommandHistory } from '../contexts/CommandContext';
import { ThemeType } from '../styles/themes';
import Prompt from './terminal/Prompt';

const HistoryEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  width: 100%;
`;

const CommandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
`;

const CommandText = styled.span<{ $theme: ThemeType }>`
  display: inline-block;
  color: ${(props) => props.$theme.text};
  white-space: pre-wrap;
  word-break: break-word;
  text-align: left;
`;

const OutputBlock = styled.pre<{ $theme: ThemeType }>`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: ${(props) => props.$theme.text};
  font-family: inherit;
  align-self: stretch;
  text-align: left;
`;

const SystemOutput = styled.pre<{ $theme: ThemeType }>`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: ${(props) => props.$theme.text};
  font-family: inherit;
  align-self: stretch;
  text-align: left;
`;

interface OutputProps {
  commandHistory: CommandHistory[];
}

const Output: React.FC<OutputProps> = ({ commandHistory }) => {
  const activeTheme = useTheme() as ThemeType;

  return (
    <>
      {commandHistory.map((item, index) => {
        const theme = item.theme || activeTheme;

        if (item.isSystem && !item.command) {
          return (
            <SystemOutput key={`sys-${index}`} $theme={theme}>
              {item.output}
            </SystemOutput>
          );
        }

        return (
          <HistoryEntry key={`cmd-${index}`}>
            {item.command && (
              <CommandRow>
                <Prompt theme={theme} />
                <CommandText $theme={theme}>{item.command}</CommandText>
              </CommandRow>
            )}
            {item.output && item.output !== '' && (
              <OutputBlock $theme={theme}>{item.output}</OutputBlock>
            )}
          </HistoryEntry>
        );
      })}
    </>
  );
};

export default Output;
