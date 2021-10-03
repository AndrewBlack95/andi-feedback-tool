import { render } from '@testing-library/react';

import ExportModalContainer from '../ExportModalContainer';

const displayModal = true;
const setDisplayModal = jest.fn();
const tags = {};
const setTags = jest.fn();
const surveyId = '12345';

test('renders the modal title', () => {
  const { queryAllByText } = render(<ExportModalContainer displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={surveyId} />);
  expect(queryAllByText('Export to PDF').length).toBe(1);
});

test('renders the Select a tag text', () => {
  const { queryAllByText } = render(<ExportModalContainer displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={surveyId} />);
  expect(queryAllByText('Select a tag').length).toBe(1);
});

test('renders the Additional feedback text', () => {
  const { queryAllByText } = render(<ExportModalContainer displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={surveyId} />);
  expect(queryAllByText('Additional feedback').length).toBe(1);
});

test('renders the Cancel button', () => {
  const { queryAllByText } = render(<ExportModalContainer displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={surveyId} />);
  expect(queryAllByText('Cancel').length).toBe(1);
});

test('does not render the Generate PDF button', () => {
  const { queryAllByText } = render(<ExportModalContainer displayModal={displayModal} setDisplayModal={setDisplayModal} tags={tags} setTags={setTags} surveyId={surveyId} />);
  expect(queryAllByText('Generate PDF').length).toBe(0);
});
