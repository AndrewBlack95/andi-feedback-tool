import { render } from '@testing-library/react';

import SurveyList from '../SurveyList';

const surveys = [
  { title: 'survey-1' },
  { title: 'survey-2' },
  { title: 'survey-3' },
  { title: 'survey-4' },
  { title: 'survey-5' },
  { title: 'survey-6' },
  { title: 'survey-7' },
  { title: 'survey-8' },
  { title: 'survey-9' },
  { title: 'survey-10' },
];

test('renders an error message when called with no props', () => {
  const { container } = render(<SurveyList />)
  expect(container.firstChild).not.toBeInTheDocument();
});

test('renders an error message if there are no surveys', () => {
  const { queryAllByText } = render(<SurveyList surveys={[]} currentPage={0} loading={false} />)
  expect(queryAllByText("Sorry, you don't appear to have any surveys available").length).toBe(1);
});

test('renders the first 9 survey titles when the current page is 1', () => {
  const { queryAllByText } = render(<SurveyList surveys={surveys} currentPage={1} loading={false} />)
  expect(queryAllByText('survey-1').length).toBe(1);
  expect(queryAllByText('survey-2').length).toBe(1);
  expect(queryAllByText('survey-3').length).toBe(1);
  expect(queryAllByText('survey-4').length).toBe(1);
  expect(queryAllByText('survey-5').length).toBe(1);
  expect(queryAllByText('survey-6').length).toBe(1);
  expect(queryAllByText('survey-7').length).toBe(1);
  expect(queryAllByText('survey-8').length).toBe(1);
  expect(queryAllByText('survey-9').length).toBe(1);
  expect(queryAllByText('survey-10').length).toBe(0);
});

test('renders the 10th survey title when the current page is 2', () => {
  const { queryAllByText } = render(<SurveyList surveys={surveys} currentPage={2} loading={false} />)
  expect(queryAllByText('survey-1').length).toBe(0);
  expect(queryAllByText('survey-2').length).toBe(0);
  expect(queryAllByText('survey-3').length).toBe(0);
  expect(queryAllByText('survey-4').length).toBe(0);
  expect(queryAllByText('survey-5').length).toBe(0);
  expect(queryAllByText('survey-6').length).toBe(0);
  expect(queryAllByText('survey-7').length).toBe(0);
  expect(queryAllByText('survey-8').length).toBe(0);
  expect(queryAllByText('survey-9').length).toBe(0);
  expect(queryAllByText('survey-10').length).toBe(1);
});
