import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledLoadingMessage = styled.h3``;

const LoadingMessage = ({ message, children }) => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    setTimeout(() => setDotCount(dotCount + 1), 500);
  }, [setDotCount, dotCount])

  const getDots = () => {
    return '.'.repeat(dotCount % 4);
  };

  return (
    <StyledLoadingMessage>{(message || children || 'Loading') + getDots()}</StyledLoadingMessage>
  );
}

export default LoadingMessage;
