import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${props => props.primary ? 'var(--primaryFontColor,white)' : 'black'};
  font-size: ${props => props.fontSize || '16px'};

  &:hover {
    cursor: pointer;
  }
`;

const Link = (props) => {
  return <StyledLink {...props}>{props.children}</StyledLink>
};

export default Link;