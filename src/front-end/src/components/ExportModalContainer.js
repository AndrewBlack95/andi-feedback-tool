import styled from 'styled-components';

import ExportModal from './ExportModal';

const StyledExportContainer = styled.div`
  align-items: center;
  background-color: rgba(242,242,242,0.9);
  display: flex;
  height: 100vh;
  justify-content: center;
  opacity: ${props => props.displayModal ? '1' : '0'};
  pointer-events: ${props => props.displayModal === false && 'none'};
  position: fixed;
  transition: all 600ms ease;
  width: 100%;
  z-index: 200;
`;

const ExportModalContainer = ({ displayModal, setDisplayModal, tags, setTags, surveyId, survey }) => {
  const handleClick = () => {
    setDisplayModal(false);
  };

  return (
    <StyledExportContainer displayModal={displayModal} onClick={handleClick}>
      {displayModal && <ExportModal displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={surveyId} survey={survey}/>}
    </StyledExportContainer>
  );
}

export default ExportModalContainer;
