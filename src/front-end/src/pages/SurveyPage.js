import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AvailableTags from '../components/AvailableTags';
import BackButton from '../components/BackButton';
import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar';
import SidePanel from '../components/SidePanel';
import SurveyLayout from '../components/SurveyLayout';

import getSurveyDetails from '../api/get-survey-details';

const mockTags = { 
  'Daragh': {
    color: Math.floor(Math.random()*16777215).toString(16),
    responses: [],
    feedback: ''
  },
  'Mark Faulkner': {
    color: Math.floor(Math.random()*16777215).toString(16),
    responses: [],
    feedback: ''
  },
  'Scrum Session': {
    color: Math.floor(Math.random()*16777215).toString(16),
    responses: [],
    feedback: ''
  },
  'PD Fundamentals': {
    color: Math.floor(Math.random()*16777215).toString(16),
    responses: [],
    feedback: ''
  }
}

const SurveyPage = ({ token, setToken, selectedSurvey }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    getSurveyDetails(token, selectedSurvey?.id)
      .then(survey => {
        setSurvey(survey)
        setLoading(false);
      })
  }, [token, selectedSurvey, setSurvey]);

  if (!selectedSurvey) {
    history.push('/home');
  }

  return (
    <>
      <NavBar setToken={setToken} />
      <MainSection>
        <SidePanel>
          <BackButton />
          <AvailableTags tags={mockTags} />
        </SidePanel>
        <SurveyLayout survey={survey} loading={loading} />
      </MainSection>
    </>
  )
};

export default SurveyPage;
