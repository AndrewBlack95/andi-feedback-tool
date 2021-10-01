import styled from 'styled-components';

const StyledExportButton = styled.div`
  background-color: var(--primaryBlueColor);
  color: var(--primaryWhiteColor);
  font-weight: 700;
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 3px;
  margin-top: auto;
  margin-bottom: 10px;

  &:hover {
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
