import { render } from '@testing-library/react';

import Answers from '../Answers';

const answers = [
  { responseId: 'abcde_12345', text: '', score: '4/5' },
  { responseId: 'abcde_12345', text: null, score: '3/5' },
  { responseId: 'abcde_12345', text: 'Example answer text', score: null },
  { responseId: 'abcde_12345', text: null, score: '1/5' },
]

test('renders the correct text', () => {
  const { queryAllByText } = render(<Answers answers={answers} selected={true} />)
  expect(queryAllByText('Example answer text').length).toBe(1);
});

test('renders the correct scores', () => {
  const { queryAllByText } = render(<Answers answers={answers} selected={true} />)
  expect(queryAllByText('4').length).toBe(1);
  expect(queryAllByText('3').length).toBe(1);
  expect(queryAllByText('1').length).toBe(1);
  expect(queryAllByText('/ 5').length).toBe(3);
});

test('renders the correct classNames', () => {
  const { getByText, queryAllByText } = render(<Answers answers={answers} selected={true} />);
  expect(getByText('Example answer text')).toHaveClass('selected');
  expect(queryAllByText('/ 5')[0]).toHaveClass('selected');
  expect(queryAllByText('/ 5')[1]).toHaveClass('selected');
  expect(queryAllByText('/ 5')[2]).toHaveClass('selected');
});
