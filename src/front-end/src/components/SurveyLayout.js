import styled from 'styled-components';

import LoadingMessage from './LoadingMessage';
import Questions from '../components/Questions';
import ErrorMessage from '../components/ErrorMessage';

const StyledSurveyContainer = styled.div`
  bottom: 0;
  left: 400px;
  padding: 60px 0;
  position: fixed;
  right: 100px;
  top: var(--topNavigationHeight);
`;

const StyledSurveyLayout = styled.div`
  border-left: 3px solid var(--primaryBlueColor);
  margin-left: 20px;
  overflow: auto;
  padding-left: 20px;
`;

const StyledSurveyTitle = styled.h1`
  margin: 0;
  padding: 0;
`;

const SurveyLayout = ({ survey, loading, tags, setTags }) => {
  return (
    <StyledSurveyContainer>
      <StyledSurveyLayout>
        {(loading && <LoadingMessage message='Retrieving survey details' />) 
        || (!survey && <ErrorMessage>Sorry, unable to retrieve details for this survey</ErrorMessage>) 
        || (
          <>
            <StyledSurveyTitle>{survey?.name}</StyledSurveyTitle>
            <Questions surveyId={survey?.surveyId} questions={survey?.questions} tags={tags} setTags={setTags} />
          </>
        )}
      </StyledSurveyLayout>
    </StyledSurveyContainer>
  );
};

export default SurveyLayout;
