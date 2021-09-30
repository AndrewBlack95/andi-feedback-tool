import styled from 'styled-components';

import logo from '../survey_monkey_logo.png';

const StyledLogo = styled.img`
  max-height: 120px;
  padding-right: 30px;

  &:hover {
    cursor: pointer;
  };
`;

const Button = (props) => {
  return <StyledLogo src={logo} onClick={props.onClick}/>
};

export default Button;