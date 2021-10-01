import { render } from '@testing-library/react';

import SidePanel from '../SidePanel';

test('renders with the correct children', () => {
  const { queryAllByText } = render(<SidePanel data-testid='side-panel'><div><p>Testing SidePanel children render</p></div></SidePanel>);
  expect(queryAllByText('Testing SidePanel children render').length).toBe(1);
});

test('renders with the correct style', () => {
  const { getByTestId } = render(<SidePanel data-testid='side-panel'></SidePanel>);
  expect(getByTestId('side-panel')).toHaveStyle({ 
    'bottom': '0',
    'padding': '60px 0',
    'position': 'fixed',
    'top': 'var(--topNavigationHeight)',
    'width': '300px'
  });
});
