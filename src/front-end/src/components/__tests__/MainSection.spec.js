import { render } from '@testing-library/react';

import MainSection from '../MainSection';

test('renders with the correct children', () => {
  const { queryAllByText } = render(<MainSection data-testid='main-section'><div><p>Testing MainSection children render</p></div></MainSection>);
  expect(queryAllByText('Testing MainSection children render').length).toBe(1);
});

test('renders with the correct style', () => {
  const { getByTestId } = render(<MainSection data-testid='main-section'></MainSection>);
  expect(getByTestId('main-section')).toHaveStyle({ 
    'bottom': 0,
    'box-sizing': 'border-box',
    'overflow': 'auto',
    'padding': '0 100px',
    'position': 'absolute',
    'top': 'var(--topNavigationHeight)',
    'width': '100%'
  });
});
