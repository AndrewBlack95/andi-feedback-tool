import styled from 'styled-components';

const StyledTag = styled.div`
  display: flex;
  background-color: rgba(255,255,255,0.5);
  border: 1px dashed grey;
  padding: 4px 6px;
  border-radius: 3px;
`;

const StyledTagColor = styled.div`
  background-color: ${props => props.color ? `#${props.color}` : 'black'};
  width: 20px;
  height: 20px;
  margin-right: 6px;
  border-radius: 3px;
  border: 1px solid grey;
`;

const Tag = ({ tag, children }) => {
  return (
    <StyledTag><StyledTagColor color={tag.color}/>{children}</StyledTag>
  )
};

export default Tag;
