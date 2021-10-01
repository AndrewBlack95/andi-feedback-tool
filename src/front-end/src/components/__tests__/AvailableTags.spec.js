import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import AvailableTags from '../AvailableTags';

const tags = { 'TagOne': {}, 'TagTwo': {} };

test('renders the Available Tags heading', () => {
  const { queryAllByText } = render(<AvailableTags tags={tags} />);
  expect(queryAllByText('Available Tags').length).toBe(1);
});

test('renders the No Tags text if no tags are provided', () => {
  const { queryAllByText } = render(<AvailableTags tags={{}} />);
  expect(queryAllByText('No tags').length).toBe(1);
});

test('renders the tags with the correct names', () => {
  const { queryAllByText } = render(<AvailableTags tags={tags} />);
  expect(queryAllByText('TagOne').length).toBe(1);
  expect(queryAllByText('TagTwo').length).toBe(1);
  expect(queryAllByText('TagThree').length).toBe(0);
});

test('renders the Create Tag button', () => {
  const { queryAllByText } = render(<AvailableTags tags={tags} />);
  expect(queryAllByText('+ Create Tag').length).toBe(1);
});

test('should update state when the Create Tag button is clicked', () => {
  const mockSetState = jest.fn();
  React.useState = jest.fn().mockReturnValueOnce([false, mockSetState]).mockReturnValue([null, mockSetState]);
  const { getByText } = render(<AvailableTags tags={tags} />);
  fireEvent.click(getByText('+ Create Tag'));
  expect(mockSetState.mock.calls.length).toBe(1)
  expect(mockSetState).toHaveBeenCalledWith(true)
});
