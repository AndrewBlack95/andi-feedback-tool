import { render, fireEvent } from '@testing-library/react';

import Pages from '../Pages';

const setCurrentPage = jest.fn();

test('renders nothing if an empty array of surveys is passed', () => {
  const { container } = render(<Pages surveys={[]} currentPage={1} setCurrentPage={setCurrentPage} />)
  expect(container.firstChild).toBeNull();
})

test('renders the correct number of pages for the number of surveys', () => {
  const surveys = [ ...Array(12).fill('test-survey') ]
  const { queryAllByText } = render(<Pages surveys={surveys} currentPage={1} setCurrentPage={setCurrentPage} />);
  expect(queryAllByText('1').length).toBe(1);
  expect(queryAllByText('2').length).toBe(1);
  expect(queryAllByText('3').length).toBe(0);
});

test('calls setCurrentPage when a Page is clicked', () => {
  const surveys = [ ...Array(12).fill('test-survey') ]
  const { getByText } = render(<Pages surveys={surveys} currentPage={1} setCurrentPage={setCurrentPage} />);
  fireEvent.click(getByText('2'));
  expect(setCurrentPage.mock.calls.length).toBe(1);
});
