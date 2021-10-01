import styled from 'styled-components';

const StyledAnswers = styled.div`
  font-size: 0;
  margin-bottom: 0;
  margin-top: 0;
  opacity: 0;
  padding: 0;

  &.selected {
    font-size: 14px;
    margin-bottom: 10px;
    opacity: 1;
    max-height: 320px;
    overflow: auto;
  }
`;

const StyledAnswer = styled.div`
  display: flex;
  margin-left: 30px;

  &.selected {
    margin-bottom: 4px;
  }
`;

const StyledAnswerText = styled.div`
  background-color: var(--secondaryGreyColor);
  border-radius: 3px;
  margin-right: 5px;
  opacity: 0;
  transition: all 400ms ease;
  width: 100%;
  
  &.selected {
    ${props => props.disabled && 'background-color: #ff6e6e;'}
    opacity: ${props => props.disabled ? '0.1': '1'};
    padding: 10px 20px;
  }
`;

const StyledAnswerScore = styled.div`
  align-items: end;
  background-color: ${props => props.color};
  border-radius: 3px;
  color: ${props => props.color === 'var(--primaryRedColor)' ? 'var(--primaryWhiteColor)' : 'var(--primaryBlackColor)'};
  display: flex;
  justify-content: center;
  height: 0px;
  margin-left: auto;
  width: 160px;
  transition: all 400ms ease;
  
  & span {
    font-size: 0px;
    line-height: 0;
    margin-right: 0;
    transition: all 400ms ease;
  }
  
  &.selected {
    height: 38px;
    line-height: 32px;

    & span {
      font-size: 22px;
      line-height: 38px;
      margin-right: 2px;
    }
  }
`;

const StyledLine = styled.div`
  background-color: var(--primaryBlueColor);
  border-radius: 3px;

  &.selected {
    height: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const getColorForScore = (score, total) => {
  const parsedScore = parseInt(score);
  const parsedTotal = parseInt(total);
  const percent = (parsedScore / parsedTotal) * 100;

  if (percent >= 66) {
    return 'var(--primaryGreenColor)'
  } else if (percent >= 33) {
    return 'var(--primaryYellowColor)';
  } else {
    return 'var(--primaryRedColor)';
  }
}

const Answers = ({ answers, selected }) => {
  const className = selected && 'selected';
  
  return (
    <>
      <StyledAnswers className={className}>
        {answers.map((answer, index) => {
          const [score, total] = (answer.score || '').split('/');
          return (
            <StyledAnswer key={`answer_${index}`} className={className}>
              <StyledAnswerText className={className} disabled={!answer.text}>{answer.text}</StyledAnswerText>
              {answer.score && <StyledAnswerScore className={className} color={getColorForScore(score, total)}><span>{score}</span>/ {total}</StyledAnswerScore>}
            </StyledAnswer>
          )
        })}
      </StyledAnswers>
      <StyledLine className={className} />
    </>
  );
}

export default Answers;