import { api } from './api';

export const machineService = {
  async list(filters?: any) {
    return api.get('/machines?' + new URLSearchParams(filters).toString());
  },

  async getDetails(machineId: string) {
    return api.get(`/machines/${machineId}`);
  },

  async create(data: any) {
    return api.post('/machines', data);
  },

  async update(machineId: string, data: any) {
    return api.post(`/machines/${machineId}`, data);
  },
};
