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
  background-color: #f2f2f2;
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
    background-color: #e5e5e5;
    cursor: pointer;
  }
`;

const SurveyList = ({ surveys = [], currentPage = 0, setSelectedSurvey }) => {
  const history = useHistory();

  const startIndex = (currentPage - 1) * SURVEYS_PER_PAGE;
  const endIndex = (currentPage * SURVEYS_PER_PAGE);
  const surveysForCurrentPage = surveys.slice(startIndex, endIndex);

  const handleSelectSurvey = (survey) => {
    setSelectedSurvey(survey);
    history.push('/survey');
  }

  return surveys.length > 0
    ? (
      <SurveysContainer>
        {surveysForCurrentPage.map((survey, index) => <Survey key={`survey_${index}`} onClick={() => handleSelectSurvey(survey)}>{survey.title}</Survey>)}
      </SurveysContainer>
    ) : <ErrorMessage>Sorry, you don't appear to have any surveys available</ErrorMessage>
};

export default SurveyList;
