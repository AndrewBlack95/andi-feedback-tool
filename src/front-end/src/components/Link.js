import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${props => props.primary ? 'var(--primaryFontColor,white)' : 'black'};
  cursor: pointer;
  font-size: ${props => props.fontSize || '16px'};
`;

const Link = (props) => {
  return <StyledLink {...props}>{props.children}</StyledLink>
};

export default Link;
