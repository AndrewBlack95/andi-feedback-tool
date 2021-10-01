import { render } from '@testing-library/react';

import SurveyLayout from '../SurveyLayout';

const survey = { name: 'Test survey name', questions: [] };

test('should render the Loading message when loading is true', () => {
  const { queryAllByText } = render(<SurveyLayout survey={survey} loading={true} />);
  expect(queryAllByText(/^Retrieving survey details/).length).toBe(1);
  expect(queryAllByText('Test survey name').length).toBe(0);
});

test('should render an Error message when survey is null and loading is false', () => {
  const { queryAllByText } = render(<SurveyLayout survey={null} loading={false} />);
  expect(queryAllByText(/^Retrieving survey details/).length).toBe(0);
  expect(queryAllByText(/^Sorry, unable to retrieve details for this survey/).length).toBe(1);
  expect(queryAllByText('Test survey name').length).toBe(0);
})

test('should render the survey name when survey is not null and loading is false', () => {
  const { queryAllByText } = render(<SurveyLayout survey={survey} loading={false} />);
  expect(queryAllByText(/^Retrieving survey details/).length).toBe(0);
  expect(queryAllByText(/^Sorry, unable to retrieve details for this survey/).length).toBe(0);
  expect(queryAllByText('Test survey name').length).toBe(1);
});
