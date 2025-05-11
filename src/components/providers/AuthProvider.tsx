"use client";

import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserCredentials, AuthContextType } from '@/types';
import { authApi, setToken, removeToken, isTokenValid, getToken } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';

// Create Auth Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (isTokenValid()) {
        try {
          const userData = await authApi.getProfile();
          setUser(userData);
        } catch (error) {
          removeToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: UserCredentials) => {
    try {
      setIsLoading(true);
      const { access_token } = await authApi.login(credentials);
      setToken(access_token);
      
      // Extract user info from token
      const decoded: any = jwtDecode(access_token);
      
      // Get full profile
      const userData = await authApi.getProfile();
      setUser(userData);
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: UserCredentials) => {
    try {
      setIsLoading(true);
      const userData = await authApi.register(data);
      // After registration, log in automatically
      await login(data);
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    removeToken();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};