import styled from 'styled-components';

const StyledWelcomeMessage = styled.div`
  color: var(--primaryBlueColor);
  font-size: 20px;
  font-weight: 700;
  padding: 40px 0;

  span {
    font-size: 40px;
  }
`;

const WelcomeMessage = (props) => {
  return (
    <StyledWelcomeMessage {...props}>
      <span>Hello,</span>
      <br />
      Welcome to the ANDi Feedback Tool, all of your Survey Monkey surveys can be found below
    </StyledWelcomeMessage>
  )
}

export default WelcomeMessage;
