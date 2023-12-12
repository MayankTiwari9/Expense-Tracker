import { render, screen } from '@testing-library/react';
import LogInForm from "./LogInForm";



test('renders Forgot Passworde as a text', () => {
  render(<LogInForm />);
  const forgot = screen.getByText('Forgot Password');
  expect(forgot).toBeInTheDocument();
});