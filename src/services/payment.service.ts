import { api } from './api';

export const paymentService = {
  async initiatePayment(amount: number, orderId: string) {
    return api.post('/payments/initiate', { amount, orderId });
  },

  async verifyPayment(paymentId: string) {
    return api.get(`/payments/${paymentId}/verify`);
  },

  async getTransactionHistory() {
    return api.get('/payments/history');
  },
};
