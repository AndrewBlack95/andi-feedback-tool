import { render } from '@testing-library/react';

import LoadingMessage from '../LoadingMessage';

test('when provided with a message prop it should render that', () => {
  const { queryAllByText } = render(<LoadingMessage message='Testing loading message' />);
  expect(queryAllByText(/^Testing loading message/).length).toBe(1);
});

test('when provided with a children prop it should render that', () => {
  const { queryAllByText } = render(<LoadingMessage>Testing second loading message</LoadingMessage>);
  expect(queryAllByText(/^Testing second loading message/).length).toBe(1);
});

test('when provided with no props it should render the default message', () => {
  const { queryAllByText } = render(<LoadingMessage />);
  expect(queryAllByText(/^Loading/).length).toBe(1);
});
