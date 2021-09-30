import styled from 'styled-components';

const StyledAssitanceMessage = styled.div`
color: var(--primaryBackgroundColor);
font-size: 20px;
font-weight: 700;
padding: 40px 0;
position: 'absolute', left: '50%', top: '50%';
transform: 'translate(-50%, -50%);

span {
  font-size: 40px;
}
`;

const AssitanceMessage = (props) => {
  return (
    <StyledAssitanceMessage {...props}>
      Don't have an account?
      <br />
      Please contact the AND onboarding team for assistance.
    </StyledAssitanceMessage>
  )
}

export default AssitanceMessage;
