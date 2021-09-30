import styled from 'styled-components';

const StyledTag = styled.div`
  display: flex;
  background-color: var(--primaryWhiteColor);
  align-items: center;
  border: ${props => props.hideBorder ? '' : '1px dashed grey'};
  padding: 0px 3px;
  border-radius: 3px;
  font-size: 12px;
`;

const StyledTagColor = styled.div`
  background-color: ${props => props.color ? `#${props.color}` : 'var(--primaryBlackColor)'};
  width: 16px;
  height: 16px;
  margin-right: 6px;
  border-radius: 3px;
  border: 1px solid grey;
`;

const Tag = ({ tag, children: tagName, ...props }) => {
  return (
    <StyledTag {...props}><StyledTagColor color={tag.color}/>{tagName}</StyledTag>
  )
};

export default Tag;
