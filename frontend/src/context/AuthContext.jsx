import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, setToken, clearToken, getUserData, setUserData } from '../utils/secureStorage';
import authService from '../services/authService';

// Create Context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getToken();
        
        if (token) {
          // Try to get user from localStorage first (fast)
          const cachedUser = getUserData();
          
          if (cachedUser) {
            setUser(cachedUser);
          }
          
          // Then validate token with backend
          try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
            setUserData(userData); // Cache user data
          } catch (err) {
            // Token invalid, clear everything
            clearToken();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        clearToken();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authService.login({ email, password });
      
      // Save token and user data
      setToken(response.token);
      setUserData(response.user);
      setUser(response.user);
      
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      
      // Save token and user data
      setToken(response.token);
      setUserData(response.user);
      setUser(response.user);
      
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    clearToken();
    setUser(null);
    setError(null);
    // Optional: Call backend logout endpoint
    // authService.logout().catch(console.error);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      setUserData(response.user);
      setUser(response.user);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  // Check if user has KYC verification
  const isKYCVerified = () => {
    return user?.kycVerified || false;
  };

  // Clear error
  const clearError = () => setError(null);

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    isKYCVerified,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;