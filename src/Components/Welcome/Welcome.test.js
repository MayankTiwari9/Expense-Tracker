import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';


test('renders Expense Tracker as a text', () => {
  render(<Welcome />);
  const welcome = screen.getByText('Welcome to Expense Tracker!!!');
  expect(welcome).toBeInTheDocument();
});