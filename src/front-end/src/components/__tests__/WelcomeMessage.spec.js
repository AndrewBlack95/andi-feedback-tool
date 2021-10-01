import { render } from '@testing-library/react';

import WelcomeMessage from '../WelcomeMessage';

test('renders with the correct text', () => {
  const { queryAllByText } = render(<WelcomeMessage data-testid='welcome-message'></WelcomeMessage>);
  expect(queryAllByText('Hello,').length).toBe(1);
  expect(queryAllByText('Welcome to the ANDi Feedback Tool, all of your Survey Monkey surveys can be found below').length).toBe(1);
});

test('renders with the correct style', () => {
  const { getByTestId } = render(<WelcomeMessage data-testid='welcome-message'></WelcomeMessage>);
  expect(getByTestId('welcome-message')).toHaveStyle({ 
    'color': 'var(--primaryBlueColor)',
    'font-size': '20px',
    'font-weight': '700',
    'padding': '40px 0'
  });
});
