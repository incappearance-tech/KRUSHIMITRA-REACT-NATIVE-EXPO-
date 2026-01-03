import { api } from './api';

export const authService = {
  async sendOTP(phone: string) {
    return api.post('/auth/send-otp', { phone });
  },

  async verifyOTP(phone: string, otp: string) {
    return api.post('/auth/verify-otp', { phone, otp });
  },

  async logout() {
    return api.post('/auth/logout', {});
  },
};
