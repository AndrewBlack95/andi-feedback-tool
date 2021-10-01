import styled from 'styled-components';

const StyledTag = styled.div`
  align-items: center;
  background-color: var(--primaryWhiteColor);
  border: ${props => props.hideBorder ? '' : '1px dashed grey'};
  border-radius: 3px;
  display: flex;
  font-size: 12px;
  line-height: 0;
  padding: 3px 3px;
`;

const StyledTagColor = styled.div`
  background-color: ${props => props.color ? `#${props.color}` : 'var(--primaryBlackColor)'};
  width: 16px;
  height: 16px;
  margin-right: 6px;
  border-radius: 3px;
  border: 1px solid grey;
  pointer-events: none;
`;

const Tag = ({ tag, children: tagName, ...props }) => {
  return (
    <StyledTag {...props}><StyledTagColor color={tag.color}/>{tagName}</StyledTag>
  )
};

export default Tag;
