import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import ErrorMessage from './ErrorMessage';

import { SURVEYS_PER_PAGE } from '../constants';

const SurveysContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 620px;
`;

const Survey = styled.div`
  align-items: center;
  background-color: var(--primaryGreyColor);
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  margin-bottom: 10px;
  padding: 0 20px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--secondaryGreyColor);
    cursor: pointer;
  }
`;

const SurveyList = ({ surveys = [], currentPage = 0, setSelectedSurvey, loading = true }) => {
  const history = useHistory();

  const startIndex = (currentPage - 1) * SURVEYS_PER_PAGE;
  const endIndex = (currentPage * SURVEYS_PER_PAGE);
  const surveysForCurrentPage = surveys.slice(startIndex, endIndex);

  const handleSelectSurvey = (survey) => {
    setSelectedSurvey(survey);
    history.push('/survey');
  }

  return (
    (loading && <></>)
    || (surveys.length === 0 && <ErrorMessage>Sorry, you don't appear to have any surveys available</ErrorMessage>)
    || (
      <SurveysContainer>
        {surveysForCurrentPage.map((survey, index) => <Survey key={`survey_${index}`} onClick={() => handleSelectSurvey(survey)}>{survey.title}</Survey>)}
      </SurveysContainer>
    )
  )
};

export default SurveyList;
