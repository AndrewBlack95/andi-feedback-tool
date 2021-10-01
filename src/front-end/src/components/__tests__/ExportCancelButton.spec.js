import { render, fireEvent } from '@testing-library/react';

import ExportCancelButton from '../ExportCancelButton';

const setDisplayModal = jest.fn();

test('renders with the correct text', () => {
  const { queryAllByText } = render(<ExportCancelButton setDisplayModal={setDisplayModal} />);
  expect(queryAllByText('Cancel').length).toBe(1);
});

test('when clicked it should call setDisplayModal', () => {
  const { queryAllByText } = render(<ExportCancelButton setDisplayModal={setDisplayModal} />);
  fireEvent.click(queryAllByText('Cancel')[0]);
  expect(setDisplayModal).toHaveBeenCalledWith(false);
});
