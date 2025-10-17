import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../styles/themes';

const PromptContainer = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-right: 8px;

  .user {
    color: ${(props) => props.theme.primary};
  }

  .at {
    color: ${(props) => props.theme.text};
    margin: 0 2px;
  }

  .host {
    color: ${(props) => props.theme.secondary};
  }

  .path {
    color: ${(props) => props.theme.accent};
  }

  .prompt-symbol {
    color: ${(props) => props.theme.prompt};
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-right: 4px;

    .host, .path {
      display: none;
    }

    .user::after {
      content: " \u25B6";
      color: ${(props) => props.theme.prompt};
      margin-left: 4px;
    }
  }
`;

interface PromptProps {
  theme: ThemeType;
}

const Prompt: React.FC<PromptProps> = ({ theme }) => {
  return (
    <PromptContainer theme={theme}>
      <span className="user">luv</span>
      <span className="at">@</span>
      <span className="host">portfolio.dev</span>
      <span className="path">~</span>
      <span className="prompt-symbol">$</span>
    </PromptContainer>
  );
};

export default Prompt;
