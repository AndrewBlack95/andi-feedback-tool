import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AvailableTags from '../components/AvailableTags';
import BackButton from '../components/BackButton';
import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar';
import SidePanel from '../components/SidePanel';
import SurveyLayout from '../components/SurveyLayout';

import getSurveyDetails from '../api/get-survey-details';

const SurveyPage = ({ token, setToken, selectedSurvey, tags, setTags }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    getSurveyDetails(token, selectedSurvey?.id)
      .then(survey => {
        setSurvey(survey)
        setLoading(false);
      })
    return () => setSurvey({});
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
          <AvailableTags tags={tags} setTags={setTags} />
        </SidePanel>
        <SurveyLayout survey={survey} loading={loading} tags={tags} setTags={setTags} />
      </MainSection>
    </>
  )
};

export default SurveyPage;
