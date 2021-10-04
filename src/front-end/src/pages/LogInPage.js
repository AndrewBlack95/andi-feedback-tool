import NavBar from '../components/NavBar';
import Button from '../components/LoginButton';

import MainSection from '../components/MainSection';
import LoginMessage from '../components/LoginMessage';
import AssistanceMessage from '../components/AssistanceMessage';

const LogInPage = () => {
  const handleLogin = () => {
    window.open('https://api.surveymonkey.com/oauth/authorize?response_type=code&client_id=tY8QrxFXSTidag0HQT7yXg&redirect_uri=http://localhost:3000/auth', '_self');
  };

  return (
    <>
      <NavBar preventLogout={true}/>
      <MainSection>
        <LoginMessage />
        <Button onClick={handleLogin} primary>Sign in with Survey Monkey</Button>
        <AssistanceMessage />
      </MainSection>
    </>
  );
};

export default LogInPage;