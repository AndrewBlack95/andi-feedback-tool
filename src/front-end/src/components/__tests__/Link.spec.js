import { render } from '@testing-library/react';

import Link from '../Link';

test('renders with the correct text', () => {
  const { getByTestId } = render(<Link data-testid='link'>Testing link text</Link>);
  expect(getByTestId('link')).toHaveStyle({ color: 'black' })
});

test('renders with the primary color', () => {
  const { getByTestId } = render(<Link data-testid='link' primary>Testing link text</Link>);
  expect(getByTestId('link')).toHaveStyle({ color: 'var(--primaryFontColor,white)' })
});
