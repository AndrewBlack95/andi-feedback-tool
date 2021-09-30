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
  background-color: ${props => props.selected ? 'var(--primaryBlueColor)' : 'var(--primaryGreyColor)'};
  border-radius: 3px;
  color: ${props => props.selected ? 'var(--primaryWhiteColor)': 'var(--primaryBlackColor)'};
  display: flex;
  justify-content: center;
  margin-left: 5px;
  min-width: 20px;
  padding: 4px 20px;

  &:hover {
    cursor: pointer;
    color: var(--primaryWhiteColor);
    background-color: var(--primaryBlueColor);
  }
`;

const Pages = ({ surveys, currentPage, setCurrentPage }) => {
  const noOfPages = Math.ceil(surveys.length / SURVEYS_PER_PAGE);
  const pageArray = [ ...Array(noOfPages).keys() ].map(key => key + 1);

  const handlePageChange = (event) => {
    setCurrentPage(parseInt(event.target.innerHTML));
  }

  window.addEventListener('wheel', event => {
    const nextPage = event.deltaY < 0 ? currentPage - 1 : currentPage + 1;

    if (nextPage >= 1 && nextPage <= noOfPages) {
      setCurrentPage(nextPage);
    }
  })

  return pageArray.length > 0 
    ? (
      <StyledPageContainer>
        {pageArray.map((page, index) => {
          return <StyledPage key={`page_${index}`} selected={page===currentPage} onClick={handlePageChange}>{page}</StyledPage>
        })}
      </StyledPageContainer>
    ) : null;
}

export default Pages;
