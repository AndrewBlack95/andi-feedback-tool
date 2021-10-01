import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledLoadingMessage = styled.h3``;

const LoadingMessage = ({ message, children }) => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    setInterval(() => setDotCount(count => count + 1), 500);
    return () => setDotCount({});
  }, []);

  const getDots = () => {
    return '.'.repeat(dotCount % 4);
  };

  return (
    <StyledLoadingMessage>{(message || children || 'Loading') + getDots()}</StyledLoadingMessage>
  );
}

export default LoadingMessage;
