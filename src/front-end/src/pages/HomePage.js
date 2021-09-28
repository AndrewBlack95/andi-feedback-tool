import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ErrorMessage from '../components/ErrorMessage'
import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar';
import Pages from '../components/Pages';
import WelcomeMessage from '../components/WelcomeMessage';

import getSurveys from '../api/get-surveys';
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

const HomePage = (props) => {
  const [surveys, setSurveys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getSurveys(props.token).then(surveys => setSurveys(surveys));
  }, [props.token]);

  const startIndex = (currentPage - 1) * SURVEYS_PER_PAGE;
  const endIndex = (currentPage * SURVEYS_PER_PAGE);
  const surveysForCurrentPage = surveys.slice(startIndex, endIndex);

  return (
    <>
      <NavBar setToken={props.setToken}/>
      <MainSection>
        <WelcomeMessage />
        <SurveysContainer>
          {surveys.length > 0 
            ? surveysForCurrentPage.map((survey, index) => <Survey key={`survey_${index}`}>{survey.title}</Survey>) 
            : <ErrorMessage>Sorry, you don't appear to have any surveys available</ErrorMessage>}
        </SurveysContainer>
        <Pages surveys={surveys} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </MainSection>
    </>
  );
};

export default HomePage;
