import styled from 'styled-components';
import { useState } from 'react';

const StyledLoadingMessage = styled.h3``;

const LoadingMessage = ({ message, children }) => {
  const [dotCount, setDotCount] = useState(1);

  setTimeout(() => setDotCount(dotCount + 1), 500);

  const getDots = () => {
    return '.'.repeat(dotCount % 4);
  };

  return (
    <StyledLoadingMessage>{(message || children || 'Loading') + getDots()}</StyledLoadingMessage>
  );
}

export default LoadingMessage;
