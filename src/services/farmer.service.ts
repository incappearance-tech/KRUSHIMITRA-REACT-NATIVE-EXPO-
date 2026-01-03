import { api } from './api';

export const farmerService = {
  async getProfile() {
    return api.get('/farmer/profile');
  },

  async updateProfile(data: any) {
    return api.post('/farmer/profile', data);
  },

  async getMachines() {
    return api.get('/farmer/machines');
  },

  async getSellListings() {
    return api.get('/farmer/sell-listings');
  },

  async getBuyListings() {
    return api.get('/farmer/buy-listings');
  },
};
