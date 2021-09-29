import styled from 'styled-components';
import dropdownIcon from '../dropdown-icon.png';
import { useState } from 'react';

const StyledSurveySection = styled.div`
  bottom: 0;
  left: 400px;
  padding: 60px 0;
  position: fixed;
  right: 100px;
  top: var(--topNavigationHeight);
`;

const StyledSurveyLayout = styled.div`
  border-left: 3px solid var(--primaryBackgroundColor);
  margin-left: 20px;
  padding-left: 20px;
  overflow: auto;
`;

const StyledSurveyTitle = styled.h1`
  margin: 0;
  padding: 0;
`;

const StyledQuestions = styled.div`
  margin-top: 20px;
  max-height: 760px;
  overflow-y: scroll;
`;

const StyledQuestion = styled.div`
  align-items: center;
  background-color: ${props => props.selected ? 'var(--primaryBackgroundColor)' : '#f2f2f2'};
  border-radius: 5px;
  display: flex;
  height: 80px;
  margin-bottom: 10px;
  padding: 0 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${props => props.selected ? 'var(--primaryBackgroundColor)' : '#e5e5e5'};
    cursor: pointer;
  }
`;

const StyledQuestionName = styled.div`
  color: ${props => props.selected ? 'white' : 'black'};
`;

const StyledQuestionCount = styled.div`
  color: ${props => props.selected ? 'white' : 'var(--primaryBackgroundColor)'};
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

const StyledAnswers = styled.div`
  // background-color: orange;
  font-size: 0;
  margin-top: 0;
  margin-bottom: 0;
  opacity: 0;
  padding: 0;
  // transition: all 400ms ease;

  &.selected {
    font-size: 14px;
    margin-bottom: 10px;
    opacity: 1;
    color: black;
  }
`;

const StyledAnswer = styled.div`
  display: flex;
  border-radius: 3px;
  margin-left: 30px;
  transition: all 400ms ease;

  &.selected {
    margin-bottom: 4px;
    margin-left: 30px;
  }
`;

const StyledAnswerText = styled.div`
  border-radius: 3px;
  background-color: #e5e5e5;
  width: 100%;
  margin-right: 5px;

  &.selected {
    padding: 10px 20px;
  }
`;

const StyledAnswerScore = styled.div`
  border-radius: 3px;
  background-color: lightgreen;
  
  width: 160px;
  margin-left: auto;
  display: flex;
  justify-content: center;

  &.selected {
    padding: 10px 20px;
  }
`;

const StyledLine = styled.div`
  background-color: var(--primaryBackgroundColor);

  &.selected {
    height: 5px;
    margin-top: 10px;
  }
`;

const Answers = ({ answers, selected }) => {
  return (
    <StyledAnswers className={selected && 'selected'}>
      {answers.map(answer => {
        return (
          <StyledAnswer className={selected && 'selected'}>
            <StyledAnswerText className={selected && 'selected'}>{answer.value}</StyledAnswerText>
            <StyledAnswerScore className={selected && 'selected'}>4 / 5</StyledAnswerScore>
          </StyledAnswer>
        )
      })}
      <StyledLine className={selected && 'selected'} />
    </StyledAnswers>
  );
}

const Questions = ({ questions = []}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSelectQuestion = (index) => {
    const clickedIndex = parseInt(index);
    if (selectedQuestion === clickedIndex) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(parseInt(index));
    }
  }

  return (
    <StyledQuestions>
      {questions.map((question, index) => {
        const selected = selectedQuestion === index;
        return (
          <>
            <StyledQuestion onClick={() => handleSelectQuestion(index)} selected={selected}>
              <StyledQuestionCount selected={selected}>{index + 1}</StyledQuestionCount>
              <StyledQuestionName selected={selected}>{question.questionName}</StyledQuestionName>
              <StyledQuestionIcon src={dropdownIcon} selected={selected}></StyledQuestionIcon>
            </StyledQuestion>
            <Answers answers={question.answers} selected={selected} />
          </>
        )
      })}
    </StyledQuestions>
  )
}

const SurveyLayout = ({ survey }) => {
  console.log('A', survey)
  return (
    <StyledSurveySection>
      <StyledSurveyLayout>
        <StyledSurveyTitle>{survey?.name}</StyledSurveyTitle>
        <Questions questions={survey?.questions} />
      </StyledSurveyLayout>
    </StyledSurveySection>
  );
};

export default SurveyLayout;
