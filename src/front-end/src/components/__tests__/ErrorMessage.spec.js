import { render } from '@testing-library/react';

import ErrorMessage from '../ErrorMessage';

test('renders with the correct text', () => {
  const { queryAllByText } = render(<ErrorMessage data-testid='error-message'>Testing ErrorMessage text</ErrorMessage>);
  expect(queryAllByText('Testing ErrorMessage text').length).toBe(1);
});

test('renders with the correct style', () => {
  const { getByTestId } = render(<ErrorMessage data-testid='error-message'>Testing ErrorMessage text</ErrorMessage>);
  expect(getByTestId('error-message')).toHaveStyle({ 
    'background-color': 'var(--primaryGreyColor)',
    'border-radius': '3px',
    'color': 'var(--primaryRedColor)',
    'padding': '20px',
  });
});
