import { render } from '@testing-library/react';

import NavBar from '../NavBar';

test('renders the title', () => {
  const { queryAllByText } = render(<NavBar data-testid='nav-bar' />);
  expect(queryAllByText('The ANDi Feedback Tool').length).toBe(1);
});

test('renders the logout link', () => {
  const { queryAllByText } = render(<NavBar data-testid='nav-bar' />);
  expect(queryAllByText('Logout').length).toBe(1);
});


