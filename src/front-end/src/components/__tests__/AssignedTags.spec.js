import { render } from '@testing-library/react';

import AssignedTags from '../AssignedTags';

const surveyId = '12345';
const selected = true;
const tagQuestion = null;
const setTagQuestion = jest.fn();
const index = 0;
const noTags = {};
const tags = { 'TagOne': { responses: [{ survey: '12345', question: 0, excluded: [] }] }, 'TagTwo': { responses: [] } }
const setTags = jest.fn();

test('should render nothing when an empty object of tags is provided', () => {
  const { queryAllByText } = render(<AssignedTags surveyId={surveyId} selected={selected} tagQuestion={tagQuestion} setTagQuestion={setTagQuestion} index={index} tags={noTags} setTags={setTags} />);
  expect(queryAllByText('+ Tag').length).toBe(0);
});

test('should render the + Tag button when an object of tags is provided', () => {
  const { queryAllByText } = render(<AssignedTags surveyId={surveyId} selected={selected} tagQuestion={tagQuestion} setTagQuestion={setTagQuestion} index={index} tags={tags} setTags={setTags} />);
  expect(queryAllByText('+ Tag').length).toBe(1);
});

test('should render the TagOne tag on Question 0 when an object of tags is provided', () => {
  const { queryAllByText } = render(<AssignedTags surveyId={surveyId} selected={selected} tagQuestion={tagQuestion} setTagQuestion={setTagQuestion} index={index} tags={tags} setTags={setTags} />);
  expect(queryAllByText('TagOne').length).toBe(1);
});

test('should update state when assigning a new tag', () => {
  const { queryAllByText } = render(<AssignedTags surveyId={surveyId} selected={selected} tagQuestion={tagQuestion} setTagQuestion={setTagQuestion} index={index} tags={tags} setTags={setTags} />);
  expect(queryAllByText('TagOne').length).toBe(1);
});
