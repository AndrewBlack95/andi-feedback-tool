import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AvailableTags from '../components/AvailableTags';
import BackButton from '../components/BackButton';
import ExportButton from '../components/ExportButton';
import ExportModalContainer from '../components/ExportModalContainer';
import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar';
import SidePanel from '../components/SidePanel';
import SurveyLayout from '../components/SurveyLayout';

import getSurveyDetails from '../api/get-survey-details';

const SurveyPage = ({ token, setToken, selectedSurvey, tags, setTags }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

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
          <ExportButton setDisplayModal={setDisplayModal} />
        </SidePanel>
        <SurveyLayout survey={survey} loading={loading} tags={tags} setTags={setTags} />
      </MainSection>
      <ExportModalContainer displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={selectedSurvey?.id} />
    </>
  )
};

export default SurveyPage;
