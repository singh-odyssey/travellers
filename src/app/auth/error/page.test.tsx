import { render, screen } from '@testing-library/react';
import AuthErrorPage from './page';

describe('Auth error page', () => {
  it('renders a helpful message and sign-in fallback link', () => {
    render(<AuthErrorPage searchParams={{ error: 'Configuration' }} />);

    expect(screen.getByText(/sign in could not be completed/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to sign in/i })).toHaveAttribute('href', '/signin');
  });
});
