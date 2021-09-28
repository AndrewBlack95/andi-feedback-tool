import styled from 'styled-components';

import { SURVEYS_PER_PAGE } from '../constants';

const StyledPageContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 0;
  padding: 10px 0;
  width: 100%;
`;

const StyledPage = styled.a`
  align-items: center;
  background-color: ${props => props.selected ? 'var(--primaryBackgroundColor)' : '#f2f2f2'};
  border-radius: 3px;
  color: ${props => props.selected ? 'white': 'black'};
  display: flex;
  justify-content: center;
  margin-left: 5px;
  min-width: 20px;
  padding: 2px 20px;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: var(--primaryBackgroundColor);
  }
`;

const Pages = ({ surveys, currentPage, setCurrentPage }) => {
  const noOfPages = Math.ceil(surveys.length / SURVEYS_PER_PAGE);
  const pageArray = [ ...Array(noOfPages).keys() ].map(key => key + 1);

  const handlePageChange = (event) => {
    setCurrentPage(parseInt(event.target.innerHTML));
  }

  return (
    <StyledPageContainer>
      {pageArray.map((page, index) => {
        return <StyledPage key={`page_${index}`} selected={page===currentPage} onClick={handlePageChange}>{page}</StyledPage>
      })}
    </StyledPageContainer>
  );
}

export default Pages;
