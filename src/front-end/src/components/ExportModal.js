import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

import ExportCancelButton from './ExportCancelButton';
import ExportPDFButton from './ExportPDFButton';

const StyledExportModal = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 5px #e5e5e5;
  display: flex;
  flex-direction: column;
  height: 510px;
  width: 400px;
`;

const StyledModalTitle = styled.div`
  align-items: center;
  background-color: ${props => props.displayModal ? 'var(--primaryBlueColor)': 'white'};
  border-radius: 3px 3px 0 0;
  box-sizing: border-box;
  color: var(--primaryWhiteColor);
  display: flex;
  font-size: 18px;
  font-weight: 700;
  height: var(--topNavigationHeight);
  padding: 0 20px;
  transition: all 400ms ease;
  width: 100%;
`;

const StyledModalContent = styled.div`
  background-color: var(--primaryGreyColor);
  border-radius: 3px;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
`;

const StyledModalText = styled.h3`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
`;

const StyledModalDropdown = styled.select`
  border: 1px solid var(--primaryBlueColor);
  border-radius: 3px;
  font-family: 'BrownPro-Regular';
  padding: 5px;
  width: 100%;
`;

const StyledModalOption = styled.option``;

const StyledTextArea = styled.textarea`
  border: 1px solid var(--primaryBlueColor);
  border-radius: 3px;
  box-sizing: border-box;
  font-family: 'BrownPro-Regular';
  height: 240px;
  max-height: 240px;
  max-width: 100%;
  min-height: 240px;
  min-width: 100%;
  padding: 5px;
  width: 100%;
`;

const StyledModalButtons = styled.div`
  display: flex;
  justify-content: end;
  margin: 10px;

  & button {
    margin-left: 5px;
  }
`;

const ExportModal = ({ displayModal, setDisplayModal, tags, setTags, surveyId }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [feedback, setFeedback] = useState('');
  const textAreaRef = useRef(null);

  const handleSelectTag = (event) => {
    setSelectedTag(event.target.value);
    setFeedback(tags[event.target.value].feedback[surveyId])
  }

  const handleAdditionalFeedback = (event) => {
    setFeedback(event.target.value)
    setTags({ 
      ...tags, 
      [selectedTag]: { 
        ...tags[selectedTag], 
        feedback: { 
          ...tags[selectedTag]?.feedback, 
          [surveyId]: event.target.value 
        } 
      } 
    });
  }

  const ignoreClick = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  const tagNames = Object.keys(tags);

  useEffect(() => {
    if (tagNames.length > 0) {
      setSelectedTag(selected => selected ? selected : tagNames[0]);
    }
  }, [tagNames]);

  useEffect(() => {
    setFeedback(tags[selectedTag]?.feedback[surveyId] || '');
    return () => setFeedback({});
  }, [selectedTag, tags, surveyId]);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [selectedTag])

  return (
    <StyledExportModal onClick={ignoreClick}>
      <StyledModalTitle displayModal={displayModal}>Export to PDF</StyledModalTitle>
      <StyledModalContent>
        <StyledModalText>Select a tag</StyledModalText>
        <StyledModalDropdown disabled={tagNames.length === 0} onChange={handleSelectTag}>
          {tagNames.map(tag => <StyledModalOption key={`tag_option_${tag}`}>{tag}</StyledModalOption>)}
        </StyledModalDropdown>
      </StyledModalContent>
      <StyledModalContent>
        <StyledModalText>Additional feedback</StyledModalText>
        <StyledTextArea ref={textAreaRef} disabled={tagNames.length === 0} onChange={handleAdditionalFeedback} value={feedback === undefined ? '' : feedback}></StyledTextArea>
      </StyledModalContent>
      <StyledModalButtons>
        <ExportPDFButton selectedTag={selectedTag} setDisplayModal={setDisplayModal} />
        <ExportCancelButton setDisplayModal={setDisplayModal} />
      </StyledModalButtons>
    </StyledExportModal>
  )
};

export default ExportModal;
