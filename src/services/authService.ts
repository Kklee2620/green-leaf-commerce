
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    // Lưu token và thông tin người dùng vào localStorage
    localStorage.setItem('authToken', token);
    if (user.role === 'admin') {
      localStorage.setItem('isAdmin', 'true');
    }
    
    return user;
  },
  
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
  },
  
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  isAdmin: () => {
    return !!localStorage.getItem('isAdmin');
  }
};
