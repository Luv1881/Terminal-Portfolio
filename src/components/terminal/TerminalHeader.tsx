import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../styles/themes';

const TerminalHeaderContainer = styled.div<{ theme: ThemeType }>`
  background-color: ${(props) => props.theme.headerBackground};
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .close {
    background-color: #ff5f57;
  }

  .minimize {
    background-color: #ffbd2e;
  }

  .maximize {
    background-color: #28c940;
  }

  .title {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: ${(props) => props.theme.headerText};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    .circle { display: none; }
    .title { font-size: 12px; }
  }
`;

interface TerminalHeaderProps {
  theme: ThemeType;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ theme }) => {
  return (
    <TerminalHeaderContainer theme={theme}>
      <div className="circle close"></div>
      <div className="circle minimize"></div>
      <div className="circle maximize"></div>
      <div className="title">luv@portfolio:~</div>
    </TerminalHeaderContainer>
  );
};

export default TerminalHeader;
