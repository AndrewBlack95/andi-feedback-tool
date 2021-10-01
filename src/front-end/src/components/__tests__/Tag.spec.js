import { render } from '@testing-library/react';

import Tag from '../Tag';

const tag = { color: 'var(--primaryGreyColor)', responses: [], feedback: '' };

test('renders a tag with the correct tag name', () => {
  const { queryAllByText } = render(<Tag tag={tag}>Best tag</Tag>);
  expect(queryAllByText('Best tag').length).toBe(1);
});
