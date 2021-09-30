import styled from 'styled-components';

const StyledTag = styled.div`
  display: flex;
  background-color: var(--primaryWhiteColor);
  border: 1px dashed grey;
  padding: 4px 6px;
  border-radius: 3px;
`;

const StyledTagColor = styled.div`
  background-color: ${props => props.color ? `#${props.color}` : 'var(--primaryBlackColor)'};
  width: 20px;
  height: 20px;
  margin-right: 6px;
  border-radius: 3px;
  border: 1px solid grey;
`;

const Tag = ({ tag, children: tagName }) => {
  return (
    <StyledTag><StyledTagColor color={tag.color}/>{tagName}</StyledTag>
  )
};

export default Tag;
