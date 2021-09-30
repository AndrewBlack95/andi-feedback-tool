import { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import Link from '../components/Link';

import login from '../api/login';
import MainSection from '../components/MainSection';
import LoginMessage from '../components/LoginMessage';

const LogInPage = () => {

  const handleLogin = () => {
    login();
  }

  return (
    <>
      <NavBar/>
      <MainSection>
        <LoginMessage/>
        <Link onClick={handleLogin} primary style={{ color: 'black' }}>Login</Link>
      </MainSection>
    </>
  );
};

export default LogInPage;