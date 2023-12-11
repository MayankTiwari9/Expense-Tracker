import { render, screen } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';




test('renders Forgot Passworde as a text', () => {
  render(<ForgotPassword />);
  const forgot = screen.getByText('Forgot Password');
  expect(forgot).toBeInTheDocument();
});