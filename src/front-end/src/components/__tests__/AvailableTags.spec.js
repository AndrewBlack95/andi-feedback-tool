import { render } from '@testing-library/react';

import AvailableTags from '../AvailableTags';

const tags = { 'TagOne': {}, 'TagTwo': {} };

test('renders the Available Tags heading', () => {
  const { queryAllByText } = render(<AvailableTags tags={tags} />);
  expect(queryAllByText('Available Tags').length).toBe(1);
});

test('renders the tags with the correct names', () => {
  const { queryAllByText } = render(<AvailableTags tags={tags} />);
  expect(queryAllByText('TagOne').length).toBe(1);
  expect(queryAllByText('TagTwo').length).toBe(1);
  expect(queryAllByText('TagThree').length).toBe(0);
});

test('renders the Add New Tag button', () => {
  const { queryAllByText } = render(<AvailableTags tags={tags} />);
  expect(queryAllByText('+ Add New Tag').length).toBe(1);
});
