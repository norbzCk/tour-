import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
