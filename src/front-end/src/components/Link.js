import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${props => props.primary ? 'var(--primaryWhiteColor)' : 'var(--primaryBlackColor)'};
  font-size: ${props => props.fontSize || '14px'};

  &:hover {
    cursor: pointer;
  }
`;

const Link = (props) => {
  return <StyledLink {...props}>{props.children}</StyledLink>
};

export default Link;
