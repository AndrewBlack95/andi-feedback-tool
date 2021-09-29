import { useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';
import MainSection from '../components/MainSection';
import SidePanel from '../components/SidePanel';
import BackButton from '../components/BackButton';

const SurveyPage = ({ setToken, selectedSurvey }) => {
  const history = useHistory();

  if (!selectedSurvey) {
    history.push('/home');
  }

  return (
    <>
      <NavBar setToken={setToken} />
      <MainSection>
        <SidePanel>
          <BackButton />
        </SidePanel>
      </MainSection>
    </>
  )
};

export default SurveyPage;
