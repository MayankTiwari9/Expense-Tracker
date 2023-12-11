import { render, screen } from '@testing-library/react';
import Header from './Header';



test('renders Home as a text', () => {
  render(<Header />);
  const header = screen.getByText('Home');
  expect(header).toBeInTheDocument();
});