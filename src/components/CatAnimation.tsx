import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

const zFloat = keyframes`
  0% { opacity: 0.3; transform: translateY(0px) translateX(0px); }
  100% { opacity: 0; transform: translateY(-30px) translateX(8px); }
`;

const patBounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const CatContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  padding: 24px 28px;
  background: rgba(0, 0, 0, 0.75);
  border: 2px solid rgba(139, 233, 253, 0.3);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(139, 233, 253, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  cursor: pointer;
  user-select: none;
  max-width: 480px;
  pointer-events: auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${float} 6s ease-in-out infinite;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.85);
    border-color: rgba(139, 233, 253, 0.6);
    box-shadow: 
      0 12px 48px rgba(0, 0, 0, 0.7),
      0 0 80px rgba(139, 233, 253, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    animation: ${patBounce} 0.6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CatFrame = styled.pre<{ $isPatting: boolean }>`
  margin: 0;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 22px;
  line-height: 1.3;
  color: ${props => props.$isPatting ? 'rgba(255, 182, 193, 0.95)' : 'rgba(189, 147, 249, 0.95)'};
  text-align: left;
  white-space: pre;
  text-shadow: ${props => props.$isPatting 
    ? '0 0 10px rgba(255, 182, 193, 0.5), 0 0 20px rgba(255, 182, 193, 0.3)' 
    : '0 0 10px rgba(189, 147, 249, 0.4), 0 0 20px rgba(189, 147, 249, 0.2)'};
  transition: all 0.3s ease;
  filter: ${props => props.$isPatting ? 'brightness(1.2)' : 'brightness(1)'};
`;

const Hint = styled.span<{ $isPatting: boolean }>`
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: ${props => props.$isPatting 
    ? 'rgba(255, 182, 193, 0.85)' 
    : 'rgba(139, 233, 253, 0.7)'};
  text-shadow: ${props => props.$isPatting
    ? '0 0 8px rgba(255, 182, 193, 0.4)'
    : '0 0 8px rgba(139, 233, 253, 0.3)'};
  transition: all 0.3s ease;
`;

const ZContainer = styled.div`
  position: absolute;
  top: -15px;
  right: 80px;
  display: flex;
  gap: 15px;
`;

const ZLetter = styled.span<{ $delay: number }>`
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 18px;
  color: rgba(189, 147, 249, 0.8);
  animation: ${zFloat} 3s ease-in infinite;
  animation-delay: ${props => props.$delay}s;
  text-shadow: 0 0 8px rgba(189, 147, 249, 0.4);
`;

// Sleeping cat in loaf position with bigger, cuter design
const sleepFrames = [
  String.raw`    |\___/|
   /  - -  \    z
  ( ==  ᴗ  == ) z
   )         ( z
  (  ~~~~~~  )
 (____________)`,

  String.raw`    |\___/|
   /  - -  \    
  ( ==  ᴗ  == ) z
   )         ( z
  (  ~~~~~~  )z
 (____________)`,

  String.raw`    |\___/|
   /  - -  \   z 
  ( ==  ᴗ  == )z
   )         (z
  (  ~~~~~~  )
 (____________)`,

  String.raw`    |\___/|
   /  - -  \    
  ( ==  ᴗ  == ) 
   )         ( z
  (  ~~~~~~  )z
 (____________)`,
];

// Happy patting cat - more expressive and animated
const patFrames = [
  String.raw`    |\___/|   ♡
   /  ^ ^  \  ♡
  ( ==  ω  == )
   )  ~~~~  (  *pat*
  (    ♡    )  *pat*
 ( (  )   (  ) )
(__(__)___(__)__)`,

  String.raw`    |\___/|   
   /  > <  \  ♡♡
  ( ==  v  == )
   )  ~~~~  (  
  (    ♡    ) *purr*
 ( (  )   (  ) )
(__(__)___(__)__)`,

  String.raw`    |\___/|  ♡
   /  ^ ^  \ ♡
  ( == UwU == )
   )  ~~~~  (  nya~
  (    ♡    )  
 ( (  )   (  ) )
(__(__)___(__)__)`,

  String.raw`    |\___/|   
   /  ◠ ◠  \  ♡
  ( ==  ▽  == )
   )  ~~~~  ( *happy*
  (    ♡    )  
 ( (  )   (  ) )
(__(__)___(__)__)`,
];

const CatAnimation: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showZ, setShowZ] = useState(true);

  const frames = useMemo(() => (isHovering ? patFrames : sleepFrames), [isHovering]);
  const intervalDelay = isHovering ? 250 : 800;

  useEffect(() => {
    setFrameIndex(0);
  }, [isHovering]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, intervalDelay);
    return () => window.clearInterval(interval);
  }, [frames, intervalDelay]);

  // Toggle Z's visibility for sleeping animation
  useEffect(() => {
    if (!isHovering) {
      const zInterval = setInterval(() => {
        setShowZ(prev => !prev);
      }, 3000);
      return () => clearInterval(zInterval);
    } else {
      setShowZ(false);
    }
  }, [isHovering]);

  return (
    <CatContainer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-hidden="true"
    >
      {!isHovering && showZ && (
        <ZContainer>
          <ZLetter $delay={0}>z</ZLetter>
          <ZLetter $delay={0.5}>z</ZLetter>
          <ZLetter $delay={1}>z</ZLetter>
        </ZContainer>
      )}
      <CatFrame $isPatting={isHovering}>{frames[frameIndex]}</CatFrame>
      <Hint $isPatting={isHovering}>
        {isHovering ? '✨ Purring happily~ ✨' : '💤 Sleeping... hover to give pats 💤'}
      </Hint>
    </CatContainer>
  );
};

export default CatAnimation;