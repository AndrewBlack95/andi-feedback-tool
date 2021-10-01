import styled from 'styled-components';
import { useState } from 'react';

import AddNewTag from './AddNewTag';
import Tag from './Tag';

const StyledAvailableTagsHeading = styled.h2`
  font-size: 14px;
  margin: 20px 0 5px 0;
  padding: 0;
`;

const StyledAvailableTagsContainer = styled.div`
  background-color: var(--primaryGreyColor);
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
`;

const StyledAvailableTagsLine = styled.div`
  font-size: 12px;
  line-height: 22px;
  padding: 5px;
`;

const StyledNoTags = styled.div`
  font-size: 12px;
  padding: 6px;
`;

const AvailableTags = ({ tags, setTags }) => {
  const [addNewTag, setAddNewTag] = useState(false);

  const tagNames = Object.keys(tags);
  
  return (
    <>
      <StyledAvailableTagsHeading>Available Tags</StyledAvailableTagsHeading>
      <StyledAvailableTagsContainer>
        {tagNames.length === 0 ? <StyledNoTags>No tags</StyledNoTags> : (
          tagNames.map(tagName => {
            return (
              <StyledAvailableTagsLine key={`tagLine_${tagName}`}>
                <Tag key={`tag_${tagName}`} tag={tags[tagName]}>{tagName}</Tag>
              </StyledAvailableTagsLine>
            )
          })
        )}
      </StyledAvailableTagsContainer>
      <AddNewTag 
        tags={tags} 
        setTags={setTags} 
        addNewTag={addNewTag} 
        setAddNewTag={setAddNewTag} 
        className={addNewTag ? 'addNewTag' : ''}
      />
    </>
  )
};

export default AvailableTags;
