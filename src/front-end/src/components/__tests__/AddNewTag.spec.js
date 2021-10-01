import { render, fireEvent } from '@testing-library/react';

import AddNewTag from '../AddNewTag';

const setTags = jest.fn();
const setAddNewTag = jest.fn();

test('should render the Create Tag title', () => {
  const { queryAllByText } = render(<AddNewTag />);
  expect(queryAllByText('+ Create Tag').length).toBe(1);
});

test('should render the Cancel button when the addNewTag prop is provided', () => {
  const { queryAllByText } = render(<AddNewTag addNewTag/>);
  expect(queryAllByText('Cancel').length).toBe(1);
});

test('should render the Add button when the addNewTag prop is provided and input is typed', () => {
  const { getByLabelText, queryAllByText } = render(<AddNewTag addNewTag />);
  fireEvent.change(getByLabelText('add-tag-input'), { target: { value: 'New Tag' } });
  expect(queryAllByText('Add').length).toBe(1);
});

test('should reset the form when the Cancel button is clicked', () => {
  const { getByText } = render(<AddNewTag addNewTag setTags={setTags} setAddNewTag={setAddNewTag} />);
  fireEvent.click(getByText('Cancel'));
  expect(setTags.mock.calls.length).toBe(0);
  expect(setAddNewTag.mock.calls.length).toBe(1);
});

test('should reset the form when the Add button is clicked', () => {
  const { getByLabelText, getByText, queryAllByText } = render(<AddNewTag addNewTag setTags={setTags} setAddNewTag={setAddNewTag} />);
  fireEvent.change(getByLabelText('add-tag-input'), { target: { value: 'New Tag' } });
  fireEvent.click(getByText('Add'));
  expect(queryAllByText('Add').length).toBe(0);
  expect(setTags.mock.calls.length).toBe(1);
  expect(setAddNewTag.mock.calls.length).toBe(1);
});
