import { useEffect, useState } from 'react';

import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar';
import Pages from '../components/Pages';
import SurveyList from '../components/SurveyList';
import WelcomeMessage from '../components/WelcomeMessage';

import getSurveys from '../api/get-surveys';

const HomePage = ({ token, setToken, setSelectedSurvey }) => {
  const [surveys, setSurveys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getSurveys(token)
      .then(surveys => {
        setSurveys(surveys);
        setLoading(false);
      })
    return () => setSurveys({});
  }, [token, setSurveys]);

  return (
    <>
      <NavBar setToken={setToken}/>
      <MainSection>
        <WelcomeMessage />
        <SurveyList surveys={surveys} currentPage={currentPage} setSelectedSurvey={setSelectedSurvey} loading={loading}/>
        <Pages surveys={surveys} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </MainSection>
    </>
  );
};

export default HomePage;
