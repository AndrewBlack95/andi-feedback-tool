import styled from 'styled-components';

const StyledMainSection = styled.div`
  bottom: 0;
  box-sizing: border-box;
  overflow: auto;
  padding: 0 100px;
  position: absolute;
  top: var(--topNavigationHeight);
  width: 100%;
`;

const MainSection = (props) => {
  return (
    <StyledMainSection {...props}>{props.children}</StyledMainSection>
  )
};

export default MainSection;
