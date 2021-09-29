import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledBackButton = styled.a`
  background-color: #f2f2f2;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  padding: 10px;
  width: 100%;

  &:hover {
    background-color: #e5e5e5;
    cursor: pointer;
  }
`;

const BackButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  }

  return <StyledBackButton onClick={handleClick}>{'< Back'}</StyledBackButton>
}

export default BackButton;