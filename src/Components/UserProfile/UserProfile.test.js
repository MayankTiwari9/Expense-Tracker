import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';



test('renders Contact Details as a text', () => {
  render(<UserProfile />);
  const contact = screen.getByText('Contact Details');
  expect(contact).toBeInTheDocument();
});