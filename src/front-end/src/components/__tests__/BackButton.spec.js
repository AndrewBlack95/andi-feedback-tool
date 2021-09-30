import { render, fireEvent } from '@testing-library/react';

import BackButton from '../BackButton';

const mockGoBack = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => {
    const goBack = () => mockGoBack()
    return { goBack }
  }
}));

test('renders with the correct text', () => {
  const { queryAllByText } = render(<BackButton />);
  expect(queryAllByText('Back').length).toBe(1);
});

test('when clicked should call goBack()', () => {
  const { getByText } = render(<BackButton />);
  fireEvent.click(getByText('Back'));
  expect(mockGoBack.mock.calls.length).toBe(1);
});
