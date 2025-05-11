import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { 
  AuthResponse,
  SearchTransactionsParams,
  Transaction,
  UploadResponse,
  User,
  UserCredentials
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: UserCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: UserCredentials): Promise<User> => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.post<User>('/auth/profile');
    return response.data;
  },
};

// PDF API
export const pdfApi = {
  uploadPdf: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<UploadResponse>('/pdf/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  searchTransactions: async (params: SearchTransactionsParams): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/pdf/search', { params });
    return response.data;
  },
};

// Auth utilities
export const setToken = (token: string): void => {
  Cookies.set('token', token, { expires: 1 }); // 1 day expiry
};

export const removeToken = (): void => {
  Cookies.remove('token');
};

export const getToken = (): string | undefined => {
  return Cookies.get('token');
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export default api;