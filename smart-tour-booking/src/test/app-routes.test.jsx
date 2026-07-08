import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App routes', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    localStorage.clear();
  });

  it('renders the destinations page for a direct route visit', () => {
    window.history.pushState({}, '', '/destinations');
    render(<App />);

    expect(screen.getByText(/Discover unforgettable destinations/i)).toBeInTheDocument();
  });

  it('renders the travel tips page for a direct route visit', () => {
    window.history.pushState({}, '', '/travel-tips');
    render(<App />);

    expect(screen.getByText(/Smart travel essentials/i)).toBeInTheDocument();
  });

  it('renders the about page for a direct route visit', () => {
    window.history.pushState({}, '', '/about');
    render(<App />);

    expect(screen.getByText(/Why travelers choose SmartTour/i)).toBeInTheDocument();
  });

  it('redirects a tourist to My Bookings after login when they have prior bookings', async () => {
    window.history.pushState({}, '', '/login');
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'sarah@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' },
    });
    fireEvent.submit(screen.getByPlaceholderText('you@example.com').closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
