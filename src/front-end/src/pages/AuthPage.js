import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MainSection from '../components/MainSection';
import NavBar from '../components/NavBar';
import WelcomeMessage from '../components/WelcomeMessage';

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
        <WelcomeMessage />
      </MainSection>
    </>
  );
};

export default AuthPage;