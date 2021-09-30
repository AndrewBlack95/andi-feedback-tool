import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Questions from '../Questions';

const questions = [
  { questionName: 'Example question one', answers: [] },
  { questionName: 'Example question two', answers: [] },
  { questionName: 'Example question three', answers: [] }
];

test('renders the question name correctly', () => {
  const { queryAllByText } = render(<Questions questions={questions} />);
  expect(queryAllByText('Example question one').length).toBe(1);
  expect(queryAllByText('Example question two').length).toBe(1);
  expect(queryAllByText('Example question three').length).toBe(1);
  expect(queryAllByText('Example question four').length).toBe(0);
});

test('when clicked it should select a question', () => {
  const { getByText } = render(<Questions questions={questions} />);
  fireEvent.click(getByText('Example question two'));
  expect(getByText('Example question two')).toHaveStyle({ 'background-color': 'var(--primaryBlueColor)' });
  expect(getByText('Example question one')).toHaveStyle({ 'background-color': 'var(--primaryGreyColor)' });
});

test('when clicked it should update the state', () => {
  const mockSetState = jest.fn();
  React.useState = jest.fn().mockReturnValueOnce([2, mockSetState]);
  const { getByText } = render(<Questions questions={questions} />);
  fireEvent.click(getByText('Example question two'));
  expect(mockSetState.mock.calls.length).toBe(1)
  expect(mockSetState).toHaveBeenCalledWith(1)

  fireEvent.click(getByText('Example question three'));
  expect(mockSetState.mock.calls.length).toBe(2);
  expect(mockSetState).toHaveBeenCalledWith(null);
})
