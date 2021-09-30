import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

const StyledAddNewTag = styled.div`
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  margin-left: auto;
  margin-right: 0;
  margin-top: 10px;
`;

const StyledAddNewTagContainer = styled.a`
  background-color: var(--primaryBlueColor);
  border-radius: 3px;
  color: var(--primaryWhiteColor);
  display: flex;
  flex-direction: column;
  height: 16px;
  margin-left: auto;
  padding: 6px 10px;
  transition: all 400ms linear;
  width: 72px;
  overflow: hidden;

  &.addNewTag {
    height: 90px;
    width: 100%;
  }

  &:hover {
    cursor: pointer;

    &.addNewTag {
      cursor: default;
    }
  }
`;

const StyledAddTagTextbox = styled.input`
  background-color: var(--primaryWhiteColor);
  border: 1px solid var(--secondaryGreyColor);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 6px 10px;
  // height: 24px;
  border-radius: 3px;
  font-size: 12px;
  font-family: 'BrownPro-Regular'
`;

const StyledAddTagButton = styled.button`
  background-color: var(--primaryGreyColor);
  color: var(--primaryBlackColor);
  margin-left: auto;
  padding: 4px 16px;
  border-radius: 3px;
  border: none;
  font-family: 'BrownPro-Regular';

  &:hover {
    cursor: pointer;
    background-color: var(--secondaryGreyColor);
  }
`;

const generateNewTag = () => ({ 
  color: Math.floor(Math.random()*16777215).toString(16), 
  responses: [], 
  feedback: [] 
});

const AddNewTag = (props) => {
  const [newTag, setNewTag] = useState('');
  const textboxRef = useRef(null);

  const handleChange = (event) => {
    setNewTag(event.target.value);
  }

  useEffect(() => {
    textboxRef.current?.focus();
  })

  const handleAddNewTag = () => {
    if (newTag !== '') {
      props.setTags({ ...props.tags, [newTag]: generateNewTag() });
      setNewTag('');
    }
    props.setAddNewTag(false);
  }

  return (
    <StyledAddNewTag {...props}>
      <StyledAddNewTagContainer {...props}>
        + Create Tag
        {props.addNewTag && (
          <>
            <StyledAddTagTextbox ref={textboxRef} onChange={handleChange} className={props.addNewTag && 'addNewTag'}onClick={() => {}}/>
            <StyledAddTagButton onClick={handleAddNewTag} className={props.addNewTag && 'addNewTag'}>{newTag === '' ? 'Cancel' : 'Add'}</StyledAddTagButton>
          </>
        )}
      </StyledAddNewTagContainer>
    </StyledAddNewTag>
  )
}

export default AddNewTag;
