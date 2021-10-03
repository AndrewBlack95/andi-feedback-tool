import styled from 'styled-components';

const StyledExportButton = styled.div`
  background-color: var(--primaryBlueColor);
  border: 1px solid var(--primaryBlueColor);
  border-radius: 3px;
  color: var(--primaryWhiteColor);
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: auto;
  padding: 10px;

  &:hover {
    border: 1px solid var(--primaryBlackColor);
    cursor: pointer;
  }
`;

const ExportButton = ({ setDisplayModal }) => {
  const handleClick = () => {
    setDisplayModal(true);
  }

  return (
    <StyledExportButton onClick={handleClick}>Export</StyledExportButton>
  )
};

export default ExportButton;
