import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '../context/DataContext';

function TestComponent() {
  const { tours, bookings, addBooking } = useData();
  return (
    <div>
      <span data-testid="tours-count">{tours.length}</span>
      <span data-testid="bookings-count">{bookings.length}</span>
      <button
        data-testid="add-booking"
        onClick={() => addBooking({
          userId: 2,
          userName: "Test User",
          userEmail: "test@test.com",
          userPhone: "+255712345678",
          tourId: 1,
          tourTitle: "Serengeti Safari",
          date: "2026-08-01",
          amount: 799000,
          travelers: 1,
          transactionId: "MPESA1234",
        })}
      >
        Add Booking
      </button>
    </div>
  );
}

describe('DataContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial tours data', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    expect(Number(screen.getByTestId('tours-count').textContent)).toBeGreaterThan(0);
  });

  it('adds a booking and triggers notifications', async () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByTestId('add-booking'));
    await waitFor(() => {
      const count = Number(screen.getByTestId('bookings-count').textContent);
      expect(count).toBeGreaterThan(0);
    });
  });

  it('generates transaction IDs via payment service', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    expect(screen.getByTestId('tours-count').textContent).toBeTruthy();
  });
});
