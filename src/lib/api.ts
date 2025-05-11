import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { 
  AuthResponse,
  SearchTransactionsParams,
  Transaction,
  UploadResponse,
  User,
  UserCredentials
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor to handle token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        removeToken();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: UserCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    
    // Check for successful response and token
    if (response.data?.success) {
      // The token is automatically set via cookie (httpOnly)
      return {
        success: true,
        user: response.data.user
      };
    }
    throw new Error(response.data?.message || 'Login failed');
  },
  
  register: async (credentials: UserCredentials): Promise<User> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    removeToken();
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data?.user;
  }
};

// Token utilities
export const setToken = (cookieHeader: string): void => {
  if (typeof window !== 'undefined') {
    document.cookie = cookieHeader;
  }
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  return cookieValue || null;
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    return (decoded.exp ?? 0) * 1000 > Date.now();
  } catch {
    return false;
  }
};

export default api;