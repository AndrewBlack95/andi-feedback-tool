import { useState, Fragment } from 'react';
import styled from 'styled-components';

import Answers from './Answers';
import Tag from './Tag';

import dropdownIcon from '../dropdown-icon.png';

const StyledQuestions = styled.div`
  margin-top: 20px;
  max-height: 75vh;
  overflow-y: scroll;
`;

const StyledQuestion = styled.div`
  align-items: center;
  background-color: ${props => props.selected ? 'var(--primaryBlueColor)' : 'var(--primaryGreyColor)'};
  border-radius: 5px;
  display: flex;
  height: 80px;
  margin-bottom: 10px;
  padding: 0 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${props => props.selected ? 'var(--primaryBlueColor)' : 'var(--secondaryGreyColor)'};
    cursor: pointer;
  }
`;

const StyledQuestionCount = styled.div`
  color: ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlueColor)'};
  display: flex;
  font-size: 40px;
  font-weight: 700;
  justify-content: center;
  width: 60px;
`;

const StyledQuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const StyledQuestionName = styled.div`
  color: ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlackColor)'};
`;

const StyledQuestionIcon = styled.img`
  margin: 5px 10px 0 auto;
  opacity: 0.4;
  width: 20px;
  transform: ${props => props.selected ? 'rotate(90deg)' : 'rotate(0deg)'};
  transition: transform 200ms linear;
`;

const StyledTagArea = styled.div`
  display: flex;
  margin-top: 5px;
  width: 100%;

  & div {
    margin-right: 5px;
  }
`;

const StyledAddTag = styled.div`
  background-color: var(--primaryBlueColor);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 6px;
  border-radius: 3px;
  border: 1px solid ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlueColor)'};

  &:hover {
    cursor: pointer;
    border: 1px solid ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlackColor)'};
    background-color: ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlueColor)'};
    color: ${props => props.selected ? 'var(--primaryBlueColor)' : 'var(--primaryWhiteColor)'};
  }
`;

const StyledSelectTag = styled.div`
    width: 160px;
    // height: 200px;
    background-color: var(--primaryWhiteColor);
    border-radius: 3px;
    border: 1px solid grey;
    position: fixed;
    padding: 5px;
    left: ${props => props.pageX + 10}px;
    top: ${props => props.pageY > 800 ? '800' : props.pageY + 10}px;
    // bottom: ${props => props.pageY}px;
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


const TagArea = ({ surveyId, selected, tagQuestion, setTagQuestion, index, tags, setTags }) => {
  const [pageY, setPageY] = useState(0);
  const [pageX, setPageX] = useState(0);
  const [top, setTop] = useState(true);

  const handleClick = (e) => {
    setTagQuestion(tagQuestion === index ? null : index);
    console.log('EVENT', e.pageY, e.view.innerHeight)
    const mediumY = e.view.innerHeight / 2;
    if (e.pageY >= mediumY) {
      setTop(false)
    }
    setPageY(e.pageY);
    setPageX(e.pageX);
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  const handleSelectTag = (tag, e) => {
    const existingResponses = tags[tag].responses;
    const responseIndex = existingResponses.findIndex(response => response.question === index && response.survey === surveyId);
    if (responseIndex === -1) {
      existingResponses.push({ survey: surveyId, question: index, excluded: [] })
    }
    setTags({ ...tags, [tag]: { ...tags[tag], responses: existingResponses }})
    setTagQuestion(null) 
    console.log('A', tags)
  }

  const handleRemoveTag = (tag, index, e) => {
    const existingResponses = tags[tag].responses;
    const responseIndex = existingResponses.findIndex(response => response.question === index && response.survey === surveyId);

    if (responseIndex >= 0) {
      existingResponses.splice(responseIndex, 1)
    }
    setTags({ ...tags, [tag]: { ...tags[tag], responses: existingResponses }})

    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  const ignoreClick = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  if (tagQuestion !== null) {
    window.addEventListener('click', event => {
      if (event.target.id !== 'tag_area') {
        setTagQuestion(null)
      }
    })
  }

  const showSelectTag = tagQuestion === index;

  const tagNames = Object.keys(tags);
  return (
    <StyledTagArea>
      <StyledAddTag onClick={handleClick} selected={selected}>+ Tag</StyledAddTag>
      {showSelectTag && tagNames.length > 0 && (
        <StyledSelectTag onClick={ignoreClick} id='tag_area' pageY={pageY} pageX={pageX} top={top}>
          {tagNames.map(tag => <Tag tag={tags[tag]} onClick={(e) => handleSelectTag(tag, e)} hideBorder>{tag}</Tag>)}
        </StyledSelectTag>
      )}
      {tagNames
        .filter(tag => tags[tag].responses.findIndex(response => response.question === index) >=0)
        .map(tag => <Tag tag={tags[tag]} onClick={(e) => handleRemoveTag(tag, index, e)}>{tag}</Tag>)
      }
    </StyledTagArea>
  )
}

const Questions = ({ surveyId, questions = [], tags, setTags }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [tagQuestion, setTagQuestion] = useState(null);

  const handleSelectQuestion = (index) => {
    const clickedIndex = parseInt(index);
    setSelectedQuestion(selectedQuestion === clickedIndex ? null : clickedIndex);
  }

  return (
    <StyledQuestions>
      {questions.map((question, index) => {
        const selected = selectedQuestion === index;
        return (
          <Fragment key={`question_${index}`}>
            <StyledQuestion  onClick={() => handleSelectQuestion(index)} selected={selected}>
              <StyledQuestionCount selected={selected}>{index + 1}</StyledQuestionCount>
              <StyledQuestionContent>
                <StyledQuestionName selected={selected}>{question.questionName}</StyledQuestionName>
                <TagArea surveyId={surveyId} selected={selected} tagQuestion={tagQuestion} setTagQuestion={setTagQuestion} index={index} tags={tags} setTags={setTags} />
              </StyledQuestionContent>
              <StyledQuestionIcon src={dropdownIcon} selected={selected}></StyledQuestionIcon>
            </StyledQuestion>
            <Answers answers={question.answers} selected={selected} />
          </Fragment>
        )
      })}
    </StyledQuestions>
  )
};

export default Questions;
