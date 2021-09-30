import { useState, Fragment } from 'react';
import styled from 'styled-components';

import Answers from './Answers';

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

const StyledQuestionName = styled.div`
  color: ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlackColor)'};
`;

const StyledQuestionCount = styled.div`
  color: ${props => props.selected ? 'var(--primaryWhiteColor)' : 'var(--primaryBlueColor)'};
  display: flex;
  font-size: 40px;
  font-weight: 700;
  justify-content: center;
  width: 60px;
`;

const StyledQuestionIcon = styled.img`
  margin: 5px 10px 0 auto;
  opacity: 0.4;
  width: 20px;
  transform: ${props => props.selected ? 'rotate(90deg)' : 'rotate(0deg)'};
  transition: transform 200ms linear;
`;

const Questions = ({ questions = [] }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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
              <StyledQuestionName selected={selected}>{question.questionName}</StyledQuestionName>
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
