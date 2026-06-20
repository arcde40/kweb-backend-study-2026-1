import api from '@/lib/api';

export interface User {
  id: number;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: LoginCredentials): Promise<User> {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
