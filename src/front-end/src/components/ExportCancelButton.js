import styled from 'styled-components';

const StyledExportCancelButton = styled.button`
  background-color: var(--primaryRedColor);
  border: 1px solid var(--primaryRedColor);
  border-radius: 3px;
  color: var(--primaryWhiteColor);
  font-family: 'BrownPro-Regular';
  font-weight: 700;
  padding: 8px 12px;

  &:hover {
    border: 1px solid var(--primaryBlackColor);
    cursor: pointer;
  }
`;

const ExportCancelButton = ({ setDisplayModal }) => {
  const handleClick = () => {
    setDisplayModal(false)
  };

  return (
    <StyledExportCancelButton onClick={handleClick}>Cancel</StyledExportCancelButton>
  )
}

export default ExportCancelButton;
