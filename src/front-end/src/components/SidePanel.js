import styled from 'styled-components';

const StyledSidePanel = styled.div`
  bottom: 0;
  padding: 60px 0;
  position: fixed;
  top: var(--topNavigationHeight);
  width: 300px;
`;

const SidePanel = (props) => {
  return (
    <StyledSidePanel {...props}>{props.children}</StyledSidePanel>
  )
}

export default SidePanel;
