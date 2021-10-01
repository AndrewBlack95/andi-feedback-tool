import { render, fireEvent } from '@testing-library/react';

import ExportPDFButton from '../ExportPDFButton';

const setDisplayModal = jest.fn();


test('renders nothing when selectedTag does not exist', () => {
  const { queryAllByText } = render(<ExportPDFButton setDisplayModal={setDisplayModal} />);
  expect(queryAllByText('Generate PDF').length).toBe(0);
});

test('renders with the correct text', () => {
  const { queryAllByText } = render(<ExportPDFButton selectedTag='Test tag' setDisplayModal={setDisplayModal} />);
  expect(queryAllByText('Generate PDF').length).toBe(1);
});

test('when clicked it should call setDisplayModal', () => {
  const { queryAllByText } = render(<ExportPDFButton selectedTag='Test tag' setDisplayModal={setDisplayModal} />);
  fireEvent.click(queryAllByText('Generate PDF')[0]);
  expect(setDisplayModal).toHaveBeenCalledWith(false);
});
