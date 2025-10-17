import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../styles/themes';
import Prompt from './Prompt';

const InputSectionContainer = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBackground};

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const InputField = styled.input<{ theme: ThemeType }>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.text};
  font-family: inherit;
  font-size: inherit;
  padding: 4px 0;
  margin-left: 8px;
  caret-color: ${(props) => props.theme.primary};

  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 4px;
  }
`;

interface InputSectionProps {
  theme: ThemeType;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const InputSection: React.FC<InputSectionProps> = ({ theme, inputValue, handleInputChange, handleFormSubmit, inputRef }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <InputSectionContainer theme={theme}>
        <Prompt theme={theme} />
        <InputField
          ref={inputRef}
          theme={theme}
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </InputSectionContainer>
    </form>
  );
};

export default InputSection;
