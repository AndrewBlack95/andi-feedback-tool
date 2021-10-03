import { render, fireEvent } from '@testing-library/react';

import ExportButton from '../ExportButton';

const setDisplayModal = jest.fn();

test('renders with the correct text', () => {
  const { queryAllByText } = render(<ExportButton setDisplayModal={setDisplayModal} />);
  expect(queryAllByText('Export').length).toBe(1);
});

test('when clicked it should call setDisplayModal', () => {
  const { queryAllByText } = render(<ExportButton setDisplayModal={setDisplayModal} />);
  fireEvent.click(queryAllByText('Export')[0]);
  expect(setDisplayModal).toHaveBeenCalledWith(true);
});
