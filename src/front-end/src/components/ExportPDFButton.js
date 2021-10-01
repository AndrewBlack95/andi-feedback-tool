import styled from 'styled-components';

const StyledExportPDFButton = styled.button`
  background-color: var(--primaryBlueColor);
  border: 1px solid var(--primaryBlueColor);
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

const ExportPDFButton = ({ selectedTag, setDisplayModal }) => {
  const handleClick = () => {
    setDisplayModal(false);
  };

  return selectedTag ? (
    <StyledExportPDFButton onClick={handleClick}>Generate PDF</StyledExportPDFButton>
  ) : null;
}

export default ExportPDFButton;
