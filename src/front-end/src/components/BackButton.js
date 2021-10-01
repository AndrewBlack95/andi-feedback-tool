import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import dropdownIcon from '../dropdown-icon.png';

const StyledBackButton = styled.a`
  background-color: var(--primaryGreyColor);
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  padding: 10px;
  width: 100%;
  align-items: center;

  &:hover {
    background-color: var(--secondaryGreyColor);
    cursor: pointer;
  }
`;

const StyledBackIcon = styled.img`
  margin-right: 5px;
  max-height: 11px;
  object-fit: cover;
  transform: rotate(90deg);
`;

const BackButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  }

  return <StyledBackButton onClick={handleClick}><StyledBackIcon src={dropdownIcon} />Back</StyledBackButton>
}

export default BackButton;
