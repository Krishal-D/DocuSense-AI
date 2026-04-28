import client from './client.ts';

export const authAPI = {
  async register(name: String, email: string, password: string) {
    const res = await client.post('/auth/register', { name, email, password });
    return res;
  },

  async login(email: string, password: string) {
    const res = await client.post('/auth/login', { email, password });
    return res;
  },

  async logout() {
    const res = await client.post('/auth/logout');
    return res.data;
  },

  async refresh() {
    const res = await client.post('/auth/refresh');
    return res.data;
  },
};
