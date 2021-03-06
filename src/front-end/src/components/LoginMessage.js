import styled from 'styled-components';

const StyledLoginMessage = styled.div`
  color: var(--primaryBackgroundColor);
  font-size: 20px;
  font-weight: 700;
  padding: 40px 0;
  position: 'absolute', left: '50%', top: '50%';
  transform: 'translate(-50%, -50%);
  textAlign: 'center';

  span {
    font-size: 40px;
  }
`;

const LoginMessage = (props) => {
  return (
    <StyledLoginMessage {...props}>
      <span>Hello,</span>
      <br />
      Welcome to the ANDi Feedback Tool!
      <br />
      Please sign in using your Survey Monkey account.
    </StyledLoginMessage>
  )
}

export default LoginMessage;
