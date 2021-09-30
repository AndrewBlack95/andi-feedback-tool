import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Button from '../components/LoginButton';
import MainSection from '../components/MainSection';
import LoginMessage from '../components/LoginMessage';
import AssistanceMessage from '../components/AssistanceMessage';

import exchangeTokens from '../api/exchange-tokens';

const AuthPage = (props) => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const code = query.get('code');

  useEffect(() => {
    exchangeTokens(code)
      .then(longCode => {
        props.setToken(longCode?.code)
      })
  });

  if (props.token) {
    history.push('/home');
  }

  return (
    <>
      <NavBar preventLogout={true}/>
      <MainSection>
        <LoginMessage/>
        <Button primary>Sign in with Survey Monkey</Button>
        <AssistanceMessage/>
      </MainSection>
    </>
  );
};

export default AuthPage;