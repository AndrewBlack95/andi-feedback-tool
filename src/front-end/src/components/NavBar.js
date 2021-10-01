import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../logo.png';
import Link from './Link';

const StyledHeaderContainer = styled.div`
  background-color: var(--primaryBlueColor);
  height: var(--topNavigationHeight,0px);
  position: fixed;
  width: 100%;
  z-index: 2;

  &::after {
    background: linear-gradient(180deg,rgba(9,30,66,0.13) 0,rgba(9,30,66,0.13) 1px,rgba(9,30,66,0.08) 1px,rgba(9,30,66,0) 4px);
    content: "";
    height: 4px;
    left: 0;
    position: absolute;
    right: 0;
    top: 100%;
  }
`;

const StyledNavContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: var(--topNavigationHeight,0px);
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
`;

const StyledNavBar = styled.nav`
  align-items: center;
  display: flex;
  flex-growth: 1;
  height: inherit;
  min-width: 0;
`;

const StyledLogo = styled.img`
  max-height: 36px;
  padding-right: 12px;
`;

const StyledTitle = styled.h1`
  color: var(--primaryWhiteColor);
  font-size: 20px;
  margin: 0 4px;
`;

const NavBar = (props) => {
  const history = useHistory();

  const handleLogout = () => {
    props.setToken(null);
    history.push('/');
  }

  return (
    <StyledHeaderContainer>
      <StyledNavContainer>
        <StyledNavBar>
          <StyledLogo src={logo} />
          <StyledTitle>The ANDi Feedback Tool</StyledTitle>
        </StyledNavBar>
        <Link onClick={handleLogout} primary>Logout</Link>
      </StyledNavContainer>
    </StyledHeaderContainer>
  );
}

export default NavBar;
