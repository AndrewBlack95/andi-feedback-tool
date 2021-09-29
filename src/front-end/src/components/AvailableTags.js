import styled from 'styled-components';

import Tag from './Tag';

const StyledAvailableTagsHeading = styled.h2`
  font-size: 14px;
  margin: 20px 0 5px 0;
  padding: 0;
`;

const StyledAvailableTagsContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
`;

const StyledAvailableTagsLine = styled.div`
  font-size: 14px;
  height: 32px;
  line-height: 22px;
  padding: 5px;
`;

const StyledAddNewTag = styled.a`
  background-color: var(--primaryBackgroundColor);
  color: white;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 700;
  margin-top: 10px;
  padding: 6px 10px;
  position: absolute;
  right: 0;

  &:hover {
    background-color: var(--primaryBackgroundColor);
    color: white;
    cursor: pointer;
  }
`;

const AvailableTags = ({ tags }) => {
  const tagNames = Object.keys(tags);
  
  return (
    <>
      <StyledAvailableTagsHeading>Available Tags</StyledAvailableTagsHeading>
      <StyledAvailableTagsContainer>
        {tagNames.map(tagName => {
          return (
            <StyledAvailableTagsLine>
              <Tag tag={tags[tagName]}>{tagName}</Tag>
            </StyledAvailableTagsLine>
          )
        })}
      </StyledAvailableTagsContainer>
      <StyledAddNewTag>+ Add New Tag</StyledAddNewTag>
    </>
  )
};

export default AvailableTags;
