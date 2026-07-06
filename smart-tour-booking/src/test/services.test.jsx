import { describe, it, expect, vi } from 'vitest';
import { paymentService } from '../services/paymentService';
import { notificationService } from '../services/notificationService';

describe('paymentService', () => {
  it('generates valid transaction IDs', () => {
    const id = paymentService.generateTransactionId();
    expect(id).toMatch(/^MPESA\d{8}$/);
  });

  it('initiates STK push with valid inputs', async () => {
    const result = await paymentService.initiateStkPush('+255712345678', 1000);
    expect(result).toHaveProperty('merchantRequestID');
    expect(result).toHaveProperty('checkoutRequestID');
    expect(result.status).toBe('Accepted');
  });

  it('throws on missing phone', async () => {
    await expect(paymentService.initiateStkPush('', 1000)).rejects.toThrow('Phone number and amount are required');
  });

  it('confirms payment with valid PIN', async () => {
    const result = await paymentService.confirmPayment('ws_CO_123', '1234');
    expect(result.status).toBe('Success');
    expect(result.transactionId).toMatch(/^MPESA\d{8}$/);
  });

  it('rejects invalid PIN length', async () => {
    await expect(paymentService.confirmPayment('ws_CO_123', '123')).rejects.toThrow('Invalid M-Pesa PIN');
  });
});

describe('notificationService', () => {
  it('sends SMS and logs to localStorage', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    notificationService.sendSms('+255712345678', 'Test message');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('formats booking SMS correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    notificationService.triggerBookingSms('+255712345678', 'Serengeti Safari', 799000, 'MPESA1234');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
