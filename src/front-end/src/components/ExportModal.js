import styled from 'styled-components';

const StyledExportContainer = styled.div`
  background-color: rgba(242,242,242,0.8);
  width: 100%;
  height: 100vh;
  z-index: ${props => props.displayModal ? '200' : '-200'};
  opacity: ${props => props.displayModal ? '1' : '0'};
  transition: all 600ms ease;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledExportModal = styled.div`
  background-color: white;
  width: 400px;
  height: 500px;
  box-shadow: 0 0 5px #e5e5e5;
  border-radius: 3px;
`;

const StyledModalTitle = styled.div`
  background-color: ${props => props.displayModal ? 'var(--primaryBlueColor)': 'white'};
  transition: all 400ms ease;
  width: 100%;
  height: var(--topNavigationHeight);
  display: flex;
  align-items: center;
  color: var(--primaryWhiteColor);
  font-weight: 700;
  font-size: 18px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 3px 3px 0 0;
`;

const ExportModal = ({ displayModal, setDisplayModal }) => {
  const handleClick = () => {
    setDisplayModal(false);
  }

  const ignoreClick = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  return (
    <StyledExportContainer displayModal={displayModal} onClick={handleClick}>
      <StyledExportModal onClick={ignoreClick}>
        <StyledModalTitle displayModal={displayModal}>Export to PDF</StyledModalTitle>
      </StyledExportModal>
    </StyledExportContainer>
  )
};

export default ExportModal;
