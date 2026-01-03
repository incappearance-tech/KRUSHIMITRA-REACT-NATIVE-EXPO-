const API_BASE_URL = 'https://api.krushimitra.com';

export const api = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      return response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },
};
