import styled from 'styled-components';
import { useState } from 'react';

import Tag from './Tag';

const StyledAssignedTags = styled.div`
  display: flex;
  margin-top: 5px;
  overflow-x: hidden;
  white-space: nowrap;
  width: 100%;

  & .assigned_tag {
    margin-left: 5px;
  }
`;

const StyledAddTag = styled.div`
  background-color: var(--primaryBlueColor);
  border: 1px solid ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlueColor)'};
  border-radius: 3px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 6px 5px 6px;

  &:hover {
    background-color: ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlueColor)'};
    border: 1px solid ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlackColor)'};
    color: ${props => props.selected ? 'var(--primaryBlueColor)' : 'var(--primaryWhiteColor)'};
    cursor: pointer;
  }
`;

const StyledSelectTag = styled.div`
  background-color: var(--primaryWhiteColor);
  border: 1px solid grey;
  border-radius: 3px;
  box-shadow: 0 0 2px grey;
  left: ${props => props.pageX + 10}px;
  max-height: 240px;
  overflow: auto;
  padding: 5px;
  position: fixed;
  top: ${props => props.pageY + 10}px;
  transform: translateY(${props => props.translateY}%);
  width: 160px;
  z-index: 100;

  & div {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: var(--secondaryGreyColor);
    }
  }
`;

const AssignedTags = ({ surveyId, selected, tagQuestion, setTagQuestion, index: questionIndex, tags, setTags }) => {
  const [pageY, setPageY] = useState(0);
  const [pageX, setPageX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleClick = (event) => {
    setTagQuestion(tagQuestion === questionIndex ? null : questionIndex);
    setPageY(event.pageY);
    setPageX(event.pageX);
    setTranslateY(event.pageY >= (event.view.screen.availHeight / 2) ? -100 : 0)

    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  }

  const handleSelectTag = (tag) => {
    const existingResponses = tags[tag].responses;
    const responseIndex = existingResponses.findIndex(response => response.question === questionIndex && response.survey === surveyId);
    if (responseIndex === -1) {
      existingResponses.push({ survey: surveyId, question: questionIndex, excluded: [] });
    }
    setTags({ ...tags, [tag]: { ...tags[tag], responses: existingResponses }});
    setTagQuestion(null) ;
  }

  const handleRemoveTag = (tag, index, event) => {
    const existingResponses = tags[tag].responses;
    const responseIndex = existingResponses.findIndex(response => response.question === index && response.survey === surveyId);
    if (responseIndex >= 0) {
      existingResponses.splice(responseIndex, 1);
    }
    setTags({ ...tags, [tag]: { ...tags[tag], responses: existingResponses }});

    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  }

  const ignoreClick = (event) => {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  }

  if (tagQuestion !== null) {
    window.addEventListener('click', event => {
      if (event.target.id !== 'tag_area') {
        setTagQuestion(null);
      }
    })
  }

  const showSelectTag = tagQuestion === questionIndex;
  const tagNames = Object.keys(tags);

  return tagNames.length > 0 ? (
    <StyledAssignedTags>
      <StyledAddTag onClick={handleClick} selected={selected}>+ Tag</StyledAddTag>
      {showSelectTag &&  (
        <StyledSelectTag onClick={ignoreClick} id='tag_area' pageY={pageY} pageX={pageX} translateY={translateY}>
          {tagNames.map(tag => <Tag key={tag} tag={tags[tag]} onClick={() => handleSelectTag(tag)} hideBorder>{tag}</Tag>)}
        </StyledSelectTag>
      )}
      {tagNames
        .filter(tag => tags[tag].responses.findIndex(response => response.question === questionIndex  && response.survey === surveyId) >=0)
        .map(tag => <Tag key={`assigned_tag_${tag}`} className='assigned_tag' tag={tags[tag]} onClick={(event) => handleRemoveTag(tag, questionIndex, event)}>{tag}</Tag>)
      }
    </StyledAssignedTags>
  ) : null
}

export default AssignedTags;
